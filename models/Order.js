const mongoose = require('mongoose')
// для создания схем для моделей
const Schema = mongoose.Schema

// описываем нужные поля в модели User
const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

// добавляем модель 'order', созданной по схеме orderSchema
module.exports = mongoose.model('orders', orderSchema)