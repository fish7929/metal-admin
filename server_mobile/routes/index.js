var express = require("express");
var router = express.Router();
const md5 = require('blueimp-md5');
const { UserModel } = require("../db/models");
const filter = { password: 0, __v: 0 }; //指定过滤的属性， 过滤必须填0 password 和 __v不需要
/**
 * 首页
 */

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


/**
 * 注册新用户
 * 1、path为：  /register
 * 2、请求方式为： post
 * 3、接收参数为 username password
 * 4、admin 是否已经注册
 * 5、注册成功返回 {status:0, data:{_id: 'sss', username: 'aaa', password: 'ssds'}}
 * 6、注册失败 {status:1, msg:'次用户已经存在'}
 */

//1、获取请求参数， 2、处理，  3、返回响应
router.post('/register', function (req, res) {
    console.log(req.body, 8888);
    //获取请求参数 req
    const { username, password, type } = req.body;
    //判断用户是否存在，存在提示错误
    //根据username查询
    UserModel.findOne({ username }, (error, user) => {
        if (user) {  //表示数据库中有值
            res.send({ status: 1, msg: '该用户已经存在', data: null });
        } else {
            //保存user
            const userItem = { username, password: md5(password), type };
            new UserModel(userItem).save((error, user) => {
                if (!error) {
                    //保存一个cookie{userid:user._id}  并交给浏览器保存
                    //持久化cookie 7天有效， 浏览器会保存本地
                    res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                    //保存成功，并返回成功数据
                    const data = { username, type, _id: user._id };  //删除密码，不返回
                    res.send({ status: 0, data, msg: 'ok' });
                }
            });
        }
    });
});

//1、获取请求参数， 2、处理，  3、返回响应
router.post('/login', function (req, res) {
    //获取请求参数 req
    const { username, password } = req.body;
    //如果没有就登录失败
    //有就表示登录成功
    UserModel.findOne({ username, password: md5(password) }, filter, (error, user) => {
        if (user) {  //表示数据库中有值
            //保存一个cookie{userid:user._id}  并交给浏览器保存
            //持久化cookie 7天有效， 浏览器会保存本地
            res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            //保存成功，并返回成功数据
            //删除密码，不返回
            res.send({ status: 0, data: user, msg: 'ok' });
        } else {
            res.send({ status: 1, msg: '用户名或密码不正确', data: null });
        }
    });
});

module.exports = router;