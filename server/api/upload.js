const { writeFile } = require('fs');
const { resolve } = require('path');

/**
 * @desc 对上传的文件进行格式处理
 * @param req {Request} 请求主体
 * @param res {Response} 响应主体
 * @param params {string} 参数拼接的字符串
 */
function uploadFile(req, res, params) {
    let boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
    // 按照分解符切分
    const list = params.split(boundary);
    let contentType = '';
    let fileName = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes('Content-Disposition')) {
            const data = list[i].split('\r\n');
            for (let j = 0; j < data.length; j++) {
                // 从头部拆分出名字和类型
                if (data[j].includes('Content-Disposition')) {
                    const info = data[j].split(':')[1].split(';');
                    fileName = info[info.length - 1].split('=')[1].replace(/"/g, '');
                }
                if (data[j].includes('Content-Type')) {
                    contentType = data[j];
                }
            }
        }
    }
    // 去除前面的请求头
    const start = params.toString().indexOf(contentType) + contentType.length + 4; // 有多\r\n\r\n
    const startBinary = params.toString().substring(start);
    const end = startBinary.indexOf('--' + boundary + '--') - 2; // 前面有多\r\n
    // 去除后面的分隔符
    const binary = startBinary.substring(0, end);
    const bufferData = Buffer.from(binary, 'binary');
    // writeFile(resolve(__dirname, `./image/${fileName}`), bufferData, err => {
    //     if (err) {
    //     }
    // });
}
