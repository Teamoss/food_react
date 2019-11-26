import React, {Component} from 'react';
import 'element-theme-default';
import {Button, Form, Menu} from 'element-react';
import {Route,Link,Switch} from 'react-router-dom'
import BusinessEdit from './BusinessEdit'
import Business from './Business'

class NavMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onSelect = () => {

    }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">处理中心</Menu.Item>
                    <Menu.SubMenu index="2" title="我的工作台">
                        <Menu.Item index="2-1">选项1</Menu.Item>
                        <Menu.Item index="2-2">选项2</Menu.Item>
                        <Menu.Item index="2-3">选项3</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="3">订单管理</Menu.Item>
                    <Link to='/Index/business'>
                        <Menu.Item index="4">商家信息</Menu.Item>
                    </Link>
                </Menu>
                <Switch>
                    <Route exact path='/Index/business' component={Business}/>
                    <Route exact path='/Index/business/businessEdit' component={BusinessEdit}/>
                </Switch>
            </div>
        )
    }
}
export default NavMenu
