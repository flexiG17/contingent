const express = require('express')
const controller = require('../controllers/userController')
const passport = require("passport");

const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}, null))
router.use(access(roles.admin))

router.get('/', controller.getAll)

// localhost:5000/api/user/change/{id}
router.put('/change/:id', controller.change)
router.delete('/remove/:id', controller.remove)

module.exports = router
