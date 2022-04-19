const { exec } = require('child_process');
const clear = require("./clear");
const status = require("./status");
const config = require('../config/config');
let extension = '';

async function sleep(milliseconds)  {
    return await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

const start = async () => {
    try {
        const list = config["nodes"].length;
        const platform = await clear.getPlatform();
        if (platform === "windows") { extension = '.exe' }
        await clear.clearAvailabilityPorts();
        await sleep(2000);
        await exec(`chmod 777 ${config.path}drivers/chromedriver ${config.path}drivers/geckodriver ${config.path}drivers/msedgedriver`);
        console.log(`INFO - starting registration process ${config.hostname}:${config.hubPort}`);
        await exec(`java -jar ${config.path}selenium-server.jar hub --port ${config.hubPort} &`);
        await sleep(2000);
        for (let i = 0; i < list-1; i++) {
            if(config["nodes"][i].active === true){
                await exec(`sed -i -e 's/'max-sessions'=.*/'max-sessions'='${config["nodes"][i].sessions}'/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                if(process.env.ENV === 'DEV') {
                    await exec(`sed -i -e 's/'webdriver-executable'=.*/'webdriver-executable'=".\\/drivers\\/${config["nodes"][i].driverName}${extension}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                } else {
                    await exec(`sed -i -e 's/'webdriver-executable'=.*/'webdriver-executable'=".\\/node_modules\\/selenium-grid-manager\\/drivers\\/${config["nodes"][i].driverName}${extension}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                }
                await exec(`sed -i -e 's/'stereotype'=.*/'stereotype'="{\\\\\\"browserName\\\\\\": \\\\\\"${config["nodes"][i].browserName}\\\\\\", \\\\\\"browserVersion\\\\\\": \\\\\\"${config["nodes"][i].version}\\\\\\"}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                await exec(`java -jar ${config.path}selenium-server.jar node --port ${config["nodes"][i].port} --config ${config.path}config/${config["nodes"][i].driverName}-node.toml &`);
                await sleep(2000);
                console.log(`INFO - ${config["nodes"][i].driverName} node has been added : {"browserName": "${config["nodes"][i].browserName}","platformName": "${platform}"} ${config["nodes"][i].sessions} times`);
            };
        };
        if(config["nodes"][list-1].active === true && platform === "macos"){
            await exec(`sed -i -e 's/'max-sessions'=.*/'max-sessions'='${config["nodes"][list-1].sessions}'/g' ${config.path}config/${platform}/${config["nodes"][list-1].driverName}-node.toml`);
            await exec(`java -jar ${config.path}selenium-server.jar node --port ${config["nodes"][list-1].port} --config ${config.path}config/${config["nodes"][list-1].driverName}-node.toml &`);
            await sleep(2000);
            console.log(`INFO - ${config["nodes"][list-1].driverName} node has been added : {"browserName": "${config["nodes"][list-1].browserName}","platformName": "${platform}"} ${config["nodes"][list-1].sessions} times`)
        }        
        while (await status.checkSeleniumStatus() != true) {
            await sleep(200);
        };
        console.log('\x1b[36m%s\x1b[0m', `-> selenium started : ${config.hostname}:${config.hubPort}/ui/index.html`);
    }
    catch (error) {
        console.log(error);
    };
};

module.exports = { start }