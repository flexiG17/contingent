import axios from "axios";
import {dispatch} from "../store";
import {addFile, setFiles} from "../store/slices/ManagerData/manager-data";
import iziToast from "izitoast";

export async function getFiles(UserID: number) {
    try {
        const {data} = await axios.get(`localhost:5000/api/files`, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        });
        dispatch(setFiles(data));
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}

export async function createDir(UserID: number, parentDirID: number | null, name: string) {
    try {
        const {data} = await axios.post(`'http://localhost:5000/api`, {
            "name": name,
            "parent_id": parentDirID,
            "student_id": UserID
        }, {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        dispatch(addFile(data));
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}

export async function uploadFile(data: FormData) {
    try {
        const {data} = await axios.post(`localhost:5000/api/files/upload`, data, {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(addFile(data));
    } catch (e) {
        iziToast.error({
            title: e.response.statusText,
            message: e.response.data.message,
            position: "topRight",
            color: "#FFF2ED"
        });
    }
}