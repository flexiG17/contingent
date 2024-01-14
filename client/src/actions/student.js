import axios from "axios";
import iziToast from "izitoast";
import {HOME_ROUTE, internalServerError, URL_PATH} from '../utils/consts/pathRoutes'
import {getToken} from "../utils/token";
import {sendNotificationToVisaDepartment} from "../utils/sendAutomaticallyEmail";

export function getStudents() {
    return axios.get(`${URL_PATH}/api/student/`, {
        headers: {Authorization: getToken()}
    }).then(resp => resp.data)
}

export function removeStudent(id, navigate) {
    return axios.delete(`${URL_PATH}/api/student/remove/${id}`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(({data}) => {
        setTimeout(() => {
            navigate(HOME_ROUTE)
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function removeArrayOfStudents(data) {
    return axios.delete(`${URL_PATH}/api/student/removeStudents`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: data
    }).then(({data}) => {
        setTimeout(() => {
            window.location.reload()
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function changeStudentData(dataToSave, studentId, navigate, studentEducationType, setLoadingRequest, studentData) {
    return axios.put(
        `${URL_PATH}/api/student/update/${studentId}`, dataToSave, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(({data}) => {
            iziToast.success({
                message: data.message,
                position: 'topRight'
            })

            if (dataToSave.enrollment !== studentData.enrollment && dataToSave.enrollment === 'Отчислен') {
                iziToast.info({
                    message: `Происходит отправка письма в Визовый отдел`,
                    position: 'topRight',
                    timeout: '7000'
                });
                sendNotificationToVisaDepartment([{
                    id: studentData.id,
                    latin_name: studentData.latin_name
                }], setLoadingRequest)
            } else {
                setLoadingRequest(false)
                setTimeout(() => {
                    dataToSave.education_type === studentEducationType
                        ? window.location.reload()
                        : navigate(`/${dataToSave.education_type === 'Контракт' ? `contract` : `quota`}/${studentId}`)
                }, 1500)
            }
        }).catch((e) => {
            setTimeout(() => {
                setLoadingRequest(false)
                iziToast.error({
                    message: internalServerError(e),
                    position: "topRight",
                    color: "#FFF2ED"
                });
            }, 500)
        })
}

export function getStudentsByIdArray(idArray) {
    return axios.post(`${URL_PATH}/api/student/getStudents`, idArray, {
        headers: {
            'Authorization': getToken()
        },
    }).then(resp => resp.data)
}

export function addStudent(item, navigate, setLoading) {
    return axios.post(`${URL_PATH}/api/student/create`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data;'
        },
    }).then(({data}) => {
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
        setLoading(false)
        setTimeout(() => {
            navigate(HOME_ROUTE)
        }, 1000)
    }).catch((e) => {
        setTimeout(() => {
            setLoading(false)
            iziToast.error({
                message: internalServerError(e),
                position: "topRight",
                color: "#FFF2ED"
            });
        }, 500)
    })
}

export function createXlsx(item) {
    return axios.post(`${URL_PATH}/api/student/download/xlsx`, item, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        responseType: 'blob'
    })
}

export function importXlsx(data) {
    return axios.post(`${URL_PATH}/api/student/importXlsxFile`, data, {
        'content-type': 'multipart/form-data',
        headers: {
            'Authorization': getToken()
        },
    }).then(({data}) => {
        setTimeout(() => {
            window.location.reload()
        }, 1500)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function sendMessage(data, setLoadingRequest) {
    return axios.post(`${URL_PATH}/api/mail/sendStudent`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        },
    }).then(({data}) => {
        setLoadingRequest(false)
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }).catch((e) => {
        setLoadingRequest(false)
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function sendAutomatically(data, setLoading) {
    return axios.post(`${URL_PATH}/api/mail/sendAutomatically`, data, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
        },
    }).then(({data}) => {
        iziToast.success({
            message: data.message,
            position: 'topRight'
        })
        setLoading(false)
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }).catch((e) => {
        iziToast.error({
            message: internalServerError(e),
            position: "topRight",
            color: "#FFF2ED"
        });
    })
}

export function getColumns() {
    return axios.get(`${URL_PATH}/api/student/columns`, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}

export const changeStudentsData = (dataToSave, setLoading, studentsDataForEmail) => {
    return axios.put(`${URL_PATH}/api/student/editListOfStudents/`, dataToSave, {
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((result) => {
        iziToast.success({
            message: result.data.message,
            position: 'topRight'
        });

        if (dataToSave.newData.enrollment === 'Отчислен') {
            iziToast.info({
                message: `Происходит отправка письма в Визовый отдел`,
                position: 'topRight',
                timeout: '7000'
            });
            sendNotificationToVisaDepartment(studentsDataForEmail, setLoading)
        }
        else {
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }
    }).catch(res => {
        if (res.code === 'ERR_NETWORK')
            iziToast.error({
                message: 'Ошибка сервера. Попробуйте снова.',
                position: "topRight",
                color: "#FFF2ED"
            });
        else {
            iziToast.error({
                message: res.message,
                position: "topRight",
                color: "#FFF2ED"
            });
        }
        setLoading(false)
    })
}