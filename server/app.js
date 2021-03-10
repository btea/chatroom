// import { createServer } from 'http';
// import socket from 'socket.io';

const webSocketServer = require('ws').Server;
let wsServer = new webSocketServer({ port: 2333 });
wsServer.on('connection', function (socket) {
    socket.on('message', evt => {
        console.log(evt);
    });
    socket.send('有求皆苦，无欲则刚');
});
