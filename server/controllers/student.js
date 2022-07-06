const XLSX = require('xlsx');

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

module.exports.create = async function (req, res) {
    const filePath = req.files ? `uploads\\\\${req.body.passport_number}` : ""
    const student = new Student(req, filePath)

    database.isExist(databaseName, {passport_number: student.passport_number})
        .then(studentExistsInSystem => {
            if (studentExistsInSystem) {
                res.status(409).json({
                    message: `User ${student.russian_name} exists in system. Try again`
                })

                console.log(`User \"${student.russian_name}\" exists in system`)
            } else {
                const modelToSave = student.getModel()
                database.save(databaseName, modelToSave)
                    .then(() => {
                        res.status(201).json({
                            message: `Added to database ${student.russian_name}`
                        })
                        console.log(`It\`s a new user. Added to database \"${student.russian_name}\"`)
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

    database.changeData(databaseName, {id: req.params.id}, student.getModel())
        .then(() => {
            res.status(201).json({
                message: "Student data successfully changing"
            })
            console.log(`Student data successfully changing`)
        })
        .catch(error => errorHandler(res, error))
}

module.exports.remove = function (req, res) {
    const condition = {id: req.params.id}

    database.isExist(databaseName, condition)
        .then(studentExistsInSystem => {
            if (studentExistsInSystem) {
                database.remove(databaseName, condition)
                    .then(() => {
                        res.status(200).json({
                            message: `${req.body.russian_name} successfully deleted from ${databaseName} database`
                        })
                        console.log(`Student \"${req.body.russian_name}\" successfully deleted from \"${databaseName}\" database`)
                    })
                    .catch(error => errorHandler(res, error))
            } else {
                res.status(201).json({
                    message: `You can't remove student ${req.body.russian_name}, because he doesn't exist in the system. Check the correctness of the entered data`
                })
                console.log(`Student \"${req.body.russian_name}\" doesn't exist in the system. Try again`)
            }
        })
        .catch(error => errorHandler(res, error))
}

module.exports.getById = function (req, res) {

}

module.exports.importXlsxData = (req, res) => {
    if (req.file) {
        const workbook = XLSX.readFile("./uploads/studentsToImport.xlsx");
        const sheet_name_list = workbook.SheetNames;
        const dataToSave =  XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        dataToSave.map(student => {
            database.save(databaseName, student)
                .then(() => {
                    res.status(201)
                })
                .catch(e => errorHandler(res, e))
        })
    }
}

module.exports.createXlsx = function (req, res) {
    const workSheet = XLSX.utils.json_to_sheet(req.body)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    // Generate buffer
    XLSX.write(workBook, {bookType: 'xlsx', type: "buffer"})

    // Binary string
    XLSX.write(workBook, {bookType: 'xlsx', type: "binary"})

    XLSX.writeFile(workBook, "./uploads/xlsxToDownload/studentsByFilter.xlsx")
}

module.exports.downloadXlsx = function (req, res) {
    const file = './uploads/xlsxToDownload/studentsByFilter.xlsx'
    res.download(file)
}