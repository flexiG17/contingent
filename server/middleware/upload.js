const multer = require('multer')
const path = require('path')
const fs = require('fs')
const os = require('os')


const storage = multer.diskStorage({
    destination: os.tmpdir(),

    filename: function (req, file, cb) {
        if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        }

        cb(null, file.originalname)
    },
})

module.exports = multer({storage})