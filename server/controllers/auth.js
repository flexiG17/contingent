const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const database = require('../utils/database')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')

const databaseName = 'users'

module.exports.login =  function (req, res) {
    database.isExist(databaseName, {email: req.body.email})
        .then(async userExistInSystem => {
            if (userExistInSystem) {
                const [user] = await database.getOneField(databaseName, {email: req.body.email})
                const passwordResult = bcrypt.compareSync(req.body.password, user.password)

                if (passwordResult){
                    // генерация токена, пароли совпали
                    const token = jwt.sign({
                        userId: user.id,
                        email: user.email,
                        name: user.name
                    }, keys.jwt, {expiresIn: 60 * 60})

                    res.status(200).json({
                        token: `Bearer ${token}`
                    })
                } else {
                    // пароли не совпали
                    res.status(401).json({
                        message: 'Пароли не совпадают, попробуйте снова'
                    })
                }
            } else {
                res.status (404).json({
                    message: `Пользователь с email: ${req.body.email} не найден в системе`
                })
            }
        })
        .catch(error => errorHandler(res, error))
}

module.exports.register = async function (req, res) {

    const userEmail = req.body.email
    const userPassword = req.body.password
    const userName = req.body.name

    const salt = bcrypt.genSaltSync(10)

    const user = new User(
        userEmail,
        bcrypt.hashSync(userPassword, salt),
        userName)

    database.isExist(databaseName, {email: user.email})
        .then(userExistsInSystem => {
            if (userExistsInSystem) {
                res.status(409).json({
                    message: `User ${user.name} exists in system. Try again`
                })

                console.log(`User \"${user.name}\" exists in system`)
            } else {
                const modelToSave = user.getModel()
                database.save(databaseName, modelToSave)
                    .then(() => {
                        res.status(201).json({message: `It\`s a new user. Added to database ${user.name} with email ${user.email}`})
                        console.log(`It\`s a new user. Added to database \"${user.name}\" with email \"${user.email}\"`)
                    })
                    .catch(error => errorHandler(res, error))
            }
        })
        .catch(error => errorHandler(res, error))
}

module.exports.changeData = function (req, res) {
    const salt = bcrypt.genSaltSync(10)
    const newPassword = req.body.password
    database.changeData(databaseName,
        {email: req.body.email},
        {password: bcrypt.hashSync(newPassword, salt)})
        .then(() => {
            res.status(201).json({
                message: "password successfully changing"
            })
            console.log(`user's password with email ${req.body.email} successfully changing`)
        })
        .catch(error => errorHandler(res, error))
}

module.exports.getByEmail = async function (req, res) {
    database.getDataWithSelectedColumns(databaseName, {email: req.params.email}, ['name', 'email'])
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(error => {errorHandler(res, error)})
}