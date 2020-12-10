import {AUTH_INFO} from "../Actions/const";

const initialState = {
    badRegion: false,
    csrf: '',
    device_id: '',
    experiments: {},
    freshCsrf: '',
    lang: '',
    logged: false,
    login: '',
    notFree: false,
    premium: false,
    timestamp: 0,
    uid: '',
    yandexuid: '',
};

export default function authInfoReducer(state = initialState, action) {
    switch (action.type) {
    case AUTH_INFO.SET_AUTH_INFO:
        return {...state, ...action.payload};
    case AUTH_INFO.CLEAR_AUTH_INFO:
        return {...state};
    default:
        return state;
    }
}
