const config = require('../config/config');
const fs = require('fs-extra');
const utils = require('./utils');

const updateDriver = async (driverName, url, platform) => {
    try {
        const extension = driverName === "geckodriver" && platform != "windows" ? '.tar.gz' : '.zip';
        utils.shellExec(`sh ${config.path}lib/drivers.sh ${url} ${driverName} ${extension} ${config.path}`);
        console.log("[" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)+"] "+'\033[34m'+'info'+'\033[37m'+` download and extract ${driverName} from : ${url} ...`);
    }
    catch (error) {
        return false;
    };
};

const updateDrivers = async () => {
    try {
        const platform = await utils.getPlatform();
        await updateDriver('chromedriver', config.update.chromedriver[platform], platform);
        await updateDriver('msedgedriver', config.update.msedgedriver[platform], platform);
        await updateDriver('geckodriver', config.update.geckodriver[platform], platform);
    }
    catch (error) {
        return error;
    };
};

const install = async () => {
    try {
        await fs.existsSync(`${config.path}drivers`) ? utils.shellExec(`sh ${config.path}lib/clear.sh "drivers/*" ${config.path}`) : fs.mkdirSync(`${config.path}drivers`);
        await fs.existsSync(`${config.path}tmp`) ? utils.shellExec(`sh ${config.path}lib/clear.sh "tmp/*" ${config.path}`) : fs.mkdirSync(`${config.path}tmp`);
        await updateDrivers();
    }
    catch (error) {
        return error;
    };
};

module.exports = {
    install
}
