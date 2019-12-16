import React, {Component} from 'react';
import 'element-theme-default';
import NavMenu from './NavMenu'
import {connect} from 'react-redux';

class Index extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.isLoading()
    }


    isLoading = () => {
        const {loginData} = this.props
        if (!loginData || loginData.code !== 2000) {
            this.props.history.push('/Login')
        }
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