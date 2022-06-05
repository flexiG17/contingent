const multer = require('multer')
const moment = require('moment')
const fs = require("fs-extra");

const storage = multer.diskStorage({
    async destination(req, file, cb){
        const param = await req.body.passportNumber
        const path = `uploads/${param}`
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage: storage,
    limits: limits
})