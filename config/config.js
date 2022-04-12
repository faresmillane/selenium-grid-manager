module.exports = {
    hostname: "http://localhost",
    hubPort: 4444,
    ports: [4444, 4445, 4446, 4447, 4448, 4723],
    nodes: [
        {
            driverName: 'chrome',
            active: true,
            port: 4445,
        },
        {
            driverName: 'firefox',
            active: true,
            port: 4446,
        },
        {
            driverName: 'edge',
            active: true,
            port: 4447,
        },
        {
            driverName: 'appium',
            active: false,
            port: 4448,
        },
    ],
    update: {
        selenium: 'https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.1.0/selenium-server-4.1.3.jar',
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
    }
};