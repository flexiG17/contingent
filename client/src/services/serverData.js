export function getStudents() {
    return fetch('http://localhost:5000/api/student/')
        .then(data => data.json())
}

export function getXlsx(item) {
    return fetch('http://localhost:5000/api/student/getXlsx', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(data => data.json())
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
        .then(data => data.json())
}

export function changeStudentData(item, id) {
    return fetch(`http://localhost:5000/api/student/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(data => data.json())
}

export function loginUser(item) {
    return fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(data => data.json())
}

export function addStudent(item) {
    return fetch('http://localhost:5000/api/student/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(data => data.json())
}