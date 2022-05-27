const express = require('express')
const controller = require('../controllers/student')
const router = express.Router()

//localhost:5000/api/student
router.get('/', controller.getAll)
router.get('/main', controller.getForMainPage)
router.post('/create', controller.create)
// нужно не /update, а удалять по опр. ключу (например, /:passportNumber)
router.patch('/update', controller.update)
// нужно не /remove, а удалять по опр. ключу (например, /:passportNumber)
router.delete('/remove', controller.remove)

// я хз почему, но это должно стоять впереди..
router.get('/filter', controller.getByParam)
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