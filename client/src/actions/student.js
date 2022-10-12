import axios from "axios";
import iziToast from "izitoast";

export function getStudents() {
    return axios.get('http://localhost:5000/api/student/', {
        headers: {Authorization: localStorage.getItem('jwt')}
    }).then(resp => resp.data)
    // return fetch('http://localhost:5000/api/student/', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt")
    //     },
    // })
    //     .then(data => data.json())
}

export function removeStudent(id) {
    return axios.delete(`http://localhost:5000/api/student/remove/${id}`, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
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
    // return fetch(`http://localhost:5000/api/student/remove/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    // })
}

export function removeArrayOfStudents(data) {
    // Не уверен, что запрос написан правильно, возможно нужно будет мануально применять JSON.stringify(data).
    // Когда поднимем сервер, нужно обязательно это проверить
    return axios.delete(`http://localhost:5000/api/student/removeStudents`, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
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
    // return fetch(`http://localhost:5000/api/student/removeStudents`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(data)
    // })
}

export function changeStudentData(item, id) {
    return axios.patch(
        `http://localhost:5000/api/student/update/${id}`, item, {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
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
    // return fetch(`http://localhost:5000/api/student/update/${id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(item)
    // })
}

export function addStudent(item) {
    return axios.post('http://localhost:5000/api/student/create', item, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
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
    // return fetch('http://localhost:5000/api/student/create', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(item)
    // })
}

export function createXlsx(item) {
    return axios.post('http://localhost:5000/api/student/getXlsxToDownload', item, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
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
    // return fetch('http://localhost:5000/api/student/getXlsxToDownload', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(item)
    // })
}

export function importXlsx(data) {
    return axios.post('http://localhost:5000/api/student/importXlsxFile', data, {
        'content-type': 'multipart/form-data',
        headers: {
            'Authorization': localStorage.getItem("jwt")
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

export function checkFiles(files) {
    return axios.post('http://localhost:5000/api/student/checkFiles', files, {
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    })
    // return fetch('http://localhost:5000/api/student/checkFiles', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt")
    //     },
    //     body: files
    // })
}

export function getXlsx() {
    return axios.get('http://localhost:5000/api/student/download/xlsx', {
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    })
    // return fetch('http://localhost:5000/api/student/download/xlsx', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt")
    //     }
    // })
}