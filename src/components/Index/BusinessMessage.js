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
                address: '',
                swiper: ''
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
                form.swiper = userInfo.swiper
                form.phone = userInfo.phone
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
        const {form} = this.state
        return (
            <Layout.Row type="flex" justify="center">
                <Layout.Col span="10">
                    <Form ref="form" model={form} labelWidth="100"
                          className="demo-dynamic">
                        <Form.Item prop="name" label="名称 :">
                            <Input value={form.name}/>
                        </Form.Item>
                        <Form.Item prop="address" label="地址 :">
                            <Input value={form.address}/>
                        </Form.Item>
                        <Form.Item prop="phone" label="联系方式 :">
                            <Input value={form.phone}/>
                        </Form.Item>
                        <Form.Item prop="message" label="介绍 :">
                            <Input type="textarea" value={form.message}/>
                        </Form.Item>
                        <Form.Item prop="logo" label="logo :">
                            <img src={form.logo} width={100}
                                 height={80} alt='商家Logo'/>
                        </Form.Item>
                        <Form.Item prop="swiper" label="描述图片 :">
                            <img src={form.swiper} width={100}
                                 height={80} alt='商家Logo'/>
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