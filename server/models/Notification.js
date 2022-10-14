module.exports = class Notification {

    constructor(other) {
        this.type = other.type;
        this.student_id = other.student_id;
        this.date = other.date;
        this.comment = other.comment;
        this.completed = other.completed;
        this.user_id = other.user_id
    }
}