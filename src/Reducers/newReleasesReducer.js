import {NEW_RELEASES} from "../Actions/const";

const initialState = {
    data: [],
    expires_at: 0,
};

export default function newReleasesReducer(state = initialState, action) {
    switch (action.type) {
    case NEW_RELEASES.SET_NEW_RELEASES:
        return {...state, data: action.payload.data, expires_at: action.payload.expires_at};
    case NEW_RELEASES.CLEAR_NEW_RELEASES:
        return {...state, data: [], expires_at: 0};
    default:
        return state;
    }
}
