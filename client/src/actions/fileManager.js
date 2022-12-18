import {createApi} from "../utils/api";

const api = createApi();

export function downloadFile(fileId) {
    return api.get(`files/download?id=${fileId}`, {
        responseType: 'blob'
    });
}