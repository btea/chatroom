/**
 * Created by zz on 2017/5/6.
 */
//var http=require('http'),
//    express=require('express'),
//    server=http.createServer(function(req,res){
//        res.writeHead(200,{'Content-Type':'text/html'});
//        res.write('<h1>世界你好！</h1>');
//        res.end();
//    });
//server.listen(8080);
//console.log('server started');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = []  //保存所有在线用户的昵称
    ;
app.use('/' , express.static(__dirname + '/chart'));
//socket部分
io.on('connection' , function(socket){
    //接收并处理客户端发送的foo事件
    socket.on('foo' , function(data){
        console.log(data);
    });
    socket.on('login' , function(nickname){
        if(users.indexOf(nickname) > -1){
            socket.emit('nickExisted');
        }else{
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system' , nickname , users.length , 'login');//向所有连接到服务器的用户端发送登录用户昵称
        }
    });
    //需要解释一下的是，在connection事件的回调函数中，
    // socket表示的是当前连接到服务器的那个客户端。
    // 所以代码socket.emit(‘foo’)则只有自己收得到这个事件，
    // 而socket.broadcast.emit(‘foo’)则表示向除自己外的所有人发送该事件，
    // 另外，上面代码中，io表示服务器整个socket连接，
    // 所以代码io.sockets.emit(‘foo’)表示所有人都可以收到该事件。

    //同时再添加一个用户离开的事件，这个可以通过socket.io自带的disconnect事件完成，当一个用户断开连接，disconnect事件就会触发。
    // 在这个事件中，做两件事情，一是将用户从users数组中删除，一是发送一个system事件通知所有人’某某离开了聊天室’。
    socket.on('disconnect',function(){
        //将断开连接的用户从users中删除
        users.splice(socket.userIndex , 1);
        //通知除自己以外的所有人
        socket.broadcast.emit('system' , socket.nickname , users.length , 'logout');
    });
    //接收消息
    socket.on('postMsg' , function(msg){
        //把消息发送到除自己外所有客户端
        socket.broadcast.emit('newMsg' , socket.nickname,msg);
    });

    //接收用户发来的图片
    socket.on('img' , function(imgData){
        //通过一个newImage事件将图片发送到除自己之外的每一个人
        socket.broadcast.emit('newImg' , socket.nickname , imgData);
    });

});
server.listen(8080);
console.log('server started');


