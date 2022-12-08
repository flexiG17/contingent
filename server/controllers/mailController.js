const mailer = require('../services/mailService')
const SendMailDto = require("../dto/MailDtos/SendMailDto");

module.exports.send = async function (req, res) {
    req.body.to = [].concat(req.body.to)

    for (let to of req.body.to) {
        const dto = new SendMailDto({
            from: req.user.email,
            to: to,
            subject: req.body.subject,
            text: req.body.text
        })

        await mailer.sendEmail(dto)
    }

    res.status(200).json({message: "Письмо отправлено"})
}