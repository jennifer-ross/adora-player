import {USER} from "../Actions/const";

const initialState = {
    token: '',
    isAuthenticated: false,
    token_type: '',
    expires_in: 0,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
    case USER.LOGIN_USER:
        return {...state, token: action.payload.token, isAuthenticated: action.payload.isAuthenticated, token_type: action.payload.token_type, expires_in: action.payload.expires_in};
    case USER.LOGOUT_USER:
        return {...state, token: '', isAuthenticated: false, expires_in: 0, token_type: ''};
    default:
        return state;
    }
}
