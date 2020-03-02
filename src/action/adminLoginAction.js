import * as types from '../constant/adminLoginType'
import axios from 'axios'
import Connect from '../service/address'

export const adminLogin = (params) => {
    return dispatch =>{
        axios.post(Connect.adminLogin,params)
            .then(res=>{
                dispatch(getLoginSuccess(res))
            })
            .catch(err=>{
                dispatch(getLoginError(err))
            })
    }
}

function getLoginSuccess(adminLoginData) {
    return {
        type:types.GET_ADMINLOGIN_SUCCESS,
        adminLoginData
    }
}

function getLoginError(adminLoginError) {
    return {
        type:types.GET_ADMINLOGIN_FAILURE,
        adminLoginError
    }
}