const { exec } = require('child_process');
const clear = require("./clear");
const status = require("./status");
const config = require('../config/config');
let extension = 'test';

async function sleep(milliseconds)  {
    return await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

const start = async () => {
    try {
        var platform = await clear.getPlatform();
        if (platform === "windows") { extension = '.exe' }
        await clear.clearAvailabilityPorts();
        await sleep(2000);
        await exec(`chmod 777 ${config.path}drivers/chromedriver ${config.path}drivers/geckodriver ${config.path}drivers/msedgedriver`);
        await exec(`java -jar ${config.path}selenium-server.jar hub --port ${config.hubPort} &`);
        await sleep(2000);
        for (let i = 0; i < config["nodes"].length; i++) {
            if(config["nodes"][i].active === true){
                await exec(`java -jar ${config.path}selenium-server.jar node --port ${config["nodes"][i].port} --driver-configuration webdriver-path="${config.path}drivers/${config["nodes"][i].driverName}${extension}" --config ${config.path}config/${platform}/${config["nodes"][i].driverName}-node.toml &`);
                await sleep(2000);
            };
        };        
        while (await status.checkSeleniumStatus() != true) {
            await sleep(200);;
        };
        console.log('\x1b[36m%s\x1b[0m', `-> selenium started : ${config.hostname}:${config.hubPort}/ui/index.html`)
    }
    catch (error) {
        console.log(error);
    };
};

module.exports = { start }