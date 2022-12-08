const knex = require('knex');
const {development, production} = require('../knexfile');

const isProduction = process.env.NODE_ENV === 'production';
const opt = isProduction ? production : development;

module.exports = {
    db: knex(opt),

    get users() {
        return this.db('users')
    },

    get students() {
        return this.db('students')
    },

    get notifications() {
        return this.db('notifications')
    },

    get informationColumns() {
        return this.db('information_schema.columns')
    },

    transaction() {
        return this.db.transaction()
    },

    get studentNotification() {
        return this.db('student_notification')
    },

    get files() {
        return this.db('files')
    }
}