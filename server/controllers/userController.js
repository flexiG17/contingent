const bcrypt = require('bcryptjs')

const User = require('../models/User')

const db = require('../db')


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

    return res.status(201).json({message: `Данные '${model.name}' обновлены`})
}