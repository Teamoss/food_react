/**
 * redux创建store的方法，可以添加中间件
 * 例如：redux-thunk，redux-logger等
 */
import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
import {allReducers} from '../reducer'
import createLogger  from 'redux-logger'
import thunk from 'redux-thunk'

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const enhancer = composeEnhancers(applyMiddleware(thunk,createLogger))

const store = createStore( allReducers, enhancer) // 创建数据存储仓库

export default store

