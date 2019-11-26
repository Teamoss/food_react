import React, {Component} from 'react';
import 'element-theme-default';
import {Tabs, Layout, Menu, Form, Input, Button} from 'element-react';
import {Route, Link, Switch} from 'react-router-dom'

class BusinessMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                logo: '',
                name: '',
                message: '',
                address: ''
            },
        };
    }


    editMessage() {
        this.props.history.push('/Index/business/businessEdit')
    }


    render() {
        return (
            <Layout.Row type="flex" justify="center">
                <Layout.Col span="10">
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100"
                          className="demo-dynamic">
                        <Form.Item prop="logo" label="商家logo :">
                            <img src="https://avatars1.githubusercontent.com/u/51401016?s=40&v=4" alt='商家Logo'/>
                        </Form.Item>
                        <Form.Item prop="name" label="商家名称 :">
                            <Input value={this.state.form.name}/>
                        </Form.Item>
                        <Form.Item prop="message" label="商家介绍 :">
                            <Input type="textarea" value={this.state.form.message}/>
                        </Form.Item>
                        <Form.Item prop="address" label="商家地址 :">
                            <Input value={this.state.form.address}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.editMessage.bind(this)}>编辑信息</Button>
                        </Form.Item>
                    </Form>
                </Layout.Col>
            </Layout.Row>
        )
    }
}

export default BusinessMessage
