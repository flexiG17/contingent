module.exports = class GetNotificationDto {
    constructor(other) {
        this.id = other.id;
        this.type = other.type;
        this.students_id = other.students_id;
        this.date = new Date(other.date);
        this.comment = other.comment;
        this.completed = other.completed
        this.user_id = other.user_id
    }
}
