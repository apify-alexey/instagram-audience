const Apify = require('apify');

const { postPageRequest, profileDashboardUrl } = require('./consts');

const { utils: { log, sleep } } = Apify;

// add plugins to requestQueue based on opened Instagram profile or post
exports.handleStart = async ({ page, crawler }, { includeComments, includeLikes, includeFollowing, includeFollowers }, plugins) => {
    const { requestQueue } = crawler;
    const url = page.url();
    const transformUrl = new URL(url);
    if (!transformUrl.host === 'www.instagram.com') {
        log.warning(`[WRONGURL]: ${url}`);
        return;
    }
    const instagramUrl = url;
    if (transformUrl.pathname.startsWith('/p/')) {
        if (includeComments) {
            await requestQueue.addRequest(postPageRequest(plugins[0], instagramUrl), { forefront: true });
        }
        if (includeLikes) {
            await requestQueue.addRequest(postPageRequest(plugins[1], instagramUrl), { forefront: true });
        }
        return;
    }
    const profile = transformUrl.pathname.split('/').filter((x) => x).shift();
    let tag;
    if (includeFollowing) {
        tag = 'following';
        await requestQueue.addRequest({
            url: profileDashboardUrl({ ...plugins[2], tag, profile }),
            userData: { ...plugins[2], tag, instagramUrl },
        }, { forefront: true });
    }
    if (includeFollowers) {
        tag = 'followers';
        await requestQueue.addRequest({
            url: profileDashboardUrl({ ...plugins[2], tag, profile }),
            userData: { ...plugins[2], tag, instagramUrl },
        }, { forefront: true });
    }
};

// reparse output from plugins and save it to dataset
exports.handleList = async ({ page, request }, { maxItems }) => {
    log.info(`[INSTAGRAM]: ${request?.userData?.instagramUrl} ${request?.userData?.tag}`);
    await sleep(5000);
    let retries = 0;
    let lastIndex = 0;
    let pluginData;
    let allCommentsDownloaded;
    do {
        await sleep(5000);
        pluginData = await page.evaluate(() => {
            // eslint-disable-next-line no-underscore-dangle
            return document.querySelector('div.main_app, div.main, div[role="alert"]')?.__vue__?._data;
        });
        if (pluginData && pluginData?.export_data?.length >= lastIndex) {
            const saveData = pluginData.export_data.slice(lastIndex, maxItems ? maxItems - lastIndex : undefined);
            const { tag, instagramUrl } = request.userData || {};
            if (saveData?.length) {
                await Apify.pushData(saveData.map((x) => {
                    return { type: tag, instagramUrl, profileUrl: x.profile_url, details: x };
                }));
            }
            lastIndex = pluginData.export_data.length;
            retries = 0;
        } else {
            retries++;
            // div[role="alert"] _visible = true if plugin failed with error to access IG
            // eslint-disable-next-line no-underscore-dangle
            if (pluginData?._visible) {
                retries = 10;
            }
        }
        allCommentsDownloaded = pluginData && pluginData?.is_stopped;
        if (maxItems && maxItems <= pluginData?.export_data?.length) {
            allCommentsDownloaded = true;
        }
    } while (retries < 10 && !allCommentsDownloaded);
    if (retries >= 10) {
        log.error(`[FAILEDOWNLOAD]: ${request?.userData?.tag} not available from ${request.url}`);
        await Apify.utils.puppeteer.saveSnapshot(page, { key: `error${request?.id}`, saveHtml: true });
    }
};
