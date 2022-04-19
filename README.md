# Selenium-grid-manager
A `Selenium Grid 4` server and browser drivers manager for your end to end tests.
Great tool for launching [Selenium Grid](https://www.selenium.dev/documentation/grid/) with [WebDriver](https://www.selenium.dev/documentation/webdriver/) support.

Supported Drivers:
 * [Chromedriver](https://chromedriver.chromium.org/downloads) 
 * [Geckodriver](https://github.com/mozilla/geckodriver/releases) (Firefox)
 * [Edge WebDriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver/)
 * [Safari](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Getting Started
---------------
Before starting the installation, you must make sure you have [Java](https://www.java.com/en/download/manual.jsp) and [nodeJS](https://nodejs.org/en/download/) installed and configured on your machine.

`NB`: If you are using windows it is better to use [GitBash](https://git-scm.com/download/win) as a cli terminal.

```
npm install selenium-grid-manager
```

Setting
----------------------------

Before starting the selenium server, configure your package.json and download the selenium server jar and driver binaries, it will download the selenium grid server jar, chromedriver, geckodriver and msedgedriver binary.

1- create a configuration file at the root of your project.

`NB`: the file must be named "selenium-config.js".

```
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
```
Or, get a copy directly with this command :
```
cp ./node_modules/selenium-grid-manager/selenium-config.js ./selenium-config.js
```

2- Add this script in your package.json

```
 "scripts": {
    "selenium:server": "./node_modules/.bin/selenium"
 }
```

3- Run this command to install drivers

```
npm run selenium:server install
```

Starting the Selenium Server
----------------------------

By default, the selenium server will run on `http://localhost:4444/ui/index.html`.

```
npm run selenium:server start
```
Congratulations, selenium server is listening on port 4444, you can set that in your selenium webdriver client.

Other useful commands
---------------------

```
npm run selenium:server restart
```

```
npm run selenium:server reinstall
```

```
npm run selenium:server clean
```

## Available browsers

By default, Google Chrome, Firefox and Microsoft Edge are available when installed on the host system.