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

router.post('/getXlsx',  controller.getXlsx)

// я хз почему, но это должно стоять впереди..
router.get('/filter', passport.authenticate('jwt', {session: false}), controller.getByParam)
/*
router.get('/filter', controller.getByRussianName)

router.get('/:id', controller.getById)
router.get('/:russianName', controller.getByRussianName)
router.get('/:birthDate', controller.getByBirthDate)
router.get('/:contract', controller.getByContract)
router.get('/:country', controller.getByCountry)
router.get('/:passport', controller.getByPassport)
router.get('/:agentName', controller.getByAgentName)
router.get('/:agentEmail', controller.getByAgentEmail)
router.get('/:agentPhone', controller.getByAgentPhone)*/

module.exports = router