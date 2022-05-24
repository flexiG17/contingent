module.exports= class Notification{

    constructor(notification_id, type, student_name, date, status){
        this.id = notification_id;
        this.type = type;
        this.student_name = student_name;
        this.date = date;
        this.status = status;
    }
}