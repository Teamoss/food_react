import React, {Component} from 'react';
import 'element-theme-default';
import {Button, Form, Upload, Input, Message, Layout} from 'element-react';
import 'element-theme-default';
import {connect} from "react-redux";
import Connect from "../../service/address";
import axios from "axios";


class EditFood extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: null,
                price: null,
                description: null,
            },
            imageUrl: null
        };
    }

    componentDidMount() {
        let data = this.props.location.state && this.props.location.state.data ? this.props.location.state.data : null
        if (!data) {
            this.props.history.push('/Index/FoodMenu')
        } else {
            this.setState({
                form:data,
                imageUrl:data.imageUrl
            })
        }
    }

    handleAvatarScucess(res, file) {
        if (res.code === 2000) {
            this.setState({
                imageUrl : res.imageUrl
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

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }


    //确定编辑
    editMessage = () => {
        const { form,imageUrl} = this.state
        axios.post(Connect.editFood, {
            form,
            imageUrl
        }).then(res => {
            if (res.data.code === 2000) {
                Message({
                    showClose: true,
                    message: res.data.message,
                    type: 'success'
                });
                this.props.history.push('/Index/FoodMenu')
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
        this.props.history.push('/Index/FoodMenu')
    }


    render() {
        const {form,imageUrl} = this.state
        return (
            <div style={{height: '100%', width: '100%',paddingTop:50}}>
                <Layout.Row type="flex" justify="center">
                    <Layout.Col span="10">
                        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="菜单名称 : ">
                                <Input value={this.state.form.name}
                                       onChange={this.onChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="菜单价格 :">
                                <Input value={this.state.form.price}
                                       onChange={this.onChange.bind(this, 'price')}/>
                            </Form.Item>
                            <Form.Item label="菜单介绍 :">
                                <Input type="textarea" value={this.state.form.description}
                                       onChange={this.onChange.bind(this, 'description')}/>
                            </Form.Item>
                            <Form.Item label="菜单图片 :">
                                <Upload
                                    className="avatar-uploader"
                                    action="http://localhost:5000/api/uploadFood"
                                    showFileList={false}
                                    onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                                    beforeUpload={file => this.beforeAvatarUpload(file)}
                                >
                                    {imageUrl ? <img src={imageUrl} className="avatar" width={80} height={80}/> :
                                        <i className="el-icon-plus avatar-uploader-icon"/>}
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" nativeType="submit" onClick={this.editMessage}>确定</Button>
                                <Button  nativeType="submit" onClick={this.cancel}>取消</Button>
                            </Form.Item>

                        </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>

        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(EditFood)

