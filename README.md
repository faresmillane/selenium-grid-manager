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

1- Add this script in your package.json

```
 "scripts": {
    "selenium:server": "./node_modules/.bin/selenium"
 }
```

2- Run this command to install drivers

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