const XLSX = require('xlsx');

const Student = require('../models/Student');
const StudentService = require('../services/studentService')
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


module.exports.getColumns = async (req, res) =>
    res.status(200).json(StudentService.columns)


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
    const sheet = workbook.Sheets[sheetNames[0]]

    let columns = await StudentService.columns()
    columns = columns.filter(column => column.ru !== "")
    columns = columns.map(column => [column.ru.trim(), column.name.trim()])
    columns = new Map(columns)

    const range = XLSX.utils.decode_range(sheet["!ref"])

    for (let col = range.s.c; col <= range.e.c; col++)
    {
        const cell_ref = XLSX.utils.encode_cell({r: 0, c: col})
        let cell = sheet[cell_ref].v
        sheet[cell_ref].v = columns.get(cell)
        sheet[cell_ref].w = columns.get(cell)
        sheet[cell_ref].h = columns.get(cell)
    }

    let data = XLSX.utils.sheet_to_json(sheet, {raw: false})

    await db.students.insert(data)
    return res.status(201).json({message: "Импорт завершён успешно"})
}


module.exports.downloadXlsx = async function (req, res) {
    if (req.body.length === 0)
        return res.status(400).json({message: "Пустой запрос"})

    let columns = await StudentService.columns()
    columns = [].concat(columns)
    columns = columns.filter(column => column.ru !== "")
    columns = columns.map(column => [column.ru, column.name])

    const data = await getStudents(req.body).select(Object.fromEntries(columns))

    const workSheet = XLSX.utils.json_to_sheet(data)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    const filePath = path.join(os.tmpdir(), "students.xlsx")
    XLSX.writeFile(workBook, filePath)

    res.download(filePath)
}


module.exports.removeStudents = async function (req, res) {
    const students = await getStudents(req.body)

    for (let student of students) {
        const filePath = getUploadFilePath(student.passport_number, student.russian_name)

        if (fs.existsSync(filePath))
            fs.rmdirSync(filePath)
    }

    await getStudents(req.body).delete()
    return res.status(200).json({message: "Студенты удалены"})
}