import React, {useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, removeStudent} from '../../../actions/student'
import {useLocation, useNavigate} from 'react-router-dom';
import iziToast from "izitoast";
import {HOME_ROUTE} from "../../../utils/consts";
import TextField from "@mui/material/TextField";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    SpeedDial, SpeedDialAction, SpeedDialIcon
} from "@mui/material";
import './PersonalCardQuota.css'
import Box from "@mui/material/Box";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import jwt_decode from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import ModalMessage from '../MessageModal/index'
import CreateTaskModalWindow from "../CreateTaskModal";
import {getToken} from "../../../utils/token";
import ModalFile from "../filemanager/ModalFile";

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

export default function PersonalCardQuota() {
    const [active, setActive] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [editMode, setEditMode] = useState(true)
    const [modalMessageActive, setModalMessageActive] = useState(false)
    const [modalFileActive,setModalFileActive] = useState(false);
    const handleClickContract = () => {
        setActive(!active)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleFileModal = () =>{
        setModalFileActive(true);
    }

    const handleModal = () => {
        setModalActive(true);
    }
    const handleModalMessage = () => {
        setModalMessageActive(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const location = useLocation();
    const rows = location.state;

    const role = jwt_decode(getToken()).role
    const READER_ACCESS = role === 'Читатель'


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
    const [student_email, setStudentEmail] = useState(rows.student_email)
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
    const [expulsion_order, setExpulsionOrder] = useState(rows.expulsion_order)
    const [tutor_name, setTutorName] = useState(rows.tutor_name)
    const [entry_date, setEntryDate] = useState(rows.entry_date)
    const [visa_validity, setVisaValidity] = useState(rows.visa_validity)
    const [comments, setComments] = useState(rows.comments)

    const navigate = useNavigate()
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
            student_email: student_email,
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
            education_type: education_type,
            form_study: form_study,
            enrollment: enrollment,
            enrollment_order: enrollment_order,
            expulsion_order: expulsion_order,
            tutor_name: tutor_name,
            entry_date: entry_date,
            visa_validity: visa_validity,
            comments: comments
        }
        changeStudentData(data, rows.id)
            .then((res) => {
                switch (res.status) {
                    case 200: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Данные студента успешно обновлены',
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
                            message: 'Попробуйте ещё раз',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                    }
                }
            })
    };


    const actions = !READER_ACCESS ? [
            {
                icon: <NotificationsNoneIcon/>,
                name: 'Создать задачу',
                runFunction: () => {
                    handleModalMessage()
                }
            },
            {
                icon: <InsertDriveFileOutlinedIcon/>,
                name: 'Файлы студента',
                runFunction: () => {
                    handleFileModal()
                }
            },
            {
                icon: <MailOutlineIcon/>,
                name: 'Написать письмо',
                runFunction: () => {
                    handleModal()
                }
            },
            {
                icon: <DeleteOutlineIcon/>,
                name: 'Удалить студента',
                runFunction: () => {
                    handleOpen()
                }
            },
            {
                icon: <EditIcon/>,
                name: 'Редактировать карточку',
                runFunction: () => {
                    setEditMode(!editMode)
                    editMode ?
                        iziToast.success({
                            title: 'ON',
                            message: 'Режим редактирования включен',
                            position: "topRight"
                        })
                        :
                        iziToast.error({
                            title: 'OFF',
                            message: 'Режим редактирования выключен',
                            position: "topRight",
                            color: "#FFF2ED"
                        })
                }
            }
        ] :
        [
            {
                icon: <NotificationsNoneIcon/>,
                name: 'Создать задачу',
                runFunction: () => {
                    handleModalMessage()
                }
            }
        ]

    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="title_quota_info">Личная карточка {rows.russian_name}</p>
                <div className="info_and_education_container">
                    <p className="title_quota"> Личная информация студента </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Личные данные</p>
                            <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       required size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                            <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setRussianName(event.target.value)} value={russian_name}/>
                            <TextField label="Контактный телефон студента" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            <TextField label="E-mail студента" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                            <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" sx={{width: "325px"}} disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCountry(event.target.value)} value={country}/>
                            <TextField label="Дата рождения" type="date" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                            <TextField label="Место рождения" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                            <TextField label="Место проживания" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setResidencePlace(event.target.value)}
                                       value={residence_place}/>
                            <TextField label="Гражданство" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                            <TextField label="Пол" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" select InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setGender(event.target.value)} value={gender}>
                                <MenuItem sx={propsStyle} value="Мужской">
                                    <span style={propsStyle.style}>Мужской</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Женский">
                                    <span style={propsStyle.style}>Женский</span>
                                </MenuItem>
                            </TextField>
                            {/*Нужно привязать*/}
                            <TextField label="Куратор" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setTutorName(event.target.value)} value={tutor_name}/>

                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Контактные данные агента</p>
                            {/*Нужно привязать*/}
                            <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            {/*Нужно привязать*/}
                            <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            {/*Нужно привязать*/}
                            <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>

                            <p className="tytle_contract_info"> Контактные данные представителя</p>
                            {/*Нужно привязать*/}
                            <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            {/*Нужно привязать*/}
                            <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            {/*Нужно привязать*/}
                            <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>

                            <p className="tytle_contract_info"> Данные о местоположении </p>
                            <TextField label="Нахождение в РФ" type="text" variant="outlined" color="warning"
                                       margin='normal' select size="small" InputLabelProps={propsStyle}
                                       onChange={event => setLocation(event.target.value)} value={RF_location}
                                       disabled={editMode}>
                                <MenuItem sx={propsStyle} value="Да">
                                <span
                                    style={propsStyle.style}>Да</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle}
                                          value="Нет">
                                <span
                                    style={propsStyle.style}>Нет</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Дата въезда" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} disabled={editMode}
                                       InputLabelProps={{
                                           style: {
                                               fontSize: "14px",
                                               fontFamily: ['Montserrat'],
                                               fontWeight: '450'
                                           },
                                           shrink: true
                                       }}
                                       onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        </div>
                    </div>
                </div>

                <div className="info_and_education_container">
                    <p className="title_quota"> Образование </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_education">Полученный уровень образования</p>
                            <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                       color="warning" margin='normal' disabled={editMode}
                                       size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLevelEducation(event.target.value)}
                                       value={level_education}/>
                            {/*Нужно привязать*/}
                            <TextField label="Образовательная организация" type="text" variant="outlined"
                                       color="warning" disabled={editMode}
                                       margin='normal' size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalOrganization(event.target.value)}
                                       value={educational_organization}/>
                            {/*Нужно привязать*/}
                            <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal'
                                       size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            {/*Нужно привязать*/}
                            <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLocationEducationalInstitution(event.target.value)}
                                       value={location_educational_institution}/>
                            {/*Нужно привязать*/}
                            <TextField label="Область образования" type="text" variant="outlined" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationField(event.target.value)}
                                       value={education_field}/>
                            <TextField label="Год окончания" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setGraduationYear(event.target.value)}
                                       value={graduation_year}/>
                            <p className="tytle_contract_education"> Дополнительно </p>
                            <TextField label="Примечания" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" multiline rows={5} disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setComments(event.target.value)} value={comments}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_education"> Уровень получаемого образования </p>
                            <TextField label="Статус зачисления" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small" select sx={{width: "325px"}}
                                       InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setEnrollment(event.target.value)} value={enrollment}>
                                <MenuItem sx={propsStyle.style} value="Зачислен">
                                    <span style={propsStyle.style}>Зачислен</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Не зачислен">
                                    <span style={propsStyle.style}>Не зачислен</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Уровень желаемого образования" type="text" variant="outlined"
                                       color="warning" disabled={editMode}
                                       margin='normal' size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setDesiredEducationLevel(event.target.value)}
                                       value={desired_education_level}/>
                            <TextField label="Форма обучения" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       size="small" select
                                       InputLabelProps={propsStyle}
                                       onChange={event => setFormStudy(event.target.value)} value={form_study}>
                                <MenuItem sx={propsStyle} value="Очная">
                                    <span style={propsStyle.style}>Очная</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Гибрид">
                                    <span style={propsStyle.style}>Гибрид</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Онлайн">
                                    <span style={propsStyle.style}>Онлайн</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Тип обучения" type="text" variant="outlined" color="error" margin='normal'
                                       required size="small" select focused disabled={editMode}
                                       InputLabelProps={propsStyle}
                                       onChange={event => setEducationType(event.target.value)} value={education_type}>
                                <MenuItem sx={propsStyle} value="Контракт">
                                    <span style={propsStyle.style}>Контракт</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Квота">
                                    <span style={propsStyle.style}>Квота</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Номер приказа о зачислении" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEnrollmentOrder(event.target.value)}
                                       value={enrollment_order}/>
                            <TextField label="Номер приказа об отчислении" type="text" variant="outlined"
                                       color="warning" disabled={editMode}
                                       margin='normal' size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setExpulsionOrder(event.target.value)}
                                       value={expulsion_order}/>
                            <TextField label="Код направления подготовки (специальности)" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setSpecialtyCode(event.target.value)} value={specialty_code}/>
                            {/*Нужно привязать*/}
                            <TextField label="Направление подготовки (специальность)" type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setSpecialtyDirection(event.target.value)}
                                       value={specialty_direction}/>
                            <TextField label="Стипендия" type="text" variant="outlined" color="warning"
                                       margin='normal' select size="small" disabled={editMode}
                                       InputLabelProps={propsStyle}
                                       onChange={event => setScholarship(event.target.value)} value={scholarship}>
                                <MenuItem sx={propsStyle} value="Да">
                                    <span style={propsStyle.style}>Да</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Нет">
                                    <span style={propsStyle.style}>Нет</span>
                                </MenuItem>
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="info_and_education_container">
                    <p className="title_quota"> Документы </p>
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="title_contract_doc"> Паспортные данные</p>
                            <TextField label="Номер паспорта" type="text" variant="outlined" color="warning"
                                       margin='normal' disabled={editMode}
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportNumber(event.target.value)}
                                       value={passport_number}/>
                            <TextField label="Срок действия паспорта" type="date" color="warning"
                                       margin='normal' size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportExpiration(event.target.value)}
                                       value={passport_expiration}/>
                            <TextField label="Кем выдан" type="text" variant="outlined" color="warning" margin='normal'
                                       size="small" disabled={editMode}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportIssued(event.target.value)}
                                       value={passport_issued}/>
                            <TextField label="Дата выдачи" type="date" color="warning" margin='normal'                                        size="small" disabled={editMode}
                                       inputProps={propsStyle}
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
                        <div className="column_style_contract">
                            <p className="title_contract_doc"> Дополнительные документы</p>
                            {/*Здесь нужно прописать так же как и для контракта, для квоты, почему-то, не прописано...*/}
                            <TextField label="Срок действия визы" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                            <TextField label="Дата передачи в международную службу" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                            <TextField label="Дата передачи в МВД" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                            <TextField label="Ориентировочная дата получения" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                            <TextField label="Фактическая дата получения приглашения" type="date" color="warning"
                                       margin='normal' size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle} disabled={editMode}
                                       onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                        </div>
                    </div>
                </div>
                {!editMode && <div>
                    <label className="checkbox_style_contract">
                        <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить данные?
                    </label>
                    <div className="button_position_contract_doc">
                        <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить</button>
                    </div>
                </div>}
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление студента</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить выбранного студента?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeStudent(rows.id)
                            .then((res) => {
                                switch (res.status) {
                                    case 200: {
                                        iziToast.success({
                                            title: res.statusText,
                                            message: 'Студент успешно удалены из базы. Обновляю страницу :)',
                                            position: "topRight",
                                        });
                                        setTimeout(() => {
                                        }, 1000)
                                        break
                                    }
                                    default: {
                                        iziToast.error({
                                            title: res.statusText,
                                            message: 'Ошибка. Попробуйте снова.',
                                            position: "topRight",
                                            color: "#FFF2ED"
                                        });
                                    }
                                }
                            })
                        setOpen(false)
                        navigate(HOME_ROUTE);
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
            <Box>
                {modalActive || modalMessageActive || modalFileActive ||
                    <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    sx={{position: 'fixed', bottom: 20, right: 20}}
                    icon={<SpeedDialIcon/>}

                    FabProps={{
                        sx: {
                            bgcolor: '#FA7A45',
                            '&:hover': {
                                bgcolor: '#FA7A45',
                            }
                        }
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                action.runFunction()
                            }}

                        />
                    ))}
                </SpeedDial>}
                <ModalMessage active={modalActive} setActive={setModalActive} studentEmail={[student_email]}/>
                <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive} singleId={rows.id}/>
                <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={rows.id}/>
            </Box>
        </>
    )
}
