module.exports = {
    hubPort: 4444,
    chrome: {
        isActive: true,
        maxSessions: 8,
        version: "100.0.4896.60", // available versions : https://chromedriver.chromium.org/downloads
    },
    firefox: {
        isActive: true,
        maxSessions: 8,
        version: "0.31.0", // available versions : https://github.com/mozilla/geckodriver/releases
    },
    edge: {
        isActive: true,
        maxSessions: 8,
        version: "100.0.1185.39", // available versions : https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver/
    },
    safari: {
        isActive: true, // is active only on macos platform
        maxSessions: 8,
        version: "", // safari driver is available on macOS High Sierra and newer
    }
};
