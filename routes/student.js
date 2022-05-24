const express = require('express')
const controller = require('../controllers/student')
const router = express.Router()

//localhost:5000/api/student/
router.get('/', controller.getAll)
router.get('/main', controller.getForMainPage)
router.post('/create', controller.create)
router.patch('/:id', controller.update)
// нужно не /remove, а удалять по опр. ключу /:passportNumber
router.delete('/remove', controller.remove)
router.get('/:id', controller.getById)
router.get('/:russianName', controller.getByRussianName)
router.get('/:englishName', controller.getByEnglishName)
router.get('/:birthDate', controller.getByBirthDate)
router.get('/:contract', controller.getByContract)
router.get('/:country', controller.getByCountry)
router.get('/:passport', controller.getByPassport)
router.get('/:agentName', controller.getByAgentName)
router.get('/:agentEmail', controller.getByEmailName)
router.get('/:agentPhone', controller.getByPhoneName)

module.exports = router