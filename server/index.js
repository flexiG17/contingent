require('dotenv').config({
    path: process.env.ENV_PATH === undefined ? '.env' : process.env.ENV_PATH
});

const app = require('./app')

const cron = require('node-cron');
const http = require('http')
const NotificationRepository = require("./repositories/notificationRepository");

function isInThePast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

const everyDayMidnight = "0 0 0 * * *"
const everyTenSeconds = "*/10 * * * * *"
cron.schedule(everyDayMidnight, async () => {
    const notificationRepository = new NotificationRepository()
    const allTasks = await notificationRepository.getAllNotificationsAsync()
    allTasks.map(async (task) => {
        if (isInThePast(task.date)) {
            task.students_id = [].concat(task.students_id)
            task.completed = 'Просрочено'

            await notificationRepository.updateAsync(task, task.id)
        }
    })

    const today = new Date();
    const resultDate = `${today.getDay() > 10 ? today.getDay() : 0}${today.getDay()}.${today.getDay() > 10 ? today.getDay() : 0}${today.getMonth() + 1}.${today.getFullYear()}`
    const resultTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    console.log(`Статус задач обновлён ${resultDate} в ${resultTime}`);
});

const port = process.env.PORT || 5000

/*const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
app.ws('/student/:id', (ws, req) => {
    // отправляем на клиента с типом message
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method){
            case 'connection':
                connectionHandler(ws, msg)
                break
        }
    })
})*/

/*const connectionHandler = (ws, msg) => {
    ws.id = msg.studentId
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.studentId){
            client.send(JSON.stringify({
                method: 'connection',
                userId: msg.userId,
                userName: msg.userName,
                studentId: msg.studentId
            }))
        }
    })
}*/
const server = http.createServer(app)

/*
const WebSocket = require("ws")
const {v4: uuidv4} = require('uuid')
const wss = new WebSocket.Server({server})

wss.on('connection', ws => {
    ws.id = uuidv4()

    ws.on('message', m => {
        const json = JSON.parse(m)

        if (json.event === 'studentEditAccess') {
            const student_id = json.student_id

            const message = {
                id: ws.id,
                event: json.event,
                student_id: student_id
            }

            for (let client of wss.clients) {
                if (client !== ws)
                    client.send(JSON.stringify(message))
            }
        }

        if (json.event === 'studentEditDecline') {
            const student_id = json.student_id

            const message = {
                id: ws.id,
                event: json.event,
                student_id: student_id,
                to: json.to
            }

            for (const client of wss.clients) {
                if (client.id === json.to)
                    client.send(JSON.stringify(message))
            }
        }
    })

    ws.on("error", e => ws.send(e));

    ws.send(ws.id)
})
*/

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at localhost:${port} in ${app.get("env")} mode`)
})