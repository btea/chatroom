/**
 * 链接数据库
 * @param name {string} 数据库的名字
 */
// let DataStore = require('nedb');
const { MongoClient } = require('mongodb');
function linkStart(name) {
    if (!name) {
        throw Error('请输入有效的数据库名字');
    }
    if (typeof name !== 'string') {
        throw TypeError('参数 name 应该为一个字符串');
    }
    const url = 'mongodb://localhost:2233';
    const client = new MongoClient(url);
    return client;
    // return new DataStore({ filename: `./info/${name}`, autoload: true });
}

module.exports = linkStart;
