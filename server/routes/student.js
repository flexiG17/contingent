const express = require('express')
const passport = require('passport')

const controller = require('../controllers/student')
const upload = require('../middleware/upload')

const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}, null))

//localhost:5000/api/student
router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.post('/create', upload.any(), controller.create)

router.put('/update/:id', controller.update)
router.delete('/remove/:id', controller.remove)

router.post('/importXlsxFile', upload.single(), controller.importXlsxData)
router.post('/download/xlsx', controller.downloadXlsx)

router.delete('/removeStudents', controller.removeArrayStudents)

module.exports = router