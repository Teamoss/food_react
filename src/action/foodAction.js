import * as types from '../constant/foodType'
import axios from 'axios'
import Connect from '../service/address'

export const findAllFood = (params) => {
    return dispatch => {
        axios.post(Connect.findAllFood, params)
            .then(res => {
                dispatch(getAllFoodSuccess(res))
            })
            .catch(err => {
                dispatch(getAllFoodError(err))
            })
    }
}

function getAllFoodSuccess(foodData) {
    return {
        type: types.GET_FOOD_SUCCESS,
        foodData
    }
}

function getAllFoodError(foodError) {
    return {
        type: types.GET_FOOD_FAILURE,
        foodError
    }
}