const express = require('express')
const passport = require('passport')

const controller = require('../controllers/student')
const upload = require('../middleware/upload')
const router = express.Router()

//localhost:5000/api/student
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/create', passport.authenticate('jwt', {session: false}), upload.any(), controller.create)
// нужно не /update, а удалять по опр. ключу (например, /:passportNumber)
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), upload.any(), controller.update)
// нужно не /remove, а удалять по опр. ключу (например, /:passportNumber)
router.delete('/remove/:id', passport.authenticate('jwt', {session: false}), controller.remove)

router.post('/getXlsxToDownload', passport.authenticate('jwt', {session: false}), controller.createXlsx)

router.post('/importXlsxFile', passport.authenticate('jwt', {session: false}), upload.single('fileToImport'), controller.importXlsxData)
router.post('/checkFiles', passport.authenticate('jwt', {session: false}), upload.any(), controller.checkFiles)

router.get('/download/xlsx', passport.authenticate('jwt', {session: false}), controller.downloadXlsx)


router.delete('/removeStudents', passport.authenticate('jwt', {session: false}), controller.removeArrayStudents)

module.exports = router