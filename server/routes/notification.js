const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}, null))

router.get('/', controller.getAll)
router.post('/create', controller.create)
router.put('/update/:id', controller.update)
router.delete('/remove', controller.remove)

module.exports = router