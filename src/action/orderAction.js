import * as types from '../constant/orderType'
import axios from 'axios'
import Connect from '../service/address'

export const findAllBusinessOrder = (params) => {
    return dispatch => {
        axios.post(Connect.findAllBusinessOrder, params)
            .then(res => {
                dispatch(getAllBusinessOrderSuccess(res))
            })
            .catch(err => {
                dispatch(getAllBusinessOrderError(err))
            })
    }
}

function getAllBusinessOrderSuccess(orderData) {
    return {
        type: types.GET_ORDER_SUCCESS,
        orderData
    }
}

function getAllBusinessOrderError(orderError) {
    return {
        type: types.GET_ORDER_FAILURE,
        orderError
    }
}