import {AUTH} from "../Actions/const";

const initialState = {
    isAuthenticated: false,
    Session_id: {},
    sessguard: {},
    sessionid2: {},
    yandex_login: {},
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
    case AUTH.AUTH_USER:
        return {...state, ...action.payload};
    case AUTH.UNAUTH_USER:
        return {...state, yandex_login: {}, isAuthenticated: false, sessionid2: {}, Session_id: {}, sessguard: {}};
    default:
        return state;
    }
}
