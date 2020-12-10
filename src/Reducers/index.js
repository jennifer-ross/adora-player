import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import accountInfoReducer from "./accountInfoReducer";
import authInfoReducer from "./authInfoReducer";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    account: accountInfoReducer,
    authInfo: authInfoReducer,
});