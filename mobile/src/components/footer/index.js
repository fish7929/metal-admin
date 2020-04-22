import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TabBar, Badge } from "antd-mobile";
import "./index.less";
const Item = TabBar.Item;
class Footer extends PureComponent {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { navList, location, history, unReadCount } = this.props;
        const pathname = location.pathname;
        const showList = navList.filter(item => !item.hide);
        return (
            <TabBar className="my-footer">
                {showList.map(nav => (
                    <Item
                        title={nav.text}
                        key={nav.path}
                        badge={nav.path === '/message' ? unReadCount : 0}
                        icon={{ uri: require(`./images/${nav.icon}.png`) }}
                        selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                        selected={nav.path === pathname}
                        onPress={() => history.replace(nav.path)}
                    />
                ))}
            </TabBar>
        );
    }
}

export default withRouter(Footer);