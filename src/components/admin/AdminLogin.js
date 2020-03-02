import React, {Component} from 'react';
import {Button, Form, Input, Message} from 'element-react';
import 'element-theme-default';
import {connect} from 'react-redux';
import * as loginAction from "../../action/adminLoginAction";


class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
            },
        };
    }

    componentDidMount() {
        // location.reload()
    }

    componentWillReceiveProps(nextProps) {

        const {history} = this.props
        if (nextProps && nextProps.adminLoginData) {
            let data = nextProps.adminLoginData
            if (data.code === 2000) {
                Message({
                    showClose: true,
                    message: data.message,
                    type: 'success'
                });
                let userInfo = JSON.stringify(data.userInfo)
                sessionStorage.setItem('adminInfo', userInfo)
                history.push('/adminIndex')
            }
            if (data.code === 2001) {
                Message({
                    showClose: true,
                    message: data.message,
                    type: 'error'
                });
            }
        }
    }

    onUserChange = (key, value) => {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }
    onPassWordChange = (key, value) => {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }

    //登录
    login = () => {
        const {adminLogin} = this.props
        const {form} = this.state
        adminLogin({
            username: form.username,
            password: form.password
        })
    }

    //注册
    register = () => {
        this.props.history.push('/adminRegister')
    }

    render() {
        return (
            <div style={{
                height: '100vh',
                backgroundColor: '#282c34'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '230px',
                    marginRight: 50
                }}>
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100"
                          className="demo-ruleForm">
                        <Form.Item label="管理员账号" prop="username">
                            <Input value={this.state.form.username}
                                   onChange={this.onUserChange.bind(this, 'username')}/>
                        </Form.Item>
                        <Form.Item label="管理员密码" prop="password">
                            <Input type="password" value={this.state.form.password}
                                   onChange={this.onPassWordChange.bind(this, 'password')}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                            {/*<Button type="primary" onClick={this.register.bind(this)}>注册</Button>*/}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        adminLoginData: state.adminLoginReducer.adminLoginData,
        adminLoginError: state.adminLoginReducer.adminLoginError,
    }),
    (dispatch) => ({
        adminLogin: (params) => dispatch(loginAction.adminLogin(params)),
    })
)(AdminLogin)

