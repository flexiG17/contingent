const CreateNotificationDto = require('../dto/NotficationDtos/CreateNotificationDto')
const NotificationRepository = require('../repositories/notificationRepository')
const UpdateNotificationDto = require("../dto/NotficationDtos/UpdateNotificationDto");


const notificationRepository = new NotificationRepository()


module.exports.getAll = async function (req, res) {
    let data = await notificationRepository.getAsync(req.user.id)

    return res.status(200).json(data)
}


module.exports.create = async function (req, res) {
    req.body.students_id = [].concat(req.body.students_id)
    let dto = new CreateNotificationDto(req.body)

    await notificationRepository.createAsync(dto, req.user.id)

    return res.status(200).json({message: "Задача добавлена"})
}


module.exports.update = async function (req, res) {
    req.body.students_id = [].concat(req.body.students_id)
    let dto = new UpdateNotificationDto(req.body)

    await notificationRepository.updateAsync(dto, req.params.id)

    return res.status(200).json({message: "Задача обновлена"})
}


module.exports.remove = async function (req, res) {
    const ids = [].concat(req.body)
    await notificationRepository.deleteAsync(ids)

    return res.status(200).json({message: "Задача выполнена"})
}