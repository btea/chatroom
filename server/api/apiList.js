const startLink = require('../linkdb');
const dataDeal = require('../data');
const resDeal = require('./util');

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
function registerUser(params, res) {
    if (params) {
        params = JSON.parse(params);
    }
    const db = startLink('userInfo');

    dataDeal.searchInfo(db, params).then(val => {
        if (val && val.length) {
            resDeal.successRes(res, '该用户已被注册');
            return;
        }
        dataDeal
            .addInfo(db, params)
            .then(val => {
                resDeal.successRes(res, '注册成功');
            })
            .catch(err => {
                resDeal.failureRes(res, '注册失败');
            });
    });
}

/**
 * 登录修改
 */
function login(params, res) {
    if (params) {
        params = JSON.parse(params);
    }
    const db = startLink('userInfo');
    dataDeal
        .searchInfo(db, params)
        .then(val => {
            console.log(val);
            if (!val.length) {
                resDeal.successRes(res, '该用户未注册');
            } else {
                resDeal.successRes(res, '登录成功');
            }
        })
        .catch(err => {
            resDeal.failureRes(res, '登录失败');
        });
}

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
    '/': defaultResponse,
    '/register': registerUser,
    '/login': login
};
