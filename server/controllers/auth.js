const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const db = require('../db')


module.exports.login = async function (req, res) {
    const {email, password} = req.body
    if (!email || !password)
        return res.status(400).json({message: "E-mail или пароль отсутствует"})

    const [user] = await db.users.where({email})

    if (user == null)
        return res.status(404).json({
            message: 'Пользователя с таким email не существует'
        })

    if (!bcrypt.compareSync(password, user.password))
        return res.status(401).json({
            message: 'Пароль неверный'
        })

    const token = jwt.sign({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, process.env.TOKEN_SECRET, {})

    return res.status(200).json({
        message: 'Успешная авторизация',
        token: `Bearer ${token}`
    })
}


module.exports.register = async function (req, res) {
    const {name, email, password, role} = req.body

    if (!email || !password)
        return res.status(400).json({message: "E-mail или пароль отсутствует"})

    const salt = bcrypt.genSaltSync(10)

    const model = new User(email, bcrypt.hashSync(password, salt), name, role)

    const [user] = await db.users.where({email: model.email})

    if (user != null)
        return res.status(409).json({
            message: `Пользователь '${model.name}' уже существует`
        })

    await db.users.insert(model)

    return res.status(201).json({
        message: `Пользователь '${model.name}' успешно зарегистрирован`
    })
}


module.exports.changePassword = async function (req, res) {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password

    if (!password)
        return res.status(400).json({message: "Пароль отсутствует"})

    await db.users.where({id: req.user.id})
        .update({password: bcrypt.hashSync(password, salt)})

    return res.status(201).json({message: "Пароль изменён"})
}