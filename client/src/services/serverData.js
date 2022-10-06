const axios = require('axios')
// чисто файл со всеми запросами на бэк (переписать через axios и разбить по файлам, как actions/user.js)

// ____________STUDENT____________
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

// ____________NOTIFICATION____________
export function createNotification(item) {
    return axios.post('http://localhost:5000/api/notification/create', item, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    // return fetch('http://localhost:5000/api/notification/create', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(item)
    // })
}

export function getNotifications(userId) {
    return axios.get(`http://localhost:5000/api/notification/getByUser/${userId}`, {
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    }).then(res => res.data)
    // return fetch(`http://localhost:5000/api/notification/getByUser/${userId}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt")
    //     }
    // })
    //     .then(data => data.json())
}

export function getCountNotifications(userId) {
    return axios.get(`http://localhost:5000/api/notification/count/${userId}`, {
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    }).then(res => res.data)
    // return fetch(`http://localhost:5000/api/notification/count/${userId}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt")
    //     }
    // })
    //     .then(data => data.json())
}

export function removeNotification(id) {
    return axios.delete(`http://localhost:5000/api/notification/remove/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('jwt')
        }
    })
    // return fetch(`http://localhost:5000/api/notification/remove/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Authorization': localStorage.getItem('jwt')
    //     }
    // })
}

export function updateNotification(id, item) {
    return axios.patch(`http://localhost:5000/api/notification/update/${id}`, item, {
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    // return fetch(`http://localhost:5000/api/notification/update/${id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Authorization': localStorage.getItem("jwt"),
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(item)
    // })
}