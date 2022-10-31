const express = require('express')
const controller = require('../controllers/auth')
const passport = require("passport");

const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
const auth = passport.authenticate('jwt', {session: false}, null)

// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', auth, access(roles.admin), controller.register)

// localhost:5000/api/auth/changePassword
router.put('/changePassword', auth, controller.changePassword)

module.exports = router