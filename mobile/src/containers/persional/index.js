import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import { resetUser } from '../../redux/actions';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
class Persional extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    changeHandler = (val, key) => {
        const obj = {};
        obj[key] = val;
        this.setState(obj);
    }
    logoutHandler = () => {
        alert('退出', '确认退出吗？', [
            {
                text: "取消",
                onPress: () => console.log('cancel')
            },
            {
                text: "确认",
                onPress: () => this.props.resetUser()
            },
        ]);

    }
    render() {
        const { header, company, username, info, salary, post } = this.props.user;
        return (
            <div style={{ marginTop: 50, marginBottom: 50 }}>
                <Result
                    img={<img src={header} alt="头像" style={{ width: 50, height: 50, borderRadius: '100%' }} />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'} >
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：{salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logoutHandler}>退出登录</Button>
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state
    return { user }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ resetUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Persional)