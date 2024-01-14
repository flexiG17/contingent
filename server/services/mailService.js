const nodemailer = require('nodemailer')

module.exports = new class MailService {

    #transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
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
            bcc: process.env.EMAIL,
            subject: message.subject,
            text: message.text,
            html: message.html,
            attachments: message.files.map(file => new Object({
                filename: file.originalname,
                path: file.path
            }))
        }

        await this.#transport.sendMail(mail)
    }
}