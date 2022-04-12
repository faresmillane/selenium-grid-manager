const status = require("./status");
const server = require("./server");
const config = require('../config/config')

const checkSeleniumStatus = async () => {
if (await status.checkSeleniumStatus() != true) {
    await server.start();
} else {
    console.log(`\x1b[36m%s\x1b[0m`, `-> selenium server is running correctly : ${config.hostname}:${config.hubPort}/ui/index.html`)
};
};

checkSeleniumStatus();