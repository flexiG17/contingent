export function getStudents() {
    return fetch('http://localhost:5000/api/student/')
        .then(data => data.json())
}

export function removeStudent(id) {
    return fetch(`http://localhost:5000/api/student/remove/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
}

export function createXlsx(item) {
    return fetch('http://localhost:5000/api/student/getXlsxToDownload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function importXlsx(item) {
    return fetch('http://localhost:5000/api/student/importXlsxFile', {
        method: 'POST',
        body: JSON.stringify(item)
    })
}

export function getXlsx() {
    return fetch('http://localhost:5000/api/student/download/xlsx')
}

export function getNotifications() {
    return fetch('http://localhost:5000/api/notification/getAll')
        .then(data => data.json())
}

export function registerUser(item) {
    return fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function loginUser(item) {
    return fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function changeStudentData(item, id) {
    return fetch(`http://localhost:5000/api/student/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function addStudent(item) {
    return fetch('http://localhost:5000/api/student/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}

export function createNotification(item) {
    return fetch('http://localhost:5000/api/notification/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
}