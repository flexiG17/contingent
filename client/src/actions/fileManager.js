import {createApi} from "../utils/api";

const api = createApi();

export function downloadFile(fileId) {
    return api.get(`api/files/download?id=${fileId}`, {
        responseType: 'blob'
    });
}