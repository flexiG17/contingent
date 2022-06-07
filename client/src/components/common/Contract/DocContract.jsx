import React, {useState} from 'react';
import "./DocContract.css";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './EducationContract.css';
import './InfoContacts.css';
import {addStudent} from '../../../services/serverData'
import {useEffect} from "react";


function DocContract() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const [latin_name, setLatinName] = useState('')
    const [russian_name, setRussianName] = useState('')
    const [RF_location, setLocation] = useState('')
    const [contact_phone_number, setPhoneNumber] = useState('')
    const [student_email, setStudentEmail] = useState('')
    const [agent_name, setAgentName] = useState('')
    const [agent_phone_number, setAgentPhone] = useState('')
    const [agent_email, setAgentEmail] = useState('')
    const [country, setCountry] = useState('')
    const [birth_place, setBirthPlace] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [residence_place, setResidencePlace] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [gender, setGender] = useState('')
    const [passport_number, setPassportNumber] = useState('')
    const [passport_expiration, setPassportExpiration] = useState('')
    const [passport_issued, setPassportIssued] = useState('')
    const [passport_issue_date, setPassportIssueDate] = useState('')
    const [level_education, setLevelEducation] = useState('')
    const [name_educational_institution, setEducationalInstitution] = useState('')
    const [education_field, setEducation_field] = useState('')
    const [form_study, setFormStudy] = useState('')
    const [enrollment, setEnrollment] = useState('')
    const [enrollment_order, setEnrollmentOrder] = useState('')
    const [expulsion_order, setExpulsionOrder] = useState('')
    const [contract_number, setContractNumber] = useState('')
    const [status_1C, set1CStatus] = useState('')
    const [tutor_name, setTutorName] = useState('')
    const [first_payment, setFirstPayment] = useState('')
    const [second_payment, setSecondPayment] = useState('')
    const [third_payment, setThirdPayment] = useState('')
    const [fourth_payment, setFourthPayment] = useState('')
    const [entry_date, setEntryDate] = useState('')
    const [visa_validity, setVisaValidity] = useState('')
    const [transfer_to_international_service, setDateOfTransfer] = useState('')
    const [transfer_to_MVD, setDateOfMvdTransfer] = useState('')
    const [estimated_receipt_date, setDateOfReceiving] = useState('')
    const [actual_receipt_date_invitation, setDateOfReceipt] = useState('')
    const [document_path, setDocumentPath] = useState('')

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
            expulsionOrder: expulsion_order,
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
        addStudent(data)
            .then(() => {
                setAlert(true);
            })
            .catch(() => setAlert(false))
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <input type="text" placeholder="Статус зачисления" className="input_style_contract"
                               onChange={event => setEnrollment(event.target.value)} value={enrollment}/>
                        <input type="text" placeholder="Номер приказа о зачислении" className="input_style_contract"
                               onChange={event => setEnrollmentOrder(event.target.value)} value={enrollment_order}/>
                        <input type="text" placeholder="Номер приказа об отчислении" className="input_style_contract"
                               onChange={event => setExpulsionOrder(event.target.value)} value={expulsion_order}/>
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
                               className="input_style_contract" onChange={event => setDateOfTransfer(event.target.value)}
                               value={transfer_to_international_service}/>
                        <input type="text" placeholder="Дата передачи в МВД" className="input_style_contract"
                               onChange={event => setDateOfMvdTransfer(event.target.value)} value={transfer_to_MVD}/>
                        <input type="text" placeholder="Ориентировочная дата получения"
                               className="input_style_contract" onChange={event => setDateOfReceiving(event.target.value)}
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
            {alert && <h4> Студент добавлен</h4>}
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>Добавить</button>
            </div>
        </form>


    )
}

export default DocContract;