const Notification = require('../models/Notification')
const database = require('../utils/database')

const databaseName = 'notifications'

module.exports.create = async (req, res) => {
    const [user] = await req.user

    const notification = new Notification(req, user)
    database.save(databaseName, notification.getModel())
        .then(() => {
            res.status(200).json({message: "successfully"})
        })
}

module.exports.update = function (req, res){
}

module.exports.getByUserId = async function (req, res){
    const [user] = await req.user

    database.getOneField(databaseName, {user_id: user.id})
        .then(data => {
            res.status(200).send(data)
        })
}

module.exports.remove = function (req, res){

}