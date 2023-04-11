module.exports = class Student {

    constructor(other) {
        this.education_type = other.education_type
        this.direction_number = other.direction_number
        this.country = other.country
        this.citizenship = other.citizenship
        this.latin_name = other.latin_name
        this.russian_name = other.russian_name
        this.enrollment = other.enrollment
        this.enrollment_order = other.enrollment_order
        this.expulsion_order = other.expulsion_order
        this.contract_number = other.contract_number
        this.status_1c = other.status_1c
        this.gender = other.gender
        this.birth_date = new Date(other.birth_date)
        this.birth_place = other.birth_place
        this.residence_place = other.residence_place
        this.RF_location = other.RF_location
        this.passport_number = other.passport_number
        this.passport_issued = other.passport_issued
        this.passport_issue_date = new Date(other.passport_issue_date)
        this.passport_expiration = new Date(other.passport_expiration)
        this.level_education = other.level_education
        this.name_educational_institution = other.name_educational_institution
        this.location_educational_institution = other.location_educational_institution
        this.graduation_year = other.graduation_year
        this.desired_education_level = other.desired_education_level
        this.specialty_code = other.specialty_code
        this.specialty_direction = other.specialty_direction
        this.education_field = other.education_field
        this.educational_organization = other.educational_organization
        this.form_study = other.form_study
        this.contact_phone_number = other.contact_phone_number
        this.tutor_name = other.tutor_name
        this.representative_name = other.representative_name
        this.representative_phone_number = other.representative_phone_number

        this.first_representative_email = other.first_representative_email
        this.second_representative_email = other.second_representative_email

        this.agent_name = other.agent_name
        this.agent_phone_number = other.agent_phone_number

        this.first_agent_email = other.first_agent_email
        this.second_agent_email = other.second_agent_email

        this.application_source = other.application_source

        this.first_student_email = other.first_student_email
        this.second_student_email = other.second_student_email

        this.hours_number = other.hours_number
        this.entry_date = new Date(other.entry_date)
        this.visa_validity = new Date(other.visa_validity)

        this.payment_status = other.payment_status
        this.contract_amount = other.contract_amount

        this.first_payment_contract_date = new Date(other.first_payment_contract_date)
        this.second_payment_contract_date = new Date(other.second_payment_contract_date)
        this.third_payment_contract_date = new Date(other.third_payment_contract_date)
        this.fourth_payment_contract_date = new Date(other.fourth_payment_contract_date)

        this.first_payment_actual_date = new Date(other.first_payment_actual_date)
        this.second_payment_actual_date = new Date(other.second_payment_actual_date)
        this.third_payment_actual_date = new Date(other.third_payment_actual_date)
        this.fourth_payment_actual_date = new Date(other.fourth_payment_actual_date)

        this.amount_first_actual_payment = other.amount_first_actual_payment
        this.amount_second_actual_payment = other.amount_second_actual_payment
        this.amount_third_actual_payment = other.amount_third_actual_payment
        this.amount_fourth_actual_payment = other.amount_fourth_actual_payment

        this.scholarship = other.scholarship
        this.transfer_to_international_service = new Date(other.transfer_to_international_service)
        this.transfer_to_MVD = new Date(other.transfer_to_MVD)
        this.estimated_receipt_date = new Date(other.estimated_receipt_date)
        this.actual_receipt_date_invitation = new Date(other.actual_receipt_date_invitation)
        this.comments = other.comments
    }
}