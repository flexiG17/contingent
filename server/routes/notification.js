const express = require('express')
const controller = require('../controllers/notification')
const router = express.Router() // для создания роутов используем express.Router


// create new notification
router.post('/create', controller.create)
// change data notification
router.patch('/change', controller.update)
// get all notifications for display on pages for current user
router.get('/:userId', controller.getByUserId)
// delete notification by id
router.delete('/:id', controller.remove)


module.exports = router