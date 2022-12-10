module.exports = class File {
    constructor(other) {
        this.name = other.name.toString()
        this.type = other.type
        this.size = other.size
        this.path = other.path.toString()
        this.date = new Date(other.date)
        this.user_id = other.user_id
        this.parent_id = other.parent_id
        this.student_id = other.student_id
    }
}