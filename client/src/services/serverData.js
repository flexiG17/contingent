const axios = require('axios')
// чисто файл со всеми запросами на бэк (переписать через axios и разбить по файлам, как actions/user.js)

// ____________STUDENT____________
export function getStudents() {
    return fetch('http://localhost:5000/api/student/', {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("jwt")
        },
    })
        .then(data => data.json())
}

export function removeStudent(id) {
    return fetch(`http://localhost:5000/api/student/remove/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
}

export function removeArrayOfStudents(data) {
    return fetch(`http://localhost:5000/api/student/removeStudents`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

export function changeStudentData(item, id) {
    return fetch(`http://localhost:5000/api/student/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function addStudent(item) {
    return fetch('http://localhost:5000/api/student/create', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function createXlsx(item) {
    return fetch('http://localhost:5000/api/student/getXlsxToDownload', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
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
    return fetch('http://localhost:5000/api/student/checkFiles', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("jwt")
        },
        body: files
    })
}

export function getXlsx() {
    return fetch('http://localhost:5000/api/student/download/xlsx', {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    })
}

// ____________NOTIFICATION____________
export function createNotification(item) {
    return fetch('http://localhost:5000/api/notification/create', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function getNotifications(userId) {
    return fetch(`http://localhost:5000/api/notification/getByUser/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    })
        .then(data => data.json())
}

export function getCountNotifications(userId) {
    return fetch(`http://localhost:5000/api/notification/count/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("jwt")
        }
    })
        .then(data => data.json())
}

export function removeNotification(id) {
    return fetch(`http://localhost:5000/api/notification/remove/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('jwt')
        }
    })
}

export function updateNotification(id, item) {
    return fetch(`http://localhost:5000/api/notification/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': localStorage.getItem("jwt"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}