import React, {Component} from 'react';
import 'element-theme-default';
import {Button, Form, Upload, Input, Message, Layout, Tabs} from 'element-react';
import 'element-theme-default';
import BusinessMessage from "./BusinessMessage";

class BusinessEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                message: '',
                logo: '',
                region: '',
                date1: null,
                date2: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    handlePreview(file) {
        console.log('preview');
    }

    handleRemove(file, fileList) {
        console.log('remove');
    }


    clickTab = (tab) => {
        let index = tab.props.name
        if(index == 1){
            this.props.history.push('/Index/business')
        }
        if(index == 2){
            this.props.history.push('/Index/business/businessEdit')
        }
    }
    render() {

        const fileList = [
            {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
            }, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'}
        ];
        return (
            <div style={{height:'100%',width:'100%'}}>
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
                            <Form.Item label="商家名称 : ">
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="商家介绍 :">
                                <Input type="textarea" value={this.state.form.message}
                                       onChange={this.onChange.bind(this, 'message')}/>
                            </Form.Item>
                            <Form.Item label="商家Logo :">
                                <Upload
                                    className="upload-demo"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    onPreview={file => this.handlePreview(file)}
                                    onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                                    fileList={fileList}
                                    limit={3}
                                    onExceed={(files, fileList) => {
                                        Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                                    }}
                                    tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>}
                                >
                                    <Button size="small" type="primary">点击上传</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" nativeType="submit">确定</Button>
                                <Button>取消</Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>

        )
    }
}

export default BusinessEdit
