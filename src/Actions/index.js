export const getAuthStorage = () => {
    const adora_user = localStorage.adora_user;

    if (adora_user) {
        const isAuthenticated = true;
        const adora = JSON.parse(adora_user);

        if (adora.hasOwnProperty('access_token') && adora.hasOwnProperty('expires_in') && adora.hasOwnProperty('token_type')) {
            return adora;
        }
    }
    return false;
};