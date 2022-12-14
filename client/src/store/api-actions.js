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
            const ids = [fileId];
            await api.delete(`files/`, {
                data: ids
            });
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
    async ({files, parentId, studentId}, {dispatch, extra: api}) => {
        try {
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));
            if (parentId) {
                formData.append('parent_id', parentId);
            }
            formData.append('student_id', studentId);

            const {data} = await api.post(`files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // onUploadProgress: progressEvent => {
                    //     const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    //     console.log('total', totalLength);
                    //     if (totalLength) {
                    //         let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                    //         console.log(progress);
                    //     }
                    // }
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
);
