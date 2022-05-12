const express = require('express')
const controller = require('../controllers/analytics')

const router = express.Router()

router.post('/overview', controller.overview)
router.post('/analytics', controller.analytics)

module.exports = router