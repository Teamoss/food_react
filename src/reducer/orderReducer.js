import * as types from '../constant/orderType'

const initialState = {
    orderData: null,
    orderError: null
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ORDER_SUCCESS:
            return {
                ...state,
                orderData:action.orderData.data
            }
        case types.GET_ORDER_FAILURE:
            return {
                ...state,
                orderError: action.orderError.data
            }
        default :
            return  state
    }
}