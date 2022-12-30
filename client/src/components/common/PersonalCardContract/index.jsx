import React, {useEffect, useRef, useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, getStudentsByIdArray, removeStudent} from '../../../actions/student'
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import iziToast from "izitoast";
import TextField from "@mui/material/TextField";
import {
    Backdrop,
    Button, CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon
} from "@mui/material";
import "./PersonalCardContract.css";
import Box from "@mui/material/Box";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import jwt_decode from "jwt-decode";
import ModalMessage from "../MessageModal";
import CreateTaskModalWindow from "../CreateTaskModal";
import ModalFile from "../filemanager/ModalFile";
import {getToken} from "../../../utils/token";
import {listItemStyle, propsDataStyle, propsStyle} from '../../../utils/consts/styles'
import moment from "moment/moment";

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

export default function PersonalCardContract() {
    const [active, setActive] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [modalFileActive, setModalFileActive] = useState(false);
    const [modalMessageActive, setModalMessageActive] = useState(false);

    const handleClickContract = () => {
        setActive(!active)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleFileModal = () => {
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

    const [studentData, setStudentData] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const studentId = useParams()
    useEffect(() => {
        getStudentsByIdArray([studentId.id])
            .then(result => {
                result.map(item => {
                    item.birth_date = moment(item.birth_date).format("YYYY-MM-DD");
                    item.passport_issue_date = moment(item.passport_issue_date).format("YYYY-MM-DD");
                    item.passport_expiration = moment(item.passport_expiration).format("YYYY-MM-DD");
                    item.entry_date = moment(item.entry_date).format("YYYY-MM-DD");
                    item.visa_validity = moment(item.visa_validity).format("YYYY-MM-DD");
                    item.first_payment = moment(item.first_payment).format("YYYY-MM-DD");
                    item.second_payment = moment(item.second_payment).format("YYYY-MM-DD");
                    item.third_payment = moment(item.third_payment).format("YYYY-MM-DD");
                    item.fourth_payment = moment(item.fourth_payment).format("YYYY-MM-DD");
                    item.transfer_to_international_service = moment(item.transfer_to_international_service).format("YYYY-MM-DD");
                    item.transfer_to_MVD = moment(item.transfer_to_MVD).format("YYYY-MM-DD");
                    item.estimated_receipt_date = moment(item.estimated_receipt_date).format("YYYY-MM-DD");
                    item.actual_receipt_date_invitation = moment(item.actual_receipt_date_invitation).format("YYYY-MM-DD");
                });
                console.log(result[0]);
                setStudentData(result[0])
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }, [loading])
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(formRef.current)
        const dataToSave = {};
        formData.forEach((value, key) => (dataToSave[key] = value))
        console.log(dataToSave);
        /*const data = {
            education_type: education_type,
            latin_name: latin_name,
            russian_name: russian_name,
            RF_location: RF_location,
            contact_phone_number: contact_phone_number,
            student_email: student_email,
            agent_name: agent_name,
            agent_phone_number: agent_phone_number,
            agent_email: agent_email,
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
            form_study: form_study,
            enrollment: enrollment,
            enrollment_order: enrollment_order,
            expulsion_order: expulsion_order,
            contract_number: contract_number,
            status_1C: status_1C,
            tutor_name: tutor_name,
            first_payment: first_payment,
            second_payment: second_payment,
            third_payment: third_payment,
            fourth_payment: fourth_payment,
            entry_date: entry_date,
            visa_validity: visa_validity,
            document_path: '',
            transfer_to_international_service: transfer_to_international_service,
            transfer_to_MVD: transfer_to_MVD,
            estimated_receipt_date: estimated_receipt_date,
            actual_receipt_date_invitation: actual_receipt_date_invitation
        }*/
        changeStudentData(dataToSave, rows.id)
    };

    const actions = !READER_ACCESS ?
        [
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
    return (
        loading
            ?
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={true} invisible={true}>
                <CircularProgress style={{'color': '#FA7A45'}}/>
            </Backdrop>
            :
            <>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <p className="title_studentName">Личная карточка {rows.russian_name}</p>
                    <div className="info_and_education_container">
                        <p className="title_quota"> Личная информация студента </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="tytle_contract_info"> Личные данные</p>
                                <TextField label="Ф.И.О. (лат.)" type="text" defaultValue={studentData.latin_name}
                                           name='latin_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode} required size="small"
                                           sx={{width: "325px"}}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Ф.И.О. (кир.)" type="text" defaultValue={studentData.russian_name}
                                           name='russian_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Контактный телефон студента" type="tel" defaultValue={studentData.contact_phone_number}
                                           name='contact_phone_number' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="E-mail студента" variant="outlined" defaultValue={studentData.student_email}
                                           name='student_email' color="warning" type="email"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Страна" type="text" defaultValue={studentData.country}
                                           name='country' margin='normal' variant="outlined" color="warning"
                                           size="small" sx={{width: "325px"}} disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Дата рождения" type="date" color="warning" defaultValue={studentData.birth_date}
                                           name='birth_date' required margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                                <TextField label="Место рождения"
                                           name='birth_place' color="warning" type="text" variant="outlined"
                                           margin='normal' disabled={editMode} defaultValue={studentData.birth_place}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Место проживания" type="text" defaultValue={studentData.residence_place}
                                           name='residence_place' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Гражданство" defaultValue={studentData.citizenship} type="text"
                                           name='citizenship' color="warning" variant="outlined"
                                           margin='normal' disabled={editMode} size="small"
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Пол" defaultValue={studentData.gender} type="text"
                                           name='gender' margin='normal' variant="outlined" color="warning"
                                           required size="small" select InputLabelProps={propsStyle}
                                           disabled={editMode}>
                                    <MenuItem sx={propsStyle} value="Мужской">
                                        <span style={listItemStyle}>Мужской</span>
                                    </MenuItem>
                                    <MenuItem sx={propsStyle} value="Женский">
                                        <span style={listItemStyle}>Женский</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Куратор" defaultValue={studentData.tutor_name} type="text"
                                           name='tutor_name' color="warning" variant="outlined"
                                           size="small" disabled={editMode} margin='normal'
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="tytle_contract_info"> Контактные данные агента</p>
                                <TextField label="Ф.И.О." defaultValue={studentData.agent_name} type="text"
                                           name='agent_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Телефон" defaultValue={studentData.agent_phone_number} type="tel"
                                           name='agent_phone_number' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="E-mail" defaultValue={studentData.agent_email}
                                           name='agent_email' type="email" variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <p className="tytle_contract_info"> Контактные данные представителя</p>
                                <TextField label="Ф.И.О." defaultValue={studentData.representative_name}
                                           name='representative_name' variant="outlined" color="warning" type="text"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Телефон" defaultValue={studentData.representative_phone_number} variant="outlined"
                                           name='representative_phone_number' color="warning" type="tel"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="E-mail" defaultValue={studentData.representative_email} variant="outlined"
                                           name='representative_email' type="email" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <p className="tytle_contract_info"> Данные о местоположении </p>
                                <TextField label="Нахождение в РФ" defaultValue={studentData.RF_location} type="text"
                                           name='RF_location' color="warning" variant="outlined"
                                           margin='normal' select size="small" InputLabelProps={propsStyle}
                                           disabled={editMode}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Дата въезда" defaultValue={studentData.entry_date} type="date"
                                           name='entry_date' disabled={editMode} color="warning"
                                           margin='normal' size="small" sx={{width: "325px"}}
                                           inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                            </div>
                        </div>
                    </div>

                    <div className="info_and_education_container">
                        <p className="title_quota"> Образование </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="tytle_contract_education"> Полученный уровень образования </p>
                                <TextField label="Уровень полученного образования" name='level_education' type="text"
                                           variant="outlined" defaultValue={studentData.level_education}
                                           color="warning" margin='normal' sx={{width: "325px"}} disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Образовательная организация" name='educational_organization'
                                           type="text" variant="outlined" defaultValue={studentData.educational_organization}
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Наименование учебного заведения" name='name_educational_institution'
                                           type="text" variant="outlined" defaultValue={studentData.name_educational_institution}
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Местонахождение учебного заведения" defaultValue={studentData.location_educational_institution}
                                           name='location_educational_institution' type="text" variant="outlined"
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Область образования" name='education_field' type="text"
                                           variant="outlined" defaultValue={studentData.education_field}
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Год окончания" name='graduation_year' type="text" color="warning"
                                           margin='normal' size="small" sx={{width: "325px"}}
                                           inputProps={propsStyle} disabled={editMode} defaultValue={studentData.graduation_year}
                                           InputLabelProps={propsDataStyle}/>
                                <p className="tytle_contract_education"> Дополнительно </p>
                                <TextField label="Примечания" name='comments' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.comments}
                                           size="small" multiline rows={5} disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="tytle_contract_education"> Уровень получаемого образования </p>
                                <TextField label="Статус зачисления" name='enrollment' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.enrollment}
                                           margin='normal' size="small" select sx={{width: "325px"}}
                                           InputLabelProps={propsStyle} disabled={editMode}>
                                    <MenuItem value="Зачислен">
                                        <span style={listItemStyle}>Зачислен</span>
                                    </MenuItem>
                                    <MenuItem value="Не зачислен">
                                        <span style={listItemStyle}>Не зачислен</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Количество часов" name='hours_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.hours_number}
                                           margin='normal' size="small" select
                                           InputLabelProps={propsStyle} disabled={editMode}>
                                    <MenuItem value="1008 ак.ч. (1 год)">
                                        <span style={listItemStyle}>1008 ак.ч. (1 год)</span>
                                    </MenuItem>
                                    <MenuItem value="1008 ак.ч. (1.5 год)">
                                        <span style={listItemStyle}>1008 ак.ч. (1.5 год)</span>
                                    </MenuItem>
                                    <MenuItem value="868 ак.ч.">
                                        <span style={listItemStyle}>868 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="728 ак.ч.">
                                        <span style={listItemStyle}>728 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="588 ак.ч.">
                                        <span style={listItemStyle}>588 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="504 ак.ч.">
                                        <span style={listItemStyle}>504 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="288 ак.ч.">
                                        <span style={listItemStyle}>588 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="144 ак.ч.">
                                        <span style={listItemStyle}>144 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="108 ак.ч.">
                                        <span style={listItemStyle}>108 ак.ч.</span>
                                    </MenuItem>
                                    <MenuItem value="588 ак.ч.">
                                        <span style={listItemStyle}>72 ак.ч.</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Уровень желаемого образования" name='desired_education_level'
                                           type="text" variant="outlined" defaultValue={studentData.desired_education_level}
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Форма обучения" name='form_study' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.form_study}
                                           margin='normal' disabled={editMode}
                                           size="small" select InputLabelProps={propsStyle}>
                                    <MenuItem value="Очная">
                                        <span style={listItemStyle}>Очная</span>
                                    </MenuItem>
                                    <MenuItem value="Гибрид">
                                        <span style={listItemStyle}>Гибрид</span>
                                    </MenuItem>
                                    <MenuItem value="Онлайн">
                                        <span style={listItemStyle}>Онлайн</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Тип обучения" name='education_type' type="text" variant="outlined"
                                           color="error" margin='normal' defaultValue={studentData.education_type}
                                           required size="small" select focused InputLabelProps={propsStyle}
                                           disabled={editMode}>
                                    <MenuItem value="Контракт">
                                        <span style={listItemStyle}>Контракт</span>
                                    </MenuItem>
                                    <MenuItem value="Квота">
                                        <span style={listItemStyle}>Квота</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Номер приказа о зачислении" name='enrollment_order' type="text"
                                           variant="outlined" color="warning" defaultValue={studentData.enrollment_order}
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Номер приказа об отчислении" name='expulsion_order' type="text"
                                           variant="outlined" defaultValue={studentData.expulsion_order}
                                           color="warning" disabled={editMode} margin='normal' size="small"
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                {/*Нужно привязать*/}
                                <TextField label="Куратор" name='tutor_name' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.tutor_name}
                                           size="small" disabled={editMode}
                                           InputLabelProps={propsStyle} inputProps={propsStyle}/>
                            </div>
                        </div>
                    </div>
                    <div className="info_and_education_container">
                        <p className="title_quota"> Документы </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Паспортные данные</p>
                                <TextField label="Номер паспорта" name='passport_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.passport_number}
                                           margin='normal' disabled={editMode}
                                           required size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Срок действия паспорта" name='passport_expiration' type="date"
                                           color="warning" defaultValue={studentData.passport_expiration}
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                                <TextField label="Кем выдан" name='passport_issued' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.passport_issued}
                                           size="small" disabled={editMode}
                                           inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Дата выдачи" name='passport_issue_date' type="date" color="warning"
                                           margin='normal' defaultValue={studentData.passport_issue_date}
                                           inputProps={propsStyle} size="small" disabled={editMode}
                                           InputLabelProps={propsDataStyle}/>
                                <p className="title_contract_doc"> Дополнительные документы </p>
                                <TextField label="Срок действия визы" name='visa_validity' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.visa_validity}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle}/>
                                <TextField label="Дата передачи в международную службу"
                                           name='transfer_to_international_service' type="date" color="warning"
                                           margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                           InputLabelProps={propsDataStyle} defaultValue={studentData.transfer_to_international_service}/>
                                <TextField label="Дата передачи в МВД" name='transfer_to_MVD' type="date"
                                           color="warning" disabled={editMode}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle} defaultValue={studentData.transfer_to_MVD}/>
                                <TextField label="Ориентировочная дата получения" name='estimated_receipt_date'
                                           type="date" color="warning" defaultValue={studentData.estimated_receipt_date}
                                           margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                           InputLabelProps={propsDataStyle}/>
                                <TextField label="Фактическая дата получения приглашения"
                                           name='actual_receipt_date_invitation' type="date" color="warning"
                                           margin='normal' size="small" inputProps={propsStyle} disabled={editMode}
                                           InputLabelProps={propsDataStyle} defaultValue={studentData.actual_receipt_date_invitation}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="tytle_contract_doc_contaner"> Документы оплаты </p>
                                <TextField label="Номер договора" name='contract_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.contract_number}
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Рег. номер направления" name='direction_number' type="text"
                                           variant="outlined" color="warning" defaultValue={studentData.direction_number}
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={propsStyle} InputLabelProps={propsStyle}/>
                                <TextField label="Статус 1C" name='status_1c' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.status_1c}
                                           size="small" select InputLabelProps={propsStyle} disabled={editMode}>
                                    <MenuItem value="Прикреплен">
                                        <span style={listItemStyle}>Прикреплен</span>
                                    </MenuItem>
                                    <MenuItem value="Не прикреплен">
                                        <span style={listItemStyle}>Не прикреплен</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Платеж 1" name='first_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.first_payment}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle}/>
                                <TextField label="Платеж 2" name='second_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.second_payment}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle}/>
                                <TextField label="Платеж 3" name='third_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.third_payment}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle}/>
                                <TextField label="Платеж 4" name='fourth_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.fourth_payment}
                                           margin='normal' size="small" inputProps={propsStyle}
                                           InputLabelProps={propsDataStyle}/>
                            </div>
                        </div>
                    </div>
                    {!editMode && <div>
                        <label className="checkbox_style_contract">
                            <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить
                            данные?
                        </label>
                        <div className="button_position_contract_doc">
                            <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить
                            </button>
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
                            removeStudent(rows.id, navigate)
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
                    <ModalMessage active={modalActive} setActive={setModalActive} studentEmail={[studentData.student_email]}/>
                    <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive}
                                           singleId={rows.id}/>
                    <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={rows.id}/>
                </Box>
            </>
    )
}