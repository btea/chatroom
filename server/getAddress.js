const os = require('os');

function getIp() {
    let WLAN, info;
    try {
        info = os.networkInterfaces();
        if (process.platform === 'win32') {
            WLAN = info.WLAN;
        } else if (process.platform === 'darwin') {
            WLAN = info.en0;
        } else {
            WLAN = info.eth0;
        }
    } catch (error) {
        console.log('获取ip失败');
        throw Error(error);
    }
    if (WLAN) {
        for (let i = 0; i < WLAN.length; i++) {
            if (WLAN[i].family === 'IPv4') {
                return WLAN[i].address || '';
            }
        }
    }
}

module.exports = {
    getIp
};
