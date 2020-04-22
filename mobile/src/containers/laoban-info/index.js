import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector";
import { updateUser } from '../../redux/actions';
import { Redirect } from "react-router-dom";

class LaoBanInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            header: '',  //头像
            post: '',  //职位
            company: '',  //公司名称
            info: '',  //信息
            salary: '',  //月薪 
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={(header) => this.setHeader(header)} />
                <InputItem placeholder="请输入招聘职位" onChange={(val) => this.changeHandler(val, 'post')}>招聘职位：</InputItem>
                <InputItem placeholder="请输入公司名称" onChange={(val) => this.changeHandler(val, 'company')}>公司名称：</InputItem>
                <InputItem placeholder="请输入职位薪资" onChange={(val) => this.changeHandler(val, 'salary')}>职位薪资：</InputItem>
                <TextareaItem title="职位要求：" placeholder="请输入职位要求" rows={3} onChange={(val) => this.changeHandler(val, 'info')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LaoBanInfo)