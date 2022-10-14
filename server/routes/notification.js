const express = require('express')
const controller = require('../controllers/notification')
const passport = require("passport");
const router = express.Router()


router.post('/create', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/update/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.get('/getByUser/:id', passport.authenticate('jwt', {session: false}), controller.getByUserId)
router.delete('/remove/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.get('/count/:id', passport.authenticate('jwt', {session: false}), controller.getCount)


module.exports = router