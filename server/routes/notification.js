const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const router = express.Router() // для создания роутов используем express.Router


// create new notification
router.post('/create', controller.create)
// change data notification
router.patch('/', passport.authenticate('jwt', {session: false}), controller.update)
// get all notifications for display on pages for current user
router.get('/getByUserId', passport.authenticate('jwt', {session: false}), controller.getByUserId)

// временно
router.get('/getAll', controller.getAll)

// delete notification by id
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)


module.exports = router