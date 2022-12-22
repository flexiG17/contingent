import axios from "axios";
import iziToast from "izitoast";
import {ACCOUNT_ROUTE, NOTIFICATION_ROUTE, URL_PATH} from "../utils/consts";
import {getToken} from "../utils/token";

export function createNotification(item, navigate) {
    return axios.post(`${URL_PATH}/api/notification/create`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
            message: data.message,
            position: 'topRight'
        });
        setTimeout(() => {
            navigate(ACCOUNT_ROUTE)
        }, 1000);
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
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

export function removeNotification(idArray, navigate) {
    return axios.delete(`${URL_PATH}/api/notification/remove`, {
        headers: {
            'Authorization': getToken()
        },
        data: idArray
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
            message: data.message,
            position: 'topRight'
        })
        setTimeout(() => {
            navigate(ACCOUNT_ROUTE)
        }, 1000)
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function updateNotification(id, item, navigate) {
    return axios.put(`${URL_PATH}/api/notification/update/${id}`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
            message: data.message,
            position: 'topRight'
        })
        setTimeout(() => {
            navigate(ACCOUNT_ROUTE)
        }, 1000)
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}