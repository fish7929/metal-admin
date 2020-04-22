//引入
const mongoose = require('mongoose');
const md5 = require('blueimp-md5')
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
});
//定义model与集合对应可以操作集合  是一个构造函数
const UserModel = mongoose.model('user', userSchema); //集合名词 users

//CRUD

//通过 Model 实例的 save(）添加数据

function testSave() {
    const user = {
        username: 'test1',
        password: md5('1234'),
        type: 'dashen',
    }
    //创建Model实例
    const userModel = new UserModel(user);
    //调用save()方法保存
    userModel.save(function (error, user) {
        console.log('save()', error, user);
    });

    /**
     * {
            _id: 5e9d8d9c3acc8b060778f38a,
            username: 'test1',
            password: '81dc9bdb52d04dc20036dbd8313ed055',
            type: 'dashen',
            __v: 0
        }
     */
}
// testSave();
//通过 Model find()/findOne()查询一条或多条数据
function testFind() {
    //调用find()查询多个
    UserModel.find({ _id: '5e9d8d9c3acc8b060778f38a' }, function (error, users) {
        //得到的是包含所有文档对象的数组， 没有匹配的就是 []
        console.log('find()', error, users);
    });
    //findOne查询一个
    UserModel.findOne({ _id: '5e9d8d9c3acc8b060778f38a' }, function (error, user) {
        //得到的是匹配的文档对象的， 没有匹配的就是 null
        console.log('findOne()', error, user);
    });
}
// testFind();
//通过 Model findByIdAndUpdate(）更新某个数据
function testUpdate() {
    //调用findByIdAndUpdate()查询一个再更新
    UserModel.findByIdAndUpdate({ _id: '5e9d8d9c3acc8b060778f38a' },
        { username: 'test66' }, function (error, oldUser) {
            //返回修改之前的旧的对象， 没有匹配的就是 null
            console.log('findByIdAndUpdate()', error, oldUser);
        });
}
// testUpdate();


//通过 Model remove(）删除匹配的数据
function testDelete() {
    //调用findByIdAndUpdate()查询一个再更新
    UserModel.remove({ _id: '5e9d8d9c3acc8b060778f38a' }, function (error, doc) {
        //返回修改之前的旧的对象， 没有匹配的就是 null
        //{ n: 1, ok: 1, deletedCount: 1 }
        //ok为1 删除成功，  n 表示删除数量
        console.log('remove()', error, doc);
    });
}
testDelete();