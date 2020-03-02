import {combineReducers} from "redux";
import loginReducer from './loginReducer';
import businessMessageReducer from './businessMessageReducer';
import foodReducer from './foodReducer';
import orderReducer from './orderReducer';
import commentReducer from './commentReducer';
import adminLoginReducer from './adminLoginReducer';
import adminBusinessReducer from './adminBusinessReducer';


export const allReducers = combineReducers({
    loginReducer,
    businessMessageReducer,
    foodReducer,
    orderReducer,
    commentReducer,
    adminLoginReducer,
    adminBusinessReducer
})


