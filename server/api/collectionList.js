module.exports = {
    db: 'wetalk',
    collections: {
        userNum: 'userNum', // 用来保存当前最新id
        userList: 'userList', // 存储用户信息
        userFriends: 'userFriends', // 用户好友表
        userOperationRecord: 'userOperationRecord', // 用户操作记录
        roomInfo: 'roomInfo', // 群信息
        friendLastChat: 'friendLastChat', // 最后一次聊天记录
        chatRecord: 'chatRecord' // 聊天记录
    }
};
