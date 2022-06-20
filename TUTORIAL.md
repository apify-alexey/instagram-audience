# Scraping based on browser plugin(s)

<b>
Understand how to run browser plugins by apify actor and how to reparse data from plugin to actor environment.
</b>

There is many browser plugins and automated browser can run them from actor. This way getting data by plugins become scalable: under your own browser you must install plugins per browser profile, means multi accounts handled manually as well as data processing. In other words if you want to use 2 browser profiles with 5 different plugins for each you need to manually run and access 10 different UIs, meanwhile you stuck with your synchronized devices. Creation of Apify ports for plugins can be done once and after that you will get scalable cloud solution with unified interface, API access and monetization out of the box.
As bonus you will be able to deliver plugin-based solution to end users without being binded to any web stores and their's removal policies (if you curious check what Chrome Web Store provides as extensions based on google services, i.e. check how many [google maps plugins available there](https://chrome.google.com/webstore/search/google%20maps?hl=en)).

## Learning

Before moving on, give these valuable resources a quick lookover:

<ul>
<li>[How can I set up Chrome for extension development?](https://developer.chrome.com/docs/extensions/mv3/faq/#faq-dev-01)</li>
<li>[How to Find & View the Files Installed by a Chrome Extension](https://www.bleepingcomputer.com/tutorials/how-to-view-files-installed-by-a-chrome-extension/)</li>
<li>[Explore online archive and download zipped plugin](https://chrome-stats.com/) and as a bonus google for a similar site(s)</li>
<li>Running plugins in [playwright](https://playwright.dev/docs/chrome-extensions) or [puppeteer](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions)</li>
</ul>

## Knowledge check

<ol>
<li>Are you able to access and automate plugin pages in a same way as regular web pages?</li>
<li>When you copy plugin to your custom folder, will plugin settings be included?</li>
<li>Is it necessary to have page opened in order to be able to access targeted web site by plugin?</li>
</ol>

## Our task

We want to load (as unpacked) plugin(s) into browser controlled by actor. You need to copy the plugin source into the project folder, after that you can specify a folder with the plugin to be uploaded as browser extension(s) in Puppeteer or Playwright.
```
const plugins = [
    {
        path: path.join(__dirname, 'instc'),
    }
    {
        path: path.join(__dirname, 'instl'),
    },
    {
        path: path.join(__dirname, 'instf'),
    },
];
```

Folders can be named or nested in any way, as long as its valid file path, however browser must be headfull in order to be able to actually run loaded plugins:
```
    launchContext: {
        useChrome: true,
        launchOptions: {
            headless: false, // required for plugins
            args: [
                `--disable-extensions-except=${plugins.map((x) => x.path).join()}`,
                `--load-extension=${plugins.map((x) => x.path).join()}`,
            ],
        },
    }
```

Targeted site is Instagram and this exact plugins require logged Instagram web user in order to be able to access data, however task for setting auth cookies is not directly related to ability to run browser plugins, so its covered by different tutorial, see [Logging into a website
](https://developers.apify.com/academy/puppeteer-playwright/common-use-cases/logging-into-a-website)

Assuming that we have logged Instagram user we opening Instagram URLs as specified by actor input and double check if access is available, it means Instagram should not redirect us to `login` or `challenge` to i.e. verify email or check SMS.
```
    handlePageFunction: async (context) => {
        const { request, page } = context;
        const url = page.url();
        // track blocking IG patterns
        const blockingUri = ['login', 'challenge'];
        if (blockingUri.find((x) => url.includes(`/${x}`))) {
            state.fatalError = true;
            await requestQueue.drop();
            log.error(`BLOCKED access for ${request.url}`);
            return;
        }
        if (!url.startsWith('chrome-extension://')) {
            return handleStart(context, input, plugins);
        }
        return handleList(context, input);
    }
```

If we able to reach Instagram page then we adding crafted URL to open plugin page based on Instagram data type `handlePageFunction -> handleStart(context, input, plugins)`: from browser point of view we just opening page by direct URL, however page created by plugin instead of remote web server. We have 3 plugins installed so we need to create a bit different URLs to call them.
```
const postDashboardUrl = ({ id, instagramUrl }) => `chrome-extension://${id}/dashboard.html?target_url=${instagramUrl}`;
const profileDashboardUrl = ({ id, tag, profile }) => `chrome-extension://${id}/dashboard.html?username=${profile}&type=${tag}`;
```

When plugin page is opened actor handles it as regular web page based on VueJS web app `handlePageFunction -> handleList(context, input)` just because this exact plugins are VueJS apps, so nothing specific about scraping data itself, can be done as regular scraping from VueJS2.x web page. Under VueJS we can use nice shortuct to get internal state from elements, in case of our plugins we need to check 3 VueJS elements as follows:
```
    pluginData = await page.evaluate(() => {
        // eslint-disable-next-line no-underscore-dangle
        return document.querySelector('div.main_app, div.main, div[role="alert"]')?.__vue__?._data;
    });
```

Naming a bit different for data element, its either `div.main_app` or `div.main` for what you visually see as progress bar with buttons to pause-download when you run plugins manually in browser. If instead of data element we getting `div[role="alert"]._visible` it means some error displayed and in this case we must stop page processing.

So the rest of the logic is waiting for VueJS component to finish data processing and not directly related to plugins, therefore is not covered by more details. Key point here: you will need to be able to add scraping specific to plugins you are running, it will be always specific to plugin in a same way as regular scraping is always specific to targeted site.

## Wrap up

Apify SDK and web scraping in general based on two approaches: we either running browser and automate actions inside of it (PuppeteerCrawler, PlaywrightCrawler) or we reproduce raw http traffic (this option includes mobile apps too) to exchange data with a web server (CheerioCrawler).
Of course targeted sites are aware about mentioned approaches and normally all valuable data is protected one way or another, so having an additional alternative approach is a big strategic advantage as long as it works and implementation can be done under the same codebase.
Scraping by plugins worth to be considered and this solution is the working proof of extensions-based scraping approach.
