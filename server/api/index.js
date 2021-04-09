const list = require('./apiList');

/**
 * 解析请求参数
 * @param req 请求实例
 * @param res 响应实例
 */
function parseParams(req, res) {
    const { url } = req;
    let params = '';
    req.on('data', chunk => {
        params += chunk;
    });
    req.on('end', () => {
        // console.log(params);
        list[url](params, res);
    });
}

/**
 * 注册账户
 * @param name 用户名
 * @param avatar 用户头像
 * @param id 用户id、用来通信的标识
 */
// function startSign(name, avatar, id) {}

module.exports = parseParams;
