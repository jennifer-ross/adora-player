import {AUTH} from "./const";
import axios from 'axios';
import {CLIENT_ID, DEVICE_ID, SERVER_PORT} from "../env";
import {getAuthStorage} from "./index";

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

export const getAuthState = () => {
    return dispatch => {
        const adora = getAuthStorage();

        if (adora !== false) {
            const isAuthenticated = true;
            const token = adora.access_token;
            const expires_in = adora.expires_in;
            const token_type = adora.token_type;

            dispatch(loginUser({token, isAuthenticated, expires_in, token_type}));
        }else {
            dispatch(logout());
        }
    };
};