import {USER} from "./const";
import axios from 'axios';
import {CLIENT_ID, DEVICE_ID, SERVER_PORT} from "../env";

const loginUser = p => ({
    type: USER.LOGIN_USER,
    payload: p
});

export const logout= () => ({
    type: USER.LOGOUT_USER
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
                    const {access_token, expires_in, token_type} = response.data.payload;

                    localStorage.setItem('adora_user', JSON.stringify(response.data.payload));

                    const isAuthenticated = true;
                    dispatch(loginUser({isAuthenticated, token: access_token, token_type, expires_in}));
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
        const params = {
            response_type: 'token',
            client_id: CLIENT_ID,
            device_id: DEVICE_ID,
            login_hint: user,
            force_confirm: true,
        };

        return axios.get(`https://oauth.yandex.ru/authorize?response_type=${params.response_type}&client_id=${params.client_id}&device_id=${params.device_id}&login_hint=${user.username}&force_confirm=${params.force_confirm}`,)
            .then(response => {
                if (response.request.responseURL) {
                    console.log(response);
                    dispatch(sendUserUrl(response.request.responseURL));
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    };
};

export const getUserState = () => {
    return dispatch => {
        const adora_user = localStorage.adora_user;

        if (adora_user) {
            const isAuthenticated = true;
            const adora = JSON.parse(adora_user);

            if (adora.hasOwnProperty('access_token') && adora.hasOwnProperty('expires_in') && adora.hasOwnProperty('token_type')) {
                const token = adora.access_token;
                const expires_in = adora.expires_in;
                const token_type = adora.token_type;

                dispatch(loginUser({token, isAuthenticated, expires_in, token_type}));
            }else {
                dispatch(logout());
            }
        }else {
            dispatch(logout());
        }
    };
};