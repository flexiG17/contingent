import React, {useState} from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {changeStudentData} from '../../../services/serverData'
import {useEffect} from "react";
import {useLocation} from 'react-router-dom';

function PersonalCardQuota() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const location = useLocation();
    const rows = location.state;

    const [education_type, setEducationType] = useState(rows.education_type)
    const [direction_number, setDirectionNumber] = useState(rows.direction_number)
    const [location_educational_institution, setLocationEducationalInstitution] = useState(rows.location_educational_institution)
    const [graduation_year, setGraduationYear] = useState(rows.graduation_year)
    const [desired_education_level, setDesiredEducationLevel] = useState(rows.desired_education_level)
    const [specialty_code, setSpecialtyCode] = useState(rows.specialty_code)
    const [specialty_direction, setSpecialtyDirection] = useState(rows.specialty_direction)
    const [education_field, setEducationField] = useState(rows.education_field)
    const [educational_organization, setEducationalOrganization] = useState(rows.educational_organization)
    const [scholarship, setScholarship] = useState(rows.scholarship)
    const [latin_name, setLatinName] = useState(rows.latin_name)
    const [russian_name, setRussianName] = useState(rows.russian_name)
    const [RF_location, setLocation] = useState(rows.RF_location)
    const [contact_phone_number, setPhoneNumber] = useState(rows.contact_phone_number)
    //const [student_email, setStudentEmail] = useState('')
    const [country, setCountry] = useState(rows.country)
    const [birth_place, setBirthPlace] = useState(rows.birth_place)
    const [birth_date, setBirthDate] = useState(rows.birth_date)
    const [residence_place, setResidencePlace] = useState(rows.residence_place)
    const [citizenship, setCitizenship] = useState(rows.citizenship)
    const [gender, setGender] = useState(rows.gender)
    const [passport_number, setPassportNumber] = useState(rows.passport_number)
    const [passport_issued, setPassportIssued] = useState(rows.passport_issued)
    const [passport_issue_date, setPassportIssueDate] = useState(rows.passport_issue_date)
    const [passport_expiration, setPassportExpiration] = useState(rows.passport_expiration)
    const [level_education, setLevelEducation] = useState(rows.level_education)
    const [name_educational_institution, setEducationalInstitution] = useState(rows.name_educational_institution)
    const [form_study, setFormStudy] = useState(rows.form_study)
    const [enrollment, setEnrollment] = useState(rows.enrollment)
    const [enrollment_order, setEnrollmentOrder] = useState(rows.enrollment_order)
    const [tutor_name, setTutorName] = useState(rows.tutor_name)
    const [entry_date, setEntryDate] = useState(rows.entry_date)
    const [visa_validity, setVisaValidity] = useState(rows.visa_validity)
    const [document_path, setDocumentPath] = useState(rows.document_path)
    const [comments, setComments] = useState(rows.comments)

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false);
            }, 3000)
        }
    }, [alert])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            education_type: education_type,
            location_educational_institution: location_educational_institution,
            graduation_year: graduation_year,
            desired_education_level: desired_education_level,
            specialty_code: specialty_code,
            specialty_direction: specialty_direction,
            education_field: education_field,
            educational_organization: educational_organization,
            scholarship: scholarship,
            latinName: latin_name,
            russianName: russian_name,
            direction_number: direction_number,
            russianLocation: RF_location,
            contactPhoneNumber: contact_phone_number,
            /*studentEmail: student_email,*/
            country: country,
            birthPlace: birth_place,
            birthDate: birth_date,
            residencePlace: residence_place,
            citizenship: citizenship,
            gender: gender,
            passportNumber: passport_number,
            passportIssued: passport_issued,
            passportIssueDate: passport_issue_date,
            passportExpiration: passport_expiration,
            levelEducation: level_education,
            nameEducationalInstitution: name_educational_institution,
            educationType: "Квота",
            form_study: form_study,
            enrollment: enrollment,
            enrollmentOrder: enrollment_order,
            tutorName: tutor_name,
            entryDate: entry_date,
            visaValidity: visa_validity,
            documentPath: document_path,
            comments: comments
        }
        changeStudentData(data, rows.id)
            .then(() => {
                setAlert(true);
            })
            .catch(() => setAlert(false))
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="tytle_contract_info">Личная карточка {rows.russian_name}</p>
            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> Личные данные</p>
                        <input type="text" placeholder="Ф.И.О. (лат.)" className="input_style_contract"
                               onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                        <input type="text" placeholder="Ф.И.О. (кир.)" className="input_style_contract"
                               onChange={event => setRussianName(event.target.value)} value={russian_name}/>
                        <input type="text" placeholder="Нахождение в РФ" className="input_style_contract"
                               onChange={event => setLocation(event.target.value)} value={RF_location}/>
                        <p className="tytle_contract_info"> Контактные данные</p>
                        <input type="tel" placeholder="Контактный телефон" className="input_style_contract"
                               onChange={event => setPhoneNumber(event.target.value)} value={contact_phone_number}/>
                        {/*<input type="email" placeholder="E-mail" className="input_style_contract"
                               onChange={event => setStudentEmail(event.target.value)} value={student_email}/>*/}
                        <p className="tytle_contract_info"> Учёба</p>
                        <input type="text" placeholder="Местонахождение учебного заведения" className="input_style_contract"
                               onChange={event => setLocationEducationalInstitution(event.target.value)} value={location_educational_institution}/>
                        <input type="text" placeholder="Год окончания" className="input_style_contract"
                               onChange={event => setGraduationYear(event.target.value)} value={graduation_year}/>
                        <input type="text" placeholder="Уровень желаемого образования" className="input_style_contract"
                               onChange={event => setDesiredEducationLevel(event.target.value)} value={desired_education_level}/>
                        <input type="text" placeholder="Код направления подготовки (специальности)" className="input_style_contract"
                               onChange={event => setSpecialtyCode(event.target.value)} value={specialty_code}/>
                        <input type="text" placeholder="Направление подготовки (специальность)" className="input_style_contract"
                               onChange={event => setSpecialtyDirection(event.target.value)} value={specialty_direction}/>
                        <input type="text" placeholder="Область образования" className="input_style_contract"
                               onChange={event => setEducationField(event.target.value)} value={education_field}/>
                        <input type="text" placeholder="Образовательная организация" className="input_style_contract"
                               onChange={event => setEducationalOrganization(event.target.value)} value={educational_organization}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> Паспортные данные </p>
                        <input type="text" placeholder="Страна" className="input_style_contract"
                               onChange={event => setCountry(event.target.value)} value={country}/>
                        <input type="text" placeholder="Место рождения" className="input_style_contract"
                               onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                        <input type="date" placeholder="Дата рождения" className="input_style_contract"
                               onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                        <input type="text" placeholder="Место проживания" className="input_style_contract"
                               onChange={event => setResidencePlace(event.target.value)} value={residence_place}/>
                        <input type="text" placeholder="Гражданство" className="input_style_contract"
                               onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                        <input type="text" placeholder="Пол" className="input_style_contract"
                               onChange={event => setGender(event.target.value)} value={gender}/>
                        <input type="text" placeholder="Номер паспорта" className="input_style_contract"
                               onChange={event => setPassportNumber(event.target.value)} value={passport_number}/>
                        <input type="date" placeholder="Срок действия паспорта (дата)" className="input_style_contract"
                               onChange={event => setPassportExpiration(event.target.value)}
                               value={passport_expiration}/>
                        <input type="text" placeholder="Кем выдан" className="input_style_contract"
                               onChange={event => setPassportIssued(event.target.value)} value={passport_issued}/>
                        <input type="date" placeholder="Дата выдачи" className="input_style_contract"
                               onChange={event => setPassportIssueDate(event.target.value)}
                               value={passport_issue_date}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Уровень образования</p>
                        <input type="text" placeholder="Уровень полученного образования"
                               className="input_style_contract"
                               onChange={event => setLevelEducation(event.target.value)} value={level_education}/>
                        <input type="text" placeholder="Наименование учебного заведения"
                               className="input_style_contract"
                               onChange={event => setEducationalInstitution(event.target.value)}
                               value={name_educational_institution}/>
                        <p className="tytle_contract_education"> Нынешнее образование </p>
                        <input type="text" placeholder="Рег. номер направления" className="input_style_contract"
                               onChange={event => setDirectionNumber(event.target.value)} value={direction_number}/>
                        <input type="text" placeholder="Форма обучения" className="input_style_contract"
                               onChange={event => setFormStudy(event.target.value)} value={form_study}/>
                        <input type="text" placeholder="Тип обучения" className="input_style_contract"
                               onChange={event => setEducationType(event.target.value)} value={education_type}/>
                        <p className="tytle_contract_education"> Дополнительно </p>
                        <input type="text" placeholder="Стипендия" className="input_style_contract"
                               onChange={event => setScholarship(event.target.value)} value={scholarship}/>
                        <input type="text" placeholder="Примечания" className="input_style_contract"
                               onChange={event => setComments(event.target.value)} value={comments}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <input type="text" placeholder="Статус зачисления" className="input_style_contract"
                               onChange={event => setEnrollment(event.target.value)} value={enrollment}/>
                        <input type="text" placeholder="Номер приказа о зачислении" className="input_style_contract"
                               onChange={event => setEnrollmentOrder(event.target.value)} value={enrollment_order}/>
                        <input type="text" placeholder="Куратор" className="input_style_contract"
                               onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc"> Уровень образования</p>
                        <input type="date" placeholder="Дата въезда" className="input_style_contract"
                               onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        <input type="date" placeholder="Срок действия визы (дата)" className="input_style_contract"
                               onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc_contaner"> Документы для загрузки в личную карточку
                            контрактника </p>
                        <p className="Doc_list">1) Фото паспорта со сроком действия (.PDF)</p>
                        <p className="Doc_list">2) Перевод паспорта на русский язык (.PDF)</p>
                        <p className="Doc_list">3) Визовая анкета (.PDF)</p>
                        <p className="Doc_list">4) Документ, подтверждающий факт оплаты (.PDF)</p>
                        <p className="Doc_list">5) Удостоверение личности(.PDF)</p>
                        <p className="Doc_list">6) Перевод удостоверения личности(.PDF)</p>
                        <input type="file" id="actual-btn" onChange={event => setDocumentPath(event.target.value)}
                               value={document_path} hidden/>
                        <label for="actual-btn" className="label_doc"> Выберите файлы <InsertDriveFileIcon
                            sx={{fontSize: 20}}/></label>
                    </div>
                </div>
            </div>
            <label className="checkbox_style_contract">
                <input type="checkbox" onClick={handleClickContract}/> Вы уверены, что хотите добавить студента?
            </label>
            {alert && <h4> Студент добавлен</h4>}
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить</button>
            </div>
        </form>
    )
}

export default PersonalCardQuota;