import React, {Component} from 'react';
import './App.css';
import 'element-theme-default';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Index from './components/Index/Index'
import AdminLogin from './components/admin/AdminLogin'
import AdminRegister from './components/admin/AdminRegister'
import AdminIndex from './components/admin/AdminIndex'
import {HashRouter, Route} from 'react-router-dom'

class App extends Component {

    render() {
        const {history} = this.props
        return (
            <HashRouter>
                <div className="App">
                    <header className="App-header">
                        <Route exact path='/' component={Login} history={history}/>
                        <Route path='/Login' component={Login} history={history}/>
                        <Route path='/Register' component={Register} history={history}/>
                        <Route path='/Index' component={Index} history={history}/>
                        <Route path='/admin' component={AdminLogin} history={history}/>
                        <Route path='/adminLogin' component={AdminLogin} history={history}/>
                        <Route path='/adminRegister' component={AdminRegister} history={history}/>
                        <Route path='/adminIndex' component={AdminIndex} history={history}/>
                    </header>
                </div>
            </HashRouter>
        )
    }
}

export default App
