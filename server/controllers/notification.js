const Notification = require('../models/Notification')
const db = require('../db')


module.exports.getAll = async function (req, res) {
    const data = await db.notifications.where({user_id: req.user.id})

    return res.status(200).json(data)
}


module.exports.create = async function (req, res) {
    let model = new Notification(req.body)
    model.user_id = req.user.id

    await db.notifications.insert(model)

    return res.status(200).json({message: "Уведомление добавлено"})
}


module.exports.update = async function (req, res) {
    let model = new Notification(req.body)
    model.user_id = req.user.id

    await db.notifications.where({id: req.params.id}).update(model)

    return res.status(200).json({message: "Уведомление обновлено"})
}


module.exports.remove = async function (req, res) {
    await db.notifications.where({id: req.params.id}).delete()

    return res.status(200).json({message: "Уведомление удалено"})
}