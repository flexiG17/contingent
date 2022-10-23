const XLSX = require('xlsx');

const Student = require('../models/Student');
const os = require('os')

const path = require('path')
const fs = require('fs')

const db = require('../db')

function getUploadFilePath(passport_number, russian_name) {
    return path.join(".", "uploads", `${passport_number}-${russian_name}`)
}

function getStudent(id) {
    return db.students.where({id})
}

function getStudents(ids) {
    return db.students.whereIn('id', ids)
}

module.exports.getColumns = async function (req, res) {
    let data = await db.informationColumns
        .select('column_name', 'column_type', 'column_comment')
        .where({table_name: 'students'})

    data = data.map(element => new Object({
        name: element['COLUMN_NAME'],
        type: element['COLUMN_TYPE'],
        ru: element['COLUMN_COMMENT']
    }))

    res.status(200).json(data);
}

module.exports.getAll = async function (req, res) {
    const data = await db.students

    return res.status(200).json(data)
}

module.exports.create = async function (req, res) {
    const filePath = getUploadFilePath(req.body.passport_number, req.body.russian_name)

    const model = new Student(req.body, filePath)

    const [student] = await db.students.where({passport_number: model.passport_number})

    if (student != null)
        return res.status(400).json({
            message: `'${model.russian_name}' уже существует`
        })

    await db.students.insert(model)

    return res.status(201).json({
        message: `'${model.russian_name}' добавлен(а) в базу данных`
    })
}

module.exports.update = async function (req, res) {
    const [student] = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: "Студент не найден"})

    const newPath = getUploadFilePath(req.body.passport_number, req.body.russian_name)
    const model = new Student(req.body, newPath)

    const oldPath = getUploadFilePath(student.passport_number, student.russian_name)

    if (!fs.existsSync(oldPath))
        fs.mkdirSync(newPath)
    else
        fs.renameSync(oldPath, newPath)

    await getStudent(req.params.id).update(model)
    return res.status(200).json({message: `Студент '${model.russian_name}' был изменён`})
}

module.exports.remove = async function (req, res) {
    const [student] = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: 'Студента не существует'})

    const filePath = getUploadFilePath(student.passport_number, student.russian_name)

    if (fs.existsSync(filePath))
        fs.rmdirSync(filePath, {recursive: true})

    await getStudent(req.params.id).delete()
    return res.status(200).json({message: `'${student.russian_name}' успешно удалён`})
}

module.exports.getById = async function (req, res) {
    const [student] = await getStudent(req.params.id)

    if (!student)
        return res.status(401).json({message: "Студента не существует"})

    return res.status(200).json(student)
}

module.exports.importXlsxData = async function (req, res) {
    if (!req.file)
        return res.status(404).json({message: "Файл не найден"})

    const workbook = XLSX.readFile(req.file.path);
    const sheetNames = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

    for (let obj of data) {
        const filePath = getUploadFilePath(obj.passport_number, obj.russian_name)

        if (!fs.existsSync(filePath))
            fs.mkdirSync(filePath)
    }

    await db.students.insert(data)
    return res.status(201).json({message: "Импорт завершён успешно"})
}

module.exports.downloadXlsx = async function (req, res) {
    if (req.body.length === 0)
        return res.status(400).json({message: "Пустой запрос"})

    const data = await getStudents(req.body)

    const workSheet = XLSX.utils.json_to_sheet(data)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    const filePath = path.join(os.tmpdir(), "students.xlsx")
    XLSX.writeFile(workBook, filePath)

    res.download(filePath)
}

module.exports.removeArrayStudents = async function (req, res) {
    const students = await getStudents(req.body)

    for (let student of students) {
        const filePath = getUploadFilePath(student.passport_number, student.russian_name)

        if (fs.existsSync(filePath))
            fs.rmdirSync(filePath)
    }

    await getStudents(req.body).delete()
    return res.status(200).json({message: "Студенты удалены"})
}