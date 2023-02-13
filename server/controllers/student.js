const XLSX = require('xlsx');

const Student = require('../models/Student');
const StudentService = require('../services/studentService')
const FileService = require('../services/fileManagerService')

const os = require('os')
const path = require('path')

const db = require('../db')


function getStudent(id) {
    return db.students.where({id}).first()
}

function getStudents(ids) {
    return db.students.whereIn('id', ids)
}

module.exports.getColumns = async (req, res) =>
    res.status(200).json(await StudentService.columns())

module.exports.getAll = async function (req, res) {
    const data = await db.students

    return res.status(200).json(data)
}

module.exports.create = async function (req, res) {
    const model = new Student(req.body)

    let student_id = 0
    try {
        student_id = await db.students.insert(model)
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(409).json({message: `Студент ${model.latin_name} с номером паспорта ${model.passport_number} уже существует`})

        throw new Error(err.message)
    }

    if (req.files.length > 0) {
        const studentFile = await FileService.createStudentDir(student_id, req.user.id)
        await FileService.uploadFiles(req.files, studentFile.id, req.user.id)
    }

    return res.status(201).json({
        message: `${model.latin_name} добавлен(а) в базу данных`
    })
}

module.exports.update = async function (req, res) {
    const student = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: "Студент не найден"})

    const model = new Student(req.body)

    await getStudent(req.params.id).update(model)

    return res.status(200).json({message: `Студент ${model.latin_name} был изменён`})
}

module.exports.remove = async function (req, res) {
    const student = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: 'Студента не существует'})

    await FileService.deleteStudentDirs([student.id])

    await getStudent(req.params.id).delete()
    return res.status(200).json({message: `${student.latin_name} успешно удалён`})
}

module.exports.removeStudents = async function (req, res) {
    const students = await getStudents(req.body)
    const students_id = students.map(student => student.id)

    await FileService.deleteStudentDirs(students_id)

    await getStudents(req.body).delete()
    return res.status(200).json(
        {
            message: req.body.length === 1 ? "Студент удален" : "Студенты удалены"
        })
}

module.exports.getByIds = async function (req, res) {
    const ids = [].concat(req.body)
    const students = await getStudents(ids)

    return res.status(200).json(students)
}

module.exports.importXlsxData = async function (req, res) {
    if (!req.files[0])
        return res.status(404).json({message: "Файл не найден"})

    req.file = req.files[0]
    const workbook = XLSX.readFile(req.file.path);
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]

    let columns = await StudentService.columns()
    columns = columns.filter(column => column.ru !== "")
    columns = columns.map(column => [column.ru.trim(), column.name.trim()])
    columns = new Map(columns)

    const range = XLSX.utils.decode_range(sheet["!ref"])

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cell_ref = XLSX.utils.encode_cell({r: 0, c: col})
        let cell = sheet[cell_ref].v
        sheet[cell_ref].v = columns.get(cell)
        sheet[cell_ref].w = columns.get(cell)
        sheet[cell_ref].h = columns.get(cell)
    }

    let data = XLSX.utils.sheet_to_json(sheet, {raw: false})

    data = data.map(student => new Student(student))

    for (const model of data) {
        const isExist = await db.students.where({passport_number: model.passport_number}).first()

        if (isExist)
            return res.status(409).json({message: `Студент ${model.latin_name} с номером паспорта ${model.passport_number} уже существует`})
    }

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