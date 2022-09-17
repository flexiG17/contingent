const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const router = express.Router() // для создания роутов используем express.Router

// роуты, прописанные для всего, что связано с уведомлениям (создание, редактирование, получение и тп)

// create new notification
router.post('/create', passport.authenticate('jwt', {session: false}), controller.create)
// change data notification
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), controller.update)
// get all notifications for display on pages for current user
router.get('/getByUser/:id', passport.authenticate('jwt', {session: false}), controller.getByUserId)
// delete notification by id
router.delete('/remove/:id', passport.authenticate('jwt', {session: false}), controller.remove)
// get count
router.get('/count/:id', passport.authenticate('jwt', {session: false}), controller.getCount)


module.exports = router