const db = require('../db');

module.exports = class User {

    constructor(id, email, password, name) {
        this.id = id
        this.email = email;
        this.password = password;
        this.name = name;
    }

    async save() {
        await db('users').insert(
            [{id: this.id, email: this.email, password: this.password, name: this.name}])
    }
}