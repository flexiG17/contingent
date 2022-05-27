export function getUser() {
    return fetch('http://localhost:5000/api/student/main')
        .then(data => data.json())
}

export function setUser(item) {
    return fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item})
    })
        .then(data => data.json())
}