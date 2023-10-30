import React, {useEffect, useRef, useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, getStudentsByIdArray, removeStudent} from '../../../actions/student'
import {useNavigate, useParams} from 'react-router-dom';
import iziToast from "izitoast";
import TextField from "@mui/material/TextField";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Backdrop,
    Button, CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, LinearProgress,
    MenuItem,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon, ThemeProvider
} from "@mui/material";
import '../Contract/Contract.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import jwt_decode from "jwt-decode";
import ModalMessage from "../MessageModal";
import CreateTaskModalWindow from "../CreateTaskModal";
import ModalFile from "../filemanager/ModalFile";
import {getToken} from "../../../utils/token";
import {listItemStyle, systemColor, textFieldStyle} from '../../../utils/consts/styles'
import Typography from "@mui/material/Typography";
import CustomSingleDatePicker from "../../datePicker";
import moment from "moment";

export default function PersonalCardContract() {

    const [active, setActive] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [modalFileActive, setModalFileActive] = useState(false);
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const [isEditModeWasOn, setIsEditModeWasOn] = useState(false)

    const handleClickContract = () => {
        setActive(!active)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleFileModal = () => {
        setModalFileActive(true);
    }

    const handleModalMessage = () => {
        setModalMessageActive(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const role = jwt_decode(getToken()).role
    const READER_ACCESS = role === 'Читатель'

    const [studentData, setStudentData] = useState(undefined)
    const [loadingStudentData, setLoadingStudentData] = useState(true)
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [studentEducationType, setStudentEducationType] = useState(new Date())

    const handleModal = () => {
        if (studentData.first_student_email !== '')
            setModalActive(true)
        else
            iziToast.error({
                message: 'Почта студента не выбрана',
                position: "topRight",
                color: "#FFF2ED"
            })
    }

    const [contractAmount, setContractAmount] = useState(0)
    const [firstPayment, setFirstPayment] = useState(0)
    const [secondPayment, setSecondPayment] = useState(0)
    const [thirdPayment, setThirdPayment] = useState(0)
    const [fourthPayment, setFourthPayment] = useState(0)

    const [studentExpelled, setStudentExpelled] = useState('')
    const [RF_location, setRfLocation] = useState('')

    const studentId = useParams().id
    useEffect(() => {
        getStudentsByIdArray([studentId])
            .then(result => {
                setStudentEducationType(result[0].education_type)

                setContractAmount(result[0].contract_amount)
                setFirstPayment(result[0].amount_first_actual_payment)
                setSecondPayment(result[0].amount_second_actual_payment)
                setThirdPayment(result[0].amount_third_actual_payment)
                setFourthPayment(result[0].amount_fourth_actual_payment)

                setRfLocation(result[0].RF_location)
                setStudentExpelled(result[0].enrollment)

                setStudentData(result[0])
            })
            .finally(() => {
                setTimeout(() => {
                    setLoadingStudentData(false)
                }, 250)
            })
    }, [loadingStudentData, studentId])

    useEffect(() => {
        const handleTabClose = event => {
            event.preventDefault();
            return (event.returnValue = 'Вы уверены, что хотите выйти? Изменения не сохранятся');
        };

        if (isEditModeWasOn) {
            window.addEventListener('beforeunload', handleTabClose);

            return () => {
                window.removeEventListener('beforeunload', handleTabClose);
            }
        }
    }, [isEditModeWasOn])

    const formRef = useRef(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsEditModeWasOn(false)
        setLoadingRequest(true)

        let formData = new FormData(formRef.current)
        const dataToSave = {};
        formData.forEach((value, key) => (dataToSave[key] = value))
        dataToSave['date_creation'] = studentData.date_creation

        dataToSave.birth_date = dataToSave.birth_date.split('.').reverse().join('-')
        dataToSave.passport_issue_date = dataToSave.passport_issue_date.split('.').reverse().join('-');
        dataToSave.passport_expiration = dataToSave.passport_expiration.split('.').reverse().join('-');
        dataToSave.entry_date = dataToSave.entry_date.split('.').reverse().join('-');
        dataToSave.visa_validity = dataToSave.visa_validity.split('.').reverse().join('-');
        dataToSave.first_payment_contract_date = dataToSave.first_payment_contract_date.split('.').reverse().join('-');
        dataToSave.second_payment_contract_date = dataToSave.second_payment_contract_date.split('.').reverse().join('-');
        dataToSave.third_payment_contract_date = dataToSave.third_payment_contract_date.split('.').reverse().join('-');
        dataToSave.fourth_payment_contract_date = dataToSave.fourth_payment_contract_date.split('.').reverse().join('-');
        dataToSave.first_payment_actual_date = dataToSave.first_payment_actual_date.split('.').reverse().join('-');
        dataToSave.second_payment_actual_date = dataToSave.second_payment_actual_date.split('.').reverse().join('-');
        dataToSave.third_payment_actual_date = dataToSave.third_payment_actual_date.split('.').reverse().join('-');
        dataToSave.fourth_payment_actual_date = dataToSave.fourth_payment_actual_date.split('.').reverse().join('-');
        dataToSave.transfer_to_international_service = dataToSave.transfer_to_international_service.split('.').reverse().join('-');
        dataToSave.transfer_to_MVD = dataToSave.transfer_to_MVD.split('.').reverse().join('-');
        dataToSave.estimated_receipt_date = dataToSave.estimated_receipt_date.split('.').reverse().join('-');
        dataToSave.actual_receipt_date_invitation = dataToSave.actual_receipt_date_invitation.split('.').reverse().join('-');
        dataToSave.date_started_learning = dataToSave.date_started_learning.split('.').reverse().join('-');

        changeStudentData(dataToSave, studentId, navigate, studentEducationType, setLoadingRequest)
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
                    setIsEditModeWasOn(true)
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

    const paymentBalance = +contractAmount - +firstPayment - +secondPayment - +thirdPayment - +fourthPayment

    return (
        loadingStudentData
            ?
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={true} invisible={true}>
                <CircularProgress style={{'color': '#FA7A45'}}/>
            </Backdrop>
            :
            <>
                <form ref={formRef} onSubmit={handleSubmit} id='studentForm'>
                    <p className="title_studentName">Личная карточка {studentData.latin_name}</p>
                    <div className="info_and_education_container">
                        <p className="title_contract_section"> Основные данные студента </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Личные данные</p>
                                <TextField label="Ф.И.О. (лат.)" type="text" defaultValue={studentData.latin_name}
                                           name='latin_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode} required size="small"
                                           sx={{width: "325px"}}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Ф.И.О. (кир.)" type="text" defaultValue={studentData.russian_name}
                                           name='russian_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Контактные данные</p>
                                <TextField label="Контактный телефон студента" type="tel"
                                           defaultValue={studentData.contact_phone_number}
                                           name='contact_phone_number' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Первая эл. почта студента" variant="outlined"
                                           defaultValue={studentData.first_student_email}
                                           name='first_student_email' color="warning" type="email"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта студента" variant="outlined"
                                           defaultValue={studentData.second_student_email}
                                           name='second_student_email' color="warning" type="email"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Контактные данные агента</p>
                                <TextField label="Ф.И.О." defaultValue={studentData.agent_name} type="text"
                                           name='agent_name' variant="outlined" color="warning"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Телефон" defaultValue={studentData.agent_phone_number} type="tel"
                                           name='agent_phone_number' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Первая эл. почта агента" defaultValue={studentData.first_agent_email}
                                           name='first_agent_email' type="email" variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта агента" defaultValue={studentData.second_agent_email}
                                           name='second_agent_email' type="email" variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Контактные данные представителя</p>
                                <TextField label="Ф.И.О." defaultValue={studentData.representative_name}
                                           name='representative_name' variant="outlined" color="warning" type="text"
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Телефон" defaultValue={studentData.representative_phone_number}
                                           variant="outlined"
                                           name='representative_phone_number' color="warning" type="tel"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Первая эл. почта представителя"
                                           defaultValue={studentData.first_representative_email}
                                           name='first_representative_email' variant="outlined"
                                           type="email" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта представителя"
                                           defaultValue={studentData.second_representative_email}
                                           name='second_representative_email'
                                           variant="outlined" type="email" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc">Куратор</p>
                                <TextField label="Куратор (ФИО, номер телефона)" name='tutor_name' type="text"
                                           variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.tutor_name}
                                           size="small" disabled={editMode}
                                           InputLabelProps={textFieldStyle} inputProps={textFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Паспортные данные</p>
                                <TextField label="Страна" type="text" defaultValue={studentData.country}
                                           name='country' margin='normal' variant="outlined" color="warning"
                                           size="small" sx={{width: "325px"}} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Пол" defaultValue={studentData.gender} type="text"
                                           name='gender' margin='normal' variant="outlined" color="warning"
                                           required size="small" select InputLabelProps={textFieldStyle}
                                           disabled={editMode}>
                                    <MenuItem sx={textFieldStyle} value="Мужской">
                                        <span style={listItemStyle}>Мужской</span>
                                    </MenuItem>
                                    <MenuItem sx={textFieldStyle} value="Женский">
                                        <span style={listItemStyle}>Женский</span>
                                    </MenuItem>
                                </TextField>
                                <CustomSingleDatePicker
                                    name={"birth_date"}
                                    label={'Дата рождения'}
                                    defaultValue={studentData.birth_date}
                                    required={true}
                                    form='studentForm'
                                    editMode={editMode}
                                    size={'default'}
                                />
                                <TextField label="Номер паспорта" name='passport_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.passport_number}
                                           margin='normal' disabled={editMode}
                                           required size="small" inputProps={textFieldStyle}
                                           InputLabelProps={textFieldStyle}/>
                                <CustomSingleDatePicker
                                    name={"passport_issue_date"}
                                    defaultValue={studentData.passport_issue_date}
                                    editMode={editMode}
                                    required={false}
                                    label={'Дата выдачи'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"passport_expiration"}
                                    defaultValue={studentData.passport_expiration}
                                    editMode={editMode}
                                    required={false}
                                    label={'Срок действия'}
                                    size={'default'}
                                />
                                <TextField label="Кем выдан" name='passport_issued' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.passport_issued}
                                           size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Данные о местоположении </p>
                                <TextField name='residence_place' label="Место проживания в РФ" type="text"
                                           variant="outlined"
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           defaultValue={studentData.residence_place}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Нахождение в РФ" type="text"
                                           name='RF_location' color="warning" variant="outlined"
                                           margin='normal' select size="small" InputLabelProps={textFieldStyle}
                                           value={RF_location}
                                           onChange={(e) => {
                                               setRfLocation(e.target.value)
                                           }}
                                           disabled={editMode}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                                <CustomSingleDatePicker
                                    name={"entry_date"}
                                    defaultValue={studentData.entry_date}
                                    editMode={editMode}
                                    required={false}
                                    label={'Дата въезда'}
                                    size={'default'}
                                />
                                <p className="title_contract_doc"> Начало обучения </p>
                                <TextField label="Приступил к обучению" name='started_learning' type="text"
                                           variant="outlined" defaultValue={studentData.started_learning}
                                           disabled={editMode}
                                           color="warning" margin='normal' size="small" select
                                           InputLabelProps={textFieldStyle}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                                <CustomSingleDatePicker
                                    name={"date_started_learning"}
                                    defaultValue={studentData.date_started_learning}
                                    editMode={editMode}
                                    required={false}
                                    label={'Дата приступления к обучению'}
                                    size={'default'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="info_and_education_container">
                        <p className="title_contract_section">Образование студента</p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Полученный уровень образования </p>
                                <TextField label="Уровень полученного образования" name='level_education' type="text"
                                           variant="outlined" defaultValue={studentData.level_education}
                                           color="warning" margin='normal' sx={{width: "325px"}} disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Наименование учебного заведения" name='name_educational_institution'
                                           type="text" variant="outlined"
                                           defaultValue={studentData.name_educational_institution}
                                           color="warning" margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc">Нынешнее образование</p>
                                <TextField label="Количество часов" name='hours_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.hours_number}
                                           margin='normal' size="small" select
                                           InputLabelProps={textFieldStyle} disabled={editMode}>
                                    <MenuItem value="1008 (1.5 года 24-25 г.)">
                                        <span style={listItemStyle}>1008 (1.5 года 24-25 г.)</span>
                                    </MenuItem>
                                    <MenuItem value="1008 (1 год 23-24 г.)">
                                        <span style={listItemStyle}>1008 (1 год 23-24 г.)</span>
                                    </MenuItem>
                                    <MenuItem value="1008 (1.5 года 23-24 г.)">
                                        <span style={listItemStyle}>1008 (1.5 года 23-24 г.)</span>
                                    </MenuItem>
                                    <MenuItem value="868 (23-24 уч.г.)">
                                        <span style={listItemStyle}>868 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="728 (23-24 уч.г.)">
                                        <span style={listItemStyle}>728 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="588 (23-24 уч.г.)">
                                        <span style={listItemStyle}>588 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="504 (23-24 уч.г.)">
                                        <span style={listItemStyle}>504 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="288 (23-24 уч.г.)">
                                        <span style={listItemStyle}>288 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="144 (23-24 уч.г.)">
                                        <span style={listItemStyle}>144 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="108 (23-24 уч.г.)">
                                        <span style={listItemStyle}>108 (23-24 уч.г.)</span>
                                    </MenuItem>
                                    <MenuItem value="72 (23-24 уч.г.)">
                                        <span style={listItemStyle}>72 (23-24 уч.г.)</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Форма обучения" name='form_study' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.form_study}
                                           margin='normal' disabled={editMode}
                                           size="small" select InputLabelProps={textFieldStyle}>
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
                                <p className="title_contract_doc"> Дополнительно </p>
                                <TextField label="Примечания" name='comments' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.comments}
                                           size="small" multiline rows={5} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Дата создания" name='date_creation' type="text"
                                           variant="outlined"
                                           defaultValue={moment(new Date(studentData.date_creation)).format('DD.MM.YYYY')}
                                           color="warning" disabled margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Кем создан" name='expulsion_order' type="text"
                                           variant="outlined" defaultValue={studentData.who_created}
                                           color="warning" disabled margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Статус</p>
                                <TextField label="Тип обучения" name='education_type' type="text" variant="outlined"
                                           color="error" margin='normal' defaultValue={studentData.education_type}
                                           required size="small" select focused InputLabelProps={textFieldStyle}
                                           disabled={editMode}>
                                    <MenuItem value="Контракт">
                                        <span style={listItemStyle}>Контракт</span>
                                    </MenuItem>
                                    <MenuItem value="Квота">
                                        <span style={listItemStyle}>Квота</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Статус зачисления" name='enrollment' type="text" variant="outlined"
                                           color="warning" value={studentExpelled}
                                           onChange={(e) => {
                                               if (e.target.value === 'Отчислен')
                                                   setRfLocation('Нет')
                                               setStudentExpelled(e.target.value)
                                           }}
                                           margin='normal' size="small" select sx={{width: "325px"}}
                                           InputLabelProps={textFieldStyle} disabled={editMode}>
                                    <MenuItem value="Зачислен">
                                        <span style={listItemStyle}>Зачислен</span>
                                    </MenuItem>
                                    <MenuItem value="Не зачислен">
                                        <span style={listItemStyle}>Не зачислен</span>
                                    </MenuItem>
                                    <MenuItem value="Отчислен">
                                        <span style={listItemStyle}>Отчислен</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Номер приказа о зачислении" name='enrollment_order' type="text"
                                           variant="outlined" color="warning"
                                           defaultValue={studentData.enrollment_order}
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Номер приказа об отчислении" name='expulsion_order' type="text"
                                           variant="outlined" defaultValue={studentData.expulsion_order}
                                           color="warning" disabled={editMode} margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Номер договора" name='contract_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.contract_number}
                                           margin='normal' disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Статус 1C" name='status_1c' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.status_1c}
                                           size="small" select InputLabelProps={textFieldStyle} disabled={editMode}>
                                    <MenuItem value="Прикреплен">
                                        <span style={listItemStyle}>Прикреплен</span>
                                    </MenuItem>
                                    <MenuItem value="Не прикреплен">
                                        <span style={listItemStyle}>Не прикреплен</span>
                                    </MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </div>
                    <div className="info_and_education_container">
                        <p className="title_contract_section">Приглашение, виза и оплата</p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Виза и приглашение</p>
                                <CustomSingleDatePicker
                                    name={"visa_validity"}
                                    defaultValue={studentData.visa_validity}
                                    editMode={editMode}
                                    required={false}
                                    label={'Срок действия визы'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_international_service"}
                                    defaultValue={studentData.transfer_to_international_service}
                                    editMode={editMode}
                                    required={false}
                                    label={'Дата передачи в международную службу'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_MVD"}
                                    defaultValue={studentData.transfer_to_MVD}
                                    editMode={editMode}
                                    required={false}
                                    label={'Дата передачи в МВД'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"estimated_receipt_date"}
                                    defaultValue={studentData.estimated_receipt_date}
                                    editMode={editMode}
                                    required={false}
                                    label={'Ориентировочная дата получения'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"actual_receipt_date_invitation"}
                                    defaultValue={studentData.actual_receipt_date_invitation}
                                    editMode={editMode}
                                    required={false}
                                    label={'Фактическая дата получения приглашения'}
                                    size={'default'}
                                />
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc">
                                    {`Оплата / остаток: `} <b>{paymentBalance}</b>
                                </p>
                                <div className='elements_in_row'>
                                    <TextField label="Cумма для оплаты" name='contract_amount' type="text"
                                               sx={{width: '150px', mr: '25px'}}
                                               onChange={(e) => {
                                                   setContractAmount(e.target.value)
                                               }}
                                               variant="outlined" defaultValue={studentData.contract_amount}
                                               color="warning" disabled={editMode} margin='normal' size="small"
                                               inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                    <TextField label="Статус оплаты" name='payment_status' type="text"
                                               sx={{width: '150px'}} variant="outlined"
                                               defaultValue={studentData.payment_status}
                                               color="warning" disabled={editMode} margin='normal' size="small"
                                               inputProps={textFieldStyle} InputLabelProps={textFieldStyle} select>
                                        <MenuItem value="Оплачено">
                                            <span style={listItemStyle}>Оплачено</span>
                                        </MenuItem>
                                        <MenuItem value="Не оплачено">
                                            <span style={listItemStyle}>Не оплачено</span>
                                        </MenuItem>
                                        <MenuItem value="Оплачено частично">
                                            <span style={listItemStyle}>Оплачено частично</span>
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div style={{width: '325px'}}>
                                    <Accordion sx={{borderRadius: '5px', mb: '15px', mt: '10px'}}>
                                        <AccordionSummary>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '15px',
                                                    color: "#FA7A45",
                                                    fontWeight: 500,
                                                    fontFamily: 'Montserrat'
                                                }}
                                            >
                                                Первый платеж
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className='elements_in_row'>
                                                <CustomSingleDatePicker
                                                    name={"first_payment_contract_date"}
                                                    defaultValue={studentData.first_payment_contract_date}
                                                    label={'Платеж 1 (договор)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                                <CustomSingleDatePicker
                                                    name={"first_payment_actual_date"}
                                                    defaultValue={studentData.first_payment_actual_date}
                                                    label={'Платеж 1 (факт)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                            </div>
                                            <TextField label="Сумма платежа" name='amount_first_actual_payment'
                                                       type="text" color="warning"
                                                       onChange={(e) => setFirstPayment(e.target.value)}
                                                       sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                                       disabled={editMode}
                                                       defaultValue={studentData.amount_first_actual_payment}
                                                       size="small" inputProps={textFieldStyle}
                                                       InputLabelProps={textFieldStyle}/>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                        <AccordionSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '15px',
                                                    color: "#FA7A45",
                                                    fontWeight: 500,
                                                    fontFamily: 'Montserrat'
                                                }}
                                            >
                                                Второй платеж
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="elements_in_row">
                                                <CustomSingleDatePicker
                                                    name={"second_payment_contract_date"}
                                                    defaultValue={studentData.second_payment_contract_date}
                                                    label={'Платеж 2 (договор)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                                <CustomSingleDatePicker
                                                    name={"second_payment_actual_date"}
                                                    defaultValue={studentData.second_payment_actual_date}
                                                    label={'Платеж 2 (факт)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                            </div>
                                            <TextField label="Сумма платежа" name='amount_second_actual_payment'
                                                       type="text" color="warning"
                                                       onChange={(e) => setSecondPayment(e.target.value)}
                                                       sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                                       disabled={editMode}
                                                       defaultValue={studentData.amount_second_actual_payment}
                                                       size="small" inputProps={textFieldStyle}
                                                       InputLabelProps={textFieldStyle}/>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                        <AccordionSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '15px',
                                                    color: "#FA7A45",
                                                    fontWeight: 500,
                                                    fontFamily: 'Montserrat'
                                                }}
                                            >
                                                Третий платеж
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="elements_in_row">
                                                <CustomSingleDatePicker
                                                    name={"third_payment_contract_date"}
                                                    defaultValue={studentData.third_payment_contract_date}
                                                    label={'Платеж 3 (договор)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                                <CustomSingleDatePicker
                                                    name={"third_payment_actual_date"}
                                                    defaultValue={studentData.third_payment_actual_date}
                                                    label={'Платеж 3 (факт)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                            </div>
                                            <TextField label="Сумма платежа" name='amount_third_actual_payment'
                                                       type="text" color="warning"
                                                       onChange={(e) => setThirdPayment(e.target.value)}
                                                       sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                                       disabled={editMode}
                                                       defaultValue={studentData.amount_third_actual_payment}
                                                       size="small" inputProps={textFieldStyle}
                                                       InputLabelProps={textFieldStyle}/>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                        <AccordionSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '15px',
                                                    color: "#FA7A45",
                                                    fontWeight: 500,
                                                    fontFamily: 'Montserrat'
                                                }}
                                            >
                                                Четвертый платеж
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="elements_in_row">
                                                <CustomSingleDatePicker
                                                    name={"fourth_payment_contract_date"}
                                                    defaultValue={studentData.fourth_payment_contract_date}
                                                    label={'Платеж 4 (договор)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                                <CustomSingleDatePicker
                                                    name={"fourth_payment_actual_date"}
                                                    defaultValue={studentData.fourth_payment_actual_date}
                                                    label={'Платеж 4 (факт)'}
                                                    required={false}
                                                    editMode={editMode}
                                                    size={'small'}
                                                />
                                            </div>
                                            <TextField label="Сумма платежа" name='amount_fourth_actual_payment'
                                                       type="text" color="warning"
                                                       onChange={(e) => setFourthPayment(e.target.value)}
                                                       sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                                       disabled={editMode}
                                                       defaultValue={studentData.amount_fourth_actual_payment}
                                                       size="small" inputProps={textFieldStyle}
                                                       InputLabelProps={textFieldStyle}/>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!editMode && <div>
                        <label className="checkbox_style_contract">
                            <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить
                            данные?
                        </label>


                        <div className="button_position_contract_doc">
                            {!loadingRequest
                                ?
                                <button type="submit" className="button_style_contract_doc" disabled={active}>Изменить
                                </button>
                                :
                                <ThemeProvider theme={systemColor}>
                                    <LinearProgress color="primary"
                                                    sx={{
                                                        width: '120px',
                                                        height: '25px',
                                                        mt: "10px",
                                                        mb: '10px',
                                                        borderRadius: '7px'
                                                    }}/>
                                </ThemeProvider>}
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
                            removeStudent(studentId, navigate)
                            setOpen(false)
                        }
                        }>Да</Button>
                        <Button onClick={() => {
                            setOpen(false)
                        }
                        }>Нет</Button>
                    </DialogActions>
                </Dialog>
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
                <ModalMessage active={modalActive} setActive={setModalActive}
                              studentEmail={[{
                                  id: studentData.id,
                                  education_type: studentData.education_type,
                                  email: studentData.first_student_email
                              }]}/>
                <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive}
                                       singleId={[studentId]} emails={[studentData.first_student_email]}/>
                <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={studentId}/>
            </>
    )
}