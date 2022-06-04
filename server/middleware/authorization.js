const jwt = require('jsonwebtoken')
const keys = require("../config/keys");
const errorHandler = require('../utils/errorHandler')

exports.authModel = function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = jwt.verify(authorization, keys.jwt);
        } catch (e) {
            errorHandler(res, e)
        }
        req.userId = decoded.userId;
    }
    next()
}
