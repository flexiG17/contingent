const CreateNotificationDto = require('../dto/CreateNotificationDto')
const NotificationRepository = require('../repositories/notificationRepository')
const UpdateNotificationDto = require("../dto/UpdateNotificationDto");


const notificationRepository = new NotificationRepository()


module.exports.getAll = async function (req, res) {
    let data = await notificationRepository.getAsync(req.user.id)

    return res.status(200).json(data)
}


module.exports.create = async function (req, res) {
    req.body.students_id = [].concat(req.body.students_id)
    let dto = new CreateNotificationDto(req.body)

    await notificationRepository.createAsync(dto, req.user.id)

    return res.status(200).json({message: "Уведомления добавлены"})
}


module.exports.update = async function (req, res) {
    req.body.students_id = [].concat(req.body.students_id)
    let dto = new UpdateNotificationDto(req.body)

    await notificationRepository.updateAsync(dto, req.params.id)

    return res.status(200).json({message: "Уведомление обновлено"})
}


module.exports.remove = async function (req, res) {
    await notificationRepository.deleteAsync(req.body)

    return res.status(200).json({message: "Уведомления удалены"})
}