const db = require('../db');

module.exports = class User {

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    async save() {
        await db('users').insert([
            {
                id: Math.floor(Math.random() * 10000000),
                email: this.email,
                password: this.password,
                name: this.name
            }])
    }

    async isExist() {
        const database = await db('users').where({email: this.email})

        return database.length !== 0
    }
}