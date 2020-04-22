var express = require("express");
var router = express.Router();
const { ChatModel, UserModel } = require("../db/models");
const filter = { password: 0, __v: 0 }; //指定过滤的属性， 过滤必须填0 password 和 __v不需要




//更新阅读状态
//1、获取请求参数， 2、处理，  3、返回响应
router.post('/read', function (req, res) {
    // console.log(req.cookies, 8899999);
    //先从请求的cookie中获取userid
    const from = req.body.from;
    const to = req.cookies.userid;  //cookies  是一个对象
    /**
     * 更新数据库中chat数据
     * 1、查询条件
     * 2、更新的指定对象
     * 3、是否一次更新多条，默认1条
     * 4、更新完成回调
     */
    ChatModel.update({ from, to, read: false }, { read: true }, { multi: true }, (error, doc) => {
        console.log('update', doc);
        //返回
        res.send({ status: 0, msg: '用户更新失败', data: doc.nModified });  //更新的数量
    });
});


//获取消息列表
//1、获取请求参数， 2、处理，  3、返回响应 获取单个用户
router.get('/list', function (req, res) {
    // console.log(req.cookies, 8899999);
    //先从请求的cookie中获取userid
    const userid = req.cookies.userid;  //cookies  是一个对象
    UserModel.find((error, userDocs) => {
        //用对象存储所有user的信息， 键值为userid
        const users = {};
        userDocs.forEach(doc => {
            users[doc._id] = { username: doc.username, header: doc.header };
        });
        /**
         * 查询userid相关的所有聊天信息 find
         *1、查询条件   //{ '$or': [{ form: userid }, { to: userid }] }  或的求集合
         * 2、过滤条件
         * 3、返回值
         */
        ChatModel.find({ '$or': [{ from: userid }, { to: userid }] }, filter, function (error, chatMsgs) {
            //包含所有用户相关的 和当前用户相关的所有聊天数据
            res.send({ status: 0, data: { users, chatMsgs }, msg: 'ok' });
        });
    });
});

module.exports = router;