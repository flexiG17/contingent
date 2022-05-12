const mongoose = require('mongoose')
// для создания схем для моделей
const Schema = mongoose.Schema

// описываем нужные поля в модели Position
const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    // ссылка на категории
    category:{
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

// добавляем модель 'positions', созданной по схеме categorySchema
module.exports = mongoose.model('positions', positionSchema)