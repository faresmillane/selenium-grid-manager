const utils = require("./utils");
const server = require("./server");
const config = require('../config/config')

const start = async () => {
if (await utils.checkSeleniumStatus() != true) {
    await server.server();
} else {
    console.log("[" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+"] "+'\033[34m'+'info'+'\x1b[36m%s\x1b[0m', ` -> selenium server is running correctly : ${config.hostname}:${config.hubPort}/ui/index.html`)
};
};

const restart = async () => {
    await server.server();
};

module.exports = {
    restart,
    start
};