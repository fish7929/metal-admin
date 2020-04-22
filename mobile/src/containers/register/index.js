import React, { PureComponent } from "react";
import { NavBar, WingBlank, List, InputItem, Button, WhiteSpace, Radio } from "antd-mobile";
import Logo from "../../components/logo";
import { connect } from 'react-redux';
import { register } from '../../redux/actions';
import { Redirect } from "react-router-dom";
import "./index.less";
const ListItem = List.Item;
class Register extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',  //用户名
        password: '',  //密码
        password2: '',  //确认密码
        type: 'laoban'  //dashen  laoban
    }
    changeHandler = (val, key) => {
        const obj = {};
        obj[key] = val;
        this.setState(obj);
    }
    registerHandler = () => {
        console.log(this.state);
        const { username, password, type } = this.state;
        console.log(this.props.register, 9999);
        this.props.register({ username, password, type }, () => {
            this.props.history.psuh("/" + type + "info")
        });
    }
    loginHandler = () => {
        this.props.history.push("/login");
    }
    render() {
        const { type } = this.state;
        const { redirectTo } = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div className="register-container">
                <NavBar>Metal&nbsp;&nbsp;直聘</NavBar>
                <Logo />
                <WingBlank size="lg" >
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={(val) => this.changeHandler(val, 'username')}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入密码" type="password" onChange={(val) => this.changeHandler(val, 'password')}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入确认密码" type="password" onChange={(val) => this.changeHandler(val, 'password2')}>确认密码：</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={(val) => this.changeHandler('dashen', 'type')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={(val) => this.changeHandler('laoban', 'type')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.registerHandler}>注册</Button>
                        <WhiteSpace />
                        <Button onClick={this.loginHandler}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state
    return { user }
};
const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register)