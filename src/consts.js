const Apify = require('apify');

const { utils: { log } } = Apify;

const postDashboardUrl = ({ id, instagramUrl }) => `chrome-extension://${id}/dashboard.html?target_url=${instagramUrl}`;
const postPageRequest = (plugin, instagramUrl) => {
    return {
        url: postDashboardUrl({ ...plugin, instagramUrl }),
        userData: { ...plugin, instagramUrl },
    };
};
const profileDashboardUrl = ({ id, tag, profile }) => `chrome-extension://${id}/dashboard.html?username=${profile}&type=${tag}`;

const transformUrlToInsWebClient = (rq, plugin) => {
    if (!(rq && rq.url && plugin)) {
        log.error(`Unable to create Inssist Web client`, { rq, plugin });
        return rq;
    }
    return {
        url: 'chrome-extension://bcocdbombenodlegijagbhdjbifpiijp/inssist.html#instagram.com/rarebeauty/',
    };
};

// max retries to get new data by plugin
const maxRetries = 10;
const delayBetweenRetries = 5000;

module.exports = {
    postPageRequest,
    profileDashboardUrl,
    maxRetries,
    delayBetweenRetries,
    transformUrlToInsWebClient,
};
