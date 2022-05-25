module.exports = class Student {

    constructor(req) {
        this.educationType = req.body.educationType
        this.directionNumber = req.body.directionNumber
        this.country = req.body.country
        this.citizenship = req.body.citizenship
        this.latinName = req.body.latinName
        this.russianName = req.body.russianName
        this.enrollment = req.body.enrollment
        this.enrollmentOrder = req.body.enrollmentOrder
        this.expulsionOrder = req.body.expulsionOrder
        this.contractNumber = req.body.contractNumber
        this.gender = req.body.gender
        this.birthDate = req.body.birthDate
        this.birthPlace = req.body.birthPlace
        this.residencePlace = req.body.residencePlace
        this.russianLocation = req.body.russianLocation
        this.passportNumber = req.body.passportNumber
        this.passportIssued = req.body.passportIssued
        this.passportIssueDate = req.body.passportIssueDate
        this.passportExpiration = req.body.passportExpiration
        this.levelEducation = req.body.levelEducation
        this.nameEducationalInstitution = req.body.nameEducationalInstitution
        this.locationEducationalInstitution = req.body.locationEducationalInstitution
        this.graduationYear = req.body.graduationYear
        this.desiredEducationLevel = req.body.desiredEducationLevel
        this.specialtyCode = req.body.specialtyCode
        this.specialtyDirection = req.body.specialtyDirection
        this.educationField = req.body.educationField
        this.educationalOrganization = req.body.educationalOrganization
        this.formStudy = req.body.formStudy
        this.contactPhoneNumber = req.body.contactPhoneNumber
        this.tutorName = req.body.tutorName
        this.agentName = req.body.agentName
        this.agentPhoneNumber = req.body.agentPhoneNumber
        this.agentEmail = req.body.agentEmail
        this.applicationSource = req.body.applicationSource
        this.studentEmail = req.body.studentEmail
        this.hoursNumber = req.body.hoursNumber
        this.entryDate = req.body.entryDate
        this.visaValidity = req.body.visaValidity
        this.documentPath = req.body.documentPath
        this.firstPayment = req.body.firstPayment
        this.secondPayment = req.body.secondPayment
        this.comments = req.body.comments
    }

    getModel() {
        return {
            education_type: this.educationType,
            direction_number: this.directionNumber,
            country: this.country,
            citizenship: this.citizenship,
            latin_name: this.latinName,
            russian_name: this.russianName,
            enrollment: this.enrollment,
            enrollment_order: this.enrollmentOrder,
            expulsion_order: this.expulsionOrder,
            contract_number: this.contractNumber,
            gender: this.gender,
            birth_date: this.birthDate,
            birth_place: this.birthPlace,
            residence_place: this.residencePlace,
            RF_location: this.russianLocation,
            passport_number: this.passportNumber,
            passport_issued: this.passportIssued,
            passport_issue_date: this.passportIssueDate,
            passport_expiration: this.passportExpiration,
            level_education: this.levelEducation,
            name_educational_institution: this.nameEducationalInstitution,
            location_educational_institution: this.locationEducationalInstitution,
            graduation_year: this.graduationYear,
            desired_education_level: this.desiredEducationLevel,
            specialty_code: this.specialtyCode,
            specialty_direction: this.specialtyDirection,
            education_field: this.educationField,
            educational_organization: this.educationalOrganization,
            form_study: this.formStudy,
            contact_phone_number: this.contactPhoneNumber,
            tutor_name: this.tutorName,
            agent_name: this.agentName,
            agent_phone_number: this.agentPhoneNumber,
            agent_email: this.agentEmail,
            application_source: this.applicationSource,
            student_email: this.studentEmail,
            hours_number: this.hoursNumber,
            entry_date: this.entryDate,
            visa_validity: this.visaValidity,
            document_path: this.documentPath,
            first_payment: this.firstPayment,
            second_payment: this.secondPayment,
            comments: this.comments,
        }
    }
}