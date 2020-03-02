import * as types from '../constant/adminLoginType'

const initialState = {
    adminLoginData: null,
    adminLoginError: null
}

export default function adminLoginReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ADMINLOGIN_SUCCESS:
            return {
                ...state,
                adminLoginData:action.adminLoginData.data
            }
        case types.GET_ADMINLOGIN_FAILURE:
            return {
                ...state,
                adminLoginError: action.adminLoginError.data
            }
        default :
            return  state
    }
}