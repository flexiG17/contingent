import axios from "axios";
import iziToast from "izitoast";
import {ACCOUNT_ROUTE, internalServerError, URL_PATH} from "../utils/consts/pathRoutes";
import {getToken} from "../utils/token";

export function createNotification(item, navigate) {
    return axios.post(`${URL_PATH}/api/notification/create`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({data}) => {
        iziToast.success({
            message: data.message,
            position: 'topRight'
        });
        setTimeout(() => {
            navigate(ACCOUNT_ROUTE)
        }, 1500);
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function getNotifications() {
    return axios.get(`${URL_PATH}/api/notification/`, {
        headers: {
            'Authorization': getToken()
        }
    }).then(res => res.data)
}

export function getCountNotifications() {
    return axios.get(`${URL_PATH}/api/notification/`, {
        headers: {
            'Authorization': getToken()
        }
    }).then(res => res.data.length)
}

export function removeNotification(idArray) {
    return axios.delete(`${URL_PATH}/api/notification/remove`, {
        headers: {
            'Authorization': getToken()
        },
        data: idArray
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

export function updateNotification(id, item) {
    return axios.put(`${URL_PATH}/api/notification/update/${id}`, item, {
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