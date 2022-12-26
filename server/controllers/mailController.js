const mailer = require('../services/mailService')
const SendMailDto = require("../dto/MailDtos/SendMailDto");

module.exports.send = async function (req, res) {
    req.body.to = [].concat(req.body.to)

    for (let to of req.body.to) {
        // from: req.user.email,
        const dto = new SendMailDto({
            from: req.body.from,
            to: to,
            subject: req.body.subject,
            text: req.body.text,
            files: req.files
        })

        await mailer.sendEmail(dto)
    }

    res.status(200).json({message: "Письмо отправлено"})
}