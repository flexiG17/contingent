const express = require('express')
const controller = require('../controllers/auth')
const passport = require("passport");
const router = express.Router()

// роуты, прописанные для всего, что связано с авторизацией, пользователем и тд

// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.register)

// change password
router.patch('/change', passport.authenticate('jwt', {session: false}), controller.changeData)

module.exports = router