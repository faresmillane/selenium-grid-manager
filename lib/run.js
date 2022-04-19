const utils = require("./utils");
const server = require("./server");
const config = require('../config/config')

const start = async () => {
if (await utils.checkSeleniumStatus() != true) {
    await server.server();
} else {
    console.log(`\x1b[36m%s\x1b[0m`, `-> selenium server is running correctly : ${config.hostname}:${config.hubPort}/ui/index.html`)
};
};

const restart = async () => {
    await server.server();
};

module.exports = {
    restart,
    start
};