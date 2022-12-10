module.exports = class CreateNotificationDto {
    constructor(other) {
        this.type = other.type
        this.students_id = other.students_id
        this.date = other.date
        this.comment = other.comment
        this.completed = other.completed
    }
}