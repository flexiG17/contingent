import React, {useState} from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {addStudent} from "../../../actions/student";
import iziToast from "izitoast";
import {HOME_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import "./QuotaDoc.css";

// страница добавления студентов квотной основы

export default function Quota() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    // огромный блок useState-ов (как и со страницей добавления контрактников)
    // хз как исправиться, ибо тут 30+ полей
    const [direction_number, setDirectionNumber] = useState('')
    const [location_educational_institution, setLocationEducationalInstitution] = useState('')
    const [graduation_year, setGraduationYear] = useState('')
    const [desired_education_level, setDesiredEducationLevel] = useState('')
    const [specialty_code, setSpecialtyCode] = useState('')
    const [specialty_direction, setSpecialtyDirection] = useState('')
    const [education_field, setEducationField] = useState('')
    const [educational_organization, setEducationalOrganization] = useState('')
    const [scholarship, setScholarship] = useState('')
    const [latin_name, setLatinName] = useState('')
    const [russian_name, setRussianName] = useState('')
    const [RF_location, setLocation] = useState('')
    const [contact_phone_number, setPhoneNumber] = useState('')
    const [student_email, setStudentEmail] = useState('')
    const [country, setCountry] = useState('')
    const [birth_place, setBirthPlace] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [residence_place, setResidencePlace] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [gender, setGender] = useState('')
    const [passport_number, setPassportNumber] = useState('')
    const [passport_issued, setPassportIssued] = useState('')
    const [passport_issue_date, setPassportIssueDate] = useState('')
    const [passport_expiration, setPassportExpiration] = useState('')
    const [level_education, setLevelEducation] = useState('')
    const [name_educational_institution, setEducationalInstitution] = useState('')
    const [form_study, setFormStudy] = useState('')
    const [enrollment, setEnrollment] = useState('')
    const [enrollment_order, setEnrollmentOrder] = useState('')
    const [expulsion_order, setExpulsionOrder] = useState('')
    const [tutor_name, setTutorName] = useState('')
    const [entry_date, setEntryDate] = useState('')
    const [visa_validity, setVisaValidity] = useState('')
    const [document_path, setDocumentPath] = useState('')
    const [comments, setComments] = useState('')

    const navigate = useNavigate()

    // подготовка переменной для пуша в бд
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            direction_number: direction_number,
            location_educational_institution: location_educational_institution,
            graduation_year: graduation_year,
            desired_education_level: desired_education_level,
            specialty_code: specialty_code,
            specialty_direction: specialty_direction,
            education_field: education_field,
            educational_organization: educational_organization,
            scholarship: scholarship,
            latin_name: latin_name,
            russian_name: russian_name,
            RF_location: RF_location,
            contact_phone_number: contact_phone_number,
            studentEmail: student_email,
            country: country,
            birth_place: birth_place,
            birth_date: birth_date,
            residence_place: residence_place,
            citizenship: citizenship,
            gender: gender,
            passport_number: passport_number,
            passport_issued: passport_issued,
            passport_issue_date: passport_issue_date,
            passport_expiration: passport_expiration,
            level_education: level_education,
            name_educational_institution: name_educational_institution,
            education_type: "Квота",
            form_study: form_study,
            enrollment: enrollment,
            enrollment_order: enrollment_order,
            expulsion_order: expulsion_order,
            tutor_name: tutor_name,
            entry_date: entry_date,
            visa_validity: visa_validity,
            document_path: document_path,
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
                        }, 2000)
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

    // тут просто тьма одних и тех же компонентов. Их в принципе много, однако как это записать проще?
    return (
        <form onSubmit={handleSubmit}>
            <div className="info_and_education_container">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Личные данные</p>
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
                        <p className="title_contract_doc"> Контактные данные</p>
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
                        <TextField label="E-mail студента" variant="outlined" color="warning" type="email"
                                   margin='normal'
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
                        <p className="title_contract_doc"> Учёба</p>
                        <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                   color="warning" margin='normal'
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
                                   onChange={event => setLocationEducationalInstitution(event.target.value)}
                                   value={location_educational_institution}/>
                        <TextField label="Год окончания" type="text" variant="outlined" color="warning" margin='normal'
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
                                   onChange={event => setGraduationYear(event.target.value)} value={graduation_year}/>
                        <TextField label="Уровень желаемого образования" type="text" variant="outlined" color="warning"
                                   margin='normal'
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
                                   onChange={event => setDesiredEducationLevel(event.target.value)}
                                   value={desired_education_level}/>
                        <TextField label="Код направления подготовки (специальности)" type="text" variant="outlined"
                                   color="warning" margin='normal'
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
                                   onChange={event => setSpecialtyCode(event.target.value)} value={specialty_code}/>
                        <TextField label="Направление подготовки (специальность)" type="text" variant="outlined"
                                   color="warning" margin='normal'
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
                                   onChange={event => setSpecialtyDirection(event.target.value)}
                                   value={specialty_direction}/>
                        <TextField label="Область образования" type="text" variant="outlined" color="warning"
                                   margin='normal'
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
                                   onChange={event => setEducationField(event.target.value)} value={education_field}/>
                        <TextField label="Образовательная организация" type="text" variant="outlined" color="warning"
                                   margin='normal'
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
                                   onChange={event => setEducationalOrganization(event.target.value)}
                                   value={educational_organization}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Паспортные данные </p>
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
                        <p className="title_contract_doc"> Уровень образования</p>
                        <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                   color="warning" margin='normal'
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
                                   onChange={event => setLevelEducation(event.target.value)} value={level_education}/>
                        <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                   color="warning" margin='normal'
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
                                   onChange={event => setEducationalInstitution(event.target.value)}
                                   value={name_educational_institution}/>
                        <p className="title_contract_doc"> Нынешнее образование </p>
                        <TextField label="Рег. номер направления" type="text" variant="outlined" color="warning"
                                   margin='normal'
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
                                   onChange={event => setDirectionNumber(event.target.value)} value={direction_number}/>
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
                        <p className="title_contract_doc"> Дополнительно </p>
                        <TextField label="Стипендия" type="text" variant="outlined" color="warning"
                                   margin='normal' required select size="small"
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   onChange={event => setScholarship(event.target.value)} value={scholarship}>
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
                        <p className="title_contract_doc"> Статус </p>
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
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Уровень образования</p>
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
                    </div>
                    {/*Большой раздел нашей разработки - файлы*/}
                    <div className="column_style_contract">
                        <p className="title_contract_doc_container"> Документы для загрузки в личную карточку
                            контрактника </p>
                        <p className="Doc_list">1) Фото паспорта со сроком действия (.PDF)</p>
                        <p className="Doc_list">2) Перевод паспорта на русский язык (.PDF)</p>
                        <p className="Doc_list">3) Визовая анкета (.PDF)</p>
                        <p className="Doc_list">4) Документ, подтверждающий факт оплаты (.PDF)</p>
                        <p className="Doc_list">5) Удостоверение личности(.PDF)</p>
                        <p className="Doc_list">6) Перевод удостоверения личности(.PDF)</p>
                        <input type="file" id="actual-btn" onChange={event => setDocumentPath(event.target.value)}
                               value={document_path} hidden/>
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
