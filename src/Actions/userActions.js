import {USER} from "./const";
import axios from "axios";
import {getAuthStorage} from "./index";

const setUser = p => ({
    type: USER.SET_USER,
    payload: p
});

export const clearUser= () => ({
    type: USER.CLEAR_USER
});

export const getUserInfo = () => {
    return dispatch => {
        const adora = getAuthStorage();

        if (adora !== false) {
            return axios.get(`https://login.yandex.ru/info?format=json`, {
                headers: {
                    'Authorization': `OAuth ${adora.access_token}`
                }
            })
                .then(response => {
                    if (response.data) {
                        localStorage.setItem('userInfo', JSON.stringify(response.data));
                        dispatch(setUser(response.data));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

export const getUserState = () => {
    return dispatch => {
        const userInfo = localStorage.userInfo;

        if (userInfo) {
            const user = JSON.parse(userInfo);

            if (user) {
                dispatch(setUser({...user}));
            }
        }
    };
};