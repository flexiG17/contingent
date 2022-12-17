module.exports = class SendMailDto {
    constructor(other) {
        this.from = other.from
        this.to = other.to
        this.subject = other.subject
        this.text = other.text
        this.files = other.files
    }
}