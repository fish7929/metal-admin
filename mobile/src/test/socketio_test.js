import io from "socket.io-client";  //引入客户端io

//链接服务器，得到代表服务器的socket对象
const socket = io('ws://localhost:3007');

//绑定receiveMsg 来接收服务器发送的消息
socket.on("receiveMsg", function (data) {
    console.log("客户端接到到服务端发送的消息", data);
});

//向服务器端发送消息
socket.emit('sendMsg', { name: 'Lily', date: Date.now() });
console.log("浏览器向服务端发送的消息：", { name: 'Lily', date: Date.now() });