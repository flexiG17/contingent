const bcrypt = require('bcryptjs')

const User = require('../models/User')
const database = require('../utils/database')

// req - все данные, которые отправляет пользователь
module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

//req.body.email or req.body.password - получать данные от пользователя
module.exports.register = async function (req, res) {

    const userEmail = req.body.email
    const userPassword = req.body.password
    const userName = req.body.name

    const salt = bcrypt.genSaltSync(10)

    const user = new User(
        userEmail,
        bcrypt.hashSync(userPassword, salt),
        userName)

    database.isExist('users', {email: user.email}).then(userExistsInSystem => {
        if (userExistsInSystem) {
            res.status(409).json({
                message: `User \"${user.name}\" exists in system. Try again`
            })

            console.log(`User \"${user.name}\" exists in system`)
        } else {
            const paramToSave =
                {
                    email: user.email,
                    password: user.password,
                    name: user.name
                }
            database.save('users', paramToSave)
                .catch()
                .then(() => {
                    res.status(201).json(user)
                    console.log(`It\`s a new user. Added to database \"${user.name}\" with email \"${user.email}\"`)
                })
        }
    })
}

module.exports.changeData = function (req, res) {

}

module.exports.getById = async function (req, res) {

}