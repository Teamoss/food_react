import * as types from '../constant/businessMessageType'

const initialState = {
    businessMessageData: null,
    businessMessageError: null
}

export default function businessMessageReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_BUSINESSMESSAGE_SUCCESS:
            return {
                ...state,
                businessMessageData:action.businessMessageData.data
            }
        case types.GET_BUSINESSMESSAGE_FAILURE:
            return {
                ...state,
                businessMessageError: action.businessMessageError.data
            }
        default :
            return  state
    }
}