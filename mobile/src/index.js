import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from './containers/register';
import Login from './containers/login';
import Main from './containers/main';
import store from "./redux/store";
//测试socketio
// import './test/socketio_test';
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={Main} />  {/*这个是默认路由，没有其他路由都走这里*/}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
