/**
 * Created by zz on 2017/5/6.
 */
var express=require('express'),
    app=express(),
    server=require('http').createServer(app);
app.use('/',express.static(__dirname+'index.html'));
server.listen(8080);
