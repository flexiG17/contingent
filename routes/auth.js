const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()


// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.register)

// change password
router.patch('/change', controller.changeData)

// get user data (name) for display on pages
router.get('/:id', controller.getById)

/*
// localhost:5000/api/auth/getPerson
router.post('/getPerson', (req, res, next) => {
    controller.GetPerson(req.body)
        .then(data => res.status(200).json({
            message: 'Запрос выполнен успешно',
            data
        }))
        .catch(err => next(err));
});
*/


// Экспортируем
module.exports = router