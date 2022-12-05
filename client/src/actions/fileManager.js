import axios from "axios";
import {dispatch} from "../store";
import {addFile, setFiles} from "../store/slices/ManagerData/manager-data";
import iziToast from "izitoast";

export async function getFiles(UserID: number) {
    try {
        const {data} = await axios.get(`'http://localhost:5000/api`, {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
                'Content-Type': 'application/json;charset=utf-8'
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

export async function addDir(UserID: number, parentDirID: number, name: string) {
    try {
        const {data} = await axios.post(`'http://localhost:5000/api`, {
            name,
            parentDirID,
            type: 'dir'
        },{
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