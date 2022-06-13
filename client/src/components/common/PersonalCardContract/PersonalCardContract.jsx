import React, {useState} from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {changeStudentData} from '../../../services/serverData'
import {useEffect} from "react";
import {useLocation} from 'react-router-dom';

function PersonalCardContract() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const location = useLocation();
    const rows = location.state;

    const [latin_name, setLatinName] = useState(rows.latin_name)
    const [education_type, setEducationType] = useState(rows.education_type)
    const [russian_name, setRussianName] = useState(rows.russian_name)
    const [RF_location, setLocation] = useState(rows.RF_location)
    const [contact_phone_number, setPhoneNumber] = useState(rows.contact_phone_number)
    const [student_email, setStudentEmail] = useState(rows.student_email)
    const [agent_name, setAgentName] = useState(rows.agent_name)
    const [agent_phone_number, setAgentPhone] = useState(rows.agent_phone_number)
    const [agent_email, setAgentEmail] = useState(rows.agent_email)
    const [country, setCountry] = useState(rows.country)
    const [birth_place, setBirthPlace] = useState(rows.birth_place)
    const [birth_date, setBirthDate] = useState(rows.birth_date)
    const [residence_place, setResidencePlace] = useState(rows.residence_place)
    const [citizenship, setCitizenship] = useState(rows.citizenship)
    const [gender, setGender] = useState(rows.gender)
    const [passport_number, setPassportNumber] = useState(rows.passport_number)
    const [passport_expiration, setPassportExpiration] = useState(rows.passport_expiration)
    const [passport_issued, setPassportIssued] = useState(rows.passport_issued)
    const [passport_issue_date, setPassportIssueDate] = useState(rows.passport_issue_date)
    const [level_education, setLevelEducation] = useState(rows.level_education)
    const [name_educational_institution, setEducationalInstitution] = useState(rows.name_educational_institution)
    const [education_field, setEducation_field] = useState(rows.education_field)
    const [form_study, setFormStudy] = useState(rows.form_study)
    const [enrollment, setEnrollment] = useState(rows.enrollment)
    const [enrollment_order, setEnrollmentOrder] = useState(rows.enrollment_order)
    const [contract_number, setContractNumber] = useState(rows.contract_number)
    const [status_1C, set1CStatus] = useState(rows.status_1c)
    const [tutor_name, setTutorName] = useState(rows.tutor_name)
    const [first_payment, setFirstPayment] = useState(rows.first_payment)
    const [second_payment, setSecondPayment] = useState(rows.second_payment)
    const [third_payment, setThirdPayment] = useState(rows.third_payment)
    const [fourth_payment, setFourthPayment] = useState(rows.fourth_payment)
    const [entry_date, setEntryDate] = useState(rows.entry_date)
    const [visa_validity, setVisaValidity] = useState(rows.visa_validity)
    const [transfer_to_international_service, setDateOfTransfer] = useState(rows.transfer_to_international_service)
    const [transfer_to_MVD, setDateOfMvdTransfer] = useState(rows.transfer_to_MVD)
    const [estimated_receipt_date, setDateOfReceiving] = useState(rows.estimated_receipt_date)
    const [actual_receipt_date_invitation, setDateOfReceipt] = useState(rows.actual_receipt_date_invitation)
    const [document_path, setDocumentPath] = useState(rows.document_path)

    const [alert, setAlert] = useState(false);
    console.log(rows)

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
            latinName: latin_name,
            russianName: russian_name,
            russianLocation: RF_location,
            contactPhoneNumber: contact_phone_number,
            studentEmail: student_email,
            agentName: agent_name,
            agentPhoneNumber: agent_phone_number,
            agentEmail: agent_email,
            country: country,
            birthPlace: birth_place,
            birthDate: birth_date,
            residencePlace: residence_place,
            citizenship: citizenship,
            gender: gender,
            passportNumber: passport_number,
            passportExpiration: passport_expiration,
            passportIssued: passport_issued,
            passportIssueDate: passport_issue_date,
            levelEducation: level_education,
            nameEducationalInstitution: name_educational_institution,
            educationField: education_field,
            educationType: "Контракт",
            form_study: form_study,
            enrollment: enrollment,
            enrollmentOrder: enrollment_order,
            contractNumber: contract_number,
            status1C: status_1C,
            tutorName: tutor_name,
            firstPayment: first_payment,
            secondPayment: second_payment,
            thirdPayment: third_payment,
            fourthPayment: fourth_payment,
            entryDate: entry_date,
            visaValidity: visa_validity,
            documentPath: document_path,
            transfer_to_international_service: transfer_to_international_service,
            transfer_to_MVD: transfer_to_MVD,
            estimated_receipt_date: estimated_receipt_date,
            actual_receipt_date_invitation: actual_receipt_date_invitation
        }
        changeStudentData(data, rows.id)
            .then(() => {
                setAlert(true);
            })
            .catch(() => setAlert(false))
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="title_AddStudent">Личная карточка {rows.russian_name}</p>
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
                        <input type="text" placeholder="Контактный телефон" className="input_style_contract"
                               onChange={event => setPhoneNumber(event.target.value)} value={contact_phone_number}/>
                        <input type="text" placeholder="E-mail" className="input_style_contract"
                               onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                        <p className="tytle_contract_info"> Контактные данные агента</p>
                        <input type="text" placeholder="Ф.И.О." className="input_style_contract"
                               onChange={event => setAgentName(event.target.value)} value={agent_name}/>
                        <input type="text" placeholder="Телефон" className="input_style_contract"
                               onChange={event => setAgentPhone(event.target.value)} value={agent_phone_number}/>
                        <input type="text" placeholder="E-mail" className="input_style_contract"
                               onChange={event => setAgentEmail(event.target.value)} value={agent_email}/>
                        <p className="tytle_contract_info"> Контактные данные представителя</p>
                        <input type="text" placeholder="Ф.И.О." className="input_style_contract"/>
                        <input type="text" placeholder="Телефон" className="input_style_contract"/>
                        <input type="text" placeholder="E-mail" className="input_style_contract"/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> Паспортные данные </p>
                        <input type="text" placeholder="Страна" className="input_style_contract"
                               onChange={event => setCountry(event.target.value)} value={country}/>
                        <input type="text" placeholder="Место рождения" className="input_style_contract"
                               onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                        <input type="text" placeholder="Дата рождения" className="input_style_contract"
                               onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                        <input type="text" placeholder="Место проживания" className="input_style_contract"
                               onChange={event => setResidencePlace(event.target.value)} value={residence_place}/>
                        <input type="text" placeholder="Гражданство" className="input_style_contract"
                               onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                        <input type="text" placeholder="Пол" className="input_style_contract"
                               onChange={event => setGender(event.target.value)} value={gender}/>
                        <input type="text" placeholder="Номер паспорта" className="input_style_contract"
                               onChange={event => setPassportNumber(event.target.value)} value={passport_number}/>
                        <input type="text" placeholder="Срок действия паспорта (дата)" className="input_style_contract"
                               onChange={event => setPassportExpiration(event.target.value)}
                               value={passport_expiration}/>
                        <input type="text" placeholder="Кем выдан" className="input_style_contract"
                               onChange={event => setPassportIssued(event.target.value)} value={passport_issued}/>
                        <input type="text" placeholder="Дата выдачи" className="input_style_contract"
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
                        <input type="text" placeholder="Область образования" className="input_style_contract"
                               onChange={event => setEducation_field(event.target.value)} value={education_field}/>
                        <p className="tytle_contract_education"> Нынешнее образование </p>
                        <input type="text" placeholder="Форма обучения" className="input_style_contract"
                               onChange={event => setFormStudy(event.target.value)} value={form_study}/>
                        <input type="text" placeholder="Тип обучения" className="input_style_contract"
                               onChange={event => setEducationType(event.target.value)} value={education_type}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <input type="text" placeholder="Статус зачисления" className="input_style_contract"
                               onChange={event => setEnrollment(event.target.value)} value={enrollment}/>
                        <input type="text" placeholder="Номер приказа о зачислении" className="input_style_contract"
                               onChange={event => setEnrollmentOrder(event.target.value)} value={enrollment_order}/>
                        <input type="text" placeholder="Номер договора" className="input_style_contract"
                               onChange={event => setContractNumber(event.target.value)} value={contract_number}/>
                        <input type="text" placeholder="Статус 1C" className="input_style_contract"
                               onChange={event => set1CStatus(event.target.value)} value={status_1C}/>
                        <input type="text" placeholder="Куратор" className="input_style_contract"
                               onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                        <input type="text" placeholder="Платеж 1 (дата)" className="input_style_contract"
                               onChange={event => setFirstPayment(event.target.value)} value={first_payment}/>
                        <input type="text" placeholder="Платеж 2 (дата)" className="input_style_contract"
                               onChange={event => setSecondPayment(event.target.value)} value={second_payment}/>
                        <input type="text" placeholder="Платеж 3 (дата)" className="input_style_contract"
                               onChange={event => setThirdPayment(event.target.value)} value={third_payment}/>
                        <input type="text" placeholder="Платеж 4 (дата)" className="input_style_contract"
                               onChange={event => setFourthPayment(event.target.value)} value={fourth_payment}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc"> Уровень образования</p>
                        <input type="text" placeholder="Дата въезда" className="input_style_contract"
                               onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        <input type="text" placeholder="Срок действия визы (дата)" className="input_style_contract"
                               onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                        <input type="text" placeholder="Дата передачи в международную службу"
                               className="input_style_contract"
                               onChange={event => setDateOfTransfer(event.target.value)}
                               value={transfer_to_international_service}/>
                        <input type="text" placeholder="Дата передачи в МВД" className="input_style_contract"
                               onChange={event => setDateOfMvdTransfer(event.target.value)} value={transfer_to_MVD}/>
                        <input type="text" placeholder="Ориентировочная дата получения"
                               className="input_style_contract"
                               onChange={event => setDateOfReceiving(event.target.value)}
                               value={estimated_receipt_date}/>
                        <input type="text" placeholder="Фактическая дата получения приглашения"
                               className="input_style_contract" onChange={event => setDateOfReceipt(event.target.value)}
                               value={actual_receipt_date_invitation}/>
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
            {alert && <h4> Данные успешно обновлены</h4>}
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить</button>
            </div>
        </form>
    )
}

export default PersonalCardContract;