import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Menu} from 'element-react';
import {Route, Link, Switch} from 'react-router-dom'
import BusinessList from './BusinessList'



class AdminIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('adminInfo'));
        let username = data.username
        this.setState({
            username
        })
    }

    onSelect = (index) => {

        if (index == 5) { //退出登录
            this.props.history.push("/adminLogin");
        }
    }

    render() {
        const {username,activeIndex} = this.state
        return (
            <div style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Menu theme="dark" defaultActive={activeIndex} className="el-menu-demo" mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    <Layout.Row>
                        <Layout.Col span="19">
                                <Menu.Item index="3">商家管理</Menu.Item>
                        </Layout.Col>
                        <Layout.Col span="3">
                            <Menu.Item index="4">欢迎管理員：{username}</Menu.Item>
                        </Layout.Col>
                        <Layout.Col span="2">
                            <Menu.Item index="5">退出</Menu.Item>
                        </Layout.Col>
                    </Layout.Row>
                </Menu>
                <Switch>
                    <Route exact path='/adminIndex' component={BusinessList}/>
                </Switch>
            </div>
        )
    }
}

export default AdminIndex
