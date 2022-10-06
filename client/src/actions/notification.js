import axios from "axios";

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