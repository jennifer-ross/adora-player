import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import accountInfoReducer from "./accountInfoReducer";
import authInfoReducer from "./authInfoReducer";
import newReleasesReducer from "./newReleasesReducer";
import userHistoryReducer from "./userHistoryReducer";
import yandexChartReducer from "./yandexChartReducer";
import nonMusicBlocksReducer from "./nonMusicBlocksReducer";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    account: accountInfoReducer,
    authInfo: authInfoReducer,
    newReleases: newReleasesReducer,
    userHistory: userHistoryReducer,
    yandexChart: yandexChartReducer,
    nonMusicBlocks: nonMusicBlocksReducer,
});