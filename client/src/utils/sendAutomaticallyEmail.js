import {sendAutomatically} from "../actions/student";

export const sendNotificationToVisaDepartment = (studentsDataForEmail, setLoading) => {
    const formDataToSendMessage = new FormData()
    //formDataToSendMessage.append('to', 'senya.kozhevnikov.00@mail.ru')
    formDataToSendMessage.append('to', 'visa@urfu.ru')
    formDataToSendMessage.append('to', 'e.a.syskova@urfu.ru')
    formDataToSendMessage.append('to', 'rfl@urfu.ru')
    formDataToSendMessage.append('from', 'urfucontingent')
    formDataToSendMessage.append('subject', 'Информационная система URFUCONTINGENT')
    formDataToSendMessage.append('text', '')
    formDataToSendMessage.append('studentData', JSON.stringify(studentsDataForEmail))

    return sendAutomatically(formDataToSendMessage, setLoading)
}