const mailer = require('../services/mailService')

module.exports.send = async function (req, res) {
    await mailer.sendEmail(req.body)

    res.status(200).json({message: "Письмо отправлено"})
}