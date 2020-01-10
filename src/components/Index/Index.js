import React, {Component} from 'react';
import 'element-theme-default';
import NavMenu from './NavMenu'
import {connect} from 'react-redux';

class Index extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {history} = this.props
        return (
            <NavMenu history={history}/>
        )
    }
}

export default connect(
    (state) => ({
        loginData: state.loginReducer.loginData,
        loginError: state.loginReducer.loginError,
    }),
    (dispatch) => ({})
)(Index)