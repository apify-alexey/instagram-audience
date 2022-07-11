const Apify = require('apify');

const { postPageRequest, profileDashboardUrl, maxRetries, delayBetweenRetries } = require('./consts');

const { utils: { log, sleep } } = Apify;

const getApiFromPage = async (page) => {
    let api;
    page.on('requestfinished', async (req) => {
        const url = req.url();
        if (!(url.includes('instagram.com/graphql/query/?query_hash=') && url.includes('first'))) {
            return;
        }
        const resp = await req.response();
        try {
            const json = await resp.json();
            if (json?.data?.user?.edge_owner_to_timeline_media) {
                api = { url, json };
            }
        } catch (err) {
            log.error(`requestfinished ${url} ${err?.message}`);
        }
    });
    let waitApiAttempts = 10;
    while (!api && waitApiAttempts > 0) {
        // #app > div.css-wccsn7 > div.css-19poa0v > div.css-aq3slv > div.css-12b2ift > div > button > div.css-ykr4nq
        const okButton = await page.$('#app > div.css-wccsn7 > div.css-19poa0v > div.css-aq3slv > div.css-12b2ift > div > button > div.css-ykr4nq');
        const okButtonText = await okButton?.innerText();
        if (okButtonText?.toUpperCase()?.startsWith('OK')) {
            await okButton.click();
        }
        await sleep(10000);
        waitApiAttempts--;
    }
    page.on('requestfinished', () => { });
    return api;
};

const getProfilePosts = async (page, { maxItems }) => {
    const url = page.url();
    const api = await getApiFromPage(page);
    if (!api) {
        log.warning(`[POSTS]: not available from ${url}`);
        await Apify.utils.puppeteer.saveSnapshot(page, { saveHtml: true });
        return;
    }
    let endCursor;
    const posts = [];
    do {
        const media = api?.json?.data?.user?.edge_owner_to_timeline_media;
        if (media?.edges?.length) {
            posts.push(...media.edges);
            log.info(`saved ${media?.edges?.length} posts`);
        }
        endCursor = media?.page_info?.end_cursor;
        if (endCursor && media?.page_info?.has_next_page) {
            const nextPageUrl = new URL(api.url);
            const apiVariables = JSON.parse(decodeURIComponent(nextPageUrl.searchParams.get('variables')));
            apiVariables.after = endCursor;
            nextPageUrl.searchParams.set('variables', encodeURIComponent(apiVariables));
            api.json = await page.waitForFunction((fetchUrl) => fetch(fetchUrl).then((r) => r.json()), nextPageUrl.toString());
            await sleep(5000);
        }
    } while (endCursor && (!maxItems || posts.length < maxItems));
    log.info(`total ${posts.length} posts`);

    await Apify.pushData({
        type: 'posts',
        instagramUrl: url,
        posts: posts.slice(0, maxItems && posts.length > maxItems ? maxItems : undefined),
    });
};

// queue plugins from parent Instagram profile or post
exports.handleStart = async ({ page, crawler }, input, plugins) => {
    const { includePosts, includeComments, includeLikes, includeFollowing, includeFollowers } = input;

    const url = page.url();
    const transformUrl = new URL(url);
    if (!transformUrl.host === 'www.instagram.com') {
        log.warning(`[WRONGURL]: ${url}`);
        return;
    }

    const instagramUrl = url;
    let pluginRequest;
    if (transformUrl.pathname.startsWith('/p/')) {
        if (includeComments) {
            pluginRequest = postPageRequest(plugins[0], instagramUrl);
            await crawler.requestQueue.addRequest(pluginRequest, { forefront: true });
            // await handleList({ page, request: pluginRequest }, { maxItems });
        }
        if (includeLikes) {
            pluginRequest = postPageRequest(plugins[1], instagramUrl);
            await crawler.requestQueue.addRequest(pluginRequest, { forefront: true });
        }
        return;
    }
    const profile = transformUrl.pathname.split('/').filter((x) => x).shift();
    let tag;
    if (includeFollowing) {
        tag = 'following';
        pluginRequest = {
            url: profileDashboardUrl({ ...plugins[2], tag, profile }),
            userData: { ...plugins[2], tag, instagramUrl },
        };
        await crawler.requestQueue.addRequest(pluginRequest, { forefront: true });
        // await handleList({ page, request: pluginRequest }, { maxItems });
    }
    if (includeFollowers) {
        tag = 'followers';
        pluginRequest = {
            url: profileDashboardUrl({ ...plugins[2], tag, profile }),
            userData: { ...plugins[2], tag, instagramUrl },
        };
        await crawler.requestQueue.addRequest(pluginRequest, { forefront: true });
    }
};

// reparse output from plugins and save it to dataset
exports.handleList = async ({ page, request }, { maxItems }) => {
    await sleep(delayBetweenRetries);
    let retries = 0;
    let lastIndex = 0;
    let pluginData;
    let allCommentsDownloaded;
    let initialLogMessage = true;
    do {
        await sleep(delayBetweenRetries);
        pluginData = await page.evaluate(() => {
            // eslint-disable-next-line no-underscore-dangle
            return document.querySelector('div.main_app, div.main, div[role="alert"]')?.__vue__?._data;
        });
        // div[role="alert"] _visible = true if plugin failed with error to access IG
        // eslint-disable-next-line no-underscore-dangle
        if (pluginData && pluginData?._visible) {
            retries = maxRetries;
        } else if (pluginData && pluginData?.export_data?.length >= lastIndex) {
            // output getting mixed during downloading, can not save by chunks from lastIndex
            if (pluginData?.export_data?.length !== lastIndex) {
                retries = 0;
            } else {
                retries++;
            }
            lastIndex = pluginData.export_data.length;
        } else {
            retries = maxRetries;
        }

        if (initialLogMessage) {
            log.info(`[INSTAGRAM]: GET ${request?.userData?.instagramUrl} ${request?.userData?.tag}`);
            initialLogMessage = false;
        }

        allCommentsDownloaded = pluginData && pluginData?.is_stopped;
        if (maxItems && maxItems <= pluginData?.export_data?.length) {
            allCommentsDownloaded = true;
        }
    } while (retries < maxRetries && !allCommentsDownloaded);

    log.info(`[INSTAGRAM]: done ${request?.userData?.instagramUrl} ${request?.userData?.tag}, saved: ${lastIndex}`);
    const saveData = pluginData?.export_data?.slice(0, maxItems || undefined);
    const { tag, instagramUrl } = request.userData || {};
    if (saveData?.length) {
        await Apify.pushData(saveData.map((x) => {
            const profileUrl = x.profile_url;
            const profilePic = x.profile_pic_url;
            x.profile_url = undefined;
            x.profile_pic_url = undefined;
            return { type: tag, instagramUrl, profileUrl, profilePic, ...x };
        }));
    }

    if (retries >= maxRetries) {
        log.error(`[PLUGINFAILED]: ${request?.userData?.tag} not available from ${request.url}`);
        await Apify.utils.puppeteer.saveSnapshot(page, { key: `error${new Date().getTime()}`, saveHtml: false });
        throw new Error('PLUGIN');
    }
};

exports.handleInssistWebClient = async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#app');
    const api = await getApiFromPage(page);
    if (api) {
        await Apify.pushData(api);
    }
    await Apify.utils.puppeteer.saveSnapshot(page, { saveHtml: false });
};
