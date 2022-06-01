const clear = require("./clear");
const utils = require("./utils");
const config = require('../config/config');
let extension = '';

const server = async () => {
    try {
        const list = config["nodes"].length;
        const platform = await utils.getPlatform();
        if (platform === "windows") { extension = '.exe' }
        await clear.clearAvailabilityPorts();
        await utils.sleep(2000);
        await utils.shellExec(`chmod 777 ${config.path}drivers/chromedriver ${config.path}drivers/geckodriver ${config.path}drivers/msedgedriver`);
        console.log("[" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+"] "+'\033[34m'+'info'+'\033[37m'+` starting registration process ${config.hostname}:${config.hubPort}`);
        await utils.shellExec(`java -jar ${config.path}selenium-server.jar hub --port ${config.hubPort} &`)
        await utils.sleep(2000);
        for (let i = 0; i < list-1; i++) {
            if(config["nodes"][i].active === true){
                await utils.shellExec(`sed -i -e 's/'max-sessions'=.*/'max-sessions'='${config["nodes"][i].sessions}'/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                if(process.env.ENV === 'DEV') {
                    await utils.shellExec(`sed -i -e 's/'webdriver-executable'=.*/'webdriver-executable'=".\\/drivers\\/${config["nodes"][i].driverName}${extension}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                } else {
                    await utils.shellExec(`sed -i -e 's/'webdriver-executable'=.*/'webdriver-executable'=".\\/node_modules\\/selenium-grid-manager\\/drivers\\/${config["nodes"][i].driverName}${extension}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                }
                await utils.shellExec(`sed -i -e 's/'stereotype'=.*/'stereotype'="{\\\\\\"browserName\\\\\\": \\\\\\"${config["nodes"][i].browserName}\\\\\\", \\\\\\"browserVersion\\\\\\": \\\\\\"${config["nodes"][i].version}\\\\\\"}"/g' ${config.path}config/${config["nodes"][i].driverName}-node.toml`);
                await utils.shellExec(`java -jar ${config.path}selenium-server.jar node --port ${config["nodes"][i].port} --config ${config.path}config/${config["nodes"][i].driverName}-node.toml &`);
                await utils.sleep(2000);
                console.log("[" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+"] "+'\033[34m'+'info'+'\033[37m'+` ${config["nodes"][i].driverName} node has been added : {"browserName": "${config["nodes"][i].browserName}","platformName": "${platform}"} ${config["nodes"][i].sessions} times`);
            };
        };
        if(config["nodes"][list-1].active === true && platform === "macos"){
            await utils.shellExec(`sed -i -e 's/'max-sessions'=.*/'max-sessions'='${config["nodes"][list-1].sessions}'/g' ${config.path}config/${config["nodes"][list-1].driverName}-node.toml`);
            await utils.shellExec(`java -jar ${config.path}selenium-server.jar node --port ${config["nodes"][list-1].port} --config ${config.path}config/${config["nodes"][list-1].driverName}-node.toml &`);
            await utils.sleep(2000);
            console.log(new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+'\033[34m'+'info'+'\033[37m'+` ${config["nodes"][list-1].driverName} node has been added : {"browserName": "${config["nodes"][list-1].browserName}","platformName": "${platform}"} ${config["nodes"][list-1].sessions} times`)
        }        
        while (await utils.checkSeleniumStatus() != true) {
            await utils.sleep(200);
        };
        console.log("[" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+"] "+'\033[34m'+'info'+'\x1b[36m%s\x1b[0m', ` -> selenium started : ${config.hostname}:${config.hubPort}/ui/index.html`);
    }
    catch (error) {
        console.log(error);
    };
};

module.exports = { server }