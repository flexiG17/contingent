const mailer = require('../services/mailService')
const SendMailDto = require("../dto/MailDtos/SendMailDto");

module.exports.sendStudent = async function (req, res) {
    const dto = new SendMailDto({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        files: req.files
    })

    await mailer.sendEmail(dto)

    res.status(200).json({message: "Письмо отправлено"})
}

module.exports.sendAutomatically = async (req, res) => {
    const studentsData = JSON.parse(req.body.studentData)

    let studentDataToHtml = []
    studentsData
        .map((student) => {
            studentDataToHtml.push(`<span style="font-size: 16px">${student.latin_name}</span></p>`)
            //studentDataToHtml.push(`<p><b>Имя</b>: <span style="font-size: 16px">${student.latin_name}</span></p>`)
            //studentDataToHtml.push(`<p><b>id</b>:<span style="font-size: 16px">${student.id}</span></p>`)
            //studentDataToHtml.push(`<br>`)
        })

    const dataToSend = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        files: req.files,
        html:
`<h3>Добрый день!</h3>
<p>Вы получили это письмо, так как в Информационной системе <i>urfucontingent</i> Подготовительного отделения для иностранных учащихся Ваш
электронный адрес указан в качестве адреса ответственного лица образовательной организации.<br>
В Информационной системе <i>urfucontingent</i> у кондидатов из списка ниже изменился статус на <b style="font-size: 16px">ОТЧИСЛЕН</b>.</p>
<br>
${studentDataToHtml.join("")}
<p>__________________________________</p>
<p>Сообщение было отправлено автоматически из <i>urfucontingent</i></p>`,
    }

    await mailer.sendEmail(dataToSend)

    res.status(200).json({message: "Письмо об отчислении отправлено в Визовый отдел"})
}