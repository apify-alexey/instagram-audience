const Apify = require('apify');
const path = require('path');

// const playwright = require('playwright');
const { handleStart, handleList, handleDetail } = require('./src/routes');

const { utils: { log, sleep } } = Apify;

Apify.main(async () => {
    const {
        startUrls,
        sessionid,
        proxy = { useApifyProxy: true },
        includeLikes,
        includeComments,
        includeFollowers,
        includeFollowing,
        maxItems = 0
    } = await Apify.getInput();

    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration(proxy);

    const plugins = [
        {
            tag: 'comments',
            id: 'hdfhpnjnlgekgjmniifdieiflhfdkmlk',
            path: path.join(__dirname, 'instc'),
        },
        {
            tag: 'likes',
            id: 'iiblfonkagipdojommmomopjldpibdbb',
            path: path.join(__dirname, 'instl'),
        },
        /*
        {
            tag: 'followers&following',
            id: 'bckleejkdhlponanidmjfjdigpahlado',
            path: path.join(__dirname, 'instf'),
        }
        */
    ];
    const postDashboardUrl = ({ id, instagramUrl }) => `chrome-extension://${id}/dashboard.html?target_url=${instagramUrl}`;
    const postPageRequest = ( plugin, instagramUrl ) => {
        return {
            url: postDashboardUrl({ ...plugin, instagramUrl }),
            userData: { ...plugin, instagramUrl }
        }
    };
    const profileDashboardUrl = ({ id, tag, profile }) => `chrome-extension://${id}/dashboard.html?username=${profile}&type=${tag}`;

    // https://playwright.dev/docs/chrome-extensions or https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions
    const crawler = new Apify.PlaywrightCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        maxConcurrency: 1,
        handlePageTimeoutSecs: 60 * 8, // 8 hours max, expected 10.000 comments per hour
        launchContext: {
            // To use Firefox or WebKit on the Apify Platform,
            // don't forget to change the image in Dockerfile
            // launcher: playwright.firefox,
            useChrome: true,
            // We don't have 'stealth' for Playwright yet.
            // Try using Firefox, it is naturally stealthy.
            launchOptions: {
                // devtools: true,
                headless: false,
                args: [
                    `--disable-extensions-except=${plugins.map(x => x.path).join()}`,
                    `--load-extension=${plugins.map(x => x.path).join()}`
                ],
                // viewport: { width: 1366, height: 768 }
            }

        },
        browserPoolOptions: {
            postPageCreateHooks: [(page, browserController) => {
                browserController.setCookies(page, [
                    {
                        name: 'sessionid',
                        value: sessionid,
                        domain: '.instagram.com',
                        path: '/'
                    }
                ]);
            }],
        },
        handlePageFunction: async (context) => {
            const { request, page } = context;
            const url = page.url();
            if (url.includes('/login')) {
                log.warning(`BLOCKED by LOGIN redirect from ${request.url}`);
                return;
            }
            if (!url.startsWith('chrome-extension://')) {
                const transformUrl = new URL(url);
                if (!transformUrl.host === 'www.instagram.com') {
                    log.warning(`[WRONGURL]: ${url}`);
                    return;
                }
                const instagramUrl = url;
                if (transformUrl.pathname.startsWith('/p/')) {
                    if (includeComments) {
                        await requestQueue.addRequest(postPageRequest(plugins[0], instagramUrl));
                    }
                    if (includeLikes) {
                        await requestQueue.addRequest(postPageRequest(plugins[1], instagramUrl));
                    }
                    return;
                }
                return;
                const profile = transformUrl.pathname.split('/').filter(x => x).shift();
                let tag;
                if (includeFollowing) {
                    tag = 'following';
                    await requestQueue.addRequest({
                        url: profileDashboardUrl({ ...plugins[2], tag, profile }),
                        userData: { ...plugins[2], tag, instagramUrl }
                    });
                }
                if (includeFollowers) {
                    tag = 'followers';
                    await requestQueue.addRequest({
                        url: profileDashboardUrl({ ...plugins[2], tag, profile }),
                        userData: { ...plugins[2], tag, instagramUrl }
                    });
                }
                return;
            }
            log.info(`[INSTAGRAM]: ${request?.userData?.instagramUrl}`);
            // await page.waitForSelector('input[aria-label="Search Input"]');
            // await page.goto(`chrome-extension://hdfhpnjnlgekgjmniifdieiflhfdkmlk/dashboard.html?target_url=${url}`);
            await sleep(5000);
            let retries = 0;
            let lastIndex = 0;
            let pluginData;
            let allCommentsDownloaded;
            do {
                await sleep(5000);
                pluginData = await page.evaluate(() => {
                    return document.querySelector('div.main_app, div.main, div[role="alert"]')?.__vue__?._data;
                });
                if (pluginData && pluginData?.export_data?.length >= lastIndex) {
                    const saveData = pluginData.export_data.slice(lastIndex, maxItems ? maxItems - lastIndex : undefined);
                    const { tag, instagramUrl } = request.userData || {};
                    if (saveData?.length) {
                        await Apify.pushData(saveData.map(x => {
                            return { tag, instagramUrl, profileUrl: x.profile_url, details: x,  };
                        }));
                    }
                    lastIndex = pluginData.export_data.length;
                    retries = 0;
                } else {
                    retries++;
                    // _visible true if plugin failed with error to access IG
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
                log.error(`[FAILEDOWNLOAD]: comments not available from ${request.url}`);
            }
            await Apify.utils.puppeteer.saveSnapshot(page, { key: `post${request?.id}`, saveHtml: false });
        },
    });

    await crawler.run();
    log.info('Crawl finished.');
});
