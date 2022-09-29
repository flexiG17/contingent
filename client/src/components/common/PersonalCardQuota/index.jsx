import React, {useState} from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {changeStudentData, removeStudent} from '../../../services/serverData'
import {useEffect} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import iziToast from "izitoast";
import {ADD_STUDENT_NOTIFICATION_ROUTE, HOME_ROUTE} from "../../../utils/consts";
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

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

export default function PersonalCardQuota() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
    const [document_path, setDocumentPath] = useState(rows.document_path)
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
            document_path: document_path,
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

    const actions = [
        {
            icon: <NotificationsNoneIcon/>,
            name: 'Создать уведомление',
            runFunction: () => {
                navigate(
                    ADD_STUDENT_NOTIFICATION_ROUTE,
                    {
                        state: [rows, {
                            type: 'create',
                            button: 'Добавить',
                            message: 'Вы уверены, что хотите создать уведомление?',
                        }]
                    })
            }
        },
        {
            icon: <MailOutlineIcon/>,
            name: 'Написать письмо',
            runFunction: () => {
            }
        },
        {
            icon: <DeleteOutlineIcon/>,
            name: 'Удалить студента',
            runFunction: () => {
                handleOpen()
            }
        },
    ];

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
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Личные данные</p>
                            <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text"
                                       margin='normal'
                                       required size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                            <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text"
                                       margin='normal'
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setRussianName(event.target.value)} value={russian_name}/>

                            <TextField label="Нахождение в РФ" type="text" variant="outlined" color="warning"
                                       margin='normal' required select size="small" InputLabelProps={propsStyle}
                                       onChange={event => setLocation(event.target.value)} value={RF_location}>
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
                            <p className="tytle_contract_info"> Контактные данные</p>
                            <TextField label="Контактный телефон студента" variant="outlined" color="warning" type="tel"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       value={contact_phone_number}/>
                            <TextField label="E-mail студента" variant="outlined" color="warning" type="email"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setStudentEmail(event.target.value)} value={student_email}/>
                            <p className="tytle_contract_info"> Учёба</p>
                            <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLocationEducationalInstitution(event.target.value)}
                                       value={location_educational_institution}/>
                            <TextField label="Год окончания" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setGraduationYear(event.target.value)}
                                       value={graduation_year}/>
                            <TextField label="Уровень желаемого образования" type="text" variant="outlined"
                                       color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setDesiredEducationLevel(event.target.value)}
                                       value={desired_education_level}/>
                            <TextField label="Код направления подготовки (специальности)" type="text" variant="outlined"
                                       color="warning" margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setSpecialtyCode(event.target.value)} value={specialty_code}/>
                            <TextField label="Направление подготовки (специальность)" type="text" variant="outlined"
                                       color="warning" margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setSpecialtyDirection(event.target.value)}
                                       value={specialty_direction}/>
                            <TextField label="Область образования" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationField(event.target.value)}
                                       value={education_field}/>
                            <TextField label="Образовательная организация" type="text" variant="outlined"
                                       color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalOrganization(event.target.value)}
                                       value={educational_organization}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_info"> Паспортные данные </p>
                            <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCountry(event.target.value)} value={country}/>
                            <TextField label="Место рождения" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                            <TextField label="Дата рождения" type="date" color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                            <TextField label="Место проживания" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setResidencePlace(event.target.value)}
                                       value={residence_place}/>
                            <TextField label="Гражданство" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                            <TextField label="Пол" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" select InputLabelProps={propsStyle}
                                       onChange={event => setGender(event.target.value)} value={gender}>
                                <MenuItem sx={propsStyle} value="Мужской">
                                    <span style={propsStyle.style}>Мужской</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Женский">
                                    <span style={propsStyle.style}>Женский</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Номер паспорта" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportNumber(event.target.value)}
                                       value={passport_number}/>
                            <TextField label="Срок действия паспорта" type="date" color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportExpiration(event.target.value)}
                                       value={passport_expiration}/>
                            <TextField label="Кем выдан" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setPassportIssued(event.target.value)}
                                       value={passport_issued}/>
                            <TextField label="Дата выдачи" type="date" color="warning" margin='normal' required
                                       size="small"
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
                    </div>
                </div>

                <div className="info_and_education_container">
                    <div className="columns_position">
                        <div className="column_style_contract">
                            <p className="tytle_contract_education"> Уровень образования</p>
                            <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                       color="warning" margin='normal'
                                       required size="small" sx={{width: "325px"}}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setLevelEducation(event.target.value)}
                                       value={level_education}/>
                            <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                       color="warning" margin='normal'
                                       required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEducationalInstitution(event.target.value)}
                                       value={name_educational_institution}/>
                            <p className="tytle_contract_education"> Нынешнее образование </p>
                            <TextField label="Рег. номер направления" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setDirectionNumber(event.target.value)}
                                       value={direction_number}/>
                            <TextField label="Форма обучения" type="text" variant="outlined" color="warning"
                                       margin='normal'
                                       required size="small" select
                                       InputLabelProps={propsStyle}
                                       onChange={event => setFormStudy(event.target.value)} value={form_study}>
                                <MenuItem sx={propsStyle} value="Очная">
                                    <span style={propsStyle.style}>Очная</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Гибрид">
                                    <span style={propsStyle.style}>Гибрид</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle}  value="Онлайн">
                                    <span style={propsStyle.style}>Онлайн</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Тип обучения" type="text" variant="outlined" color="error" margin='normal'
                                       required size="small" select focused
                                       InputLabelProps={propsStyle}
                                       onChange={event => setEducationType(event.target.value)} value={education_type}>
                                <MenuItem sx={propsStyle} value="Контракт">
                                <span style={propsStyle.style}>Контракт</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Квота">
                                <span style={propsStyle.style}>Квота</span>
                                </MenuItem>
                            </TextField>
                            <p className="tytle_contract_education"> Дополнительно </p>
                            <TextField label="Стипендия" type="text" variant="outlined" color="warning"
                                       margin='normal' required select size="small"
                                       InputLabelProps={propsStyle}
                                       onChange={event => setScholarship(event.target.value)} value={scholarship}>
                                <MenuItem sx={propsStyle} value="Да">
                                    <span style={propsStyle.style}>Да</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Нет">
                                    <span style={propsStyle.style}>Нет</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Примечания" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small" multiline rows={3}
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setComments(event.target.value)} value={comments}/>
                        </div>
                        <div className="column_style_contract">
                            <p className="tytle_contract_education"> Статус </p>
                            <TextField label="Статус зачисления" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small" select sx={{width: "325px"}}
                                       InputLabelProps={propsStyle}
                                       onChange={event => setEnrollment(event.target.value)} value={enrollment}>
                                <MenuItem sx={propsStyle.style} value="Зачислен">
                                    <span style={propsStyle.style}>Зачислен</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Не зачислен">
                                    <span style={propsStyle.style}>Не зачислен</span>
                                </MenuItem>
                            </TextField>
                            <TextField label="Номер приказа о зачислении" type="text" variant="outlined" color="warning"
                                       margin='normal' required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setEnrollmentOrder(event.target.value)}
                                       value={enrollment_order}/>
                            <TextField label="Номер приказа об отчислении" type="text" variant="outlined"
                                       color="warning"
                                       margin='normal' size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
                                       onChange={event => setExpulsionOrder(event.target.value)}
                                       value={expulsion_order}/>
                            <TextField label="Куратор" type="text" variant="outlined" color="warning" margin='normal'
                                       required size="small"
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
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
                                       inputProps={propsStyle}
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
                                       inputProps={propsStyle} InputLabelProps={propsStyle}
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
                            <label className="label_doc"> Выберите файлы <InsertDriveFileIcon
                                sx={{fontSize: 20}}/></label>
                        </div>
                    </div>
                </div>
                <label className="checkbox_style_contract">
                    <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить данные?
                </label>
                <div className="button_position_contract_doc">
                    <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить</button>
                </div>
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
                                            navigate(HOME_ROUTE)
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
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
            <Box>
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
                </SpeedDial>
            </Box>
        </>
    )
}
