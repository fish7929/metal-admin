import axios from 'axios';
import { Toast } from "antd-mobile";

/**
 * 能发送异步请求的函数模块
 * @param {string} url 请求的url
 * @param {object} data 参数对象
 * @param {string} method  请求方式 
 */
export default function request(url, data = {}, method = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        //执行异步ajax
        if (method === 'GET') {
            promise = axios.get(url, { params: data });  //params 配置指定测query参数
        } else {
            promise = axios.post(url, data);  //params 配置指定测query参数
        }
        promise.then((response) => {
            //如果调用成功直接返回
            const data = response.data;
            if (data.status) {  //业务错误的时候，
                const msg = data.msg || data.message || "网络异常，请稍后重";
                Toast.info(msg, 2);
                resolve(null);
            } else {  //业务成功 才返回
                resolve(data.data || true);
            }
        }).catch((error) => {  //对所有ajax请求错误处理，最外层不需要处理
            const msg = error.message || "当前服务器异常，请稍后重试。";
            Toast.info('请求错误：' + msg, 2);
            // reject(error);
        });
    });
};