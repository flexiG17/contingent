import React, {useState} from "react"
import './Modal.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {List, ListItemButton, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import jwt_decode from "jwt-decode";
import {getToken} from "../../../utils/token";
import {createNotification, updateNotification} from "../../../actions/notification";
import {useNavigate} from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from "@mui/material/Tooltip";
import ModalMessage from "../MessageModal";
import {getStudentsByIdArray} from "../../../actions/student";


function FixedSizeList(props: { sx: { bgcolor: (string), borderRadius: string }, children: ReactNode }) {
    return null;
}

const TaskCard = ({active, setActive, taskData}) => {
    const [activeClick, setActiveClick] = useState(true);
    const [type, setType] = useState(taskData.type)
    const [date, setDate] = useState(taskData.date)
    const [comment, setComment] = useState(taskData.comment)
    const [status, setStatus] = useState(taskData.completed)
    const [open, setOpen] = useState(false);
    const [modalMessageActive, setModalMessageActive] = useState(false);

    const navigate = useNavigate()
    const handleClickContract = () => {
        setActiveClick(!activeClick)
    }

    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }

    const userId = jwt_decode(getToken()).userId
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            type: type,
            students_id: taskData.students_id,
            date: date,
            comment: comment,
            completed: status,
            user_id: userId
        }
        createNotification(data, navigate)
            .then(() => {
                window.location.reload()
            })
    }

    const data = [];

    taskData.students_id !== null && taskData.students_id.map(id => {
        data.push({id: id})
    })

    if (active && taskData.students_id !== null) {
        console.log(taskData.students_id);
        getStudentsByIdArray(taskData.students_id)
            .then(a => {
                console.log(a);
            })
    }

    return (
        <>
            <ModalMessage active={modalMessageActive} setActive={setModalMessageActive} studentEmail={[]}/>

            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <p className="title_addNotification">Карточка задачи</p>
                    <form className="container_addNotification" onSubmit={handleSubmit}>
                        <Box sx={{'& > :not(style)': {mt: 1, ml: 2, width: '25ch'}}}>
                            <TextField
                                sx={{'& > :not(style)': {mb: "15px", width: '30ch'}}}
                                label="Тип задачи" type="text" variant="outlined" color="warning"
                                focused select InputLabelProps={propsStyle}
                                onChange={event => setType(event.target.value)} value={type}>
                                <MenuItem sx={propsStyle} value="Звонок">
                                    <span style={propsStyle.style}>Звонок</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="E-mail">
                                    <span style={propsStyle.style}>E-mail</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Напоминание">
                                    <span style={propsStyle.style}>Напоминание</span>
                                </MenuItem>
                            </TextField>
                            {taskData.students_id !== null &&
                                <div className={'template_in_row_with_icon'}>
                                    <Box
                                        sx={{
                                            bgcolor: open ? '#FFB953' : '#FFAA2D',
                                            borderRadius: '5px',
                                            maxHeight: 170,
                                            maxWidth: 220,
                                            overflowY: 'scroll'
                                        }}
                                    >
                                        <ListItemButton
                                            alignItems="flex-start"
                                            onClick={() => setOpen(!open)}
                                            sx={{
                                                px: 3,
                                                pl: -10,
                                                pb: open ? 0 : 2.5,
                                                '&:hover, &:focus': {'& svg': {opacity: open ? 1 : 0}},
                                                height: '55px',
                                            }}
                                        >
                                            <ListItemText
                                                primary={`Список студентов в задаче (кол-во ${data.length})`}
                                                primaryTypographyProps={propsStyle}
                                                sx={{my: 0}}
                                            />
                                        </ListItemButton>
                                        {open &&
                                            data.map((item) => (
                                                <ListItemButton
                                                    key={item.id}
                                                    sx={{
                                                        background: '#FFD89D',
                                                        pt: '5px',
                                                        pb: '5px'
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={item.id}
                                                        primaryTypographyProps={{
                                                            fontSize: 14,
                                                            fontFamily: ['Montserrat'],
                                                            fontWeight: '450'
                                                        }}
                                                    />
                                                </ListItemButton>
                                            ))}
                                    </Box>
                                    <Tooltip title="Рассылка указанным студентам">
                                        <MailOutlineIcon
                                            sx={{cursor: 'pointer', marginTop: '15px', marginLeft: '15px'}}
                                            onClick={() => {
                                                setModalMessageActive(true)
                                                setActive(false)
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            }
                            <TextField
                                label="Дата" type="date" color="warning" focused inputProps={propsStyle}
                                InputLabelProps={propsStyle} onChange={event => setDate(event.target.value)} value={date}
                                sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}/>
                            <TextField
                                sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}
                                label="Статус" type="text" variant="outlined" color="warning"
                                focused select InputLabelProps={propsStyle}
                                onChange={event => setStatus(event.target.value)} value={status}>
                                <MenuItem sx={propsStyle} value="Запланировано">
                                    <span style={propsStyle.style}>Запланировано</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="В работе"> <span
                                    style={propsStyle.style}>В работе</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Отложено"> <span
                                    style={propsStyle.style}>Отложено</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Просрочено"> <span
                                    style={propsStyle.style}>Просрочено</span>
                                </MenuItem>
                                <MenuItem sx={propsStyle} value="Выполнено"> <span
                                    style={propsStyle.style}>Выполнено</span>
                                </MenuItem>
                            </TextField>
                            <TextField
                                sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}
                                label="Примечания" variant="outlined" color="warning" multiline rows={3}
                                focused inputProps={propsStyle} InputLabelProps={propsStyle}
                                onChange={event => setComment(event.target.value)} value={comment}/>
                        </Box>
                        <label className="checkbox_style_notification">
                            <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите изменить?
                        </label>
                        <div className="button_position_notification">
                            <button type="submit" className="button_style_contract_doc"
                                    disabled={activeClick}>Изменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TaskCard;