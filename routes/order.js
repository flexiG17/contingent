const express = require('express')
const controller = require('../controllers/order')

const router = express.Router()

router.post('/', controller.getAll)
router.get('/', controller.create)

module.exports = router