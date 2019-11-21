import React, {Component} from 'react';
import {Button, Form, Input, Message} from 'element-react';
import 'element-theme-default';
import axios from 'axios'
import Connect from '../../service/address'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
            },
        };
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
        const {form} = this.state
        axios.post(Connect.login, {
            username: form.username,
            password: form.password
        })
            .then(res => {
                if (res.data.code === 2000) {
                    Message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                    this.props.history.push('/Index')
                }
                if(res.data.code === 2001) {
                    Message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error'
                    });
                }
            })
            .catch(err => {
                console.log(err)
            });

    }

    //注册
    register = () => {
        this.props.history.push('/Register')
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
                    marginRight: '50px'
                }}>
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80"
                          className="demo-ruleForm">
                        <Form.Item label="账号" prop="username">
                            <Input value={this.state.form.username}
                                   onChange={this.onUserChange.bind(this, 'username')}/>
                        </Form.Item>
                        <Form.Item label="密码" prop="password">
                            <Input type="password" value={this.state.form.password}
                                   onChange={this.onPassWordChange.bind(this, 'password')}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                            <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
