const Apify = require('apify');

const { postPageRequest, profileDashboardUrl, maxRetries, delayBetweenRetries } = require('./consts');

const { utils: { log, sleep } } = Apify;

// queue plugins from parent Instagram profile or post
exports.handleStart = async ({ page, crawler }, { includeComments, includeLikes, includeFollowing, includeFollowers }, plugins) => {
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
