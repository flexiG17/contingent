class Role {
    constructor(name, permission) {
        this.name = name
        this.permission = permission
    }

    toString() {
        return this.name
    }
}

module.exports = new class Roles {
    constructor() {
        this.admin = new Role('Администратор', 3)
        this.editor = new Role('Редактор', 2)
        this.reader = new Role('Читатель', 1)

        this.roles = {
            'Администратор': this.admin,
            'Редактор': this.editor,
            'Читатель': this.reader
        }
    }

    getRole(name) {
        return this.roles[name]
    }
}