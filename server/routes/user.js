const express = require('express')
const controller = require('../controllers/auth')
const passport = require("passport");

const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}, null))
router.use(access(roles.admin))

// localhost:5000/api/user/change/{id}
router.put('/change/:id')

// get user data (name) for display on pages
router.get('/:email', controller.getByEmail)

module.exports = router
