const express = require('express')
const controller = require('../controllers/mailController')
const passport = require("passport");

const upload = require("../middleware/upload")
const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}, null))
router.use(access(roles.editor))

router.post('/sendStudent', upload.any(), controller.sendStudent)
router.post('/sendAutomatically', upload.any(), controller.sendAutomatically)

module.exports = router
