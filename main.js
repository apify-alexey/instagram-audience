const Apify = require('apify');
const path = require('path');

// const playwright = require('playwright');
const { handleStart } = require('./src/routes');

const { utils: { log } } = Apify;

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
];

Apify.main(async () => {
    const input = await Apify.getInput();
    const {
        startUrls,
        sessionid,
        proxy = { useApifyProxy: true },
    } = input;

    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const proxyConfiguration = await Apify.createProxyConfiguration(proxy);

    // https://playwright.dev/docs/chrome-extensions or https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions
    const crawler = new Apify.PlaywrightCrawler({
        requestList,
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
                headless: false,
                args: [
                    `--disable-extensions-except=${plugins.map((x) => x.path).join()}`,
                    `--load-extension=${plugins.map((x) => x.path).join()}`,
                ],
                // viewport: { width: 1366, height: 768 }
            },
        },
        browserPoolOptions: {
            postPageCreateHooks: [(page, browserController) => {
                browserController.setCookies(page, [
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
            const { request, page } = context;
            const url = page.url();
            // track blocking IG patterns
            const blockingUri = ['login', 'challenge'];
            if (blockingUri.find((x) => url.includes(`/${x}`))) {
                log.warning(`BLOCKED access for ${request.url}`);
                return context?.crawler?.autoscaledPool.abort();
            }
            // all plugin pages opened from parent IG URL, so no other routing
            return handleStart(context, input, plugins);
        },
    });

    await crawler.run();
    log.info('Crawl finished.');
});
