// тут мы создаем наше приложение

const express = require('express') // подключаем express в наш файл с помощью функции require
const bodyParser = require('body-parser') // для парсинга данных клиента
const cors = require('cors') // для обработки cors запросов на сервере
const morgan = require('morgan') // для более красивого логирования запросов (смотреть, что происходит с серверов в данный момент)

// регистрируем роуты
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const app = express() // в app кладем наше приложение
app.use(cors()) // app.use() - дает возможность добавлять плагины, роуты
app.use(morgan('dev')) // dev - режим разработки
app.use(bodyParser.urlencoded({extended: true})) // помогает декодировать Url
app.use(bodyParser.json()) // помогает генерировать js объекты из json, который мы получаем

// path - тот базовый url, который будет совмещаться с тем, который в роуте
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app