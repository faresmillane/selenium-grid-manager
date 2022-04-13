
module.exports = {
    hostname: "http://localhost",
    hubPort: 4444,
    ports: [4444, 4445, 4446, 4447, 4448, 4723],
    nodes: [
        {
            driverName: 'chromedriver',
            active: true,
            port: 4445,
            sessions: 6
        },
        {
            driverName: 'geckodriver',
            active: true,
            port: 4446,
            sessions: 4
        },
        {
            driverName: 'msedgedriver',
            active: true,
            port: 4447,
            sessions: 4
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