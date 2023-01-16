import React, {useEffect, useRef, useState} from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {changeStudentData, getStudentsByIdArray, removeStudent} from '../../../actions/student'
import {useNavigate, useParams} from 'react-router-dom';
import iziToast from "izitoast";
import TextField from "@mui/material/TextField";
import {
    Backdrop,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    SpeedDial, SpeedDialAction, SpeedDialIcon
} from "@mui/material";
import '../Contract/Contract.css';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import jwt_decode from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import ModalMessage from '../MessageModal/index'
import CreateTaskModalWindow from "../CreateTaskModal";
import {getToken} from "../../../utils/token";
import ModalFile from "../filemanager/ModalFile";
import {textFieldStyle, dateTextFieldStyle, listItemStyle} from "../../../utils/consts/styles";
import moment from "moment";

// файл с по сути тем же, что на страницах Quota.jsx, index.jsx, index.jsx, index.jsx
// отличаются они либо кол-вом форм, либо выходными данными. По сути, можно подумать как 4 страница сменить до 2, а мб до 1

export default function PersonalCardQuota() {
    const [active, setActive] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [editMode, setEditMode] = useState(true)
    const [modalMessageActive, setModalMessageActive] = useState(false)
    const [modalFileActive, setModalFileActive] = useState(false);
    const [isEditModeWasOn, setIsEditModeWasOn] = useState(false)
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
    const [studentEducationType, setStudentEducationType] = useState(null)

    const navigate = useNavigate()

    const studentId = useParams().id
    useEffect(() => {
        getStudentsByIdArray([studentId])
            .then(result => {
                setStudentEducationType(result[0].education_type)

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
                setStudentData(result[0])
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 250)
            })
    }, [loading, studentId])

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
    }, [isEditModeWasOn])

    const formRef = useRef(null);
    const handleSubmit = (e) => {
        setIsEditModeWasOn(false)
        e.preventDefault();
        let formData = new FormData(formRef.current)
        const dataToSave = {};
        formData.forEach((value, key) => (dataToSave[key] = value))

        changeStudentData(dataToSave, studentId, navigate, studentEducationType)
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
                                <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text"
                                           name='latin_name' margin='normal' disabled={editMode}
                                           required size="small" sx={{width: "325px"}}
                                           defaultValue={studentData.latin_name}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text"
                                           name='russian_name' margin='normal' disabled={editMode}
                                           defaultValue={studentData.russian_name}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Контактный телефон студента" variant="outlined" color="warning"
                                           type="tel"
                                           name='contact_phone_number' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.contact_phone_number}/>
                                <TextField label="E-mail студента" variant="outlined" color="warning" type="email"
                                           name='student_email' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.student_email}/>
                                <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                           name='country' size="small" sx={{width: "325px"}} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.country}/>
                                <TextField label="Дата рождения" type="date" color="warning"
                                           name='birth_date' required margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           defaultValue={studentData.birth_date}/>
                                <TextField label="Место рождения" type="text" variant="outlined" color="warning"
                                           name='birth_place' margin='normal' disabled={editMode}
                                           defaultValue={studentData.birth_place}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Место проживания" type="text" variant="outlined" color="warning"
                                           name='residence_place' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.residence_place}/>
                                <TextField label="Гражданство" type="text" variant="outlined" color="warning"
                                           name='citizenship' margin='normal' disabled={editMode} size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.citizenship}/>
                                <TextField label="Пол" type="text" variant="outlined" color="warning" margin='normal'
                                           name='gender' required select size="small" InputLabelProps={textFieldStyle}
                                           disabled={editMode} defaultValue={studentData.gender}>
                                    <MenuItem sx={textFieldStyle} value="Мужской">
                                        <span style={listItemStyle}>Мужской</span>
                                    </MenuItem>
                                    <MenuItem sx={textFieldStyle} value="Женский">
                                        <span style={listItemStyle}>Женский</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Куратор" type="text" variant="outlined" color="warning"
                                           margin='normal'
                                           name='tutor_name' size="small" disabled={editMode}
                                           defaultValue={studentData.tutor_name}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Контактные данные агента</p>
                                <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                           name='agent_name' margin='normal' disabled={editMode}
                                           defaultValue={studentData.agent_name}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                           name='agent_phone_number' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.agent_phone_number}/>
                                <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                           name='agent_email' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.agent_email}/>
                                <p className="title_contract_doc"> Контактные данные представителя</p>
                                <TextField label="Ф.И.О." variant="outlined" color="warning" type="text"
                                           name='representative_name' margin='normal' disabled={editMode}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.representative_name}/>
                                <TextField label="Телефон" variant="outlined" color="warning" type="tel"
                                           name='representative_phone_number' margin='normal' size="small"
                                           disabled={editMode} defaultValue={studentData.representative_phone_number}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="E-mail" variant="outlined" color="warning" type="email"
                                           name='representative_email' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.representative_email}/>

                                <p className="title_contract_doc"> Данные о местоположении </p>
                                <TextField label="Нахождение в РФ" type="text" variant="outlined" color="warning"
                                           name='RF_location' margin='normal' select size="small"
                                           InputLabelProps={textFieldStyle} defaultValue={studentData.RF_location}
                                           disabled={editMode}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Дата въезда" type="date" color="warning"
                                           defaultValue={studentData.entry_date}
                                           name='entry_date' margin='normal' size="small" sx={{width: "325px"}}
                                           inputProps={textFieldStyle} disabled={editMode}
                                           InputLabelProps={dateTextFieldStyle}/>
                            </div>
                        </div>
                    </div>

                    <div className="info_and_education_container">
                        <p className="title_contract_section"> Образование </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Полученный уровень образования</p>
                                <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                           name='level_education' color="warning" margin='normal' disabled={editMode}
                                           size="small" sx={{width: "325px"}} defaultValue={studentData.level_education}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Образовательная организация" type="text" variant="outlined"
                                           name='educational_organization' color="warning" disabled={editMode}
                                           margin='normal' size="small"
                                           defaultValue={studentData.educational_organization}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                           name='name_educational_institution' color="warning" margin='normal'
                                           size="small" disabled={editMode}
                                           defaultValue={studentData.name_educational_institution}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                           name='location_educational_institution' color="warning" margin='normal'
                                           size="small" defaultValue={studentData.location_educational_institution}
                                           disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Область образования" type="text" variant="outlined" color="warning"
                                           name='education_field' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.education_field}/>
                                <TextField label="Год окончания" type="text" variant="outlined" color="warning"
                                           name='graduation_year' margin='normal' disabled={editMode}
                                           defaultValue={studentData.graduation_year}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Дополнительно </p>
                                <TextField label="Примечания" type="text" variant="outlined" color="warning"
                                           margin='normal'
                                           name='comments' size="small" multiline rows={5} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.comments}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Уровень получаемого образования </p>
                                <TextField label="Статус зачисления" type="text" variant="outlined" color="warning"
                                           name='enrollment' margin='normal' size="small" select sx={{width: "325px"}}
                                           InputLabelProps={textFieldStyle} disabled={editMode}
                                           defaultValue={studentData.enrollment}>
                                    <MenuItem value="Зачислен">
                                        <span style={listItemStyle}>Зачислен</span>
                                    </MenuItem>
                                    <MenuItem value="Не зачислен">
                                        <span style={listItemStyle}>Не зачислен</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Уровень желаемого образования" type="text" variant="outlined"
                                           color="warning" disabled={editMode}
                                           defaultValue={studentData.desired_education_level}
                                           name='desired_education_level' margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Форма обучения" type="text" variant="outlined" color="warning"
                                           name='form_study' margin='normal' disabled={editMode} size="small" select
                                           InputLabelProps={textFieldStyle} defaultValue={studentData.form_study}>
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
                                <TextField label="Тип обучения" type="text" variant="outlined" color="error"
                                           margin='normal'
                                           name='education_type' size="small" required select focused
                                           disabled={editMode}
                                           InputLabelProps={textFieldStyle} defaultValue={studentData.education_type}>
                                    <MenuItem value="Контракт">
                                        <span style={listItemStyle}>Контракт</span>
                                    </MenuItem>
                                    <MenuItem value="Квота">
                                        <span style={listItemStyle}>Квота</span>
                                    </MenuItem>
                                </TextField>
                                <TextField label="Номер приказа о зачислении" type="text" variant="outlined"
                                           color="warning"
                                           name='enrollment_order' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.enrollment_order}/>
                                <TextField label="Номер приказа об отчислении" type="text" variant="outlined"
                                           name='expulsion_order' color="warning" disabled={editMode} margin='normal'
                                           size="small" defaultValue={studentData.expulsion_order}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Код направления подготовки (специальности)" type="text"
                                           variant="outlined"
                                           name='specialty_code' color="warning" margin='normal' size="small"
                                           disabled={editMode} defaultValue={studentData.specialty_code}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Направление подготовки (специальность)" type="text" variant="outlined"
                                           name='specialty_direction' color="warning" margin='normal' size="small"
                                           disabled={editMode} defaultValue={studentData.specialty_direction}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Стипендия" type="text" variant="outlined" color="warning"
                                           name='scholarship' margin='normal' select size="small" disabled={editMode}
                                           InputLabelProps={textFieldStyle} defaultValue={studentData.scholarship}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </div>
                    <div className="info_and_education_container">
                        <p className="title_contract_section"> Документы </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Паспортные данные</p>
                                <TextField label="Номер паспорта" type="text" variant="outlined" color="warning"
                                           name='passport_number' margin='normal' disabled={editMode}
                                           defaultValue={studentData.passport_number} sx={{width: "325px"}}
                                           required size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Срок действия паспорта" type="date" color="warning"
                                           defaultValue={studentData.passport_expiration}
                                           name='passport_expiration' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Кем выдан" type="text" variant="outlined" color="warning"
                                           margin='normal' name='passport_issued' size="small" disabled={editMode}
                                           defaultValue={studentData.passport_issued}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                                <TextField label="Дата выдачи" type="date" color="warning" margin='normal' size="small"
                                           name='passport_issue_date' disabled={editMode}
                                           defaultValue={studentData.passport_issue_date}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Даты</p>
                                <TextField label="Срок действия визы" type="date" color="warning"
                                           defaultValue={studentData.visa_validity}
                                           name='visa_validity' margin='normal' size="small" sx={{width: "325px"}}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           disabled={editMode}/>
                                <TextField label="Дата передачи в международную службу" type="date" color="warning"
                                           name='transfer_to_international_service' margin='normal' size="small"
                                           sx={{width: "325px"}}
                                           defaultValue={studentData.transfer_to_international_service}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           disabled={editMode}/>
                                <TextField label="Дата передачи в МВД" type="date" color="warning"
                                           defaultValue={studentData.transfer_to_MVD}
                                           name='transfer_to_MVD' margin='normal' size="small" sx={{width: "325px"}}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           disabled={editMode}/>
                                <TextField label="Ориентировочная дата получения" type="date" color="warning"
                                           defaultValue={studentData.estimated_receipt_date}
                                           name='estimated_receipt_date' margin='normal' size="small"
                                           sx={{width: "325px"}}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           disabled={editMode}/>
                                <TextField label="Фактическая дата получения приглашения" type="date" color="warning"
                                           name='actual_receipt_date_invitation' margin='normal' size="small"
                                           sx={{width: "325px"}}
                                           defaultValue={studentData.actual_receipt_date_invitation}
                                           inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}
                                           disabled={editMode}/>
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
                                  studentEmail={[{
                                      id: studentData.id,
                                      education_type: studentData.education_type,
                                      email: studentData.student_email
                                  }]}/>
                    <CreateTaskModalWindow active={modalMessageActive} setActive={setModalMessageActive}
                                           singleId={[studentId]} emails={[studentData.student_email]}/>
                    <ModalFile active={modalFileActive} setActive={setModalFileActive} studentId={studentId}/>
            </>
    )
}
