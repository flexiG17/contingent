import axios from 'axios';
import {getToken} from './token';
import {URL_PATH} from "./consts";

const BACKEND_URL = `${URL_PATH}/api/`;
const REQUEST_TIMEOUT = 5000;

export const createApi = () => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT
    });

    api.interceptors.request.use(
        (config) => {
            const token = getToken();

            if (token) {
                config.headers['Authorization'] = token;
            }

            return config;
        }
    );

    return api;
};