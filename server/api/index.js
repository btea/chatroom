const list = require('./apiList');

/**
 * 解析请求参数
 * @param req 请求实例
 * @param res 响应实例
 */
function parseParams(req, res) {
    let { url, method } = req;
    method = method.toLowerCase();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    let params = '';
    if (method === 'get') {
        [url, params] = url.split('?');
        const obj = {};
        params.split('&').map(kv => {
            const [k, v] = kv.split('=');
            obj[k] = v;
        });
        params = JSON.stringify(obj);
        let handle = list[url];
        if (!handle) {
            handle = list['404'];
        }
        handle(req, res, params);
        return;
    }

    req.on('data', chunk => {
        params += chunk;
    });
    req.on('end', () => {
        let handle = list[url];
        if (!handle) {
            handle = list['404'];
        }
        handle(req, res, params);
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
