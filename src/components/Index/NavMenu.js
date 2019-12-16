import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Menu} from 'element-react';
import {Route, Link, Switch} from 'react-router-dom'
import BusinessEdit from './BusinessEdit'
import Business from './Business'
import FoodMenu from './FoodMenu'
import AddFood from './AddFood'

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSelect = (index) => {
        if (index == 1) {

        }
        if (index == 2) {

        }
        if (index == '2-1') {
            this.props.history.push('/Index/FoodMenu')
        }
        if (index == '2-2') {
            this.props.history.push('/Index/AddFood')
        }
        if (index == 3) {

        }
        if (index == 4) { //退出登录
            this.props.history.push("/Login");
        }
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    <Layout.Row>
                        <Layout.Col span="22">
                            <Menu.SubMenu index="1" title="订单管理">
                                <Menu.Item index="1-1">选项1</Menu.Item>
                                <Menu.Item index="1-2">选项2</Menu.Item>
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="2" title="菜单管理">
                                <Menu.Item index="2-1">菜单管理</Menu.Item>
                                <Menu.Item index="2-2">上传新品</Menu.Item>
                            </Menu.SubMenu>
                            <Link to='/Index/business'>
                                <Menu.Item index="3">商家信息</Menu.Item>
                            </Link>
                        </Layout.Col>
                        <Layout.Col span="2">
                            <Menu.Item index="4">退出</Menu.Item>
                        </Layout.Col>
                    </Layout.Row>

                </Menu>
                <Switch>
                    <Route exact path='/Index/business' component={Business}/>
                    <Route exact path='/Index/business/businessEdit' component={BusinessEdit}/>
                    <Route exact path='/Index/FoodMenu' component={FoodMenu}/>
                    <Route exact path='/Index/AddFood' component={AddFood}/>
                </Switch>
            </div>
        )
    }
}

export default NavMenu
