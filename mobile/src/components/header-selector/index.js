import React, { PureComponent } from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";
class HeaderSelector extends PureComponent {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        //准备头像数据
        this.headList = [];
        for (let index = 0; index < 9; index++) {
            let item = {};
            if (index % 3 === 0) {
                item.icon = require(`./images/头像1.png`);
            } else if (index % 3 === 1) {
                item.icon = require(`./images/头像2.jpg`);
            } else if (index % 3 === 2) {
                item.icon = require(`./images/头像3.jpg`);
            }
            item.text = '头像' + (index + 1);
            this.headList.push(item);
        }
        this.state = {
            icon: ''  //当前头像
        }
    }
    gridClickHandler = (e) => {
        const { icon } = e;
        this.setState({ icon });
        this.props.setHeader && this.props.setHeader(icon);
    }
    render() {
        const { icon } = this.state;
        const listHead = icon ? <span>已选择头像<img src={icon} alt="头像" style={{ width: 50, borderRadius: '100%' }} /></span> : '请选择头像';
        return (
            <List renderHeader={() => listHead}>
                <Grid data={this.headList} columnNum={3} onClick={this.gridClickHandler} />
            </List>
        );
    }
}

export default HeaderSelector;