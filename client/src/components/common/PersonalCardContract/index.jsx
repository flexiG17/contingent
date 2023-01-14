import React, {useEffect, useRef, useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, getStudentsByIdArray, removeStudent} from '../../../actions/student'
import {useNavigate, useParams} from 'react-router-dom';
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
import '../Contract/Contract.css';
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
import {listItemStyle, dateTextFieldStyle, textFieldStyle} from '../../../utils/consts/styles'
import moment from "moment/moment";

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

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

    const handleModal = () => {
        if (studentData.student_email !== '')
            setModalActive(true)
        else
            iziToast.error({
                message: 'Почта студента не выбрана',
                position: "topRight",
                color: "#FFF2ED"
            })
    }

    const handleModalMessage = () => {
        setModalMessageActive(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const role = jwt_decode(getToken()).role
    const READER_ACCESS = role === 'Читатель'

    const [studentData, setStudentData] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const studentId = useParams().id
    useEffect(() => {
        getStudentsByIdArray([studentId])
            .then(result => {
                const student = result[0]
                student.birth_date = moment(student.birth_date).format("YYYY-MM-DD");
                student.passport_issue_date = moment(student.passport_issue_date).format("YYYY-MM-DD");
                student.passport_expiration = moment(student.passport_expiration).format("YYYY-MM-DD");
                student.entry_date = moment(student.entry_date).format("YYYY-MM-DD");
                student.visa_validity = moment(student.visa_validity).format("YYYY-MM-DD");
                student.first_payment = moment(student.first_payment).format("YYYY-MM-DD");
                student.second_payment = moment(student.second_payment).format("YYYY-MM-DD");
                student.third_payment = moment(student.third_payment).format("YYYY-MM-DD");
                student.fourth_payment = moment(student.fourth_payment).format("YYYY-MM-DD");
                student.transfer_to_international_service = moment(student.transfer_to_international_service).format("YYYY-MM-DD");
                student.transfer_to_MVD = moment(student.transfer_to_MVD).format("YYYY-MM-DD");
                student.estimated_receipt_date = moment(student.estimated_receipt_date).format("YYYY-MM-DD");
                student.actual_receipt_date_invitation = moment(student.actual_receipt_date_invitation).format("YYYY-MM-DD");
                setStudentData(result[0])
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 250)
            })
    }, [loading, studentId])
    console.log(isEditModeWasOn);
    useEffect(() => {
        const handleTabClose = event => {
            event.preventDefault();
            console.log(event);
            return (event.returnValue = 'Вы уверены, что хотите выйти? Изменения не сохранятся');
        };

        if(isEditModeWasOn){
            window.addEventListener('beforeunload', handleTabClose);

            return () => {
                window.removeEventListener('beforeunload', handleTabClose);
            }
        }
    }, [])

    /* const decodedToken = jwt_decode(getToken())
     let socket = ''
     useEffect(() => {
         socket = new WebSocket(`ws://localhost:5000/student/${studentId}`)
         // в случае подключения
         socket.onopen = () => {
             // отправляем сообщение на сервер
             socket.send(JSON.stringify({
                 method: 'connection',
                 userId: decodedToken.userId,
                 userName: decodedToken.name,
                 studentId: studentId
             }))
         }

         socket.onmessage = (message) => {
             let msg = JSON.parse(message.data)
             switch (msg.method) {
                 case "connection":
                     console.log(`Пользователь "${msg.userName}" с id = ${msg.userId} подключился`);
             }
         }
     }, [])*/

    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(formRef.current)
        const dataToSave = {};
        formData.forEach((value, key) => (dataToSave[key] = value))
        changeStudentData(dataToSave, studentId)
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
                                <TextField label="E-mail студента" variant="outlined"
                                           defaultValue={studentData.student_email}
                                           name='student_email' color="warning" type="email"
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
                                <TextField label="E-mail" defaultValue={studentData.agent_email}
                                           name='agent_email' type="email" variant="outlined" color="warning"
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
                                <TextField label="E-mail" defaultValue={studentData.representative_email}
                                           variant="outlined"
                                           name='representative_email' type="email" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc">Куратор</p>
                                <TextField label="Куратор" name='tutor_name' type="text" variant="outlined"
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
                                <TextField label="Место рождения"
                                           name='birth_place' color="warning" type="text" variant="outlined"
                                           margin='normal' disabled={editMode} defaultValue={studentData.birth_place}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Дата рождения" type="date" color="warning"
                                           defaultValue={studentData.birth_date}
                                           name='birth_date' required margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Место проживания" type="text"
                                           defaultValue={studentData.residence_place}
                                           name='residence_place' variant="outlined" color="warning"
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Гражданство" defaultValue={studentData.citizenship} type="text"
                                           name='citizenship' color="warning" variant="outlined"
                                           margin='normal' disabled={editMode} size="small"
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
                                <TextField label="Номер паспорта" name='passport_number' type="text" variant="outlined"
                                           color="warning" defaultValue={studentData.passport_number}
                                           margin='normal' disabled={editMode}
                                           required size="small" inputProps={textFieldStyle}
                                           InputLabelProps={textFieldStyle}/>
                                <TextField label="Срок действия паспорта" name='passport_expiration' type="date"
                                           color="warning" defaultValue={studentData.passport_expiration}
                                           margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Кем выдан" name='passport_issued' type="text" variant="outlined"
                                           color="warning" margin='normal' defaultValue={studentData.passport_issued}
                                           size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Дата выдачи" name='passport_issue_date' type="date" color="warning"
                                           margin='normal' defaultValue={studentData.passport_issue_date}
                                           inputProps={textFieldStyle} size="small" disabled={editMode}
                                           InputLabelProps={dateTextFieldStyle}/>
                                <p className="title_contract_doc"> Данные о местоположении </p>
                                <TextField label="Нахождение в РФ" defaultValue={studentData.RF_location} type="text"
                                           name='RF_location' color="warning" variant="outlined"
                                           margin='normal' select size="small" InputLabelProps={textFieldStyle}
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
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
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
                                           color="warning" defaultValue={studentData.enrollment}
                                           margin='normal' size="small" select sx={{width: "325px"}}
                                           InputLabelProps={textFieldStyle} disabled={editMode}>
                                    <MenuItem value="Зачислен">
                                        <span style={listItemStyle}>Зачислен</span>
                                    </MenuItem>
                                    <MenuItem value="Не зачислен">
                                        <span style={listItemStyle}>Не зачислен</span>
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
                        <p className="title_contract_section">Даты и оплата</p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Даты</p>
                                <TextField label="Срок действия визы" name='visa_validity' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.visa_validity}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle} sx={{width: "325px"}}/>
                                <TextField label="Дата передачи в международную службу"
                                           name='transfer_to_international_service' type="date" color="warning"
                                           margin='normal' size="small" inputProps={textFieldStyle} disabled={editMode}
                                           InputLabelProps={dateTextFieldStyle}
                                           defaultValue={studentData.transfer_to_international_service}/>
                                <TextField label="Дата передачи в МВД" name='transfer_to_MVD' type="date"
                                           color="warning" disabled={editMode}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle}
                                           defaultValue={studentData.transfer_to_MVD}/>
                                <TextField label="Ориентировочная дата получения" name='estimated_receipt_date'
                                           type="date" color="warning" defaultValue={studentData.estimated_receipt_date}
                                           margin='normal' size="small" inputProps={textFieldStyle} disabled={editMode}
                                           InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Фактическая дата получения приглашения"
                                           name='actual_receipt_date_invitation' type="date" color="warning"
                                           margin='normal' size="small" inputProps={textFieldStyle} disabled={editMode}
                                           InputLabelProps={dateTextFieldStyle}
                                           defaultValue={studentData.actual_receipt_date_invitation}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Оплата</p>
                                <TextField label="Платеж 1" name='first_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.first_payment}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle} sx={{width: "325px"}}/>
                                <TextField label="Платеж 2" name='second_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.second_payment}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Платеж 3" name='third_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.third_payment}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Платеж 4" name='fourth_payment' type="date" color="warning"
                                           disabled={editMode} defaultValue={studentData.fourth_payment}
                                           margin='normal' size="small" inputProps={textFieldStyle}
                                           InputLabelProps={dateTextFieldStyle}/>
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
                              studentEmail={[studentData.student_email]}/>
                <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive}
                                       singleId={[studentId]} emails={[studentData.student_email]}/>
                <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={studentId}/>
            </>
    )
}