const mongoose = require('mongoose')
// для создания схем для моделей
const Schema = mongoose.Schema

// описываем нужные поля в модели User
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// добавляем модель 'user', созданной по схеме userSchema
module.exports = mongoose.model('users', userSchema)