import * as types from '../constant/foodType'

const initialState = {
    foodData: null,
    foodError: null
}

export default function foodReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_FOOD_SUCCESS:
            return {
                ...state,
                foodData:action.foodData.data
            }
        case types.GET_FOOD_FAILURE:
            return {
                ...state,
                foodError: action.foodError.data
            }
        default :
            return  state
    }
}