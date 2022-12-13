const AUTH_TOKEN_KEY_NAME = 'jwt';


export const getToken = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    return token ?? '';
};

export const setToken = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
