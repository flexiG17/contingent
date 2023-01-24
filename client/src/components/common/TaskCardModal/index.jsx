import React, {useEffect, useState} from "react"
import './Modal.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Button,
    CircularProgress, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemButton,
    ListItemText,
    MenuItem
} from "@mui/material";
import jwt_decode from "jwt-decode";
import {getToken} from "../../../utils/token";
import {updateNotification} from "../../../actions/notification";
import {Link, useNavigate} from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from "@mui/material/Tooltip";
import ModalMessage from "../MessageModal";
import {getStudentsByIdArray} from "../../../actions/student";
import {lineStyleInTable, listItemStyle, textFieldStyle} from "../../../utils/consts/styles";
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const TaskCard = ({active, setActive, taskData}) => {
    const [activeClick, setActiveClick] = useState(true);
    const [firstRender, setFirstRender] = useState(false)
    const [type, setType] = useState(taskData.type);
    const [date, setDate] = useState(taskData.date);
    const [comment, setComment] = useState(taskData.comment);
    const [status, setStatus] = useState(taskData.completed);
    const [openListStudents, setOpenListStudents] = useState(false);
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const [studentsInCard, setStudentsInCard] = useState([]);
    const [studentEmails, setStudentEmails] = useState([]);
    const [studentsToSave, setStudentsToSave] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStudent, setCurrentStudent] = useState(null)

    const navigate = useNavigate()
    const handleClickContract = () => {
        setActiveClick(!activeClick)
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const userId = jwt_decode(getToken()).userId
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToUpdate = {
            type: type,
            students_id: studentsToSave.map(std => std.id),
            date: date,
            comment: comment,
            completed: status,
            user_id: userId
        }
        updateNotification(taskData.id, dataToUpdate, navigate)
    }

    useEffect(() => {
        if (active && taskData.students_id !== null && !firstRender) {
            setLoading(true);
            setFirstRender(true)
            getStudentsByIdArray(taskData.students_id)
                .then(students => {
                    setStudentsInCard(students)

                    students.map(student => {
                        studentsToSave.push({
                            id: student.id,
                            latin_name: student.latin_name,
                            student_email: student.student_email,
                            education_type: student.education_type
                        })
                    })
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [active])

    return (
        <>
            {modalMessageActive && <ModalMessage active={modalMessageActive} setActive={setModalMessageActive}
                                                 studentEmail={studentEmails}/>}

            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <p className="title_addNotification">Карточка задачи</p>
                    <form className="container_addNotification" onSubmit={handleSubmit}>
                        <div className='textFields_position'>
                            <TextField
                                sx={{'& > :not(style)': {mb: 2, width: '30ch'}}}
                                label="Тип задачи" type="text" variant="outlined" color="warning"
                                focused select InputLabelProps={textFieldStyle}
                                onChange={event => setType(event.target.value)} value={type}>
                                <MenuItem value="Звонок">
                                    <span style={listItemStyle}>Звонок</span>
                                </MenuItem>
                                <MenuItem value="E-mail">
                                    <span style={listItemStyle}>E-mail</span>
                                </MenuItem>
                                <MenuItem value="Напоминание">
                                    <span style={listItemStyle}>Напоминание</span>
                                </MenuItem>
                            </TextField>
                            {taskData.students_id !== null &&
                                <div className='template_in_row_with_icon'>
                                    <Box
                                        sx={{
                                            bgcolor: openListStudents ? '#FFB953' : '#FFAA2D',
                                            borderRadius: '5px',
                                            maxHeight: 170,
                                            maxWidth: taskData.type === 'E-mail' ? 220 : 270,
                                            overflowY: openListStudents ? 'scroll' : 'visible',
                                            mt: 0.5,
                                            mb: 1
                                        }}
                                    >
                                        <ListItemButton
                                            alignItems="flex-start"
                                            onClick={() => setOpenListStudents(!openListStudents)}
                                            sx={{
                                                px: 3,
                                                pl: -10,
                                                pb: openListStudents ? 0 : 2.5,
                                                '&:hover, &:focus': {'& svg': {opacity: openListStudents ? 1 : 0}},
                                                height: '55px'
                                            }}
                                        >
                                            <ListItemText
                                                primary={`Список студентов в задаче (${studentsToSave.length} чел.)`}
                                                primaryTypographyProps={textFieldStyle}
                                                sx={{my: 0}}
                                            />
                                        </ListItemButton>
                                        {openListStudents &&
                                            studentsToSave.map((item) => (
                                                <ListItemButton
                                                    key={item.id}
                                                    sx={{
                                                        background: '#FFD89D',
                                                        pt: '10px',
                                                        pb: '10px'
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${item.education_type === "Контракт" ? 'contract' : 'quota'}/${item.id}`}
                                                        target="_blank" style={lineStyleInTable}
                                                    >
                                                        {item.latin_name}
                                                    </Link>

                                                    <Tooltip title='Убрать студента из списка'>
                                                        <DoDisturbAltIcon
                                                            sx={{ml: 'auto', cursor: 'pointer'}}
                                                            onClick={() => {
                                                                setCurrentStudent(item)
                                                                setOpen(true)
                                                            }}/>
                                                    </Tooltip>
                                                </ListItemButton>
                                            ))}
                                    </Box>

                                    {type === 'E-mail'
                                        ?
                                        loading
                                            ?
                                            <CircularProgress color="warning" sx={{ml: '10px', mt: '10px'}}/>
                                            :
                                            <Tooltip title="Рассылка указанным студентам">
                                                <MailOutlineIcon
                                                    sx={{cursor: 'pointer', marginTop: '15px', marginLeft: '15px'}}
                                                    onClick={() => {
                                                        setStudentEmails(studentsToSave.map(student => {
                                                            return {
                                                                id: student.id,
                                                                education_type: student.education_type,
                                                                email: student.student_email
                                                            }
                                                        }));
                                                        setModalMessageActive(true);
                                                        setActive(false);
                                                    }}
                                                />
                                            </Tooltip>
                                        : ''}
                                </div>
                            }
                            <TextField
                                label="Дата" type="date" color="warning" focused inputProps={textFieldStyle}
                                InputLabelProps={textFieldStyle} onChange={event => setDate(event.target.value)}
                                value={date}
                                sx={{'& > :not(style)': {mt: 2, mb: 2, width: '30ch'}}}/>
                            <TextField
                                sx={{'& > :not(style)': {mt: 2, mb: 2, width: '30ch'}}}
                                label="Статус" type="text" variant="outlined" color="warning"
                                focused select InputLabelProps={textFieldStyle}
                                onChange={event => setStatus(event.target.value)} value={status}>
                                <MenuItem sx={textFieldStyle} value="Запланировано">
                                    <span style={textFieldStyle.style}>Запланировано</span>
                                </MenuItem>
                                <MenuItem sx={textFieldStyle} value="В работе"> <span
                                    style={textFieldStyle.style}>В работе</span>
                                </MenuItem>
                                <MenuItem sx={textFieldStyle} value="Отложено"> <span
                                    style={textFieldStyle.style}>Отложено</span>
                                </MenuItem>
                                <MenuItem sx={textFieldStyle} value="Просрочено"> <span
                                    style={textFieldStyle.style}>Просрочено</span>
                                </MenuItem>
                                <MenuItem sx={textFieldStyle} value="Выполнено"> <span
                                    style={textFieldStyle.style}>Выполнено</span>
                                </MenuItem>
                            </TextField>
                            <TextField
                                sx={{'& > :not(style)': {mt: 2, mb: 2, width: '30ch'}}}
                                label="Примечания" variant="outlined" color="warning" multiline rows={3}
                                focused inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                onChange={event => setComment(event.target.value)} value={comment}/>
                        </div>
                        <label className="checkbox_style_notification">
                            <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить?
                        </label>
                        <div className="button_position_notification">
                            <button type="submit" className="button_style_contract_doc"
                                    disabled={activeClick}>Изменить
                            </button>
                        </div>
                    </form>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Редактирование списка</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Вы уверены, что хотите убрать выбранного студента из списка задачи?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                const index = studentsToSave.map(std => std.id).indexOf(currentStudent.id)
                                studentsToSave.splice(index, 1)
                                setOpen(false)
                            }
                            }>Да</Button>
                            <Button onClick={() => {
                                setOpen(false)
                            }
                            }>Нет</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default TaskCard;