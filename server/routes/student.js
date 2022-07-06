const express = require('express')
const passport = require('passport')

const controller = require('../controllers/student')
const upload = require('../middleware/upload')
const router = express.Router()

//localhost:5000/api/student
router.get('/', controller.getAll)
router.post('/create', upload.any(), controller.create)
// нужно не /update, а удалять по опр. ключу (например, /:passportNumber)
router.patch('/update/:id', upload.any(), controller.update)
// нужно не /remove, а удалять по опр. ключу (например, /:passportNumber)
router.delete('/remove/:id', controller.remove)

router.post('/getXlsxToDownload',  controller.createXlsx)
router.post('/importXlsxFile', upload.single('fileToImport'), controller.importXlsxData)
router.get('/download/xlsx', controller.downloadXlsx)

module.exports = router