import * as types from '../constant/commentType'
import axios from 'axios'
import Connect from '../service/address'

export const findAllComment = (params) => {
    return dispatch => {
        axios.post(Connect.findAllComment, params)
            .then(res => {
                dispatch(getAllCommentSuccess(res))
            })
            .catch(err => {
                dispatch(getAllCommentError(err))
            })
    }
}

function getAllCommentSuccess(commentData) {
    return {
        type: types.GET_COMMENT_SUCCESS,
        commentData
    }
}

function getAllCommentError(commentError) {
    return {
        type: types.GET_COMMENT_FAILURE,
        commentError
    }
}