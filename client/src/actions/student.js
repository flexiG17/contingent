import axios from "axios";
import iziToast from "izitoast";
import {HOME_ROUTE} from '../utils/consts'
import {getToken} from "../utils/token";

export function getStudents() {
    return axios.get('http://localhost:5000/api/student/', {
        headers: {Authorization: getToken()}
    }).then(resp => resp.data)
}
export function getStudentsByIdArray(idArray) {
    return axios.get('http://localhost:5000/api/student/getStudents', {
        headers: {
            'Authorization': getToken()
        },
        data: idArray
    }).then(resp => resp.data)
}

export function removeStudent(id) {
    return axios.delete(`http://localhost:5000/api/student/remove/${id}`, {
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
    return axios.delete(`http://localhost:5000/api/student/removeStudents`, {
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
        `http://localhost:5000/api/student/update/${id}`, item, {
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

export function addStudent(item, navigate) {
    return axios.post('http://localhost:5000/api/student/create', item, {
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
    return axios.post('http://localhost:5000/api/student/download/xlsx', item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    })
}

export function importXlsx(data) {
    return axios.post('http://localhost:5000/api/student/importXlsxFile', data, {
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
    return axios.post('http://localhost:5000/api/mail/send', data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
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