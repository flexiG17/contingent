const nodemailer = require('nodemailer')

module.exports = new class MailService {

    #transport = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    async sendEmail(message) {
        await this.#transport.sendMail({
            from: `"${message.from}" <${process.env.EMAIL}>`,
            to: message.to,
            subject: message.subject,
            text: message.text
        })
    }
}