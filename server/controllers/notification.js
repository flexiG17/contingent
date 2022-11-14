const Notification = require('../models/Notification')
const CreateNotificationDto = require('../dto/CreateNotificationDto')
const db = require('../db')


module.exports.getAll = async function (req, res) {
    const data = await db.notifications.where({user_id: req.user.id})

    return res.status(200).json(data)
}


module.exports.create = async function (req, res) {
    req.body.students_id = [].concat(req.body.students_id)
    let dto = new CreateNotificationDto(req.body)

    let models = dto.students_id.map(student_id => {
        let model = new Notification(dto)
        model.user_id = req.user.id
        model.student_id = student_id
        return model
    })

    const trx = await db.transaction()
    try {
        for (let model of models)
            await db.notifications.insert(model).transacting(trx)

        await trx.commit()

    } catch (err) {
        await trx.rollback()
        throw err
    }

    return res.status(200).json({message: "Уведомления добавлены"})
}


module.exports.update = async function (req, res) {
    let model = new Notification(req.body)
    model.user_id = req.user.id

    await db.notifications.where({id: req.params.id}).update(model)

    return res.status(200).json({message: "Уведомление обновлено"})
}


module.exports.remove = async function (req, res) {
    await db.notifications.whereIn('id', req.body).delete()

    return res.status(200).json({message: "Уведомления удалены"})
}