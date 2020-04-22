import request from './request';
//包含应用中所有请求函数模块
const basicUrl = ""; //"http://localhost:3007"
//登录接口
export const requestLogin = (username, password) => request(basicUrl + '/login', { username, password }, 'POST');
//注册
export const requestRegister = (user) => request(basicUrl + '/register', user, 'POST');
//更新用户
export const requestUpdateUser = (user) => request(basicUrl + '/user/update', user, 'POST');
//获取用户用户  从后端获取user
export const requestGetUser = () => request(basicUrl + '/user/get');
//获取用户用户  从后端根据类型获取user列表   dashen  / laoban 
export const requestUserList = (type) => request(basicUrl + '/user/list', { type });

//保存消息

//获取消息列表显示
export const requestMsgList = () => request(basicUrl + '/chat/list');

//修改消息状态
export const requestReadMsg = (from) => request(basicUrl + '/chat/read', { from }, 'POST');


