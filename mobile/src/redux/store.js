/**
 * 最终的状态管理
 */
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import reducer from "./reducer";
//这里的 调试工具需要区分 开发和生成环境
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);
//最终暴露一个store
export default createStore(reducer, middleware);