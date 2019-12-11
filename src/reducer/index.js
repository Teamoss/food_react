import {combineReducers} from "redux";
import loginReducer from './loginReducer';
import businessMessageReducer from './businessMessageReducer';

export const allReducers = combineReducers({
    loginReducer,
    businessMessageReducer,
})


