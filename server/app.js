const express = require('express')

require('express-async-errors') // stub for catching async errors in controllers

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const passport = require('passport')
const authorization = require('./middleware/passport')

const authRoutes = require('./routes/auth')
const studentRoutes = require('./routes/student')
const notificationRoutes = require('./routes/notification')
const userRoutes = require('./routes/user')

const errorHandler = require('./utils/errorHandler')

const app = express()

app.use(passport.initialize())
passport.use(authorization.strategy)

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/user', userRoutes)

app.use((err, req, res, next) => errorHandler(err, res))

module.exports = app