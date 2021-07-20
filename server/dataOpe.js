const { MongoClient } = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017';

/**
 * CRUD
 * C: Create(添加)
 * R: Retrieve(检索)
 * U: Update(更新)
 * D: Delete(删除)
 */

/**
 * @desc 连接数据库
 * @param name {string} 数据库的名字
 * @return {Promise} 返回一个promise，对连接结果进行处理
 */
function linkStart(name) {
    if (!name) {
        throw Error('请输入有效的数据库名字');
    }
    if (typeof name !== 'string') {
        throw TypeError('参数 name 应该为一个字符串');
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject({ msg: `连接数据库 ${name} 失败`, client });
                return;
            }
            assert.equal(null, err);
            const db = client.db(name);
            resolve({ db, client });
        });
    });
}

/***
 * @desc 往数据库添加数据
 * @param name {string} 数据库名字
 * @param table {string} collection名字
 * @param params {{[key: string]: unknown}} 添加参数
 * @returns {Promise} 返回一个promise，对添加结果进行处理
 */

function addData(name, table, params) {
    name = name || 'wetalk';
    table = table || 'userInfo';
    params = params || [{}];
    return new Promise(resolve => {
        linkStart(name)
            .then(linkObj => {
                const { db, client } = linkObj;
                const collection = db.collection(table);
                collection.insertMany(params, function (err, result) {
                    let data;
                    if (err) {
                        data = { status: 'fail', msg: '添加数据失败', err };
                    } else {
                        data = { status: 'success', msg: '添加数据成功', result };
                    }
                    client.close();
                    resolve(data);
                    // assert.equal(null, err);
                    // assert.equal(1, result.result.n);
                    // assert.equal(1, result.ops.length);
                });
                // collection
            })
            .catch(err => {
                if (err.client) {
                    err.client.close();
                }
                resolve({ status: 'fail', msg: '添加数据失败', err });
            });
    });
}

/**
 * @desc 根据传入的数据库名字、表名以及查询条件进行查询
 * @param name {string} 数据库名字
 * @param table {string} collection名字
 * @param params {{[key: string]: unknown}} 查询参数
 * @returns {Promise} 返回一个promise，对查询结果进行处理
 */
function searchData(name, table, params) {
    name = name || 'wetalk';
    table = table || 'userInfo';
    params = params || {};
    return new Promise((resolve, reject) => {
        linkStart(name)
            .then(linkObj => {
                const { db, client } = linkObj;
                const collection = db.collection(table);
                collection.find(params).toArray(function (err, docs) {
                    let data;
                    if (err) {
                        data = { status: 'fail', msg: '查找数据失败', err };
                    } else {
                        data = { status: 'success', msg: '查找数据成功', result: docs };
                    }
                    client.close();
                    resolve(data);
                });
            })
            .catch(err => {
                if (err.client) {
                    err.client.close();
                }
                resolve({ status: 'fail', msg: '查找数据失败', err });
            });
    });
}

/***
 * @desc 根据传入的数据库名字、表名以及参数对数据更新更新
 * @param name {string} 数据库名字
 * @param table {string} collection名字
 * @param oldParams {{[key: string]: unknown}} 需要被修改的参数
 * @param newParams {{[key: string]: unknown}} 被设置的新的参数
 * @returns {Promise} 返回一个promise，对更新结果进行处理
 */
function updateData(name, table, oldParams, newParams) {
    name = name || 'wetalk';
    table = table || 'userInfo';
    oldParams = oldParams || {};
    newParams = newParams || {};
    return new Promise((resolve, reject) => {
        linkStart(name)
            .then(linkObj => {
                const { db, client } = linkObj;
                const collection = db.collection(table);
                collection.updateOne(oldParams, { $set: newParams }, function (err, result) {
                    let data;
                    if (err) {
                        data = { status: 'fail', msg: '修改数据失败', err };
                    } else {
                        data = { status: 'success', msg: '修改数据成功', result };
                    }
                    client.close();
                    resolve(data);
                });
            })
            .catch(err => {
                if (err.client) {
                    err.client.close();
                }
                resolve({ status: 'fail', msg: '修改数据失败', err });
            });
    });
}

/***
 * @desc 根据传入的数据库名字、表名以及参数对数据进行删除
 * @param name {string} 数据库名字
 * @param table {string} collection名字
 * @param params {{[key: string]: unknown}} 需要被删除的参数
 * @returns {Promise} 返回一个promise，对删除结果进行处理
 */
function deleteData(name, table, params) {
    name = name || 'wetalk';
    table = table || 'userInfo';
    params = params || {};
    return new Promise(resolve => {
        linkStart(name)
            .then(linkObj => {
                const { db, client } = linkObj;
                const collection = db.collection(table);
                collection.deleteOne(params, function (err, result) {
                    let data;
                    if (err) {
                        data = { status: 'fail', msg: '删除数据失败', err };
                    } else {
                        data = { status: 'success', msg: '删除数据成功', result };
                    }
                    client.close();
                    resolve(data);
                });
            })
            .catch(err => {
                if (err.client) {
                    err.client.close();
                }
                resolve({ status: 'fail', msg: '删除数据失败', err });
            });
    });
}

module.exports = {
    linkStart,
    addData,
    searchData,
    updateData,
    deleteData
};
