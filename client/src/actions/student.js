import axios from "axios";
import iziToast from "izitoast";
import {HOME_ROUTE, URL_PATH} from '../utils/consts'
import {getToken} from "../utils/token";

export function getStudents() {
    return axios.get(`${URL_PATH}/api/student/`, {
        headers: {Authorization: getToken()}
    }).then(resp => resp.data)
}

export function removeStudent(id) {
    return axios.delete(`${URL_PATH}/api/student/remove/${id}`, {
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
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function removeArrayOfStudents(data) {
    return axios.delete(`${URL_PATH}/api/student/removeStudents`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: data
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
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

export function changeStudentData(item, id) {
    return axios.put(
        `${URL_PATH}/api/student/update/${id}`, item, {
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
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function getStudentsByIdArray(idArray) {
    return axios.post(`${URL_PATH}/api/student/getStudents`, idArray, {
        headers: {
            'Authorization': getToken()
        },
    }).then(resp => resp.data)
}

export function addStudent(item, navigate) {
    return axios.post(`${URL_PATH}/api/student/create`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data;'
        },
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
            message: data.message,
            position: 'topRight'
        })
        navigate(HOME_ROUTE);
    }).catch((e) => {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function createXlsx(item) {
    return axios.post(`${URL_PATH}/api/student/download/xlsx`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    })
}

export function importXlsx(data) {
    return axios.post(`${URL_PATH}/api/student/importXlsxFile`, data, {
        'content-type': 'multipart/form-data',
        headers: {
            'Authorization': getToken()
        },
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
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

export function sendMessage(data) {
    return axios.post(`${URL_PATH}/api/mail/send`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        },
    }).then(({statusText, data}) => {
        iziToast.success({
            title : statusText,
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