const express = require('express')
const router = express.Router()

const fileController = require("../controllers/fileManagerController")
const passport = require("passport");
const upload = require("../middleware/upload")

router.use(passport.authenticate('jwt', {session: false}, null))

router.post('/upload', upload.any(), fileController.uploadFile)
router.post('', fileController.createDir)

router.get('', fileController.getFiles)
router.get('/download', fileController.downloadFile)
router.get('/search', fileController.searchFile)
router.get('/diskSize', fileController.getDiskData)

router.delete('/', fileController.deleteFiles)

module.exports = router
