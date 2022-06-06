const express = require('express')
const controller = require('../controllers/auth')
const passport = require("passport");
const router = express.Router()

// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', passport.authenticate('jwt', {session: false}), controller.register)

// change password
router.patch('/change', passport.authenticate('jwt', {session: false}), controller.changeData)

// get user data (name) for display on pages
router.get('/:email', passport.authenticate('jwt', {session: false}), controller.getByEmail)

module.exports = router