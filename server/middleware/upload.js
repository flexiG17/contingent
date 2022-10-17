const multer = require('multer')
const path = require('path')
const fs = require('fs')
const os = require('os')


// работа с сохранением файлом при помощи multer, но, возможно, отойдем от этой задумки
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.join(".", "uploads")

        const passport_number = req.body.passport_number
        const name = req.body.russian_name

        if (passport_number && name) {
            dir = path.join(dir, `${req.body.passport_number}-${req.body.russian_name}`)

            if (!fs.existsSync(dir))
                fs.mkdirSync(dir)

            return cb(null, dir)
        }

        return cb(null, os.tmpdir())
    },

    filename: function (req, file, cb) {
        if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        }

        cb(null, file.originalname)
    },
})

module.exports = multer({storage})