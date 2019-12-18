import {combineReducers} from "redux";
import loginReducer from './loginReducer';
import businessMessageReducer from './businessMessageReducer';
import foodReducer from './foodReducer';

export const allReducers = combineReducers({
    loginReducer,
    businessMessageReducer,
    foodReducer
})


