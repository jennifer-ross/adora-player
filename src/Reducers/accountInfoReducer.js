import {ACCOUNT_INFO} from "../Actions/const";

const initialState = {
    avatarHash: '',
    device_id: '',
    firstName: '',
    hasAvatar: false,
    hasEmail: false,
    havePlus: false,
    isHosted: false,
    isMobileUser: false,
    isYandex: false,
    kpOttSubscription: '',
    lastName: '',
    login: '',
    name: '',
    onlyDeviceId: '',
    plus: {},
    settings: {},
    sign: '',
    signUpMethod: '',
    sk: '',
    subeditor: '',
    subeditorLevel: '',
    subscription: {},
    uid: {},
};

export default function accountInfoReducer(state = initialState, action) {
    switch (action.type) {
    case ACCOUNT_INFO.SET_ACCOUNT_INFO:
        return {...state, ...action.payload};
    case ACCOUNT_INFO.CLEAR_ACCOUNT_INFO:
        return {...state};
    default:
        return state;
    }
}
