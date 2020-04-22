import React, { PureComponent } from "react";
import { NavBar, WingBlank, List, InputItem, Button, WhiteSpace, Toast } from "antd-mobile";
import Logo from "../../components/logo";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { Redirect } from "react-router-dom";
import "./index.less";
class Login extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',  //用户名
        password: '',  //密码
    }
    changeHandler = (val, key) => {
        const obj = {};
        obj[key] = val;
        this.setState(obj);
    }
    loginHandler = () => {
        console.log(this.state);
        const { username, password, password2 } = this.state;
        if (!username) {
            Toast.info("必须指定用户名");
            return;
        } else if (!password) {
            Toast.info("必须指定密码");
            return;
        } else if (password === password2) {
            Toast.info("两次密码输入不一致");
            return;
        }
        this.props.login(username, password);
    }
    registerHandler = () => {
        this.props.history.push("/register");
    }
    render() {
        const { redirectTo } = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div className="login-container">
                <NavBar>Metal&nbsp;&nbsp;直聘</NavBar>
                <Logo />
                <WingBlank size="lg" >
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={(val) => this.changeHandler(val, 'username')}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入密码" type="password" onChange={(val) => this.changeHandler(val, 'password')}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.loginHandler}>登录</Button>
                        <WhiteSpace />
                        <Button onClick={this.registerHandler}>还没账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state
    return { user }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)