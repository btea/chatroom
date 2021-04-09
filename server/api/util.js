/**
 * 成功响应
 */
function successRes(res, msg) {
    const params = {
        code: 1,
        msg
    };
    res.end(JSON.stringify(params));
}

/**
 * 失败响应
 */
function failureRes(res, msg) {
    const params = {
        code: 1,
        msg
    };
    res.end(JSON.stringify(params));
}

module.exports = {
    successRes,
    failureRes
};
