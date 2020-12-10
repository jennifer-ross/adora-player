import {AUTH} from "./const";
import axios from 'axios';
import {SERVER_PORT} from "../env";
import {getAuthStorage, setAdoraCookie} from "./index";

const loginUser = p => ({
    type: AUTH.AUTH_USER,
    payload: p
});

export const logout= () => ({
    type: AUTH.UNAUTH_USER
});

const sendUserUrl = url => {
    return dispatch => {
        return axios.post(`http://127.0.0.1:${SERVER_PORT}/auth`, {
            headers: {
                'Content-Type': 'application/json'
            },
            url
        })
            .then(response => {
                if (response.data.success === true && response.data.payload) {
                    const {Session_id, sessguard, sessionid2, yandex_login} = response.data.payload;

                    localStorage.setItem('adora_user', JSON.stringify(response.data.payload));

                    const isAuthenticated = true;
                    dispatch(loginUser({isAuthenticated, Session_id, sessguard, sessionid2, yandex_login}));
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    };
};

export const sendUserLogin = user => {
    return dispatch => {
        return axios.get(`https://pda-passport.yandex.ru/passport?mode=auth&login=${user.username}&twoweeks=yes&retpath=`,)
            .then(response => {
                if (response.request.responseURL) {
                    dispatch(sendUserUrl(response.request.responseURL));
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    };
};

export const getAuthState = () => {
    return dispatch => {
        const adora = getAuthStorage();

        if (adora !== false) {
            const isAuthenticated = true;
            const {Session_id, sessguard, sessionid2, yandex_login} = adora;

            setAdoraCookie();

            dispatch(loginUser({Session_id, isAuthenticated, sessguard, sessionid2, yandex_login}));
        }else {
            dispatch(logout());
        }
    };
};