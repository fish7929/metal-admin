import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar, InputItem, List, Grid, Icon } from "antd-mobile";
import { sendMsg, readMsg } from '../../redux/actions';
import QueueAnim from 'rc-queue-anim';
import "./index.less";
const Item = List.Item;
class Chat extends PureComponent {
    constructor(props) {
        super(props);
        this.userid = this.props.match.params.userid;
        this.state = {
            content: '',
            isShow: false
        }
        this.listNode = null;
    }
    componentWillMount() {
        this.emojis = ['😀', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉',
            '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛',
            '😜', '🤪', '🤑', '😀', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉',
            '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛',
            '😜', '🤪', '🤑'];
        this.emojis = this.emojis.map(value => ({ text: value }));
    }
    componentDidMount() {

    }
    /**
     * 销毁之前，去修改未读状态
     */
    componentWillUnmount() {
        //会有一个延迟的 ，需要判断是否有未读消息
        //发请求更新消息的未读状态
        const targetId = this.userid;
        const { user } = this.props;
        this.props.readMsg(targetId, user._id);
    }
    componentDidUpdate() {
        //更新的时候滚动到底部
        // console.log(this.listNode, this.listNode.scrollHeight, 888);
        if (this.listNode) {
            window.scrollTo(0, this.listNode.scrollHeight);
        }
    }
    changeHandler = (val) => {
        this.setState({ content: val });
    }
    /**
     * 显示emojis 表情
     */
    toggleMojisHandler = () => {
        const { isShow } = this.state;
        let show = !isShow;
        this.setState({ isShow: show });
        if (show) {
            //异步分发一个 resize事件
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
        }
    }
    /**
     * 发送消息
     */
    sendHandler = () => {
        const { content } = this.state;
        const from = this.props.user._id;
        const to = this.userid;
        // this.props.login(username, password);
        if (content) {
            this.props.sendMsg({ content, from, to });
            this.setState({ content: '', isShow: false });
        }
    }
    render() {
        const { isShow } = this.state;
        const { user, chat } = this.props;
        const { users, chatMsgs } = chat;
        //当前id， 聊天对象的id
        const meId = user._id;
        if (!users[meId]) {  //还没获取到数据，不做任何操作
            return null;
        }
        const targetId = this.userid;
        const targetUser = users[targetId];
        //对chatmsgs进行过滤，
        const chatId = [meId, targetId].sort().join('_');  //必须和存储时候的 值保持一致
        const msgs = chatMsgs.filter(chat => chat.chat_id === chatId);
        const { header, username } = targetUser;
        return (
            <div id='chat-page' ref={node => this.listNode = node}>
                <NavBar
                    icon={<Icon type="left" />}
                    className="fixed-header"
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {username}
                </NavBar>
                <List style={{ marginBottom: 50, marginTop: 50 }}>
                    {/* delay延迟0.1秒开始*/}
                    <QueueAnim type="alpha" delay={100}>
                        {msgs.map(item => {
                            const { from, content, _id } = item;
                            if (targetId === from) {  //对方发给我的消息
                                return (
                                    <Item
                                        thumb={header}
                                        key={_id}
                                    >
                                        {content}
                                    </Item>
                                )
                            } else { //我发的消息
                                return (
                                    <Item
                                        className='chat-me'
                                        extra={'我'}
                                        key={_id}
                                    >
                                        {content}
                                    </Item>
                                );
                            }
                        })}
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        value={this.state.content}
                        onChange={this.changeHandler}
                        placeholder="请输入"
                        onFocus={() => this.setState({ isShow: false })}
                        extra={<span>
                            <span onClick={this.toggleMojisHandler} style={{ padding: "0 10px" }}>😀</span>
                            <span onClick={this.sendHandler}>发送</span>
                        </span>}
                    />
                    {isShow ? <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item) => {
                            this.setState({ content: this.state.content + item.text });
                        }}
                    /> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, chat } = state
    return { user, chat }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ sendMsg, readMsg }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)