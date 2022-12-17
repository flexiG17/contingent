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
        const mail = {
            from: `"${message.from}" <${process.env.EMAIL}>`,
            to: message.to,
            subject: message.subject,
            text: message.text,
            attachments: message.files.map(file => new Object({
                filename: file.originalname,
                content: file.buffer
            }))
        }

        await this.#transport.sendMail(mail)
    }
}