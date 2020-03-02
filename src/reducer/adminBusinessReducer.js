import * as types from '../constant/adminBusinessType'

const initialState = {
    businessData: null,
    businessError: null
}

export default function adminBusinessReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ADMINBUSINESS_SUCCESS:
            return {
                ...state,
                businessData:action.businessData.data
            }
        case types.GET_ADMINBUSINESS_FAILURE:
            return {
                ...state,
                businessError: action.businessError.data
            }
        default :
            return  state
    }
}