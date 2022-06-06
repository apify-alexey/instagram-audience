const postDashboardUrl = ({ id, instagramUrl }) => `chrome-extension://${id}/dashboard.html?target_url=${instagramUrl}`;
const postPageRequest = (plugin, instagramUrl) => {
    return {
        url: postDashboardUrl({ ...plugin, instagramUrl }),
        userData: { ...plugin, instagramUrl },
    };
};
const profileDashboardUrl = ({ id, tag, profile }) => `chrome-extension://${id}/dashboard.html?username=${profile}&type=${tag}`;

module.exports = {
    postPageRequest,
    profileDashboardUrl,
};