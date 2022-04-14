
const fs = require('fs-extra');
if (fs.existsSync(`../../../selenium-config`)) {
    console.log("INFO - your configuration it's ok !")
};
const selenium = require('../../../selenium-config');

module.exports = {
    hostname: "http://localhost",
    hubPort: 4444,
    ports: [4444, 4445, 4446, 4447, 4448],
    nodes: [
        {
            browserName: 'chrome',
            driverName: 'chromedriver',
            active: selenium.chrome.is_active === false ? selenium.chrome.is_active : true,
            port: 4445,
            sessions: selenium.chrome.max_sessions ? selenium.chrome.max_sessions : 8
        },
        {
            browserName: 'firefox',
            driverName: 'geckodriver',
            active: selenium.firefox.is_active === false ? selenium.firefox.is_active : true,
            port: 4446,
            sessions: selenium.firefox.max_sessions ? selenium.firefox.max_sessions : 8
        },
        {
            browserName: 'MicrosoftEdge',
            driverName: 'msedgedriver',
            active: selenium.edge.is_active === false ? selenium.edge.is_active : true,
            port: 4447,
            sessions: selenium.edge.max_sessions ? selenium.edge.max_sessions : 8
        }
    ],
    update: {
        chromedriver: {
            windows: 'https://chromedriver.storage.googleapis.com/100.0.4896.60/chromedriver_win32.zip',
            linux: 'https://chromedriver.storage.googleapis.com/100.0.4896.60/chromedriver_linux64.zip',
        },
        geckodriver: {
            windows: 'https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-win64.zip',
            linux: 'https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-linux64.tar.gz'
        },
        msedgedriver: {
            windows: 'https://msedgedriver.azureedge.net/100.0.1185.36/edgedriver_win32.zip',
            linux: 'https://msedgedriver.azureedge.net/100.0.1185.36/edgedriver_linux64.zip'
        }
    },
    path: './node_modules/selenium-grid-manager/'
};