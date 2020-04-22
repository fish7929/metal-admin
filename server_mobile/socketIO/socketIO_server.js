const { ChatModel } = require("../db/models");
module.exports = function (server) {
    //得到io对象
    const io = require('socket.io')(server);
    //监视链接，（当有一个客户链接时回调）
    io.on('connection', function (socket) {
        console.log("socketio connected!!");
        //绑定sendMsg监听，接收客户端发送的消息
        socket.on('sendMsg', function (data) {
            // console.log('服务器接收到浏览器消息', data);
            //{form, to, content}
            //处理数据向客户端发消息
            //保存消息
            const { from, to, content } = data;
            const create_time = Date.now();
            const chat_id = [from, to].sort().join('_');  //form_to  或者 to_from
            const chat = { from, to, content, chat_id, create_time }
            new ChatModel(chat).save((error, chatMsg) => {
                if (chatMsg) {
                    //发给我，和目标，目标在线就发，没在线就不发
                    // socket.emit('receiveMsg', chatMsg);  //这个只是发给我，
                    io.emit('receiveMsg', chatMsg); //向所有人都发了， 目前只是不友好， 只能接受的人去过滤
                }
            });
            //向客户端发送消息，名称 数据
            // io.emit('receiveMsg', data.name + '_' + data.date);  //发送给所有链接的客户端
        });
    });
};