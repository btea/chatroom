/**
 * Created by zz on 2017/8/3.
 */

//var http =  require('http');
//var express = require('express');
//var server = http.createServer(function(req,res){
//    res.writeHead(200,{'Content-Type':'text/plain'});
//    res.write('世界，你好');
//    res.write('<h1>hello world</h1>');
//    res.end();
//});

var express = require('express'),
    app = express(),
    server = require('http').createServer(app)
;
app.use('/' , express.static(__dirname + '/www'));
server.listen(8080);
console.log('server started');