import axios from 'axios'
import iziToast from "izitoast";
import {ACCOUNT_ROUTE, LOAD_ROUTE, LOGIN_ROUTE, NOTIFICATION_ROUTE, URL_PATH} from "../utils/consts";
import {getToken, setToken} from "../utils/token";

export const Registration = async (name, role, email, password, navigate) => {
    try {
        const response = await axios.post(`${URL_PATH}/api/auth/register`, {
            name: name,
            email: email,
            password: password,
            role: role
        }, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'
            }
        });
        iziToast.success({
            title: response.statusText,
            message: response.data.message,
            position: "topRight"
        });
        navigate(ACCOUNT_ROUTE);
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}

export const Login = async (email, password, navigate) => {
    try {
        const response = await axios.post(`${URL_PATH}/api/auth/login`, {
            email,
            password
        });
        setToken(response.data.token);
        iziToast.success({
            title: response.statusText,
            message: response.data.message,
            position: "topRight"
        });
        navigate(LOAD_ROUTE);
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}

export function getUsers() {
    return axios.get(`${URL_PATH}/api/user/`, {
        headers: {
            Authorization: getToken()
        }
    }).then(resp => resp.data)
}

export function changeUserData(data, id) {
    return axios.put(`${URL_PATH}/api/user/change/${id}`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(({statusText, data}) => {
            iziToast.success({
                title: statusText,
                message: data.message,
                position: 'topRight'
            })
        }).catch((e) => {
            iziToast.error({
                title: e.response.statusText,
                message: e.response.data.message,
                position: "topRight",
                color: "#FFF2ED"
            });
        })
}