import React, {Component} from 'react';
import 'element-theme-default';
import {Button, Form, Upload, Input, Message, Layout, Tabs, Cascader} from 'element-react';
import 'element-theme-default';
import DistPicker from 'react-distpicker';
import {connect} from "react-redux";
import * as businessMessageAction from "../../action/businessMessageAction";
import Connect from "../../service/address";
import axios from "axios";
import cityData from '../../utils/cityData'

class BusinessEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                message: '',
                address: '',
                phone:''
            },
            imageUrl: null,
            swiper: null,
            options: cityData,
            selectedOptions2: [],
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
                form.name = userInfo.business
                form.message = userInfo.content
                form.address = userInfo.address
                form.phone = userInfo.phone
                this.setState({
                    imageUrl: userInfo.logo,
                    swiper: userInfo.swiper,
                    selectedOptions2:userInfo.city
                })
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

    handleAvatarScucess(res, file) {
        if (res.code === 2000) {
            this.setState({
                imageUrl: res.logo
            })
        }
    }

    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            Message('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    }


    handleSwiperScucess(res, file) {
        if (res.code === 2000) {
            this.setState({
                swiper: res.swiper
            })
        }
    }

    beforeSwiperUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            Message('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    clickTab = (tab) => {
        let index = tab.props.name
        if (index == 1) {
            this.props.history.push('/Index/business')
        }
        if (index == 2) {
            this.props.history.push('/Index/business/businessEdit')
        }
    }


    //确定编辑
    editMessage = () => {
        const {form, imageUrl, swiper, selectedOptions2} = this.state

        if ( !form.name || !form.message ||!form.address ||!form.phone ) {
            Message({
                showClose: true,
                message: '请填写完整信息',
                type: 'error'
            });
            return
        }
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let userID = data._id
        axios.post(Connect.editBusinessMessage, {
            userID,
            form,
            imageUrl,
            swiper,
            city: selectedOptions2
        }).then(res => {
            if (res.data.code === 2000) {
                Message({
                    showClose: true,
                    message: res.data.message,
                    type: 'success'
                });
                this.props.history.push('/Index/business')
            }
            if (res.data.code === 2001) {
                Message({
                    showClose: true,
                    message: res.data.message,
                    type: 'error'
                });
            }
        }).catch(err => {
            console.log(err)
        })
    }


    cancel = () => {
        this.props.history.push('/Index/business')
    }

    //地区选择
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }


    render() {
        const {imageUrl, swiper} = this.state;
        return (
            <div style={{height: '100%', width: '100%'}}>
                <Layout.Row>
                    <Layout.Col span="24">
                        <Tabs activeName="2" onTabClick={(tab) => this.clickTab(tab)}>
                            <Tabs.Pane label="商家信息" name="1"/>
                            <Tabs.Pane label="编辑信息" name="2"/>
                        </Tabs>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row type="flex" justify="center">
                    <Layout.Col span="10">
                        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                            <Layout.Row>
                                <Layout.Col span="12">
                                    <Form.Item label="名称 : ">
                                        <Input value={this.state.form.name}
                                               onChange={this.onChange.bind(this, 'name')}/>
                                    </Form.Item>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <Form.Item label="联系方式 : ">
                                        <Input value={this.state.form.phone}
                                               onChange={this.onChange.bind(this, 'phone')}/>
                                    </Form.Item>
                                </Layout.Col>
                            </Layout.Row>

                            <Form.Item label="介绍 :">
                                <Input type="textarea" value={this.state.form.message}
                                       onChange={this.onChange.bind(this, 'message')}/>
                            </Form.Item>

                            <Form.Item label="地区 :">
                                <Layout.Col span="12">
                                    <Cascader
                                        options={this.state.options}
                                        expandTrigger="hover"
                                        value={this.state.selectedOptions2}
                                        onChange={this.handleChange.bind(this, 'selectedOptions2')}/>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <Form.Item label="详细地址 :">
                                        <Input value={this.state.form.address}
                                               onChange={this.onChange.bind(this, 'address')}/>
                                    </Form.Item>
                                </Layout.Col>
                            </Form.Item>
                            <Layout.Row>
                                <Layout.Col span="12">
                                    <Form.Item label="Logo :">
                                        <Upload
                                            className="avatar-uploader"
                                            action="http://localhost:5000/api/uploadLogo"
                                            showFileList={false}
                                            onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                                            beforeUpload={file => this.beforeAvatarUpload(file)}
                                        >
                                            {imageUrl ? <img src={imageUrl} className="avatar" height={80}/> :
                                                <i className="el-icon-plus avatar-uploader-icon"/>}
                                        </Upload>
                                    </Form.Item>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <Form.Item label="描述图片 :">
                                        <Upload
                                            className="avatar-uploader"
                                            action="http://localhost:5000/api/uploadSwiper"
                                            showFileList={false}
                                            onSuccess={(res, file) => this.handleSwiperScucess(res, file)}
                                            beforeUpload={file => this.beforeSwiperUpload(file)}
                                        >
                                            {swiper ? <img src={swiper} className="avatar" height={80}/> :
                                                <i className="el-icon-plus avatar-uploader-icon"/>}
                                        </Upload>
                                    </Form.Item>
                                </Layout.Col>
                            </Layout.Row>

                            <Form.Item>
                                <Button type="primary" nativeType="submit" onClick={this.editMessage}>确定</Button>
                                <Button nativeType="submit" onClick={this.cancel}>取消</Button>
                            </Form.Item>

                        </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>

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
)(BusinessEdit)

