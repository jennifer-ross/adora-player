import {getAccountInfoStorage, getAuthInfoStorage, getAuthStorage, setAdoraCookie} from "./index";
import axios from "axios";
import {ACCOUNT_INFO, AUTH_INFO} from "./const";

const apiAxios = axios.create({
    baseURL: 'https://music.yandex.ru/api/v2.1/',
    headers: {}
});

const defaultAxios = axios.create({
    baseURL: 'https://music.yandex.ru/',
    headers: {}
});

const setAuthInfo = p => ({
    type: AUTH_INFO.SET_AUTH_INFO,
    payload: p
});

const clearAuthInfo = () => ({
    type: AUTH_INFO.CLEAR_AUTH_INFO,
});

export const getAuthInfo = () => {
    return dispatch => {
        return apiAxios.get(`/handlers/auth?external-domain=music.yandex.ru&overembed=no&__t=${Date.now()}`)
            .then(response => {
                if (response.data) {
                    localStorage.setItem('authInfo', JSON.stringify(response.data));
                    dispatch(setAuthInfo(response.data));
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    };
};

const setAccountInfo = p => ({
    type: ACCOUNT_INFO.SET_ACCOUNT_INFO,
    payload: p
});

export const clearAccountInfo= () => ({
    type: ACCOUNT_INFO.CLEAR_ACCOUNT_INFO
});

export const getAccountInfo = () => {
    return dispatch => {
        const user = getAuthInfoStorage();
        if (user) {
            return defaultAxios.get(`/handlers/auth.jsx?lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
                headers: {
                    "X-Current-UID": user.uid
                }
            })
                .then(response => {
                    if (response.data.user) {
                        localStorage.setItem('accountInfo', JSON.stringify(response.data.user));
                        dispatch(setAccountInfo(response.data.user));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

export const getAccountInfoState = () => {
    return dispatch => {
        const accountInfo = getAccountInfoStorage();

        if (accountInfo) {
            dispatch(setAccountInfo(accountInfo));
        }
    };
};

export const getUserSettings = () => {
    return dispatch => {
        const adora = getAuthStorage();

        if (adora !== false) {
            return apiAxios.get(`/account/settings`, {
                headers: {
                    'Authorization': `OAuth ${adora.access_token}`,
                    'Referer': 'https://music.yandex.ru'
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

export const getAuthInfoState = () => {
    return dispatch => {
        const authInfo = getAuthInfoStorage();

        if (authInfo !== false) {
            dispatch(setAuthInfo(authInfo));
        }
    };
};