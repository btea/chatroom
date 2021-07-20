/**
 * 对请求主体以及响应主体进行统一处理
 */

/**
 * 成功响应
 */
function successRes(res, params) {
    params = params || {
        code: 1,
        msg: 'ok'
    };
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(JSON.stringify(params));
}

/**
 * 失败响应
 */
function failureRes(res, msg) {
    const params = {
        code: -1,
        msg
    };
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(JSON.stringify(params));
}

module.exports = {
    successRes,
    failureRes
};
