const http = require('http');
const url = require('url');
const api = require('./api');

const server = http.createServer();
const webSocketServer = require('ws').Server;
let wsServer = new webSocketServer({ noServer: true });

const clientsInfo = new WeakMap();
wsServer.on('connection', function (socket, req) {
    clientsInfo.set(socket);
    let id = req.url.split('=')[1];
    socket.on('message', function incoming(message) {
        message = JSON.parse(message);
        if (typeof message !== 'object') {
            socket.send('消息类型有问题');
        } else {
            messageDeal(message);
        }
    });
    socket.send('linked');
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
    api(request, response);
});
server.listen(2233);

// 单聊信息处理
function messageDeal(message) {
    const { type, from, to, content } = message;
    wsServer.clients.forEach(ws => {
        if (clientsInfo.has(ws)) {
            // let _id = clientsInfo.get(ws);
            // if (_id == to) {
            ws.send(JSON.stringify(message));
            // }
        }
    });
}
