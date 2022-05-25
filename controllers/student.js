const database = require('../utils/database')
const Student = require('../models/Student');
const errorHandler = require('../utils/errorHandler')

const databaseName = 'students'

module.exports.getAll = function (req, res) {
    database.getAllData(databaseName)
        .then(data => {
            console.log(data)

            res.status(200).json({
                message: `all data successfully received`
            })
        })
        .catch(error => errorHandler(res, error))
}

module.exports.getForMainPage = function (req, res) {
    const columnsToDisplay = [
        'education_type',
        'country',
        'latin_name',
        'russian_name',
        'enrollment',
        'enrollment_order',
        'expulsion_order',
        'contract_number',
        'gender',
    ]
    database.getCurrentData(databaseName, columnsToDisplay)
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error => errorHandler(res, error))
}

module.exports.create = function (req, res) {
    const student = new Student(req)

    database.isExist(databaseName, {passport_number: student.passportNumber})
        .then(studentExistsInSystem => {
            if (studentExistsInSystem) {
                res.status(409).json({
                    message: `User ${student.russianName} exists in system. Try again`
                })

                console.log(`User \"${student.russianName}\" exists in system`)
            } else {
                const modelToSave = student.getModel()
                database.save(databaseName, modelToSave)
                    .then(() => {
                        res.status(201).json({
                            message: `Added to database ${student.russianName}`
                        })
                        console.log(`It\`s a new user. Added to database \"${student.russianName}\"`)
                    })
                    .catch(error => errorHandler(res, error))
            }
        })
        .catch(error => errorHandler(res, error))
}

module.exports.update = function (req, res) {

}

module.exports.remove = function (req, res) {
    const condition = {passport_number: req.body.passportNumber}

    database.isExist(databaseName, condition)
        .then(studentExistsInSystem => {
            if (studentExistsInSystem) {
                database.remove(databaseName, condition)
                    .then(() => {
                        res.status(200).json({
                            message: `${req.body.russianName} successfully deleted from ${databaseName} database`
                        })
                        console.log(`Student \"${req.body.russianName}\" successfully deleted from \"${databaseName}\" database`)
                    })
                    .catch(error => errorHandler(res, error))
            } else {
                res.status(201).json({
                    message: `You can't remove student ${req.body.russianName}, because he doesn't exist in the system. Check the correctness of the entered data`
                })
                console.log(`Student \"${req.body.russianName}\" doesn't exist in the system. Try again`)
            }
        })
        .catch(error => errorHandler(res, error))
}

module.exports.getById = function (req, res) {

}

module.exports.getByRussianName = function (req, res) {

}

module.exports.getByEnglishName = function (req, res) {

}

module.exports.getByBirthDate = function (req, res) {

}

module.exports.getByContract = function (req, res) {

}

module.exports.getByCountry = function (req, res) {

}

module.exports.getByPassport = function (req, res) {

}

module.exports.getByAgentName = function (req, res) {

}

module.exports.getByEmailName = function (req, res) {

}

module.exports.getByPhoneName = function (req, res) {

}