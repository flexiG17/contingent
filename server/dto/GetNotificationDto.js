module.exports = class GetNotificationDto {
    constructor(other) {
        this.id = other.id;
        this.type = other.type;
        this.student_id = other.student_id;
        this.date = new Date(other.date);
        this.comment = other.comment;
        this.completed = Boolean(other.completed)
        this.user_id = other.user_id
    }
}
