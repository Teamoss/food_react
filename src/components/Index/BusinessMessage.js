import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Form, Input, Button} from 'element-react';
import {connect} from "react-redux";
import * as businessMessageAction from "../../action/businessMessageAction";

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

    componentDidMount() {
        this.loadMessage()
    }

    componentWillReceiveProps(nextProps) {
        const {form} = this.state
        if (nextProps.businessMessageData) {
            let data = nextProps.businessMessageData
            if (data.code === 2000) {
                let userInfo = data.userInfo
                form.logo = userInfo.logo
                form.name = userInfo.business
                form.message = userInfo.content
                form.address = userInfo.address
            }
        }
    }

    loadMessage = () => {
        const {getBusinessMessage} = this.props
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let userID = data._id
        getBusinessMessage({
            userID
        })
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
                        <Form.Item prop="name" label="商家名称 :">
                            <Input value={this.state.form.name}/>
                        </Form.Item>
                        <Form.Item prop="address" label="商家地址 :">
                            <Input value={this.state.form.address}/>
                        </Form.Item>
                        <Form.Item prop="message" label="商家介绍 :">
                            <Input type="textarea" value={this.state.form.message}/>
                        </Form.Item>
                        <Form.Item prop="logo" label="商家logo :">
                            <img src={this.state.form.logo} width={100}
                                 height={100} alt='商家Logo'/>
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

export default connect(
    (state) => ({
        businessMessageData: state.businessMessageReducer.businessMessageData,
        businessMessageError: state.businessMessageReducer.businessMessageError,
    }),
    (dispatch) => ({
        getBusinessMessage: (params) => dispatch(businessMessageAction.getBusinessMessage(params)),
    })
)(BusinessMessage)