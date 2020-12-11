import {
    getAccountInfoStorage,
    getAuthInfoStorage,
    getAuthStorage,
    getNewReleasesStorage,
    setAdoraCookie
} from "./index";
import axios from "axios";
import {ACCOUNT_INFO, AUTH_INFO, NEW_RELEASES} from "./const";

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

const setNewReleases = p => ({
    type: NEW_RELEASES.SET_NEW_RELEASES,
    payload: p
});

export const clearNewReleases= () => ({
    type: NEW_RELEASES.CLEAR_NEW_RELEASES
});

export const getNewReleases = () => {
    return dispatch => {
        const authInfo = getAuthInfoStorage();

        if (authInfo !== false) {
            return defaultAxios.get(`/handlers/main.jsx?what=new-releases&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
                headers: {
                    'X-Current-UID': authInfo.uid,
                }
            })
                .then(response => {
                    if (response.data.newReleases) {
                        const releases = {
                            expires_at: Date.now() + (3600 * 1000),
                            data: response.data.newReleases,
                        };

                        localStorage.setItem('newReleases', JSON.stringify(releases));
                        dispatch(setNewReleases(releases));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

export const getAlbumInfo = async albumId => {
    let album = {};
    const authInfo = getAuthInfoStorage();

    if (authInfo !== false && albumId) {
        await defaultAxios.get(`/handlers/album.jsx?album=${albumId}&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
            headers: {
                'X-Current-UID': authInfo.uid,
            }
        })
            .then(response => {
                if (response.data) {
                    album = response.data;
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    }

    return album;
};

export const getAlbumsInfo = async albumsIds => {
    const albums = [];
    const authInfo = getAuthInfoStorage();

    if (authInfo !== false && Array.isArray(albumsIds) && albumsIds.length > 0) {
        await defaultAxios.get(`/handlers/albums.jsx?albumIds=${albumsIds.join()}&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
            headers: {
                'X-Current-UID': authInfo.uid,
            }
        })
            .then(response => {
                if (response.data) {
                    albums.push(...response.data);
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                }
            });
    }
    return albums;
};

export const getNewReleasesState = () => {
    return dispatch => {
        const releases = getNewReleasesStorage();

        if (releases !== false && releases.expires_at >= Date.now()) {
            dispatch(setNewReleases(releases));
        }else {
            dispatch(clearNewReleases());
            dispatch(getNewReleases());
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