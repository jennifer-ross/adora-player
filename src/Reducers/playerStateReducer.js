import {PLAYER} from "../Actions/const";

const initialState = {
    isPaused: true,
    progress: 0,
    volume: 1,
    muted: false,
    track: {},
    playlist: [],
    currentTime: 0,
};

export default function playerTrackReducer(state = initialState, action) {
    switch (action.type) {
    case PLAYER.SET_PLAYER_STATE:
        localStorage.setItem('playerState', JSON.stringify(action.payload));
        return {...state, ...action.payload};
    case PLAYER.CLEAR_PLAYER_STATE:
        localStorage.setItem('playerState', JSON.stringify(state));
        return {...state, isPaused: true};
    default:
        return state;
    }
}
