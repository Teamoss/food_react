import * as types from '../constant/commentType'

const initialState = {
    commentData: null,
    commentError: null
}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_COMMENT_SUCCESS:
            return {
                ...state,
                commentData:action.commentData.data
            }
        case types.GET_COMMENT_FAILURE:
            return {
                ...state,
                commentError: action.commentError.data
            }
        default :
            return  state
    }
}