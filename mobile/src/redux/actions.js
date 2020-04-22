/**
 * 包含多个action Creator函数
 * 同步action  {type,payload} 和 异步action dispatch({type, payload})
 */
import {
    requestLogin,
    requestRegister,
    requestUpdateUser,
    requestGetUser,
    requestUserList,
    requestMsgList,
    requestReadMsg
} from "../api";
import {
    AUTH_SUCCESS,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from "./action-types";
import Cookies from "js-cookie";  //可以操作前端cookie的对象set() remove() 
import io from "socket.io-client";  //引入客户端io

/**
 * 更新的用户异步action
 */

export const sendMsg = (msg) => dispatch => {
    //向服务器端发送消息
    io.socket.emit('sendMsg', msg);
}

/**
 * 保存消息列表 同步action
 */
export const receiveMsgList = (msgList) => ({ type: RECEIVE_MSG_LIST, payload: msgList });

/**
 * 保存单条消息 同步action
 */
export const receiveMsg = (msg) => ({ type: RECEIVE_MSG, payload: msg });


/**
 * 读取某个聊天休息 同步action
 */
export const msgRead = (read) => ({ type: MSG_READ, payload: read });

/**
 * 保存user 同步action
 */
export const receiveUser = (user) => ({ type: RECEIVE_USER, payload: user });
/**
 * 保存user 同步action
 */
export const authUser = (user) => ({ type: AUTH_SUCCESS, payload: user });
/**
 * 退出登录的同步 重置用户 action
 */
export const resetUser = () => {
    //删除cookie userid
    Cookies.remove('userid');
    return { type: RESET_USER };
}
/**
 * 保存user 同步action
 */
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, payload: userList });

/**
 * 初始化io
 * @param {string} userid 当前用户id
 * @param {function} dispatch 分发器
 */
function initIo(userid, dispatch) {
    if (!io.socket) {
        //链接服务器，得到代表服务器的socket对象
        io.socket = io('ws://localhost:3007');

        //绑定receiveMsg 来接收服务器发送的消息
        io.socket.on("receiveMsg", function (chatMsg) {
            console.log("客户端接到到服务端发送的消息", chatMsg);
            //这个是服务器发送的 所有消息
            //有可能不是我需要的消息， 只有和我相关的消息 ，我才存储
            const { from, to } = chatMsg;
            if (userid === from || userid === to) {
                dispatch(receiveMsg({ chatMsg, userid }));
            }
        });
    }
}

/**
 * 异步获取消息列表数据
 */
async function getMsgList(userid, dispatch) {
    //初始化IO
    initIo(userid, dispatch);
    const res = await requestMsgList();
    if (res) {
        const { chatMsgs, users } = res;
        //分发action
        dispatch(receiveMsgList({ chatMsgs, users, userid }));
    }
}


/**
 * 登录的异步action
 */

export const login = (username, password) => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const res = await requestLogin(username, password);
    if (res) {  //登录成功
        //存储状态
        dispatch(authUser(res));
        //需要获取消息列表
        getMsgList(res._id, dispatch);
    } else { //登录失败

    }
}

/**
 * 注册的异步action
 */

export const register = (user) => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const res = await requestRegister(user);
    if (res) {  //登录成功
        //存储状态
        dispatch(authUser(res));
        //需要获取消息列表
        getMsgList(res._id, dispatch);
    } else { //登录失败

    }
}

/**
 * 更新的用户异步action
 */

export const updateUser = (user) => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const res = await requestUpdateUser(user);
    // console.log(res, 9999);
    if (res) {  //更新成功
        //存储状态
        dispatch(receiveUser(res));
    } else { //更新失败需要重置 用户重新登录
        dispatch(resetUser());
    }
}

/**
 * 更新的用户异步action
 */

export const getUser = () => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const res = await requestGetUser();
    // console.log(res, 9999);
    if (res) {  //更新成功
        //存储状态
        dispatch(receiveUser(res));
        //需要获取消息列表
        getMsgList(res._id, dispatch);
    } else { //更新失败需要重置 用户重新登录
        dispatch(resetUser());
    }
}


/**
 * 更新的用户异步action
 */

export const getUserList = (type) => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const res = await requestUserList(type);
    // console.log(res, 9999);
    if (res) {  //更新成功
        //存储状态
        dispatch(receiveUserList(res));
    }
}


/**
 * 阅读消息
 */

export const readMsg = (from, to) => async dispatch => {
    //1、登录成功分发 成功action
    //2、 失败 分发 失败的 action
    const count = await requestReadMsg(from);
    // console.log(res, 9999);
    if (count) {  //修改了几条阅读数
        //存储状态
        dispatch(msgRead({ count, from, to }));
    }
}
