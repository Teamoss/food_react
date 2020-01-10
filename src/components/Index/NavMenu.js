import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Menu} from 'element-react';
import {Route, Link, Switch} from 'react-router-dom'
import BusinessEdit from './BusinessEdit'
import Business from './Business'
import FoodMenu from './FoodMenu'
import AddFood from './AddFood'
import EditFood from './EditFood'
import MissOrder from './MissOrder'
import ReceivedOrder from './ReceivedOrder'
import FinishOrder from './FinishOrder'
import Comment from './Comment'


class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let username = data.username
        this.setState({
            username
        })
    }

    onSelect = (index) => {
        if (index == '1-1') {
            this.props.history.push('/Index/MissOrder')
        }
        if (index == '1-2') {
            this.props.history.push('/Index/ReceivedOrder')
        }
        if (index == '1-3') {
            this.props.history.push('/Index/FinishOrder')
        }
        if (index == '2-1') {
            this.props.history.push('/Index/FoodMenu')
        }
        if (index == '2-2') {
            this.props.history.push('/Index/AddFood')
        }
        if (index == 5) { //退出登录
            this.props.history.push("/");
        }
        if (index == 6) {
            this.props.history.push('/Index/comment')
        }
    }

    render() {
        const {username} = this.state
        return (
            <div style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    <Layout.Row>
                        <Layout.Col span="19">
                            <Menu.SubMenu index="1" title="订单管理">
                                <Menu.Item index="1-1">待接订单</Menu.Item>
                                <Menu.Item index="1-2">已接订单</Menu.Item>
                                <Menu.Item index="1-3">完成订单</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="2" title="菜单管理">
                                <Menu.Item index="2-1">菜单管理</Menu.Item>
                                <Menu.Item index="2-2">上传新品</Menu.Item>
                            </Menu.SubMenu>
                            <Link to='/Index/business'>
                                <Menu.Item index="3">商家信息</Menu.Item>
                            </Link>
                            <Menu.Item index="6">顾客评论</Menu.Item>
                        </Layout.Col>
                        <Layout.Col span="3">
                            <Menu.Item index="4">欢迎用户：{username}</Menu.Item>
                        </Layout.Col>
                        <Layout.Col span="2">
                            <Menu.Item index="5">退出</Menu.Item>
                        </Layout.Col>
                    </Layout.Row>
                </Menu>
                <Switch>
                    <Route exact path='/Index' component={MissOrder}/>
                    <Route exact path='/Index/business' component={Business}/>
                    <Route exact path='/Index/business/businessEdit' component={BusinessEdit}/>
                    <Route exact path='/Index/FoodMenu' component={FoodMenu}/>
                    <Route exact path='/Index/AddFood' component={AddFood}/>
                    <Route exact path='/Index/EditFood' component={EditFood}/>
                    <Route exact path='/Index/MissOrder' component={MissOrder}/>
                    <Route exact path='/Index/ReceivedOrder' component={ReceivedOrder}/>
                    <Route exact path='/Index/FinishOrder' component={FinishOrder}/>
                    <Route exact path='/Index/comment' component={Comment}/>
                </Switch>
            </div>
        )
    }
}

export default NavMenu
