const XLSX = require('xlsx');

const Student = require('../models/Student');
const StudentService = require('../services/studentService')
const FileService = require('../services/fileManagerService')

const os = require('os')
const path = require('path')

const db = require('../db')
const CyrillicToTranslit = require('cyrillic-to-translit-js')


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
    let [student_id] = await db.students.insert(model)

    if (req.files.length > 0) {
        const studentFile = await FileService.createStudentDir(student_id, req.user.id)
        await FileService.uploadFiles(req.files, studentFile.id, req.user.id)
    }

    return res.status(201).json({
        message: `'${model.russian_name}' добавлен(а) в базу данных`
    })
}


module.exports.update = async function (req, res) {
    const student = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: "Студент не найден"})

    const model = new Student(req.body)

    await getStudent(req.params.id).update(model)
    return res.status(200).json({message: `Студент '${model.russian_name}' был изменён`})
}


module.exports.remove = async function (req, res) {
    const student = await getStudent(req.params.id)

    if (!student)
        return res.status(404).json({message: 'Студента не существует'})

    await FileService.deleteStudentDirs([student.id])

    await getStudent(req.params.id).delete()
    return res.status(200).json({message: `'${student.russian_name}' успешно удалён`})
}


module.exports.getById = async function (req, res) {
    const student = await getStudent(req.params.id)

    if (!student)
        return res.status(401).json({message: "Студента не существует"})

    return res.status(200).json(student)
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// в папке uploads файл, откуда брал фио на кириллице
module.exports.createStudents = async (req, res) => {
    const workbook = XLSX.readFile('C:/Users/brend/Downloads/studentsToImport.xlsx');
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]
    const cyrillicToTranslit = new CyrillicToTranslit();

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
    let direct_number = ['090301', '090303']
    let levels_education = ['Высшее', 'Среднее общее', 'Неполное высшее']
    let form_studies = ['Очная', 'Гибрид', 'Онлайн']
    let countries = ['Россия', 'Испания', 'Португалия', 'Япония', 'Египет', 'Эквадор', 'Перу', 'Палестина', 'Автралия']
    let hours = ["1008 ак.ч. (1 год)", "1008 ак.ч. (1.5 год)", "868 ак.ч.", "728 ак.ч.", "588 ак.ч.", "504 ак.ч.", "288 ак.ч.", "144 ак.ч.", "108 ак.ч.", "72 ак.ч."]
    let counter = 512389
    let phoneNumbers = 8800883535
    for (let i = 0; i < data.length; i++){
        let randomValue = Math.floor(Math.random() * 2)
        data[i].country = countries[Math.floor(Math.random() * countries.length)]
        data[i].citizenship = countries[Math.floor(Math.random() * countries.length)]
        data[i].latin_name = cyrillicToTranslit.transform(data[i].russian_name)
        data[i].enrollment_order = ++counter
        data[i].expulsion_order = ++counter
        data[i].contract_number = ++counter
        data[i].birth_date = randomDate(new Date(2000, 0, 1), new Date());
        data[i].birth_place = countries[Math.floor(Math.random() * countries.length)]
        data[i].residence_place = countries[Math.floor(Math.random() * countries.length)]
        data[i].passport_number = ++counter
        data[i].passport_issued = countries[Math.floor(Math.random() * countries.length)]
        data[i].passport_issue_date = randomDate(new Date(2000, 0, 1), new Date());
        data[i].passport_expiration = randomDate(new Date(2000, 0, 1), new Date());
        data[i].level_education = levels_education[Math.floor(Math.random() * levels_education.length)]
        data[i].graduation_year = randomDate(new Date(2000, 0, 1), new Date()).getFullYear();
        data[i].desired_education_level = levels_education[Math.floor(Math.random() * levels_education.length)]
        data[i].specialty_code = direct_number[Math.floor(Math.random() * direct_number.length)]
        data[i].direction_number = direct_number[Math.floor(Math.random() * direct_number.length)]
        data[i].form_study = form_studies[Math.floor(Math.random() * form_studies.length)]
        data[i].contact_phone_number = ++phoneNumbers
        data[i].student_email = 'senya@mail.ru'
        data[i].hours_number = hours[Math.floor(Math.random() * hours.length)]
        data[i].entry_date = randomDate(new Date(2015, 0, 1), new Date());
        data[i].visa_validity = randomDate(new Date(2015, 0, 1), new Date());
        data[i].first_payment = randomDate(new Date(2021, 0, 1), new Date());
        data[i].second_payment = randomDate(new Date(2021, 0, 1), new Date());
        data[i].third_payment = randomDate(new Date(2021, 0, 1), new Date());
        data[i].fourth_payment = randomDate(new Date(2021, 0, 1), new Date());
        data[i].transfer_to_international_service = randomDate(new Date(2021, 0, 1), new Date());
        data[i].transfer_to_MVD = randomDate(new Date(2021, 0, 1), new Date());
        data[i].estimated_receipt_date = randomDate(new Date(2021, 0, 1), new Date());
        data[i].actual_receipt_date_invitation = randomDate(new Date(2021, 0, 1), new Date());

        switch(randomValue){
            case 0: {
                data[i].education_type = 'Квота'
                data[i].enrollment = 'Зачислен'
                data[i].status_1c = 'Прикреплен'
                data[i].gender = 'Мужской'
                data[i].RF_location = 'Да'
                data[i].scholarship = 'Да'
            } break
            case 1: {
                data[i].education_type = 'Контракт'
                data[i].enrollment = 'Не зачислен'
                data[i].status_1c = 'Не прикреплен'
                data[i].gender = 'Женский'
                data[i].RF_location = 'Нет'
                data[i].scholarship = 'Нет'
            }
        }
    }

    await db.students.insert(data)
    return res.status(201).json({
        message: 'completed'
    })
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

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cell_ref = XLSX.utils.encode_cell({r: 0, c: col})
        let cell = sheet[cell_ref].v
        sheet[cell_ref].v = columns.get(cell)
        sheet[cell_ref].w = columns.get(cell)
        sheet[cell_ref].h = columns.get(cell)
    }

    let data = XLSX.utils.sheet_to_json(sheet, {raw: false})

    data = data.map(student => new Student(student))
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
    const student_ids = students.map(student => student.id)

    await FileService.deleteStudentDirs(student_ids)

    await getStudents(req.body).delete()
    return res.status(200).json({message: "Студенты удалены"})
}