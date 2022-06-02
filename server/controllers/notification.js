const Notification = require('../models/Notification')

module.exports.create = function (req, res){
    res.status(200).json({
        notification: req.body
    })
}

module.exports.update = function (req, res){
    res.status(200).json({
        update: req.body
    })
}

module.exports.getByUserId = function (req, res){

}

module.exports.remove = function (req, res){

}