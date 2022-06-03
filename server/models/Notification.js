module.exports= class Notification{

    constructor(req){
        this.type = req.body.type;
        this.student_name = req.body.student_name;
        this.date = req.body.date;
        this.status = req.body.status;
        this.userId = req.body.userId
    }

    getModel(){
        return{
            type: this.type,
            student_name: this.student_name,
            date: this.date,
            status: this.status,
            user_id: this.userId
        }
    }
}