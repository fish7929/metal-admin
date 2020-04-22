import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, Badge } from "antd-mobile";
import QueueAnim from 'rc-queue-anim';
const Item = List.Item;
const Brief = Item.Brief;

class Message extends PureComponent {
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
    /**
     * last msg 组成的数组
     */
    getLastMsgs = (chatMsgs, userid) => {
        //1、找出每个组的last msg 用对象存 {chat_id: chatMsg}

        const lastMsgObjects = {};
        chatMsgs.forEach(msg => {

            const { chat_id, to, read } = msg;
            //对msg增加一个 unReadCount 属性
            if (to === userid && !read) {  //发给我的 才能算
                msg.unReadCount = 1;
            } else {
                msg.unReadCount = 0;
            }
            const lastMsg = lastMsgObjects[chat_id];
            if (!lastMsg) {  //没有的情况
                lastMsgObjects[chat_id] = msg;
            } else { //有的情况  //需要对unReadCount 叠加
                //需要取出之前的 未读数，
                const unReadCount = lastMsg.unReadCount + msg.unReadCount;
                //如果chat  比 lastMsg  晚
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgObjects[chat_id] = msg;
                }
                //zui'z
                lastMsgObjects[chat_id].unReadCount = unReadCount;
            }
        });
        //2、得到lst msg 数组
        const lastMsgs = Object.values(lastMsgObjects);
        //3、对数组进行排序 create_time desc 降序
        lastMsgs.sort((m1, m2) => { //如果 <0 m1在前面，  >0 m2在前面
            return m2.create_time - m1.create_time;
        });
        return lastMsgs;
    }
    render() {
        const { chat, user } = this.props;
        const { chatMsgs, users } = chat;
        //对chatMsgs 对chat_id 分组， 取出最后一条msg， 最后排序
        const lastMsgs = this.getLastMsgs(chatMsgs, user._id);
        return (
            <List style={{ marginTop: 50, marginBottom: 50 }}>
                <QueueAnim type="left" >
                    {lastMsgs.map(msg => {
                        const { _id, to, from, content, unReadCount } = msg;
                        const isFrom = to === user._id; //to 和我的userid  就表示法给我的
                        const targetId = isFrom ? from : to;  //取聊天对象的id
                        const targetUser = users[targetId];
                        return (<Item
                            key={_id}
                            onClick={() => this.props.history.push('/chat/' + targetId)}
                            extra={<Badge text={unReadCount ? unReadCount : 0} />}
                            thumb={targetUser.header ? targetUser.header : null}
                            arrow='horizontal'
                        >
                            {content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                        )
                    })}
                </QueueAnim>
            </List>
        );
    }
}

const mapStateToProps = state => {
    const { user, chat } = state
    return { user, chat }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)