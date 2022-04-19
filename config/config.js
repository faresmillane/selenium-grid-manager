
let seleniumPath, rootPath;
process.env.ENV === 'DEV' ? seleniumPath = '../' : seleniumPath = '../../../';
process.env.ENV === 'DEV' ? rootPath = '' : rootPath ='./node_modules/selenium-grid-manager/'
const selenium = require(`${seleniumPath}selenium-config`);

module.exports = {
    hostname: "http://localhost",
    hubPort: selenium.hubPort,
    ports: [
        selenium.hubPort, 
        selenium.chrome.port, 
        selenium.firefox.port, 
        selenium.edge.port, 
        selenium.safari.port
    ],
    nodes: [
        {
            browserName: 'chrome',
            driverName: 'chromedriver',
            version: selenium.chrome.version,
            active: selenium.chrome.isActive === false ? selenium.chrome.isActive : true,
            port: selenium.chrome.port,
            sessions: selenium.chrome.maxSessions ? selenium.chrome.maxSessions : 8
        },
        {
            browserName: 'firefox',
            driverName: 'geckodriver',
            version: selenium.firefox.version,
            active: selenium.firefox.isActive === false ? selenium.firefox.isActive : true,
            port: selenium.firefox.port,
            sessions: selenium.firefox.maxSessions ? selenium.firefox.maxSessions : 8
        },
        {
            browserName: 'MicrosoftEdge',
            driverName: 'msedgedriver',
            version: selenium.edge.version,
            active: selenium.edge.isActive === false ? selenium.edge.isActive : true,
            port: selenium.edge.port,
            sessions: selenium.edge.maxSessions ? selenium.edge.maxSessions : 8
        },
        {
            browserName: 'Safari',
            driverName: 'safaridriver',
            version: selenium.safari.version,
            active: selenium.safari.isActive === false ? selenium.safari.isActive : true,
            port: selenium.safari.port,
            sessions: selenium.safari.maxSessions ? selenium.safari.maxSessions : 8
        }
    ],
    update: {
        chromedriver: {
            windows: `https://chromedriver.storage.googleapis.com/${selenium.chrome.version}/chromedriver_win32.zip`,
            linux: `https://chromedriver.storage.googleapis.com/${selenium.chrome.version}/chromedriver_linux64.zip`,
            macos: `https://chromedriver.storage.googleapis.com/${selenium.chrome.version}/chromedriver_mac64.zip`
        },
        geckodriver: {
            windows: `https://github.com/mozilla/geckodriver/releases/download/v${selenium.firefox.version}/geckodriver-v${selenium.firefox.version}-win64.zip`,
            linux: `https://github.com/mozilla/geckodriver/releases/download/v${selenium.firefox.version}/geckodriver-v${selenium.firefox.version}-linux64.tar.gz`,
            macos: `https://github.com/mozilla/geckodriver/releases/download/v${selenium.firefox.version}/geckodriver-v${selenium.firefox.version}-macos.tar.gz`
        },
        msedgedriver: {
            windows: `https://msedgedriver.azureedge.net/${selenium.edge.version}/edgedriver_win32.zip`,
            linux: `https://msedgedriver.azureedge.net/${selenium.edge.version}/edgedriver_linux64.zip`,
            macos: `https://msedgedriver.azureedge.net/${selenium.edge.version}/edgedriver_mac64.zip`
        }
    },
    path: rootPath
};