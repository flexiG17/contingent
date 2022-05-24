module.exports = class User {

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    getModel(){
        return{
            email: this.email,
            password: this.password,
            name: this.name
        }
    }
}

