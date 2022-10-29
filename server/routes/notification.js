const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const roles = require("../utils/roles")
const access = require("../middleware/access")
const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}, null))
router.use(access(roles.editor))

router.post('/create', controller.create)
router.patch('/update/:id', controller.update)
router.get('/getByUser/:id', controller.getByUserId)
router.delete('/remove/:id', controller.remove)
router.get('/count/:id', controller.getCount)

module.exports = router