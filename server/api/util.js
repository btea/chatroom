/**
 * 对请求主体以及响应主体进行统一处理
 */

/**
 * @desc 请求成功处理响应
 * @param {Response} res 响应主体
 * @param {object} params 响应数据
 * @return {void}
 */
function successRes(res, params) {
    params = params || {
        code: 1,
        msg: 'ok'
    };
    res.end(JSON.stringify(params));
}

/**
 * @desc 请求失败处理响应
 * @param {Response} res 响应主体
 * @param {string} msg 响应说明信息
 * @return {void}
 */
function failureRes(res, msg) {
    const params = {
        code: -1,
        msg
    };
    res.end(JSON.stringify(params));
}

module.exports = {
    successRes,
    failureRes
};
