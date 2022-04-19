const axios = require("axios").default;
const config = require('../config/config');
const { exec } = require('child_process');

const checkSeleniumStatus = async () => {
    try {
        const response = await axios.get(`${config.hostname}:${config.hubPort}/status`);
        if (response.status === 200 && response.data.value.ready === true && response.data.value.nodes) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        return false;
    };
};

const shellExec = async (command) => {
    try {
        await exec(command, (error) => {
            if (error) {
                console.error('\x1b[31m', `exec error: ${error}`);
                return;
            };
        });
    }
    catch (error) {
        throw Error;
    };
};

const sleep = async (milliseconds) => {
    try {
        return await new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    catch (error) {
        throw Error;
    };
};

const getPlatform = async () => {
    try {
        var platform;
        if (process.platform === "win32" || process.platform === "win64") {
            platform = "windows"
        } else if (process.platform === "linux"){
            platform = "linux"
        } else {
            platform = "macos"
        }
        return platform;
    }
    catch (error) {
        console.error(`Error: ${error}`);
    };
};

module.exports = {
    checkSeleniumStatus,
    shellExec,
    sleep,
    getPlatform
};