import axios from "axios";
import iziToast from "izitoast";
import {HOME_ROUTE, internalServerError, URL_PATH} from '../utils/consts'
import {getToken} from "../utils/token";

export function getStudents() {
    return axios.get(`${URL_PATH}/api/student/`, {
        headers: {Authorization: getToken()}
    }).then(resp => resp.data)
}

export function removeStudent(id, navigate) {
    return axios.delete(`${URL_PATH}/api/student/remove/${id}`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({data}) => {
        setTimeout(() => {
            navigate(HOME_ROUTE)
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
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
    }).then(({data}) => {
        setTimeout(() => {
            window.location.reload()
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function changeStudentData(item, id, navigate) {
    return axios.put(
        `${URL_PATH}/api/student/update/${id}`, item, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(({data}) => {
            setTimeout(() => {
                navigate(HOME_ROUTE)
            }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
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
    }).then(({data}) => {
        setTimeout(() => {
            navigate(HOME_ROUTE)
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
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
    }).then(({data}) => {
        setTimeout(() => {
            window.location.reload()
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
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

export function getColumns(){
    return axios.get(`${URL_PATH}/api/student/columns`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}