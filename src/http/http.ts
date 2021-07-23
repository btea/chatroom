import request from './api';

interface params {
    [key: string]: string | number;
}

/**
 * @desc 用户登录
 * @param {object} params 用户登录信息，用户名和头像
 * @return {Promise}
 */
export function login(params: params): Promise<unknown> {
    return request({
        url: '/login',
        method: 'post',
        data: params
    });
}

/**
 * @desc 用户注册
 */
export function register(params: params): Promise<unknown> {
    return request({
        url: '/register',
        method: 'post',
        data: params
    });
}

/**
 * @desc 获取用户好友信息
 */
export function getFriendList(params: params): Promise<unknown> {
    return request({
        url: `/getFriendList?id=${params.id}`,
        method: 'get'
    });
}

/**
 * @desc 获取聊天记录
 * @param {object} params 查询条件
 * @param {string} params.ids 通信双方id组合
 */
export function searchMessage(params: params): Promise<unknown> {
    return request({
        url: `/searchMessage?msgId=${params.ids}`,
        method: 'get'
    });
}
