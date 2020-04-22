var express = require("express");
var router = express.Router();
const { UserModel } = require("../db/models");
const filter = { password: 0, __v: 0 }; //指定过滤的属性， 过滤必须填0 password 和 __v不需要

//1、获取请求参数， 2、处理，  3、返回响应
router.post('/update', function (req, res) {
    // console.log(req.cookies, 8899999);
    //先从请求的cookie中获取userid
    const userid = req.cookies.userid;  //cookies  是一个对象
    if (!userid) {  //没有userid 表示没登录
        return res.send({ status: 5, msg: '用户没登录,请先登录', data: null });
    } else {
        //获取请求参数 req
        const user = req.body;
        //从cookie 中获取userid
        UserModel.findByIdAndUpdate({ _id: userid }, { ...user }, (error, oldUser) => {
            if (!oldUser) {  //表示数据库没有值，cookie中值被篡改，删除userid中的 cookie，
                //告诉浏览器删除cookie
                res.clearCookie('userid');
                //返回一个错误提示
                res.send({ status: 1, msg: '用户更新失败', data: null });
            } else {
                const { _id, username, type } = oldUser;
                const data = { ...user, _id, username, type };
                res.send({ status: 0, data, msg: 'ok' });
            }
        });
    }
});

//1、获取请求参数， 2、处理，  3、返回响应 获取单个用户
router.get('/get', function (req, res) {
    // console.log(req.cookies, 8899999);
    //先从请求的cookie中获取userid
    const userid = req.cookies.userid;  //cookies  是一个对象
    if (!userid) {  //没有userid 表示没登录
        return res.send({ status: 5, msg: '用户没登录,请先登录', data: null });
    } else {
        UserModel.findOne({ _id: userid }, filter, (error, user) => {
            if (!user) {  //表示数据库没有值，cookie中值被篡改，删除userid中的 cookie，
                //告诉浏览器删除cookie
                res.clearCookie('userid');
                //返回一个错误提示
                res.send({ status: 5, msg: '用户登录信息不正确', data: null });
            } else {
                res.send({ status: 0, data: user, msg: 'ok' });
            }
        });
    }
});

//1、获取请求参数， 2、处理，  3、返回响应 获取单个用户
router.get('/list', function (req, res) {
    // console.log(req.cookies, 8899999);
    //先从请求的cookie中获取userid
    const userid = req.cookies.userid;  //cookies  是一个对象
    if (!userid) {  //没有userid 表示没登录
        return res.send({ status: 5, msg: '用户没登录,请先登录', data: null });
    } else {
        //获取请求参数 req
        const { type } = req.query;
        UserModel.find({ type }, filter, (error, users) => {
            if (!users) {  //表示数据库没有值，cookie中值被篡改，删除userid中的 cookie，
                //返回一个错误提示
                res.send({ status: 1, msg: '获取用户列表失败', data: null });
            } else {
                //用户类型的列表
                res.send({ status: 0, data: users, msg: 'ok' });
            }
        });
    }
});

module.exports = router;