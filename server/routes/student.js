const express = require('express')
const passport = require('passport')

const controller = require('../controllers/student')
const upload = require('../middleware/upload')
const router = express.Router()

// роуты, прописанные для всего, что связано с работой со студентанми (создание, редактирование, получение и тп)

//localhost:5000/api/student

// получить всех
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

// создать нового студента
router.post('/create', passport.authenticate('jwt', {session: false}), upload.any(), controller.create)

// изменить данные нового студента по его id
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), upload.any(), controller.update)

// удалить студента по его id
router.delete('/remove/:id', passport.authenticate('jwt', {session: false}), controller.remove)

// удаляет несколько студентов по списку их id
router.delete('/removeStudents', passport.authenticate('jwt', {session: false}), controller.removeArrayStudents)

// все создающиеся файлы записываются на бэке в папку uploads

// получает данные студента и сохраняет их на сервере
router.post('/getXlsxToDownload', passport.authenticate('jwt', {session: false}), controller.createXlsx)

// качает файл с сервера и отправляет клиенту
router.get('/download/xlsx', passport.authenticate('jwt', {session: false}), controller.downloadXlsx)

// получается xlsx файл со студентами и пушит в бд
router.post('/importXlsxFile', passport.authenticate('jwt', {session: false}), upload.single('fileToImport'), controller.importXlsxData)

// какой-то временный роут, который просто проверяет пришедший файл с клиента и выводит его в консоль
router.post('/checkFiles', passport.authenticate('jwt', {session: false}), upload.any(), controller.checkFiles)

module.exports = router