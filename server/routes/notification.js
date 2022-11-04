const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const roles = require("../utils/roles")
const access = require("../middleware/access")
const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}, null))
//router.use(access(roles.editor))

router.get('/', controller.getAll)
router.post('/create', controller.create)
router.put('/update/:id', controller.update)
router.delete('/remove/:id', controller.remove)

module.exports = router