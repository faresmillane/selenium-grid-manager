const axios = require("axios").default;
const config = require('../config/config')

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

module.exports = {
    checkSeleniumStatus
};