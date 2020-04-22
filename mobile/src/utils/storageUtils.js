/**
 * 用来操作localstorage的 多个操作方法
 */
import store from 'store';

const USER_KEY = 'CURRENT_USER';
export default {
    //保存user
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },
    //读取user
    getUser() {
        // let user = localStorage.getItem(USER_KEY);
        // user = user ? JSON.parse(user) : {};
        // return user;
        return store.get(USER_KEY) || {};
    },
    //删除user
    removeUser() {
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}