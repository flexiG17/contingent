export function getStudents() {
    return fetch('http://localhost:5000/api/student/main')
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