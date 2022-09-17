const XLSX = require('xlsx');

const database = require('../utils/database')
const Student = require('../models/Student');
const errorHandler = require('../utils/errorHandler')

const databaseName = 'students'

// контроллер для написания методов роутов студентов

module.exports.getAll = function (req, res) {
    database.getAllData(databaseName)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => errorHandler(res, error))
}

// создание нового пользователя с проверкой на существования с таким номером паспорта (можно усложнить)
module.exports.create = async function (req, res) {
    // работа с файлом не организована, это всё на будущее
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

// метод для обновления данных студента - просто перезаписывает все поля
module.exports.update = function (req, res) {
    console.log(req.body.document_path)
    let filePath = ''
    if (req.file) {
        filePath = req.file
    }
    const student = new Student(req, filePath)

    database.changeData(databaseName, {id: req.params.id}, student.getModel())
        .then(() => {
            res.status(200).json({
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

// получает данные студентов в формате json, которые записываются в xlsx, а таблица сохраняется в папку на бэке
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

// получает xlsx файл, который парсится в json и данные записываются в бд
module.exports.importXlsxData = (req, res) => {
    if (req.file) {
        const workbook = XLSX.readFile(`./uploads/studentsToImport/${req.file.originalname}`);
        const sheet_name_list = workbook.SheetNames;
        const dataToSave = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        database.save(databaseName, dataToSave)
            .then(() => {
                res.status(201).json({message: "haha"})
            })
            .catch(e => errorHandler(res, e))
    }
}

// просто метод, отправляющий на клиент файл
module.exports.downloadXlsx = function (req, res) {
    const file = './uploads/xlsxToDownload/studentsByFilter.xlsx'
    res.download(file)
}

// метод удаляющий студентов по массиву id
module.exports.removeArrayStudents = (req, res) => {
    database.removeArray(databaseName, req.body, 'id')
        .then(() => res.status(200).json("Successfully"))
}

module.exports.checkFiles = (req, res) => {
    const file = req.files
    console.log(file)
    /*file.originalname = Buffer.from(req.files[1].originalname, 'latin1').toString('utf8')
    file.filename = Buffer.from(req.files[1].filename, 'latin1').toString('utf8')*/

    if (file){
        res.sendStatus(200)
    } else res.sendStatus(400)
}