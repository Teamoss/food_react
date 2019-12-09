import * as types from '../constant/loginType'

const initialState = {
    loginData: null,
    loginError: null
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_LOGIN_SUCCESS:
            return {
                ...state,
                loginData:action.loginData.data
            }
        case types.GET_LOGIN_FAILURE:
            return {
                ...state,
                loginError: action.loginError.data
            }
        default :
            return  state
    }
}