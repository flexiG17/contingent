const mongoose = require('mongoose')
// для создания схем для моделей
const Schema = mongoose.Schema

// описываем нужные поля в модели Category
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    // Храним ссылку на id опр. пользователя
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

// добавляем модель 'categories', созданной по схеме categorySchema
module.exports = mongoose.model('categories', categorySchema)