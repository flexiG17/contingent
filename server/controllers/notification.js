const Notification = require('../models/Notification')
const db = require('../db')

module.exports.create = async function (req, res) {
    const model = new Notification(req.body)

    await db.notifications.insert(model)

    return res.status(200).json({message: "Notification added successfully"})
}

module.exports.update = async function (req, res) {
    const model = new Notification(req.body)

    await db.notifications.where({id: req.params.id}).update(model)

    return res.status(200).json({message: "Notification updated successfully"})
}

module.exports.getByUserId = async function (req, res) {
    const data = await db.notifications.where({user_id: req.params.id})

    return res.status(200).send(data)
}

module.exports.remove = async function (req, res) {
    await db.notifications.where({id: req.params.id}).delete()

    return res.status(200).json({message: "Notification removed"})
}

module.exports.getCount = async function (req, res) {
    const data = await db.notifications.where({user_id: req.params.id})

    return res.status(200).json(data.length)
}