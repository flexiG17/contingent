require('dotenv').config({
    path: process.env.ENV_PATH === undefined ? '.env' : process.env.ENV_PATH
});

// const cron = require('./utils/notificationDaemon') // not yet implemented

const app = require('./app')

// cron.job.start()

const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at localhost:${port} in ${app.get("env")} mode`)
})