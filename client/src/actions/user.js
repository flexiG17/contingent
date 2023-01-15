import axios from 'axios'
import iziToast from "izitoast";
import {HOME_ROUTE, internalServerError, URL_PATH} from "../utils/consts/pathRoutes";
import {getToken, setToken} from "../utils/token";

export const Registration = async (name, role, email, password) => {
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
            message: response.data.message,
            position: "topRight"
        });
    } catch (e) {
        iziToast.error({
            message: internalServerError(e),
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
            message: response.data.message,
            position: "topRight"
        });
        navigate(HOME_ROUTE);
    } catch (e) {
        iziToast.error({
            message: internalServerError(e),
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

export function changeUserData(data, id, isCurrentUserChanged) {
    return axios.put(`${URL_PATH}/api/user/change/${id}`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(({data}) => {
            if (data.token !== undefined)
                setToken(data.token);
            iziToast.success({
                message: data.message,
                position: 'topRight'
            })
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }).catch((e) => {
            iziToast.error({
                message: internalServerError(e),
                position: "topRight",
                color: "#FFF2ED"
            });
        })
}

export function removeUserById(id) {
    return axios.delete(`${URL_PATH}/api/user/remove/${id}`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({data}) => {
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })

}