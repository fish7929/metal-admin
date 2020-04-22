import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import QueueAnim from 'rc-queue-anim';
import "./index.less";
const Header = Card.Header;
const Body = Card.Body;
class UserList extends PureComponent {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { userList, history } = this.props;
        return (
            <WingBlank className="user-list">
                {/** */}
                <QueueAnim type="scale" >
                    {userList.map(user => {
                        const { _id, header, username, post, company, salary, info } = user;
                        return (<div key={_id}>
                            <WhiteSpace />
                            <Card onClick={() => history.push("/chat/" + _id)}>
                                <Header
                                    thumb={header}
                                    extra={username}
                                />
                                <Body>
                                    <div>职位：{post}</div>
                                    {company ? <div>公司：{company}</div> : null}
                                    {salary ? <div>月薪：{salary}</div> : null}
                                    <div>描述：{info}</div>
                                </Body>
                            </Card>
                        </div>)
                    })}
                </QueueAnim>
            </WingBlank>
        );
    }
}

export default withRouter(UserList);