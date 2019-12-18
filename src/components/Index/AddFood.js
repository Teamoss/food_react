import React, {Component} from 'react';
import 'element-theme-default';
import {Button, Form, Upload, Input, Message, Layout, Tabs} from 'element-react';
import 'element-theme-default';
import {connect} from "react-redux";
import Connect from "../../service/address";
import axios from "axios";


class AddFood extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: null,
                description: null,
                price: null
            },
            imageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
        };
    }


    handleAvatarScucess = (res, file) => {
        if (res.code === 2000) {
            this.setState({
                imageUrl: res.imageUrl
            })
        }
    }

    beforeAvatarUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            Message('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }


    addFood = () => {
        const {form, imageUrl} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        axios.post(Connect.addFood, {
            business,
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
        const {imageUrl} = this.state;
        return (
            <div style={{
                height: '100%',
                width: '100%',
                paddingTop: 50
            }}
            >
                <Layout.Row type="flex" justify="center">
                    <Layout.Col span="10">
                        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)} >
                            <Form.Item label="菜品名称 : ">
                                <Input value={this.state.form.name}
                                       onChange={this.onChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="菜品介绍 :">
                                <Input value={this.state.form.description}
                                       onChange={this.onChange.bind(this, 'description')}/>
                            </Form.Item>
                            <Form.Item label="菜品价格 :">
                                <Input value={this.state.form.price}
                                       onChange={this.onChange.bind(this, 'price')}/>
                            </Form.Item>
                            <Form.Item label="菜品图片 :">
                                <Upload
                                    className="avatar-uploader"
                                    action="http://localhost:5000/api/uploadFood"
                                    showFileList={false}
                                    onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                                    beforeUpload={file => this.beforeAvatarUpload(file)}
                                >
                                    {imageUrl ? <img width={50} height={50} src={imageUrl} className="avatar"/> :
                                        <i className="el-icon-plus avatar-uploader-icon"/>}
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" nativeType="submit" onClick={this.addFood}>添加</Button>
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
)(AddFood)

