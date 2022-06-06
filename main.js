const Apify = require('apify');
const path = require('path');

// const playwright = require('playwright');
const { handleStart, handleList } = require('./src/routes');

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

    const requestQueue = await Apify.openRequestQueue();
    // removed requestList to process plugin URLs after IG URLs
    for (const rq of startUrls) {
        await requestQueue.addRequest(rq);
    }
    const proxyConfiguration = await Apify.createProxyConfiguration(proxy);

    // https://playwright.dev/docs/chrome-extensions or https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions
    const crawler = new Apify.PlaywrightCrawler({
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
            if (url.includes('/login')) {
                log.warning(`BLOCKED by LOGIN redirect from ${request.url}`);
                return;
            }
            if (!url.startsWith('chrome-extension://')) {
                return handleStart(context, input, plugins);
            }
            return handleList(context, input);
        },
    });

    await crawler.run();
    log.info('Crawl finished.');
});
