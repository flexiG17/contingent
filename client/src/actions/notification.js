import axios from "axios";
import iziToast from "izitoast";
import {NOTIFICATION_ROUTE} from "../utils/consts";
import {getToken} from "../utils/token";

export function createNotification(item, navigate) {
    return axios.post('http://localhost:5000/api/notification/create', item, {
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
            navigate(NOTIFICATION_ROUTE)
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
    return axios.get(`http://localhost:5000/api/notification/`, {
        headers: {
            'Authorization': getToken()
        }
    }).then(res => res.data)
}

export function getCountNotifications() {
    return axios.get(`http://localhost:5000/api/notification/`, {
        headers: {
            'Authorization': getToken()
        }
    }).then(res => res.data.length)
}

export function removeNotification(id, navigate) {
    return axios.delete(`http://localhost:5000/api/notification/remove/${id}`, {
        headers: {
            'Authorization': getToken()
        }
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
            message: data.message,
            position: 'topRight'
        })
        setTimeout(() => {
            navigate(NOTIFICATION_ROUTE)
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
    return axios.put(`http://localhost:5000/api/notification/update/${id}`, item, {
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
            navigate(NOTIFICATION_ROUTE)
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