import React, { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserList from "../../components/user-list";
import { getUserList } from '../../redux/actions';
class DaShen extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getUserList('laoban');
    }
    render() {
        return (
            <UserList userList={this.props.userList} />
        );
    }
}

const mapStateToProps = state => {
    const { userList } = state
    return { userList }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DaShen)