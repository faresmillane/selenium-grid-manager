const config = require('../config/config');
const fs = require('fs-extra');
const clear = require("./clear");
const { exec } = require('child_process');

const updateDriver = async (driverName, url, platform) => {
    try {
        const extension = driverName === "geckodriver" && platform != "windows" ? '.tar.gz' : '.zip'
        await exec(`sh ${config.path}lib/drivers.sh ${url} ${driverName} ${extension} ${config.path}`);
        console.log(`INFO - download and extract ${driverName} from : ${url} ...`);
    }
    catch (error) {
        return false;
    };
};

const updateDrivers = async () => {
    try {
        const platform = await clear.getPlatform();
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
        await fs.existsSync(`${config.path}drivers`) ? exec(`sh ${config.path}lib/clear.sh "drivers/*" ${config.path}`) : fs.mkdirSync(`${config.path}drivers`);
        await fs.existsSync(`${config.path}tmp`) ? exec(`sh ${config.path}lib/clear.sh "tmp/*" ${config.path}`) : fs.mkdirSync(`${config.path}tmp`);
        await updateDrivers();
    }
    catch (error) {
        return error;
    };
};

module.exports = {
    install
}
