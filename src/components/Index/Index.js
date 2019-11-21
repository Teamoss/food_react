import React, {Component} from 'react';
import 'element-theme-default';
import NavMenu from './NavMenu'

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render()
    {
        return (
           <div>
               <NavMenu/>
           </div>
        )
    }
}
export default Index
