const moment = require('moment')

module.exports = class Student {

    constructor(req, pathFile) {
        this.education_type = req.body.education_type
        this.direction_number = req.body.direction_number
        this.country = req.body.country
        this.citizenship = req.body.citizenship
        this.latin_name = req.body.latin_name
        this.russian_name = req.body.russian_name
        this.enrollment = req.body.enrollment
        this.enrollment_order = req.body.enrollment_order
        this.expulsion_order = req.body.expulsion_order
        this.contract_number = req.body.contract_number
        this.status_1c = req.body.status_1c
        this.gender = req.body.gender
        this.birth_date = req.body.birth_date
        this.birth_place = req.body.birth_place
        this.residence_place = req.body.residence_place
        this.RF_location = req.body.RF_location
        this.passport_number = req.body.passport_number
        this.passport_issued = req.body.passport_issued
        this.passport_issue_date = req.body.passport_issue_date
        this.passport_expiration = req.body.passport_expiration
        this.level_education = req.body.level_education
        this.name_educational_institution = req.body.name_educational_institution
        this.location_educational_institution = req.body.location_educational_institution
        this.graduation_year = req.body.graduation_year
        this.desired_education_level = req.body.desired_education_level
        this.specialty_code = req.body.specialty_code
        this.specialty_direction = req.body.specialty_direction
        this.education_field = req.body.education_field
        this.educational_organization = req.body.educational_organization
        this.form_study = req.body.form_study
        this.contact_phone_number = req.body.contact_phone_number
        this.tutor_name = req.body.tutor_name
        this.representative_name = req.body.representative_name
        this.representative_phone_number = req.body.representative_phone_number
        this.representative_email = req.body.representative_email
        this.agent_name = req.body.agent_name
        this.agent_phone_number = req.body.agent_phone_number
        this.agent_email = req.body.agent_email
        this.application_source = req.body.application_source
        this.student_email = req.body.student_email
        this.hours_number = req.body.hours_number
        this.entry_date = req.body.entry_date
        this.visa_validity = req.body.visa_validity
        this.documentPath = pathFile
        this.first_payment = req.body.first_payment
        this.second_payment = req.body.second_payment
        this.third_payment = req.body.third_payment
        this.fourth_payment = req.body.fourth_payment
        this.scholarship = req.body.scholarship
        this.transfer_to_international_service = req.body.transfer_to_international_service
        this.transfer_to_MVD = req.body.transfer_to_MVD
        this.estimated_receipt_date = req.body.estimated_receipt_date
        this.actual_receipt_date_invitation = req.body.actual_receipt_date_invitation
        this.comments = req.body.comments
    }

    getModel() {
        return {
            education_type: this.education_type,
            direction_number: this.direction_number,
            country: this.country,
            citizenship: this.citizenship,
            latin_name: this.latin_name,
            russian_name: this.russian_name,
            enrollment: this.enrollment,
            enrollment_order: this.enrollment_order,
            expulsion_order: this.expulsion_order,
            contract_number: this.contract_number,
            status_1c: this.status_1c,
            gender: this.gender,
            birth_date: this.birth_date,
            birth_place: this.birth_place,
            residence_place: this.residence_place,
            RF_location: this.RF_location,
            passport_number: this.passport_number,
            passport_issued: this.passport_issued,
            passport_issue_date: this.passport_issue_date,
            passport_expiration: this.passport_expiration,
            level_education: this.level_education,
            name_educational_institution: this.name_educational_institution,
            location_educational_institution: this.location_educational_institution,
            graduation_year: this.graduation_year,
            desired_education_level: this.desired_education_level,
            specialty_code: this.specialty_code,
            specialty_direction: this.specialty_direction,
            education_field: this.education_field,
            educational_organization: this.educational_organization,
            form_study: this.form_study,
            contact_phone_number: this.contact_phone_number,
            tutor_name: this.tutor_name,
            agent_name: this.agent_name,
            agent_phone_number: this.agent_phone_number,
            agent_email: this.agent_email,
            representative_name: this.representative_name,
            representative_phone_number: this.representative_phone_number,
            representative_email: this.representative_email,
            application_source: this.application_source,
            student_email: this.student_email,
            hours_number: this.hours_number,
            entry_date: this.entry_date,
            visa_validity: this.visa_validity,
            document_path: this.documentPath,
            first_payment: this.first_payment,
            second_payment: this.second_payment,
            third_payment : this.third_payment,
            fourth_payment : this.fourth_payment,
            scholarship : this.scholarship,
            transfer_to_international_service : this.transfer_to_international_service,
            transfer_to_MVD : this.transfer_to_MVD,
            estimated_receipt_date : this.estimated_receipt_date,
            actual_receipt_date_invitation : this.actual_receipt_date_invitation,
            comments: this.comments
        }
    }
}