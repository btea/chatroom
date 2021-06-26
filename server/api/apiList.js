const startLink = require('../linkdb');
const dataDeal = require('../data');
const resDeal = require('./util');

/**
 * 返回默认的接口请求数据
 * @param params 请求参数
 * @param res 响应对象
 */
function defaultResponse(params, res) {
    const content = 'hello world';
    res.end(content);
}

/**
 * 没有找到对应的请求路径时处理返回
 * @param params 请求参数
 * @param res 响应对象
 */
function notFound(params, res) {
    params = {
        code: 404,
        msg: '该请求接口不存在。'
    };
    res.end(JSON.stringify(params));
}

/**
 * 注册账号接口
 */
function registerUser(params, res) {
    if (params) {
        params = JSON.parse(params);
        params = Object.assign({ sign: '天空高远，大风吟唱~' }, params);
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
 * 修改用户密码、用户名不能修改
 */
function editUserPwd(params, res) {}

/**
 * 修改用户昵称、签名、背景图片等等
 */
function editUserInfo(params, res) {}

/**
 * 添加好友接口
 * @param params {object}
 * @param params.name 用户名
 */
function addFriend(params, res) {}

/**
 * 通过添加好友请求接口
 */
function agreeFriend(params, res) {}

/**
 * 拒绝好友请求接口
 */
function refuseFreind(params, res) {}

/**
 * 获取好友列表接口
 */
function getFriendsList(params, res) {}

/**
 * 获取进行操作的列表接口，比如添加好友。。。
 */
function getOperations(params, res) {}

/**
 * 获取已经添加的群聊的接口
 */
function getChatRoomList(params, res) {}

/**
 * 通过房间id获取群的相关信息
 */
function getChatRoomInfo(params, id) {}
/**
 * 通过房间id获取房间名、说明等信息
 */
function getChatRoomMsg(params, res) {}
/**
 * 通过房间id获取相应成员信息（头像，名字等）
 */
function getChatRoomMember(params, res) {}

module.exports = {
    '/': defaultResponse,
    '/register': registerUser,
    '/login': login,
    404: notFound
};
