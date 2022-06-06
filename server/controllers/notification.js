const Notification = require('../models/Notification')
const database = require('../utils/database')
const errorHandler = require('../utils/errorHandler')

const databaseName = 'notifications'

module.exports.create = async (req, res) => {
    const [user] = await req.user

    const notification = new Notification(req, user)
    database.save(databaseName, notification.getModel())
        .then(() => {
            res.status(200).json({message: "successfully"})
        })
        .catch(e => {
            errorHandler(res, e)
        })
}

module.exports.update = async function (req, res) {
    const [user] = await req.user
    const notification = new Notification(req, user)

    const condition = {id: req.query.id}
    if (req.body.status === "Сделано") {
        database.remove(databaseName, condition)
            .then(() => {
                res.status(200).send(`Так как выставлен статус ${req.body.status}, то уведомление удалено`)
            })
            .catch(e => {
                errorHandler(res, e)
            })
    } else {
        database.changeData(databaseName, condition, notification.getModel())
            .then(() => {
                res.status(200).send(`Изменения уведомления с id ${req.query.id} успешно внесены`)
            })
            .catch(e => errorHandler(res, e))
    }
}

module.exports.getByUserId = async function (req, res) {
    const [user] = await req.user

    database.getOneField(databaseName, {user_id: user.id})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            errorHandler(res, e)
        })
}

module.exports.remove = function (req, res) {

}