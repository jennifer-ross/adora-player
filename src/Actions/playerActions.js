import {getPlayerStateStorage} from "./index";
import {PLAYER} from "./const";

export const setPlayerState = p => ({
    type: PLAYER.SET_PLAYER_STATE,
    payload: p
});

export const getPlayerStateState = () => {
    return dispatch => {
        const playerState = getPlayerStateStorage();

        if (playerState !== false) {
            dispatch(setPlayerState(playerState));
        }
    };
};