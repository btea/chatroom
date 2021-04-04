// import { createServer } from 'http';
// import socket from 'socket.io';

const webSocketServer = require('ws').Server;
let wsServer = new webSocketServer({ port: 2333 });
let clients = [];
wsServer.on('connection', function (socket) {
    // console.log(socket);
    clients.push(socket);
    socket.on('message', evt => {
        // socket.send('2233: ' + evt);
        responseMsg(evt);
    });
    socket.send('有求皆苦，无欲则刚');
});

function responseMsg(msg) {
    clients.forEach(ws => {
        ws.send(msg);
    });
}
