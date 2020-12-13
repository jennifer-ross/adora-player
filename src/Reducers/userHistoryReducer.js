import {USER_HISTORY} from "../Actions/const";

const initialState = {
    counts: {},
    hasTracks: true,
    isRadioAvailable: true,
    owner: {},
    profiles: [],
    success: false,
    tracksIds: [],
    tracks: [],
    verified: false,
    visibility: false,
};

export default function userHistoryReducer(state = initialState, action) {
    switch (action.type) {
    case USER_HISTORY.SET_USER_HISTORY:
        return {...state, ...action.payload};
    case USER_HISTORY.CLEAR_USER_HISTORY:
        return {...state};
    default:
        return state;
    }
}
