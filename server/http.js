const http = require('http');
const url = require('url');
const getAddress = require('./getAddress');
const api = require('./api');
const { saveMessage } = require('./api/apiList');

const server = http.createServer();
const webSocketServer = require('ws').Server;
let wsServer = new webSocketServer({ noServer: true });

const clientsInfo = new WeakMap();
wsServer.on('connection', function (socket, req) {
    let id = req.url.split('=')[1];
    if (id) {
        clientsInfo.set(socket, id);
    }
    socket.on('message', function incoming(message) {
        message = JSON.parse(message);
        if (typeof message !== 'object') {
            const info = { error: '消息类型有问题' };
            socket.send(JSON.stringify(info));
        } else {
            messageDeal(message);
        }
    });
    const init = { start: 'link' };
    socket.send(JSON.stringify(init));
});
wsServer.on('close', function (socket) {
    clientsInfo.delete(socket);
});
wsServer.on('error', function (socket) {
    clientsInfo.delete(socket);
});

server.on('upgrade', function (request, socket, head) {
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
        wsServer.emit('connection', ws, request);
    });
});
server.on('request', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Expose-Headers', '*');
    api(request, response);
});
server.listen(2233, function () {
    console.log(`项目已经启动: http://${getAddress.getIp()}:2233`);
});

// 单聊信息处理
function messageDeal(message) {
    const { to } = message;
    // saveMessage(message).then(res => {
    //     console.log('保存成功');
    // });
    wsServer.clients.forEach(ws => {
        if (clientsInfo.has(ws)) {
            let _id = clientsInfo.get(ws);
            if (_id == to.id) {
                ws.send(JSON.stringify(message));
            }
        }
    });
}
