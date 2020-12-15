import {PLAYER} from "../Actions/const";

const initialState = {
    isPaused: true,
    progress: 0,
    volume: 1,
    muted: false,
};

export default function playerTrackReducer(state = initialState, action) {
    switch (action.type) {
    case PLAYER.SET_PLAYER_STATE:
        return {...state, ...action.payload};
    case PLAYER.CLEAR_PLAYER_STATE:
        return {...state, isPaused: true};
    default:
        return state;
    }
}
