const db = require('../db');
// const User = require('../models/User')

// req - все данные, которые отправляет пользователь
module.exports.login = function (req, res){
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

module.exports.register = function (req, res){
    // email password
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

//    user.save().then(() => console.log('User Created'))
}

// фигня, которая достает нужные штуки из бд
module.exports.GetPerson = async function (body){

    const currentUser = await db('test');
    console.log(currentUser)

    //var [currentUser] = await db('test').where({Email: 'sdasd'});
}

