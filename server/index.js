require('dotenv').config({
    path: process.env.ENV_PATH === undefined ? '.env' : process.env.ENV_PATH
});

// const cron = require('./utils/notificationDaemon') // not yet implemented

const app = require('./app')

const cron = require('node-cron');
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

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at localhost:${port} in ${app.get("env")} mode`)
})