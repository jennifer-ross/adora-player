import {
    generateAudio,
    getAccountInfoStorage,
    getAuthInfoStorage,
    getAuthStorage,
    getNewReleasesStorage,
    setAdoraCookie
} from "./index";
import axios from "axios";
import {ACCOUNT_INFO, AUTH_INFO, NEW_RELEASES, NON_MUSIC_BLOCKS, PLAYER, USER_HISTORY, YANDEX_CHART} from "./const";

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

const setUserHistory = p => ({
    type: USER_HISTORY.SET_USER_HISTORY,
    payload: p
});

export const clearUserHistory = () => ({
    type: USER_HISTORY.CLEAR_USER_HISTORY
});

export const getUserHistory = () => {
    return dispatch => {
        const authInfo = getAuthInfoStorage();

        if (authInfo !== false) {
            return defaultAxios.get(`/handlers/library.jsx?owner=${authInfo.login}&filter=history&likeFilter=favorite&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
                headers: {
                    'X-Current-UID': authInfo.uid,
                }
            })
                .then(response => {
                    if (response.data) {
                        dispatch(setUserHistory(response.data));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

const setYandexChart = p => ({
    type: YANDEX_CHART.SET_YANDEX_CHART,
    payload: p
});

export const clearYandexChart = () => ({
    type: YANDEX_CHART.CLEAR_YANDEX_CHART
});

export const getYandexChart = () => {
    return dispatch => {
        const authInfo = getAuthInfoStorage();

        if (authInfo !== false) {
            return defaultAxios.get(`/handlers/main.jsx?what=chart&chartRegion=world&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
                headers: {
                    'X-Current-UID': authInfo.uid,
                }
            })
                .then(response => {
                    if (response.data) {
                        dispatch(setYandexChart(response.data));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

const setNonMusicBlocks = p => ({
    type: NON_MUSIC_BLOCKS.SET_NON_MUSIC_BLOCKS,
    payload: p
});

export const clearNonMusicBlocks = () => ({
    type: NON_MUSIC_BLOCKS.CLEAR_NON_MUSIC_BLOCKS
});

export const getNonMusicBlocks = () => {
    return dispatch => {
        const authInfo = getAuthInfoStorage();

        if (authInfo !== false) {
            return defaultAxios.get(`/handlers/main.jsx?what=chart&chartType=podcasts&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.1822837925478349`, {
                headers: {
                    'X-Current-UID': authInfo.uid,
                }
            })
                .then(response => {
                    if (response.data) {
                        dispatch(setNonMusicBlocks(response.data));
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                    }
                });
        }
    };
};

const setTrackPlayer = p => ({
    type: PLAYER.SET_TRACK_PLAYER,
    payload: p
});

export const clearTrackPlayer = () => ({
    type: PLAYER.CLEAR_TRACK_PLAYER
});


export const getTrackDownloadInfo = trackKey => {
    const authInfo = getAuthInfoStorage();

    if (authInfo !== false && trackKey) {
        return apiAxios.get(`/handlers/track/${trackKey}/web-home_new-auto-playlist_of_the_day-playlist-main/download/m?hq=1&external-domain=music.yandex.ru&overembed=no&__t=${Date.now()}`, {
            headers: {
                'X-Current-UID': authInfo.uid,
            }
        });
    }
};

export const storageDownloadFile = src => {
    const authInfo = getAuthInfoStorage();

    if (authInfo !== false && src) {
        return apiAxios.get(`${src}&format=json&external-domain=music.yandex.ru&overembed=no&__t=${Date.now()}`, {
            headers: {
                'X-Current-UID': authInfo.uid,
            }
        });
    }
};

export const getTrackInfo = (trackId) => {
    const authInfo = getAuthInfoStorage();

    if (authInfo !== false && trackId) {
        return defaultAxios.get(`/handlers/track.jsx?track=${trackId}&lang=ru&external-domain=music.yandex.ru&overembed=false`, {
            headers: {
                'X-Current-UID': authInfo.uid,
            }
        });
    }
};

export const getTrackObject = (trackkey) => {
    return dispatch => {
        if (trackkey) {
            const slplitted = trackkey.split(':');
            const trackid = slplitted[0];
            const albumId = slplitted[1];

            getTrackDownloadInfo(trackkey).then(response => {
                if (response.data) {
                    const {src, bitrate, codec, gain, preview} = response.data;
                    storageDownloadFile(src).then(resp => {
                        const {path, host, s, ts} = resp.data;
                        const audio = {src, bitrate, codec, gain, preview, host, path, s, ts, trackid, albumId};

                        getTrackInfo(trackid).then(r => {
                            if (r.data) {
                                dispatch(setTrackPlayer(generateAudio(Object.assign(audio, {trackInfo: r.data}))));
                            }
                        });
                    });
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