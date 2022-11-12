const express = require('express')
const controller = require('../controllers/mailController')
const passport = require("passport");

const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}, null))
router.use(access(roles.editor))

router.post('/send', controller.send)

module.exports = router
