const app = require('./app')
// можно задать порт через консоль, а если не задано, то используем 5000
const port = process.env.PORT || 5000

// запуск сервера

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at localhost:${port} in ${app.get("env")} mode`)
})