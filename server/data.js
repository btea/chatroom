/**
 * https://github.com/louischatriot/nedb
 *
 */

let DataStore = require('nedb');
let db = new DataStore({ filename: './info/userInfo', autoload: true });

// 添加/保存信息
function addInfo(info) {
    return new Promise(function (resolve, reject) {
        db.insert(info, function (err, newDoc) {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
                console.log(newDoc);
            }
        });
    });
}

// 删除信息
function removeInfo(info) {
    return new Promise(function (resolve, reject) {
        // db.remove(info, {multi: true}) 删除多条
        db.remove(info, {}, function (err, numRemoved) {
            if (err) {
                reject(err);
            } else {
                resolve(numRemoved);
            }
        });
    });
}

// 搜索/查询信息
function searchInfo(condition) {
    return new Promise(function (resolve, reject) {
        db.find(condition, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

// 更新信息
function updateInfo(info) {
    return new Promise(function (resolve, reject) {
        db.update(info, function (err, numReplaced) {
            if (err) {
                reject(err);
            } else {
                resolve(numReplaced);
            }
        });
    });
}

module.exports = {
    addInfo,
    removeInfo,
    updateInfo,
    searchInfo
};
