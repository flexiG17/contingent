module.exports= class Notification{

    //constructor(req, user){
    constructor(req){
        this.type = req.body.type;
        this.russian_name = req.body.russian_name;
        this.student_id = req.body.student_id;
        this.date = req.body.date;
        this.comment = req.body.comment;
        this.status = req.body.status;
        this.user_id = req.body.user_id
    }

    getModel(){
        return{
            type: this.type,
            russian_name: this.russian_name,
            student_id: this.student_id,
            date: this.date,
            comment: this.comment,
            status: this.status,
            user_id: this.user_id
        }
    }
}