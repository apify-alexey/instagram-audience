const Apify = require('apify');

const { postPageRequest, profileDashboardUrl, maxRetries } = require('./consts');

const { utils: { log, sleep } } = Apify;

// add plugins opened from parent Instagram profile or post
exports.handleStart = async ({ page }, { includeComments, includeLikes, includeFollowing, includeFollowers, maxItems }, plugins) => {
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
            await handleList({ page, request: pluginRequest }, { maxItems });
        }
        if (includeLikes) {
            pluginRequest = postPageRequest(plugins[1], instagramUrl);
            await handleList({ page, request: pluginRequest }, { maxItems });
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
        await handleList({ page, request: pluginRequest }, { maxItems });
    }
    if (includeFollowers) {
        tag = 'followers';
        pluginRequest = {
            url: profileDashboardUrl({ ...plugins[2], tag, profile }),
            userData: { ...plugins[2], tag, instagramUrl },
        };
        await handleList({ page, request: pluginRequest }, { maxItems });
    }
};

// reparse output from plugins and save it to dataset
const handleList = async ({ page, request }, { maxItems }) => {
    await page.goto(request.url);
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
                    const profileUrl = x.profile_url;
                    const profilePic = x.profile_pic_url;
                    x.profile_url = undefined;
                    x.profile_pic_url = undefined;
                    return { type: tag, instagramUrl, profileUrl, profilePic, ...x };
                }));
            }
            if (lastIndex > pluginData.export_data.length) {
                retries = 0;
            } else {
                retries++;
            }
            lastIndex = pluginData.export_data.length;
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
    } while (retries < maxRetries && !allCommentsDownloaded);
    if (retries >= maxRetries) {
        log.error(`[PLUGINFAILED]: ${request?.userData?.tag} not available from ${request.url}`);
        await Apify.utils.puppeteer.saveSnapshot(page, { key: `error${new Date().getTime()}`, saveHtml: false });
        throw new Error('PLUGIN');
    }
};
