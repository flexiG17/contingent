import {addFile, deleteFile, setFiles} from "../store/slices/ManagerData/manager-data";
import iziToast from "izitoast";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchFilesAction = createAsyncThunk(
    'files/getFiles',
    async ({studentId, parentId}, {dispatch, extra: api,}) => {
        if (!parentId) {
            try {
                const {data} = await api.get(`files/?student_id=${studentId}`);
                dispatch(setFiles(data));
            } catch (e) {
                iziToast.error({
                    title: e.response.statusText,
                    message: e.response.data.message,
                    position: "topRight",
                    color: "#FFF2ED"
                });
            }
        } else {
            try {
                const {data} = await api.get(`files/?parent_id=${parentId}`);
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
    }
);

export const createDir = createAsyncThunk(
    'files/createDir',
    async ({name, parentId, studentId}, {dispatch, extra: api}) => {
        try {
            const {data} = await api.post(`files/`, {
                "name": name,
                "parent_id": parentId,
                "student_id": studentId,
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
);

export const deleteDir = createAsyncThunk(
    'files/delete',
    async ({fileId}, {dispatch, extra: api}) => {
        try {
            await api.delete(`files/`, {fileId});
            dispatch(deleteFile(fileId));
        } catch (e) {
            iziToast.error({
                title: e.response.statusText,
                message: e.response.data.message,
                position: "topRight",
                color: "#FFF2ED"
            });
        }
    }
);

//TODO дописать dispatch
export const uploadFile = createAsyncThunk(
    'files/upload',
    async ({data}, {dispatch, extra: api}) => {
        try {
            await api.post(`files/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // dispatch(addFile(data));
        } catch (e) {
            iziToast.error({
                title: e.response.statusText,
                message: e.response.data.message,
                position: "topRight",
                color: "#FFF2ED"
            });
        }
    }
);
