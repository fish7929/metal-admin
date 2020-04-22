/**
 * 用来根据现有state和action返回新的state
 */

import { combineReducers } from "redux";
import {
    RECEIVE_USER,
    RESET_USER,
    AUTH_SUCCESS,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from "./action-types";
import { getRedirectTo } from "../utils";

const initUser = {
    username: '',
    type: '',
    redirectTo: ''
};

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.payload;
            return { ...state, ...action.payload, redirectTo: getRedirectTo(type, header) };
        case RECEIVE_USER:
            // 不需要 redirectTo 这里不处理了
            return action.payload;
        case RESET_USER:
            return { ...initUser };
        default:
            return state;
    }
}

const initUserList = [];
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.payload;
        default:
            return state;
    }
}

/**
 * 初始化总阅读数
 * @param {array} chatMsgs 消息列表
 * @param {string} userid 当前用户id
 */
function getUnReadCount(chatMsgs, userid) {
    return chatMsgs.reduce((preTotal, msg) => {
        if (msg.to === userid && !msg.read) {
            preTotal += 1;
        }
        return preTotal;
    }, 0);
}

const initChat = {
    users: {},  //所有用户信息的对象，{userid: {header, name}}
    chatMsgs: [],  //当前用户所有相关msg的数组
    unReadCount: 0, //总未读数量
};
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            //需要处理 unReadCount
            //初始统计数量
            const unReadCount = getUnReadCount(action.payload.chatMsgs, action.payload.userid);
            return { users: action.payload.users, chatMsgs: action.payload.chatMsgs, unReadCount };
        case RECEIVE_MSG:
            const { chatMsg, userid } = action.payload;
            const { users, chatMsgs } = state;
            const newMsgs = [...chatMsgs, chatMsg]
            //增加总的数量
            const newCount = state.unReadCount + ((chatMsg.to === userid && !chatMsg.read) ? 1 : 0);
            return { users, unReadCount: newCount, chatMsgs: newMsgs };
        case MSG_READ:  //修改已读的消息
            const { count, to, from } = action.payload;
            let oldChatMsgs = state.chatMsgs;
            //减去阅读数
            let count1 = state.unReadCount - count;
            count1 = count1 < 0 ? 0 : count1;
            oldChatMsgs = oldChatMsgs.map(item => {
                if (item.to === to && item.from === from && !item.read) {
                    // item.read = true;
                    return { ...item, read: true };
                } else {
                    return item;
                }

            });
            //修改unReadCount  chatMsgs 的read
            return { users: state.users, unReadCount: count1, chatMsgs: [...oldChatMsgs] };
        default:
            return state;
    }
}

//最终返回,总的reducer，最终的是一个对象 {headTitle:'首页', user: {}}
export default combineReducers({
    user,
    userList,
    chat
});