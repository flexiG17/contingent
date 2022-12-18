const express = require('express')
const passport = require('passport')

const controller = require('../controllers/student')
const upload = require('../middleware/upload')

const roles = require('../utils/roles')
const access = require('../middleware/access')

const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}, null))

//localhost:5000/api/student
router.get('/', controller.getAll)
router.get('/getStudents', controller.getByIds)
router.get('/columns', controller.getColumns)

router.post('/create', access(roles.editor), upload.any(), controller.create)

router.put('/update/:id', access(roles.editor), controller.update)
router.delete('/remove/:id', access(roles.editor), controller.remove)

router.post('/importXlsxFile', access(roles.editor), upload.single(), controller.importXlsxData)
router.post('/download/xlsx', controller.downloadXlsx)

router.delete('/removeStudents', access(roles.editor), controller.removeStudents)

module.exports = router