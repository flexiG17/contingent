module.exports = class Student {

    constructor(educationType, directionNumber, country, citizenship,
                latinName, russianName, enrollment, enrollmentOrder,
                expulsionOrder, contractNumber, gender, birthDate,
                birthPlace, residencePlace, russianLocation, passportNumber,
                passportIssued, passportIssueDate, passportExpiration,
                levelEducation, nameEducationalInstitution, locationEducationalInstitution,
                graduationYear, desiredEducationLevel, specialtyCode,
                specialtyDirection, educationField, educationalOrganization,
                formStudy, contactPhoneNumber, tutorName, agentName, agentPhoneNumber,
                agentEmail, applicationSource, studentEmail, hoursNumber, entryDate,
                visaValidity, documentPath, firstPayment, secondPayment, comments) {
        this.educationType = educationType
        this.directionNumber = directionNumber
        this.country = country
        this.citizenship = citizenship
        this.latinName = latinName
        this.russianName = russianName
        this.enrollment = enrollment
        this.enrollmentOrder = enrollmentOrder
        this.expulsionOrder = expulsionOrder
        this.contractNumber = contractNumber
        this.gender = gender
        this.birthDate = birthDate
        this.birthPlace = birthPlace
        this.residencePlace = residencePlace
        this.russianLocation = russianLocation
        this.passportNumber = passportNumber
        this.passportIssued = passportIssued
        this.passportIssueDate = passportIssueDate
        this.passportExpiration = passportExpiration
        this.levelEducation = levelEducation
        this.nameEducationalInstitution = nameEducationalInstitution
        this.locationEducationalInstitution = locationEducationalInstitution
        this.graduationYear = graduationYear
        this.desiredEducationLevel = desiredEducationLevel
        this.specialtyCode = specialtyCode
        this.specialtyDirection = specialtyDirection
        this.educationField = educationField
        this.educationalOrganization = educationalOrganization
        this.formStudy = formStudy
        this.contactPhoneNumber = contactPhoneNumber
        this.tutorName = tutorName
        this.agentName = agentName
        this.agentPhoneNumber = agentPhoneNumber
        this.agentEmail = agentEmail
        this.applicationSource = applicationSource
        this.studentEmail = studentEmail
        this.hoursNumber = hoursNumber
        this.entryDate = entryDate
        this.visaValidity = visaValidity
        this.documentPath = documentPath
        this.firstPayment = firstPayment
        this.secondPayment = secondPayment
        this.comments = comments
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