import React, {Component} from 'react';
import './App.css';
import 'element-theme-default';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Index from './components/Index/Index'

import {HashRouter, Route} from 'react-router-dom'

class App extends Component {

    render() {
        const {history} = this.props
        return (
            <HashRouter>
                <div className="App">
                    <header className="App-header">
                        <Route exact path='/' component={Login}/>
                        <Route path='/Login' component={Login}/>
                        <Route path='/Register' component={Register}/>
                        <Route path='/Index' component={Index} history={history}/>
                    </header>
                </div>
            </HashRouter>
        )
    }
}

export default App
