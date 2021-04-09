/**
 * 返回默认的接口请求数据
 * @param params 请求参数
 * @param res 相应对象
 */
function defaultResponse(params, res) {
    const content = 'hello world';
    res.end(content);
}

/**
 * 注册账号接口
 */

/**
 * 登录修改
 */

/**
 * 修改用户名、密码
 */

/**
 * 修改用户昵称、签名、背景图片等等
 */

/**
 * 添加好友接口
 */

/**
 * 通过添加好友请求接口
 */

/**
 * 拒绝好友请求接口
 */

/**
 * 获取好友列表接口
 */

/**
 * 获取进行操作的列表接口，比如添加好友。。。
 */

/**
 * 获取已经添加的群聊的接口
 */

/**
 * 通过房间id获取群的相关信息
 */

/**
 * 通过用户id查询用户相关信息
 */

module.exports = {
    '/': defaultResponse
};
