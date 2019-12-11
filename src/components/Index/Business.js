import React, {Component} from 'react';
import 'element-theme-default';
import {Tabs} from 'element-react';
import BusinessMessage from "./BusinessMessage";
import {Route,Switch} from 'react-router-dom'

class Business extends Component {

    constructor(props) {
        super(props);
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
        return (
               <div  style={{height:'100%',width:'100%'}}>
                   <Tabs activeName="1" onTabClick={ (tab) =>this.clickTab(tab) }>
                       <Tabs.Pane label="商家信息" name="1"/>
                       <Tabs.Pane label="编辑信息" name="2"/>
                   </Tabs>
                   <Switch>
                       <Route exact path='/Index/business' component={BusinessMessage}/>
                   </Switch>
               </div>
        )
    }
}

export default Business
