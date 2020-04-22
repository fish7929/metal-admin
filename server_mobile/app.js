var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require("path");
var app = express();
var router = require("./routes");
var usersRouter = require("./routes/users");
var chatsRouter = require("./routes/chats");
//设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     // res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });
// view engine setup
//模板的默认存放目录是views，所以在建立文件夹的时候可以命名为views,如果想改的话，可以这样设置
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎后置
app.set('view engine', 'ejs');
//设置bodyParser
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());
//处理cookie
app.use(cookieParser());
app.use('/', router);
app.use('/user', usersRouter);
app.use('/chat', chatsRouter);

module.exports = app;