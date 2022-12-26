import {addFile, deleteFile, setFiles, setIsLoading} from "./slices/ManagerData/manager-data";
import iziToast from "izitoast";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {internalServerError} from "../utils/consts";

export const fetchFilesAction = createAsyncThunk(
    'files/getFiles',
    async ({studentId, parentId}, {dispatch, extra: api,}) => {
        if (!parentId) {
            try {
                dispatch(setIsLoading(true));
                const {data} = await api.get(`files/?student_id=${studentId}`);
                dispatch(setFiles(data));
                dispatch(setIsLoading(false));
            } catch (e) {
                iziToast.error({
                    message: internalServerError(e),
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
                    message: internalServerError(e),
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
            dispatch(setIsLoading(true));
            const {data} = await api.post(`files/`, {
                "name": name,
                "parent_id": parentId,
                "student_id": studentId,
            });
            dispatch(addFile(data));
            dispatch(setIsLoading(false));
        } catch (e) {
            iziToast.error({
                message: internalServerError(e),
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
            dispatch(setIsLoading(true));
            const ids = [fileId];
            await api.delete(`files/`, {
                data: ids
            });
            dispatch(deleteFile(fileId));
            dispatch(setIsLoading(false));
        } catch (e) {
            iziToast.error({
                message: internalServerError(e),
                position: "topRight",
                color: "#FFF2ED"
            });
        }
    }
);

export const uploadFile = createAsyncThunk(
    'files/upload',
    async ({files, parentId, studentId}, {dispatch, extra: api}) => {
        try {
            dispatch(setIsLoading(true));
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
            dispatch(setIsLoading(false));
        } catch (e) {
            iziToast.error({
                message: internalServerError(e),
                position: "topRight",
                color: "#FFF2ED"
            });
        }
    }
);
