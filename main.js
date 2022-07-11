const Apify = require('apify');
const path = require('path');

// const playwright = require('playwright');
const { handleStart, handleList } = require('./src/routes');

const { utils: { log } } = Apify;

// https://playwright.dev/docs/chrome-extensions or https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions
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
    {
        tag: 'followers&following',
        id: 'bckleejkdhlponanidmjfjdigpahlado',
        path: path.join(__dirname, 'instf'),
    },
    /*
    {
        tag: 'inssist',
        id: 'bcocdbombenodlegijagbhdjbifpiijp',
        path: path.join(__dirname, 'inssist'),
    },
    */
];

Apify.main(async () => {
    const input = await Apify.getInput();
    const {
        startUrls,
        sessionid,
        proxy = { useApifyProxy: true },
        debugLog = false,
    } = input;

    if (debugLog) {
        log.setLevel(log.LEVELS.DEBUG);
    }

    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration(proxy);

    const state = await Apify.getValue('STATE') || {
        lastSessionId: sessionid,
        fatalError: false,
        queryUrlsFromIndex: 0,
        requests: requestList?.requests?.map((x) => { return { url: x?.url }; }) || [],
    };
    const persistState = async () => { await Apify.setValue('STATE', state); };
    Apify.events.on('persistState', persistState);

    // need to process URLs in batches by 10 since for bigger lists
    // plugin become "dirty" and fails with false-positive error "please close tab with download in progress"
    do {
        for (const rq of state.requests.slice(state.queryUrlsFromIndex, state.queryUrlsFromIndex + 10)) {
            await requestQueue.addRequest(rq);
        }
        state.queryUrlsFromIndex += 10;
        const crawler = new Apify.PlaywrightCrawler({
            requestQueue,
            proxyConfiguration,
            // plugins enforce to open only single instance per type (no multitabs)
            maxConcurrency: 1, // no multitabs
            handlePageTimeoutSecs: 60 * 60 * 8, // 8 hours max, expected 10.000 comments per hour
            launchContext: {
                // To use Firefox or WebKit on the Apify Platform,
                // don't forget to change the image in Dockerfile
                // launcher: playwright.firefox,
                useChrome: true,
                // We don't have 'stealth' for Playwright yet.
                // Try using Firefox, it is naturally stealthy.
                launchOptions: {
                    // devtools: true,
                    headless: false, // required for plugins
                    args: [
                        `--disable-extensions-except=${plugins.map((x) => x.path).join()}`,
                        `--load-extension=${plugins.map((x) => x.path).join()}`,
                    ],
                    // viewport: { width: 1366, height: 768 }
                },
            },
            browserPoolOptions: {
                postLaunchHooks: [async (pageId, browserController) => {
                    // eslint-disable-next-line no-underscore-dangle
                    await browserController.browser._browserContext.addCookies([
                        {
                            name: 'sessionid',
                            value: sessionid,
                            domain: '.instagram.com',
                            path: '/',
                        },
                    ]);
                }],
            },
            handlePageFunction: async (context) => {
                if (state.fatalError) {
                    return;
                }
                const { request, page } = context;
                const url = page.url();
                // track blocking IG patterns
                const blockingUri = ['login', 'challenge'];
                if (blockingUri.find((x) => url.includes(`/${x}`))) {
                    state.fatalError = true;
                    log.error(`BLOCKED access for ${request.url}`);
                    return;
                }
                if (!url.startsWith('chrome-extension://')) {
                    return handleStart(context, input, plugins);
                }
                return handleList(context, input);
            },
        });

        await crawler.run();
    } while (!state.fatalError && state?.requests?.length && state?.requests?.length > state.queryUrlsFromIndex);
    const wasBlocked = state.fatalError ? 'WAS BLOCKED' : 'finished';
    log.info(`Crawl ${wasBlocked} with sessionId ${state.lastSessionId}`);
});
