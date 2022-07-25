const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const keys = require('../config/keys')
const database = require('../utils/database')
const errorHandler = require('../utils/errorHandler')


const options = {
    // берём токен из Header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
                database.isExist('users', {id: payload.userId})
                    .then(userExistInSystem => {
                        if (userExistInSystem){
                            const user = database.getDataWithSelectedColumns(
                                'users',
                                {id: payload.userId},
                                ['name', 'email', 'id'])
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    })
                    .catch(error => console.log(error))
            }
        )
    )
}