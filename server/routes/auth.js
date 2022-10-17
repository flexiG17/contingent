const express = require('express')
const controller = require('../controllers/auth')
const passport = require("passport");
const router = express.Router()

// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.register)

// localhost:5000/api/auth/change
router.put('/change', passport.authenticate('jwt', {session: false}, null), controller.changePassword)

// get user data (name) for display on pages
router.get('/:email', passport.authenticate('jwt', {session: false}, null), controller.getByEmail)

module.exports = router