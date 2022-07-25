import React, {useState, useEffect} from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {addStudent, checkFiles} from '../../../services/serverData'
import iziToast from "izitoast";
import {HOME_ROUTE} from "../../../utils/consts";
import {Link, useNavigate} from "react-router-dom";
import './InfoContacts.css'
import './DocContract.css'
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

export default function DocContract() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const [latin_name, setLatinName] = useState('')
    const [russian_name, setRussianName] = useState('')
    const [RF_location, setLocation] = useState('')
    const [contact_phone_number, setPhoneNumber] = useState('')
    const [student_email, setStudentEmail] = useState('')
    const [representative_name, setRepresentativeName] = useState('')
    const [representative_phone_number, setRepresentativePhoneNumber] = useState('')
    const [representative_email, setRepresentativeEmail] = useState('')
    const [hours_number, setHoursNumber] = useState('')
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
    const [comments, setComments] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            latin_name: latin_name,
            russian_name: russian_name,
            RF_location: RF_location,
            contact_phone_number: contact_phone_number,
            student_email: student_email,
            agent_name: agent_name,
            agent_phone_number: agent_phone_number,
            agent_email: agent_email,
            representative_name: representative_name,
            representative_phone_number: representative_phone_number,
            representative_email: representative_email,
            hours_number: hours_number,
            country: country,
            birth_place: birth_place,
            birth_date: birth_date,
            residence_place: residence_place,
            citizenship: citizenship,
            gender: gender,
            passport_number: passport_number,
            passport_expiration: passport_expiration,
            passport_issued: passport_issued,
            passport_issue_date: passport_issue_date,
            level_education: level_education,
            name_educational_institution: name_educational_institution,
            education_type: "Контракт",
            form_study: form_study,
            enrollment: enrollment,
            expulsion_order: expulsion_order,
            enrollment_order: enrollment_order,
            contract_number: contract_number,
            status_1C: status_1C,
            tutor_name: tutor_name,
            first_payment: first_payment,
            second_payment: second_payment,
            third_payment: third_payment,
            fourth_payment: fourth_payment,
            entry_date: entry_date,
            visa_validity: visa_validity,
            document_path: document_path,
            transfer_to_international_service: transfer_to_international_service,
            transfer_to_MVD: transfer_to_MVD,
            estimated_receipt_date: estimated_receipt_date,
            actual_receipt_date_invitation: actual_receipt_date_invitation,
            comments: comments
        }
        addStudent(data)
            .then((res) => {
                switch (res.status) {
                    case 201: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Студент успешно добавлен в базу',
                            position: "topRight"
                        });
                        setTimeout(() => {
                            navigate(HOME_ROUTE)
                        }, 1000)
                        break
                    }
                    default: {
                        iziToast.error({
                            title: res.statusText,
                            message: 'Студент с таким номером паспорта уже существует',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                    }
                }
            })
    };
    const navigate = useNavigate()
    return (
        <form onSubmit={handleSubmit}>
            <div className="info_and_education_container">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> Личные данные</p>

                        <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text" margin='normal'
                                   required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                        <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setRussianName(event.target.value)} value={russian_name}/>

                        <TextField label="Нахождение в РФ" type="text" variant="outlined" color="warning"
                                   margin='normal' required select size="small"
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setLocation(event.target.value)} value={RF_location}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}} value="Да">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Да</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Нет">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <p className="tytle_contract_info"> Контактные данные</p>
                        <TextField label="Контактный телефон студента" variant="outlined" color="warning" type="tel"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setPhoneNumber(event.target.value)} value={contact_phone_number}/>
                        <TextField label="E-mail студента" variant="outlined" color="warning" type="email" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                        <p className="tytle_contract_info"> Контактные данные агента</p>
                        <TextField label="Ф.И.О." variant="outlined" color="warning" type="text" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setAgentName(event.target.value)} value={agent_name}/>
                        <TextField label="Телефон" variant="outlined" color="warning" type="tel" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setAgentPhone(event.target.value)} value={agent_phone_number}/>
                        <TextField label="E-mail" variant="outlined" color="warning" type="email" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setAgentEmail(event.target.value)} value={agent_email}/>
                        <p className="tytle_contract_info"> Контактные данные представителя</p>
                        <TextField label="Ф.И.О." type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setRepresentativeName(event.target.value)}
                                   value={representative_name}/>
                        <TextField label="Телефон" type="tel" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setRepresentativePhoneNumber(event.target.value)}
                                   value={representative_phone_number}/>
                        <TextField label="E-mail" type="email" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setRepresentativeEmail(event.target.value)}
                                   value={representative_email}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> Паспортные данные </p>
                        <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setCountry(event.target.value)} value={country}/>
                        <TextField label="Место рождения" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                        <TextField label="Дата рождения" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                        <TextField label="Место проживания" type="text" variant="outlined" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setResidencePlace(event.target.value)} value={residence_place}/>
                        <TextField label="Гражданство" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                        <TextField label="Пол" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setGender(event.target.value)} value={gender}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Мужской">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Мужской</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Женский">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Женский</span>
                            </MenuItem>
                        </TextField>
                        <TextField label="Номер паспорта" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setPassportNumber(event.target.value)} value={passport_number}/>
                        <TextField label="Срок действия паспорта" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setPassportExpiration(event.target.value)}
                                   value={passport_expiration}/>
                        <TextField label="Кем выдан" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setPassportIssued(event.target.value)} value={passport_issued}/>
                        <TextField label="Дата выдачи" type="date" color="warning" margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setPassportIssueDate(event.target.value)}
                                   value={passport_issue_date}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Уровень образования</p>
                        <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                   color="warning" margin='normal' sx={{width: "325px"}}
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setLevelEducation(event.target.value)} value={level_education}/>
                        <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                   color="warning" margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setEducationalInstitution(event.target.value)}
                                   value={name_educational_institution}/>
                        <p className="tytle_contract_education"> Нынешнее образование </p>

                        <TextField label="Количество часов" type="text" variant="outlined" color="warning"
                                   margin='normal' required size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setHoursNumber(event.target.value)} value={hours_number}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="1008 ак.ч. (1 год)">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>1008 ак.ч. (1 год)</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="1008 ак.ч. (1.5 год)">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>1008 ак.ч. (1.5 год)</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="868 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>868 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="728 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>728 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="588 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="504 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>504 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="288 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="144 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>144 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="108 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>108 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="588 ак.ч.">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>72 ак.ч.</span>
                            </MenuItem>
                        </TextField>
                        <TextField label="Форма обучения" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setFormStudy(event.target.value)} value={form_study}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Очная">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Очная</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Гибрид">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Гибрид</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Онлайн">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Онлайн</span>
                            </MenuItem>
                        </TextField>
                        <p className="tytle_contract_education"> Дополнительно </p>
                        <TextField label="Примечания" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small" multiline rows={3}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setComments(event.target.value)} value={comments}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <TextField label="Статус зачисления" type="text" variant="outlined" color="warning"
                                   margin='normal' required size="small" select sx={{width: "325px"}}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setEnrollment(event.target.value)} value={enrollment}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Зачислен">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Зачислен</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Не зачислен">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Не зачислен</span>
                            </MenuItem>
                        </TextField>
                        <TextField label="Номер приказа о зачислении" type="text" variant="outlined" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setEnrollmentOrder(event.target.value)} value={enrollment_order}/>
                        <TextField label="Номер приказа об отчислении" type="text" variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setExpulsionOrder(event.target.value)} value={expulsion_order}/>
                        <TextField label="Номер договора" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setContractNumber(event.target.value)} value={contract_number}/>

                        <TextField label="Статус 1C" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => set1CStatus(event.target.value)} value={status_1C}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Прикреплен">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Прикреплен</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Не прикреплен">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Не прикреплен</span>
                            </MenuItem>
                        </TextField>
                        <TextField label="Куратор" type="text" variant="outlined" color="warning" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                        <TextField label="Платеж 1" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setFirstPayment(event.target.value)} value={first_payment}/>
                        <TextField label="Платеж 2" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setSecondPayment(event.target.value)} value={second_payment}/>
                        <TextField label="Платеж 3" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setThirdPayment(event.target.value)} value={third_payment}/>
                        <TextField label="Платеж 4" type="date" color="warning"
                                   margin='normal' required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setFourthPayment(event.target.value)} value={fourth_payment}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc"> Уровень образования</p>

                        <TextField label="Дата въезда" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        <TextField label="Срок действия визы" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                        <TextField label="Дата передачи в международную службу" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setDateOfTransfer(event.target.value)}
                                   value={transfer_to_international_service}/>
                        <TextField label="Дата передачи в МВД" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setDateOfMvdTransfer(event.target.value)}
                                   value={transfer_to_MVD}/>

                        <TextField label="Ориентировочная дата получения" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setDateOfReceiving(event.target.value)}
                                   value={estimated_receipt_date}/>

                        <TextField label="Фактическая дата получения приглашения" type="date" color="warning"
                                   margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}
                                   onChange={event => setDateOfReceipt(event.target.value)}
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
                        <input type="file" id="actual-btn" multiple='multiple' onChange={(event) => {
                            const data = new FormData()
                            data.append('passport', event.target.files[0])
                            data.append('passport_translate', event.target.files[1])
                            checkFiles(data)
                                .then(r => console.log(r))
                        }}/>
                        <label htmlFor="actual-btn" className="label_doc"> Выберите файлы <InsertDriveFileIcon
                            sx={{fontSize: 20}}/></label>
                    </div>
                </div>
            </div>
            <label className="checkbox_style_contract">
                <input type="checkbox" onClick={handleClickContract}/> Вы уверены, что хотите добавить студента?
            </label>
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>Добавить</button>
            </div>
        </form>
    )
}