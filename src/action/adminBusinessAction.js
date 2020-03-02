import * as types from '../constant/adminBusinessType'
import axios from 'axios'
import Connect from '../service/address'

export const adminBusiness = (params) => {
    return dispatch => {
        axios.post(Connect.adminBusiness, params)
            .then(res => {
                dispatch(getBusinessSuccess(res))
            })
            .catch(err => {
                dispatch(getBusinessError(err))
            })
    }
}

function getBusinessSuccess(businessData) {
    return {
        type: types.GET_ADMINBUSINESS_SUCCESS,
        businessData
    }
}

function getBusinessError(businessError) {
    return {
        type: types.GET_ADMINBUSINESS_FAILURE,
       businessError
    }
}