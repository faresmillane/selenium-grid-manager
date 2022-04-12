const { exec } = require('child_process');
const clear = require("./clear");
const status = require("./status");
const config = require('../config/config')

async function sleep(milliseconds)  {
    return await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

const start = async () => {
    try {
        var platform = await clear.getPlatform();
        await clear.clearAvailabilityPorts();
        await sleep(2000);
        await exec(`chmod 777 drivers/chromedriver drivers/geckodriver drivers/msedgedriver`);
        await exec(`java -jar ./selenium-server.jar hub --port ${config.hubPort} &`);
        await sleep(2000);
        for (let i = 0; i < config["nodes"].length; i++) {
            if(config["nodes"][i].active === true){
                if(config["nodes"][i].driverName === 'appium' && await clear.getPlatform() === "windows"){
                    await exec(`yarn run appium:start &`);
                } else if (config["nodes"][i].driverName === 'appium' && await clear.getPlatform() != "windows"){
                    await exec(`npm run appium:start &`);
                }
                await exec(`java -jar ./selenium-server.jar node --port ${config["nodes"][i].port} --config ./config/${platform}/${config["nodes"][i].driverName}-node.toml &`);
                await sleep(2000);
            };
        };        
        while (await status.checkSeleniumStatus() != true) {
            await sleep(200);;
        };
        console.log('\x1b[36m%s\x1b[0m', `-> selenium started : ${config.hostname}:${config.hubPort}/ui/index.html`)
    }
    catch (error) {
        return false;
    };
};

module.exports = { start }