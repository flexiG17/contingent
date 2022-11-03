import axios from 'axios'
import iziToast from "izitoast";
import {LOAD_ROUTE, LOGIN_ROUTE} from "../utils/consts";

export const Registration = async (name, role, email, password, navigate) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name,
            email,
            password,
            role
        }, {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
                'Content-Type': 'multipart/form-data;'
            }
        });
        iziToast.success({
            title: response.statusText,
            message: response.data.message,
            position: "topRight"
        });
        navigate(LOGIN_ROUTE);
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}

export const Login = async (email, password, navigate) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
        });
        localStorage.setItem('jwt', response.data.token)
        iziToast.success({
            title: response.statusText,
            message: response.data.message,
            position: "topRight"
        });
        navigate(LOAD_ROUTE);
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}