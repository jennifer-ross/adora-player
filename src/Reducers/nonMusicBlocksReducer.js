import {NON_MUSIC_BLOCKS} from "../Actions/const";

const initialState = {
};

export default function nonMusicBlocksReducer(state = initialState, action) {
    switch (action.type) {
    case NON_MUSIC_BLOCKS.SET_NON_MUSIC_BLOCKS:
        return {...state, ...action.payload};
    case NON_MUSIC_BLOCKS.CLEAR_NON_MUSIC_BLOCKS:
        return {...state};
    default:
        return state;
    }
}
