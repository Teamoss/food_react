import * as types from '../constant/loginType'
import axios from 'axios'
import Connect from '../service/address'

export const getLogin = (params) => {
    return dispatch =>{
        axios.post(Connect.login,params)
            .then(res=>{
                dispatch(getLoginSuccess(res))
            })
            .catch(err=>{
                dispatch(getLoginError(err))
            })
    }
}

function getLoginSuccess(loginData) {
    return {
        type:types.GET_LOGIN_SUCCESS,
        loginData
    }
}

function getLoginError(loginError) {
    return {
        type:types.GET_LOGIN_FAILURE,
        loginError
    }
}