import {USER} from "../Actions/const";

const initialState = {
    login: '',
    birthday: null,
    client_id: '',
    default_avatar_id: '',
    default_email: '',
    display_name: '',
    emails: [],
    first_name: '',
    id: '',
    is_avatar_empty: true,
    last_name: '',
    psuid: '',
    real_name: '',
    sex: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case USER.SET_USER:
        return {...state, ...action.payload};
    case USER.CLEAR_USER:
        return {...state,
            login: '',
            birthday: null,
            client_id: '',
            default_avatar_id: '',
            default_email: '',
            display_name: '',
            emails: [],
            first_name: '',
            id: '',
            is_avatar_empty: true,
            last_name: '',
            psuid: '',
            real_name: '',
            sex: '',
        };
    default:
        return state;
    }
}
