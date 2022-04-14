# selenium-grid-manager
A selenium grid 4 server and browser drivers manager for your end to end tests.

Getting Started
---------------

```
npm install selenium-grid-manager
```

Setting
----------------------------

Before starting the selenium server, configure your package.json and download the selenium server jar and driver binaries, it will download the selenium grid server jar, chromedriver, geckodriver and msedgedriver binary.

1- create a configuration file at the root of your project.
NB: the file must be named "selenium-config.js".

```
 module.exports = {
    chrome: {
        is_active: true,       // put false to disable chrome
        max_sessions: 8        // increase the number of max sessions
    },
    firefox: {
        is_active: true,       // put false to disable firefox
        max_sessions: 8        // increase the number of max sessions
    },
    edge: {
        is_active: true,       // put false to disable edge
        max_sessions: 8        // increase the number of max sessions
    }
}
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

Other useful commands
---------------------

```
npm run selenium:server restart
```

Congratulations, selenium server is listening on port 4444, you can set that in your selenium webdriver client