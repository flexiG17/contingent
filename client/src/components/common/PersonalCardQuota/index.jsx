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
    DialogTitle, LinearProgress,
    MenuItem,
    SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider
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
import {textFieldStyle, dateTextFieldStyle, listItemStyle, systemColor} from "../../../utils/consts/styles";
import moment from "moment";
import CustomSingleDatePicker from "../../datePicker";

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
        if (studentData.first_student_email !== '')
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

    const [loadingRequest, setLoadingRequest] = useState(false)
    const [studentExpelled, setStudentExpelled] = useState('')
    const [RF_location, setRfLocation] = useState()

    const navigate = useNavigate()

    const studentId = useParams().id
    useEffect(() => {
        getStudentsByIdArray([studentId])
            .then(result => {
                setStudentEducationType(result[0].education_type)

                setStudentData(result[0])
                setRfLocation(result[0].RF_location)
                setStudentExpelled(result[0].enrollment)
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
        setLoadingRequest(true)

        e.preventDefault();

        let formData = new FormData(formRef.current)
        const dataToSave = {};
        formData.forEach((value, key) => (dataToSave[key] = value))
        dataToSave['date_creation'] = studentData.date_creation

        dataToSave.birth_date = dataToSave.birth_date.split('.').reverse().join('-')
        dataToSave.passport_issue_date = dataToSave.passport_issue_date.split('.').reverse().join('-');
        dataToSave.passport_expiration = dataToSave.passport_expiration.split('.').reverse().join('-');
        dataToSave.entry_date = dataToSave.entry_date.split('.').reverse().join('-');
        dataToSave.visa_validity = dataToSave.visa_validity.split('.').reverse().join('-');
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

    return (
        loading
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
                                <TextField label="Ф.И.О. (лат.)" variant="outlined" color="warning" type="text"
                                           name='latin_name' margin='normal' disabled={editMode}
                                           required size="small" sx={{width: "325px"}}
                                           defaultValue={studentData.latin_name}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Ф.И.О. (кир.)" variant="outlined" color="warning" type="text"
                                           name='russian_name' margin='normal' disabled={editMode}
                                           defaultValue={studentData.russian_name}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
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
                                <p className="title_contract_doc"> Контактные данные</p>
                                <TextField label="Контактный телефон студента" variant="outlined" color="warning"
                                           type="tel"
                                           name='contact_phone_number' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.contact_phone_number}/>
                                <TextField label="Первая эл. почта студента" variant="outlined" color="warning" type="email"
                                           name='first_student_email' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.first_student_email}/>
                                <TextField label="Вторая эл. почта студента" variant="outlined" color="warning" type="email"
                                           name='second_student_email' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.second_student_email}/>
                                <p className="title_contract_doc"> Учёба</p>
                                <TextField label="Местонахождение учебного заведения" type="text" variant="outlined"
                                           name='location_educational_institution' color="warning" margin='normal'
                                           size="small" defaultValue={studentData.location_educational_institution}
                                           disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Год окончания" type="text" variant="outlined" color="warning"
                                           name='graduation_year' margin='normal' disabled={editMode}
                                           defaultValue={studentData.graduation_year}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Уровень желаемого образования" type="text" variant="outlined"
                                           color="warning" disabled={editMode}
                                           defaultValue={studentData.desired_education_level}
                                           name='desired_education_level' margin='normal' size="small"
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
                                <TextField label="Область образования" type="text" variant="outlined" color="warning"
                                           name='education_field' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.education_field}/>
                                <TextField label="Образовательная организация" type="text" variant="outlined"
                                           name='educational_organization' color="warning" disabled={editMode}
                                           margin='normal' size="small"
                                           defaultValue={studentData.educational_organization}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Паспортные данные</p>
                                <TextField label="Страна" type="text" variant="outlined" color="warning" margin='normal'
                                           name='country' size="small" sx={{width: "325px"}} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.country}/>
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
                                <CustomSingleDatePicker
                                    name={"birth_date"}
                                    label={'Дата рождения'}
                                    defaultValue={studentData.birth_date}
                                    required={true}
                                    editMode={editMode}
                                    size={'default'}
                                    form='studentForm'
                                    isOpenCalendar={false}
                                />
                                <TextField label="Номер паспорта" type="text" variant="outlined" color="warning"
                                           name='passport_number' margin='normal' disabled={editMode}
                                           defaultValue={studentData.passport_number} sx={{width: "325px"}}
                                           required size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <CustomSingleDatePicker
                                    name={"passport_issue_date"}
                                    label={'Дата выдачи'}
                                    defaultValue={studentData.passport_issue_date}
                                    required={false}
                                    editMode={editMode}
                                    size={'default'}
                                    isOpenCalendar={false}
                                />
                                <CustomSingleDatePicker
                                    name={"passport_expiration"}
                                    label={'Срок действия'}
                                    defaultValue={studentData.passport_expiration}
                                    required={false}
                                    editMode={editMode}
                                    size={'default'}
                                    isOpenCalendar={false}
                                />
                                <TextField label="Кем выдан" type="text" variant="outlined" color="warning"
                                           margin='normal' name='passport_issued' size="small" disabled={editMode}
                                           defaultValue={studentData.passport_issued}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Данные о местоположении </p>
                                <TextField label="Место рождения" type="text" variant="outlined" color="warning"
                                           name='birth_place' margin='normal' disabled={editMode}
                                           defaultValue={studentData.birth_place}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Место проживания в РФ" type="text" variant="outlined" color="warning"
                                           name='residence_place' margin='normal' size="small" disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.residence_place}/>
                                <TextField label="Гражданство" type="text" variant="outlined" color="warning"
                                           name='citizenship' margin='normal' disabled={editMode} size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.citizenship}/>
                                <CustomSingleDatePicker
                                    name={"entry_date"}
                                    label={'Дата въезда'}
                                    defaultValue={studentData.entry_date}
                                    required={false}
                                    editMode={editMode}
                                    size={'default'}
                                />
                                <p className="title_contract_doc"> Начало обучения </p>
                                <TextField label="Приступил к обучению" name='started_learning' type="text"
                                           variant="outlined" defaultValue={studentData.started_learning} disabled={editMode}
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
                                    label={'Дата приступления к обучению'}
                                    defaultValue={studentData.date_started_learning}
                                    required={false}
                                    editMode={editMode}
                                    size={'default'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="info_and_education_container">
                        <p className="title_contract_section"> Образование студента</p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Уровень образования</p>
                                <TextField label="Уровень полученного образования" type="text" variant="outlined"
                                           name='level_education' color="warning" margin='normal' disabled={editMode}
                                           size="small" sx={{width: "325px"}} defaultValue={studentData.level_education}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Наименование учебного заведения" type="text" variant="outlined"
                                           name='name_educational_institution' color="warning" margin='normal'
                                           size="small" disabled={editMode}
                                           defaultValue={studentData.name_educational_institution}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <p className="title_contract_doc"> Нынешнее образование </p>
                                <TextField label="Рег. номер направления" name='direction_number' disabled={editMode}
                                           type="text" variant="outlined" color="warning" margin='normal' size="small"
                                           inputProps={textFieldStyle} defaultValue={studentData.direction_number}
                                           InputLabelProps={textFieldStyle}/>
                                <TextField label="Форма обучения" type="text" variant="outlined" color="warning"
                                           name='form_study' margin='normal' size="small" select disabled={editMode}
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
                                <p className="title_contract_doc"> Дополнительно </p>
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
                                <TextField label="Примечания" type="text" variant="outlined" color="warning"
                                           margin='normal'
                                           name='comments' size="small" multiline rows={5} disabled={editMode}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                           defaultValue={studentData.comments}/>
                                <TextField label="Дата создания" name='date_creation' type="text"
                                           variant="outlined"
                                           defaultValue={moment(new Date(studentData.date_creation)).format('DD.MM.YYYY')}
                                           color="warning" disabled={true} margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Кем создан" name='expulsion_order' type="text"
                                           variant="outlined" defaultValue={studentData.who_created}
                                           color="warning" disabled={true} margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            </div>
                            <div className="column_style_contract">
                                <p className="title_contract_doc"> Статус </p>
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
                                <TextField label="Куратор" type="text" variant="outlined" color="warning"
                                           margin='normal'
                                           name='tutor_name' size="small" disabled={editMode}
                                           defaultValue={studentData.tutor_name}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            </div>
                        </div>
                    </div>
                    <div className="info_and_education_container">
                        <p className="title_contract_section"> Основные даты </p>
                        <div className="columns_position">
                            <div className="column_style_contract">
                                <p className="title_contract_doc">Виза </p>
                                <CustomSingleDatePicker
                                    name={"visa_validity"}
                                    label={'Срок действия визы'}
                                    defaultValue={studentData.visa_validity}
                                    required={false}
                                    editMode={editMode}
                                    size={'default'}
                                />
                            </div>
                            <div className="column_style_contract">
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
