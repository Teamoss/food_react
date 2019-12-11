import * as types from '../constant/businessMessageType'
import axios from 'axios'
import Connect from '../service/address'

export const getBusinessMessage = (params) => {
    console.log(params)
    return dispatch =>{
        axios.post(Connect.getBusinessMessage,params)
            .then(res=>{
                dispatch(getBusinessMessageSuccess(res))
            })
            .catch(err=>{
                dispatch(getBusinessMessageError(err))
            })
    }
}

function getBusinessMessageSuccess(businessMessageData) {
    return {
        type:types.GET_BUSINESSMESSAGE_SUCCESS,
        businessMessageData
    }
}

function getBusinessMessageError(businessMessageError) {
    return {
        type:types.GET_BUSINESSMESSAGE_FAILURE,
        businessMessageError
    }
}