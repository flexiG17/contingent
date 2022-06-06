const database = require('../utils/database')
const Student = require('../models/Student');
const errorHandler = require('../utils/errorHandler')

const databaseName = 'students'
const columnsToDisplay = [
    'education_type',
    'latin_name',
    'russian_name',
    'country',
    'gender',
    'contract_number',
    'enrollment_order',
    'enrollment',
]

module.exports.getAll = function (req, res) {
    database.getAllData(databaseName)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => errorHandler(res, error))
}

module.exports.getForMainPage = function (req, res) {
    database.getCurrentData(databaseName, columnsToDisplay)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => errorHandler(res, error))
}

module.exports.create = async function (req, res) {
    const filePath = req.files ? `uploads\\\\${req.body.passportNumber}` : ""
    const student = new Student(req, filePath)

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

    let filePath = ''
    if (req.file) {
        filePath = req.file
    }
    const student = new Student(req, filePath)

    database.changeData(databaseName, {passport_number: student.passportNumber}, student.getModel())
        .then(() => {
            res.status(201).json({
                message: "Student data successfully changing"
            })
            console.log(`Student data successfully changing`)
        })
        .catch(error => errorHandler(res, error))
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

module.exports.getByRussianName = async function (req, res) {
    database.getDataWithSelectedColumns(databaseName, {russian_name: req.params.russianName}, columnsToDisplay)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            errorHandler(res, error)
        })
}

module.exports.getByParam = async function (req, res) {
    const dataToFilter = [
        req.query.latinName,
        req.query.russianName,
        req.query.birthDate,
        req.query.contract,
        req.query.country,
        req.query.passport,
        req.query.agentName,
        req.query.agentEmail,
        req.query.agentPhone
    ]
    let resultFilter = []
    let condition = []
    let resultCondition = {}

    for (let i = 0; i < dataToFilter.length; i += 1) {
        if (dataToFilter[i] != null) {
            resultFilter.push(dataToFilter[i])
        }
    }

    for (let i = 0; i < resultFilter.length; i += 1) {
        switch (resultFilter[i]) {
            case req.query.latinName:
                //condition.push({latin_name: resultFilter[i]})
                resultCondition.latin_name = resultFilter[i]
                //console.log(resultCondition)
                break;
            case req.query.russianName:
                //condition.push({russian_name: resultFilter[i]})
                resultCondition.russian_name = resultFilter[i]
                break;
            case req.query.birthDate:
                //condition.push({birth_date: resultFilter[i]})
                resultCondition.birth_date = resultFilter[i]
                break;
            case req.query.contract:
                //condition.push({contract_number: resultFilter[i]})
                resultCondition.contract_number = resultFilter[i]
                break;
            case req.query.country:
                //condition.push({country: resultFilter[i]})
                resultCondition.country = resultFilter[i]
                //console.log(resultCondition)
                break;
            case req.query.passport:
                //condition.push({passport_number: resultFilter[i]})
                resultCondition.passport_number = resultFilter[i]
                break;
            case req.query.agentName:
                //condition.push({agent_name: resultFilter[i]})
                resultCondition.agent_name = resultFilter[i]
                break;
            case req.query.agentEmail:
                //condition.push({agent_email: resultFilter[i]})
                resultCondition.agent_email = resultFilter[i]
                break;
            case req.query.agentPhone:
                //condition.push({agent_phone_number: resultFilter[i]})
                resultCondition.agent_phone_number = resultFilter[i]
                break;

        }
    }
    console.log(`condition: ${resultCondition}`)
    //res.status(200).json(resultCondition)

    database.getDataByParam(databaseName, condition, columnsToDisplay)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            errorHandler(res, error)
        })
}
/*

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

module.exports.getByAgentEmail = function (req, res) {

}

module.exports.getByAgentPhone = function (req, res) {

}
*/
