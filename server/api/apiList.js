const dataOpe = require('../dataOpe');
const resDeal = require('./util');
const collectionNames = require('./collectionList');

/**
 * 返回各个接口处理情况的具体操作
 */

/**
 * @desc 返回默认的接口请求数据
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {object} 请求参数
 * @return {void}
 */
function defaultResponse(req, res, params) {
    const content = 'hello world';
    res.end(content);
}

/**
 * @desc 没有找到对应的请求路径时处理返回
 * @param req {Request} 请求主体
 * @param res {Response} 响应对象
 * @param params {object} 请求参数
 * @return {void}
 */
function notFound(req, res, params) {
    params = {
        code: 404,
        msg: '该请求接口不存在。'
    };
    res.end(JSON.stringify(params));
}

/**
 * @desc 注册账号接口
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {string} 注册相关参数
 * @return {void}
 */
function registerUser(req, res, params) {
    if (params) {
        params = JSON.parse(params);
        params = Object.assign({ sign: '天空高远，大风吟唱~' }, params);
    }

    dataOpe.addData(collectionNames.db, collectionNames.collections.userList, params).then(val => {
        const { status } = val;
        if (status === 'success') {
            resDeal.successRes(res, {
                code: 200,
                msg: '注册成功'
            });
        } else {
            resDeal.failureRes(res, '注册失败');
        }
    });
}

/**
 * @desc 用户登录
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {object} 注册相关参数
 * @return {void}
 */
function login(req, res, params) {
    if (params) {
        params = JSON.parse(params);
    }
    dataOpe
        .searchData(collectionNames.db, collectionNames.collections.userList, params)
        .then(resultObj => {
            const { status, result } = resultObj;
            if (status === 'success') {
                let info = {
                    code: 200,
                    data: result[0]
                };
                if (!info.data) {
                    info.code = -1;
                    info.data = {
                        msg: '该用户不存在'
                    };
                }
                resDeal.successRes(res, info);
            } else {
                resDeal.failureRes(res, '登录失败');
            }
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
 * @desc 获取好友列表
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {object} 用户id信息
 * @return {void}
 */
function getFriendsList(req, res, params) {}

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
