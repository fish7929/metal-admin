//包含n个操作数据库 集合数据的model 模块

//引入
const mongoose = require('mongoose');
//链接指定数据库(url 只有数据库变化才变化)
mongoose.connect('mongodb://localhost:27017/metal_db');
//获取链接对象
const conn = mongoose.connection;
//绑定链接完成监听
conn.on('connected', function () { //链接成功回调
    console.log("数据库链接成功");
});


//得到对应集合的model
//定义schema (描述文档结构)
const userSchema = mongoose.Schema({
    username: { type: String, required: true },  //用户名
    password: { type: String, required: true },  //密码
    type: { type: String, required: true },    //用户类型: dashen/laoban
    header: { type: String },  //头像不是必须
    post: { type: String },  //职位
    info: { type: String },  //个人职位信息
    company: { type: String },  //公司名称
    salary: { type: String },  //工资
});

//定义model与集合对应可以操作集合  是一个构造函数
const UserModel = mongoose.model('user', userSchema); //集合名词 users
//向外暴露
exports.UserModel = UserModel;


//得到对应集合的model
//定义schema (描述文档结构)
const chatSchema = mongoose.Schema({
    from: { type: String, required: true },  //发送用户的id
    to: { type: String, required: true },  //接收用户的id
    chat_id: { type: String, required: true },    //form 和to组成的字符串
    content: { type: String, required: true },  //内容
    read: { type: Boolean, default: false },  //表示是否已读
    create_time: { type: Number },  //创建时间
});

//定义model与集合对应可以操作集合  是一个构造函数
const ChatModel = mongoose.model('chat', chatSchema); //集合名词 chats
//向外暴露
exports.ChatModel = ChatModel;