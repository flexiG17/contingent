const Notification = require('../models/Notification')
const database = require('../utils/database')
const errorHandler = require('../utils/errorHandler')

const databaseName = 'notifications'

// контроллер для написания методов роутов уведомлений

module.exports.create = async (req, res) => {
    const notification = new Notification(req)
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

    // условие для того, чтобы из бд брать уведомления, созданные опр. пользователем (по id)
    const condition = {id: req.params.id}
    // это, конечно, ужас
    if (req.body.status === "Выполнено") {
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
                res.status(200).json({message: `Изменения успешно внесены`})
            })
            .catch(e => errorHandler(res, e))
    }
}

// используется для вывода на сайте уведомлений соответствующему сотруднику
module.exports.getByUserId = async function (req, res) {
    database.getOneField(databaseName, {user_id: req.params.id})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            errorHandler(res, e)
        })
}

module.exports.remove = function (req, res) {
    database.remove(databaseName, {id: req.params.id})
        .then(() => {
            res.status(200).json("Напоминение успешно удалено")
        })
        .catch(e => {
            errorHandler(res, e)
        })
}

// метод просто для того, чтобы получить кол-во уведомлений, присущих пользователю
module.exports.getCount = async (req, res) => {
    database.getOneField(databaseName, {user_id: req.params.id})
        .then((data) => {
            res.status(200).json(data.length)
        })
        .catch(e => {
            errorHandler(res, e)
        })
}