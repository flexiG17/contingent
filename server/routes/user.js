const express = require('express')
const controller = require('../controllers/userController')
const passport = require("passport");

const access = require("../middleware/access")
const roles = require("../utils/roles")

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}, null))

router.get('/', access(roles.admin), controller.getAll)

// localhost:5000/api/user/change/{id}
router.put('/change', controller.changeSelf)
router.put('/change/:id', access(roles.admin), controller.change)
router.delete('/remove/:id', access(roles.admin), controller.remove)

module.exports = router
