export const getAuthStorage = () => {
    const adora_user = localStorage.adora_user;

    if (adora_user) {
        const adora = JSON.parse(adora_user);

        if (adora.hasOwnProperty('Session_id') && adora.hasOwnProperty('sessguard') && adora.hasOwnProperty('sessionid2')) {
            return adora;
        }
    }
    return false;
};

export const getAccountInfoStorage = () => {
    const accountInfo = localStorage.accountInfo;

    if (accountInfo) {
        const info = JSON.parse(accountInfo);

        if (info.hasOwnProperty('device_id') && info.hasOwnProperty('uid')) {
            return info;
        }
    }
    return false;
};

export const getAuthInfoStorage = () => {
    const authInfo = localStorage.authInfo;

    if (authInfo) {
        const info = JSON.parse(authInfo);

        if (info.hasOwnProperty('device_id') && info.hasOwnProperty('login')) {
            return info;
        }
    }
    return false;
};

export const setCookie = (name, value, options = {}) => {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
};

export const setAdoraCookie = () => {
    const adora = getAuthStorage();

    if (adora !== false) {
        const {Session_id, sessguard, sessionid2, yandex_login} = adora;

        setCookie('Session_id', Session_id.value, {secure: true, 'expires': new Date(Session_id.expirationDate).toUTCString(), domain: Session_id.domain});
        setCookie('sessguard', sessguard.value, {secure: true, 'expires': new Date(sessguard.expirationDate).toUTCString(), domain: sessguard.domain});
        setCookie('sessionid2', sessionid2.value, {secure: true, 'expires': new Date(sessionid2.expirationDate).toUTCString(), domain: sessionid2.domain});
        setCookie('yandex_login', yandex_login.value, {secure: true, 'expires': new Date(yandex_login.expirationDate).toUTCString(), domain: yandex_login.domain});
    }
};