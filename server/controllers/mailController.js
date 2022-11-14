const mailer = require('../services/mailService')

module.exports.send = async function (req, res) {
    req.body.from = req.user.email
    await mailer.sendEmail(req.body)

    res.status(200).json({message: "Письмо отправлено"})
}