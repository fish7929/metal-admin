import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector";
import { updateUser } from '../../redux/actions';
import { Redirect } from "react-router-dom";
class DaShenInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            header: '',  //头像
            post: '',  //职位
            info: '',  //信息
        };
    }
    setHeader = (header) => {
        this.setState({ header });
    }
    changeHandler = (val, key) => {
        const obj = {};
        obj[key] = val;
        this.setState(obj);
    }
    saveHandler = () => {
        console.log(this.state);
        // this.props.login(username, password);
        this.props.updateUser(this.state);
    }
    render() {
        const { header, type } = this.props.user;
        if (header) {
            let path = type === 'dashen' ? '/dashen' : '/laoban';
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={(header) => this.setHeader(header)} />
                <InputItem placeholder="请输入求职岗位" onChange={(val) => this.changeHandler(val, 'post')}>求职岗位：</InputItem>
                <TextareaItem title="个人介绍：" placeholder="请输入个人介绍" rows={3} onChange={(val) => this.changeHandler(val, 'info')} />
                <Button type="primary" onClick={this.saveHandler}>保 存</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state
    return { user }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DaShenInfo)