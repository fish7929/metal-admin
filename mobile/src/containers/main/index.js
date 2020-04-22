import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { NavBar } from "antd-mobile";
import LaoBanInfo from '../laoban-info';
import DaShenInfo from '../dashen-info';
import LaoBan from '../laoban';
import DaShen from '../dashen';
import Persional from '../persional';
import Message from '../message';
import Chat from '../chat';
import NotFound from '../../components/not-fount';
import Footer from '../../components/footer';
import Cookies from "js-cookie";  //可以操作前端cookie的对象set() remove() 
import { getRedirectTo } from "../../utils";
import { getUser } from '../../redux/actions';
import "./index.less";
class Main extends PureComponent {
    //给组件对象添加属性
    navList = [
        {
            path: '/laoban',  //路径
            component: LaoBan,  //组件
            icon: 'home',  //底部图标
            title: '大神列表',  //显示顶部标题
            text: '大神'   //图标文字
        },
        {
            path: '/dashen',
            component: DaShen,
            icon: 'home',
            title: '老板列表',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            icon: 'activity',
            title: '消息中心',
            text: '消息'
        },
        {
            path: '/persional',
            component: Persional,
            icon: 'user',
            title: '用户中心',
            text: '个人'
        }
    ]
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const userid = Cookies.get('userid');
        const { _id } = this.props.user;
        if (userid && !_id) {  //需要发送ajax请求 获取用户信息
            //发送异步请求获取user信息
            this.props.getUser();
        }
    }
    render() {
        //cookie 中有userid  但是 redux中没有 _id  这个时候也表示登录了
        const userid = Cookies.get('userid');
        if (!userid) {
            return <Redirect to={"/login"} />
        } else {
            //如果有_id 显示对于的界面
            const { user, location, unReadCount } = this.props;
            if (!user._id) {  //需要发送ajax请求 获取用户信息
                return null;
            } else {  //显示对于的界面
                //如果是根路径
                const path = location.pathname;
                if (path === '/') {
                    //得到一个重定向的路径
                    return <Redirect to={getRedirectTo(user.type, user.header)} />;
                } else {
                    const { navList } = this;
                    //根据当前路径 查找当前的 nav
                    const currentNav = navList.find(item => item.path === path);
                    //增加一个unReadCount  message 对应的增加一个值值
                    if (currentNav) {  //决定是否隐藏footer中的某一项
                        if (user.type === 'laoban') {
                            navList[1].hide = true;
                        } else {
                            navList[0].hide = true;
                        }
                    }
                    return (
                        <div>
                            {currentNav ? <NavBar className="fixed-header">{currentNav.title}</NavBar> : null}
                            <Switch>
                                {navList.map(nav => <Route path={nav.path} key={'path' + nav.path} component={nav.component} />)}
                                <Route path="/laobaninfo" component={LaoBanInfo} />
                                <Route path="/dasheninfo" component={DaShenInfo} />
                                <Route path="/chat/:userid" component={Chat} />
                                <Route component={NotFound} />
                            </Switch>
                            {currentNav ? <Footer navList={navList} unReadCount={unReadCount} /> : null}
                        </div>
                    );
                }
            }
        }
    }
}

const mapStateToProps = state => {
    const { user, chat } = state;
    const { unReadCount } = chat;
    return { user, unReadCount }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)