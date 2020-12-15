import {PLAYER} from "../Actions/const";

const initialState = {
    src: '',
    bitrate: '',
    codec: '',
    gain: false,
    preview: false,
    host: '',
    path: '',
    s: '',
    ts: '',
    trackid: 0,
    hash: '',
    downloadUrl: '',
    albumId: 0,
    trackInfo: {},
};

export default function playerTrackReducer(state = initialState, action) {
    switch (action.type) {
    case PLAYER.SET_TRACK_PLAYER:
        return {...state, ...action.payload};
    case PLAYER.CLEAR_TRACK_PLAYER:
        return {...state, bitrate: '', codec: '', downloadUrl: '', gain: false, src: '', preview: false, host: '', path: '', s: '', ts: '', trackid: 0, hash: '', albumId: 0, trackInfo: {}};
    default:
        return state;
    }
}
