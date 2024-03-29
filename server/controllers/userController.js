const bcrypt = require('bcryptjs')

const User = require('../models/User')

const db = require('../db')
const jwt = require("jsonwebtoken");


module.exports.getAll = async function (req, res) {
    const users = await db.users

    return res.status(200).json(users)
}


module.exports.change = async function (req, res) {
    const salt = bcrypt.genSaltSync(10)

    const user = db.users.where({id: req.params.id})

    let {name, email, password, role} = req.body
    password = password ? bcrypt.hashSync(password, salt) : await user.password

    let model = new User(email, password, name, role)

    await user.update(model)

    return res.status(201).json({
        message: `Данные ${model.name} обновлены`
    })
}

module.exports.changeSelf = async function (req, res) {
    const salt = bcrypt.genSaltSync(10)

    const user = db.users.where({id: req.user.id})

    let {name, email, password, role} = req.body
    password = password ? bcrypt.hashSync(password, salt) : await user.password

    let model = new User(email, password, name, role)

    await user.update(model)

    const token = jwt.sign({
        userId: req.user.id,
        email: email,
        name: name,
        role: role
    }, process.env.TOKEN_SECRET, {})

    return res.status(201).json({
        message: `Ваши данные обновлены`,
        token: `Bearer ${token}`
    })
}

module.exports.remove = async function (req, res) {
    await db.users.where({id: req.params.id}).delete()

    return res.status(200).json({message: "Пользователь удален"})
}