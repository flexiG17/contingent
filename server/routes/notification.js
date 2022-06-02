const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const router = express.Router() // для создания роутов используем express.Router


// create new notification
router.post('/create', passport.authenticate('jwt', {session: false}), controller.create)
// change data notification
router.patch('/change', passport.authenticate('jwt', {session: false}), controller.update)
// get all notifications for display on pages for current user
router.get('/:userId', passport.authenticate('jwt', {session: false}), controller.getByUserId)
// delete notification by id
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)


module.exports = router