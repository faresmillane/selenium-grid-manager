
const { exec } = require('child_process');
const config = require('../config/config')

const clearWindowsAvailabilityPorts = async () => {
    try {
        for (let i = 0; i < config["ports"].length; i++) {
            await exec(`netstat -ano | findStr "0.0.0.0:${config["ports"][i]}" | awk "{print $5}" | head -n 1`, (error, stdout) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return;
              } if (stdout) {
                exec(`taskkill /F /PID ${stdout}`, (error) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    };
                    console.log(`INFO - port ${config["ports"][i]} is used, we close this process ...`);
                });
              };
            });
        };
    }
    catch (error) {
        console.error(`clear Windows Availability Ports Error: ${error}`);
    };
};

const clearLinuxAvailabilityPorts = async () => {
    try {
        for (let i = 0; i < config["ports"].length; i++) {
            await exec(`lsof -i :${config["ports"][i]} | grep "LISTEN" | awk '{print $2}'`, (error, stdout) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return;
              } if (stdout) {
                exec(`kill -9 ${stdout}`, (error) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    };
                    console.log(`INFO - port ${config["ports"][i]} is used, we close this process ...`);
                });
              };
            });
        };
    }
    catch (error) {
        console.error(`clear Windows Availability Ports Error: ${error}`);
    };
};

const clearAvailabilityPorts = async () => {
    try {
        console.log("INFO - check availability to start selenium ...");
        if (process.platform === "win32") {
            await clearWindowsAvailabilityPorts();
        } else {
            await clearLinuxAvailabilityPorts();
        };
    }
    catch (error) {
        console.error(`clear Windows Availability Ports Error: ${error}`);
    };
};

const getPlatform = async () => {
    try {
        var platform;
        if (process.platform === "win32") {
            platform = "windows"
        } else {
            platform = "linux"
        };
        return platform;
    }
    catch (error) {
        console.error(`Error: ${error}`);
    };
};

module.exports = {
    clearWindowsAvailabilityPorts,
    clearLinuxAvailabilityPorts,
    clearAvailabilityPorts,
    getPlatform
}