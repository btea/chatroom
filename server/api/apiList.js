const dataOpe = require('../dataOpe');
const resDeal = require('./util');
const list = require('./collectionList');

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

    dataOpe.addData(list.db, list.collections.userList, params).then(val => {
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
    dataOpe.searchData(list.db, list.collections.userList, params).then(resultObj => {
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
 * @desc 搜索用户
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {object} params.word 搜索关键词信息
 * @return {void}
 */
async function searchByName(req, res, params) {
    if (params) {
        params = JSON.parse(params);
    }
    const users = dataOpe.searchData(list.db, list.collections.userList, {
        nickname: params.word
    });
    const { status } = users;
    if (status === 'fail') {
        resDeal.failureRes(res, '搜索用户失败');
        return;
    }
    const result = users.result || [];
    resDeal.successRes(res, {
        code: 200,
        data: result
    });
}

/**
 * @desc 添加好友
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {object}
 * params.id用户id, params.name用户名,
 * params.friendId需要添加好友的用户id, params.friendName被添加好友用户名
 * @return {void}
 */
function addFriend(req, res, params) {
    if (params) {
        params = JSON.parse(params);
    }
    const ope = [
        {
            id: params.id,
            friendId: params.friendId,
            friendName: params.friendName,
            type: 'ADD',
            status: 'SENT'
        },
        {
            id: params.friendId,
            friendId: params.id,
            friendName: params.name,
            type: 'REQADD',
            status: 'REVEIVE'
        }
    ];
    const record = dataOpe.addData(list.db, list.collections.userOperationRecord, ope);
    const { status } = record;
    if (status === 'fail') {
        resDeal.failureRes(res, '添加好友失败');
        return;
    }
    resDeal.successRes(res, {
        code: 200,
        data: null
    });
}

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
async function getFriendList(req, res, params) {
    if (params) {
        params = JSON.parse(params);
    }
    const friendsInfo = await dataOpe.searchData(list.db, list.collections.userFriends, {
        id: Number(params.id)
    });
    const { status } = friendsInfo;
    if (status === 'fail') {
        resDeal.failureRes(res, '获取好友信息失败');
        return;
    }
    let list = friendsInfo.result;
    let info = { code: 200, data: [] };
    if (list.length) {
        list = list.map(item => item.friend);
        let friends = await dataOpe.searchData(list.db, list.collections.userList, {
            id: { $in: list }
        });
        if (friends.status === 'fail') {
            resDeal.failureRes(res, '获取好友信息失败');
            return;
        }
        info.data = friends.result;
        resDeal.successRes(res, info);
    } else {
        resDeal.successRes(res, info);
    }
}

/**
 * @desc 保存聊天信息
 * @param {object} params 用户id信息
 * @return {void}
 * @note 这个方法在socket接收到聊天信息的时候进行调用保存
 */
async function saveMessage(params) {
    if (typeof params === 'string') {
        params = JSON.parse(params);
    }
    const from = params.from.id;
    const to = params.to.id;
    if (from > to) {
        params.ids = `${to}-${from}`;
    } else {
        params.ids = `${from}-${to}`;
    }
    const info = dataOpe.addData(list.db, list.collections.chatRecord, [params]);
    const { status } = info;
    if (status === 'fail') {
        console.log('保存失败');
        return;
    }
    console.log('保存成功');
}

/**
 * @desc 查询聊天记录
 * @param {object} params 需要查询的双方信息，用户ids或者房间号
 * @return {void}
 */
async function searchMessage(req, res, params) {
    params = JSON.parse(params);
    const info = await dataOpe.searchData(list.db, list.collections.chatRecord, {
        ids: params.ids
    });
    const { status } = info;
    if (status === 'fail') {
        resDeal.failureRes(res, '获取聊天记录失败');
        return;
    }
    const { result } = info;
    resDeal.successRes(res, {
        code: 200,
        data: result
    });
}

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
    '/getFriendList': getFriendList,
    saveMessage,
    '/searchMessage': searchMessage,
    404: notFound
};
