import * as React from 'react';
import {Header} from "../../components/common";
import './AddStudentNotification.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {createNotification, removeNotification, updateNotification} from "../../actions/notification";
import iziToast from "izitoast";
import { NOTIFICATION_ROUTE} from "../../utils/consts";
import jwt_decode from 'jwt-decode'
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const propsStyle = {
    style:
        {
            fontSize: "14.5px",
            fontFamily: ['Montserrat'],
            fontWeight: '450'
        }
}

let inputData = ''
let navigate = ''

function TurnOnSpeedDial() {

    // при нажатии на кнопку открывается диалоговое окно с подтверждением удаления
    const actions = [
        {
            icon: <DeleteOutlineIcon/>,
            name: 'Удалить уведомление',
            runFunction: () => {
                setOpenDialogWindow(true)
            }
        },
    ];

    const [isDialogWindowOpen, setOpenDialogWindow] = useState(false)
    return (
        <>
            {inputData.user_id !== undefined &&
                <>
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
                    <Dialog
                        open={isDialogWindowOpen}
                        onClose={() => setOpenDialogWindow(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Удаление студента</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Вы уверены, что хотите удалить уведомление?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                removeNotification(inputData.id)
                                    .then(res => {
                                        res.json()
                                            .then(answer => {
                                                switch (res.status) {
                                                    case 200: {
                                                        iziToast.success({
                                                            title: res.statusText,
                                                            message: `${answer}. Обновляю страницу :)`,
                                                            position: "topRight"
                                                        });
                                                        setTimeout(() => {
                                                            navigate(NOTIFICATION_ROUTE)
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
                                    })
                                setOpenDialogWindow(false)
                            }
                            }>Да</Button>
                            <Button onClick={() => {
                                setOpenDialogWindow(false)
                            }
                            }>Нет</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </>
    )
}

export default function AddStudentNotification() {
    const location = useLocation();
    navigate = useNavigate();

    const data = location.state
    let inputPageData = data[1];
    [inputData] = data;
    const [active, setActive] = useState(true);
    const [date, setDate] = useState(inputData.date === undefined ? '' : inputData.date)
    const [type, setType] = useState(inputData.type === undefined ? '' : inputData.type)
    const [status, setStatus] = useState(inputData.status === undefined ? '' : inputData.status)
    const [comment, setComment] = useState(inputData.comment === undefined ? '' : inputData.comment)

    const handleClickContract = () => {
        setActive(!active)
    }
    if (status === 'Выполнено') {
        inputPageData.button = "Удалить"
        inputPageData.message = "Вы уверены, что хотите удалить уведомление?"
    } else if (status === 'Не выполнено') {
        if (inputPageData.type === 'create'){
            inputPageData.button = 'Добавить'
            inputPageData.message = 'Вы уверены, что хотите создать уведомление?'
        } else if (inputPageData.type === 'update'){
            inputPageData.button = 'Изменить'
            inputPageData.message = 'Вы уверены, что хотите изменить уведомление?'
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            type: type,
            russian_name: inputData.russian_name,
            student_id: inputData.student_id,
            date: date,
            comment: comment,
            status: status,
        }
        inputPageData.type === 'create' ?
            createNotification(data)
                .then((res) => {
                    switch (res.status) {
                        case 200: {
                            iziToast.success({
                                title: res.statusText,
                                message: 'Уведомление успешно создано',
                                position: "topRight"
                            });
                            setTimeout(() => {
                                navigate(NOTIFICATION_ROUTE)
                            }, 1000)
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
                }) :
            updateNotification(inputData.id, data).then((res) => {
                switch (res.status) {
                    case 200: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Уведомление успешно изменено',
                            position: "topRight"
                        });
                        setTimeout(() => {
                            navigate(NOTIFICATION_ROUTE)
                        }, 1000)
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

    return (
        <>
            <Header/>
            <p className="title_addNotification">Добавить уведомление</p>

            <form className="container_addNotification" onSubmit={handleSubmit}>
                <Box component="form" sx={{'& > :not(style)': {mt: 1, ml: 2, width: '25ch'}}} noValidate
                     autoComplete="off">
                    <TextField
                        sx={{'& > :not(style)': {mb: "15px", width: '30ch'}}}
                        label="Тип уведомления" type="text" variant="outlined" color="warning"
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
                    <TextField
                        sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}
                        label="Имя студента" variant="outlined" color="warning" focused
                        inputProps={propsStyle}
                        InputLabelProps={propsStyle}
                        disabled value={inputData.russian_name}/>
                    <TextField
                        label="Дата" type="date" color="warning" focused inputProps={propsStyle}
                        InputLabelProps={propsStyle} onChange={event => setDate(event.target.value)} value={date}
                        sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}/>
                    <TextField
                        sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}
                        label="Статус" type="text" variant="outlined" color="warning"
                        focused select InputLabelProps={propsStyle}
                        onChange={event => setStatus(event.target.value)} value={status}>
                        <MenuItem sx={propsStyle} value="Выполнено"> <span style={propsStyle.style}>Выполнено</span>
                        </MenuItem>
                        <MenuItem sx={propsStyle} value="Не выполнено"> <span
                            style={propsStyle.style}>Не выполнено</span>
                        </MenuItem>
                    </TextField>
                    <TextField
                        sx={{'& > :not(style)': {mt: "15px", mb: "15px", width: '30ch'}}}
                        label="Примечания" variant="outlined" color="warning" multiline rows={3}
                        focused inputProps={propsStyle} InputLabelProps={propsStyle}
                        onChange={event => setComment(event.target.value)} value={comment}/>
                </Box>
                <label className="checkbox_style_notification">
                    <input type="checkbox" onClick={handleClickContract}/>{inputPageData.message}
                </label>
                <div className="button_position_notification">
                    <button type="submit" className="button_style_contract_doc"
                            disabled={active}>{inputPageData.button}</button>
                </div>
            </form>

            {TurnOnSpeedDial()}
        </>
    )
}