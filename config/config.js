
let seleniumPath, rootPath;
process.env.ENV === 'DEV' ? seleniumPath = '../' : seleniumPath = '../../../';
process.env.ENV === 'DEV' ? rootPath = '' : rootPath ='./node_modules/selenium-grid-manager/'
const selenium = require(`${seleniumPath}selenium-config`);

module.exports = {
    hostname: "http://localhost",
    hubPort: selenium.hub_port,
    ports: [
        selenium.hub_port, 
        selenium.chrome.port, 
        selenium.firefox.port, 
        selenium.edge.port, 
        selenium.safari.port
    ],
    nodes: [
        {
            browserName: 'chrome',
            driverName: 'chromedriver',
            active: selenium.chrome.is_active === false ? selenium.chrome.is_active : true,
            port: selenium.chrome.port,
            sessions: selenium.chrome.max_sessions ? selenium.chrome.max_sessions : 8
        },
        {
            browserName: 'firefox',
            driverName: 'geckodriver',
            active: selenium.firefox.is_active === false ? selenium.firefox.is_active : true,
            port: selenium.firefox.port,
            sessions: selenium.firefox.max_sessions ? selenium.firefox.max_sessions : 8
        },
        {
            browserName: 'MicrosoftEdge',
            driverName: 'msedgedriver',
            active: selenium.edge.is_active === false ? selenium.edge.is_active : true,
            port: selenium.edge.port,
            sessions: selenium.edge.max_sessions ? selenium.edge.max_sessions : 8
        },
        {
            browserName: 'Safari',
            driverName: 'safaridriver',
            active: selenium.safari.is_active === false ? selenium.safari.is_active : true,
            port: selenium.safari.port,
            sessions: selenium.safari.max_sessions ? selenium.safari.max_sessions : 8
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