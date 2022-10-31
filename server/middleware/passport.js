const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const db = require('../db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
}

async function verify(payload, done) {
    const [user] = await db.users.where({id: payload.userId})

    if (user == null)
        return done(null, false)

    return done(null, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    })
}

module.exports.strategy = new JwtStrategy(options, verify)