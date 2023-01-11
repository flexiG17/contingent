import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import {getNotifications, removeNotification} from "../../../actions/notification";
import AddIcon from "@mui/icons-material/Add";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import moment from "moment";
import './Calls.css'
import CreateTaskModalWindow from "../CreateTaskModal";
import TaskCard from "../TaskCardModal";
import {lineStyleInTable, textFieldStyle} from "../../../utils/consts/styles";

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [activeTaskCardModel, setActiveTaskCardModel] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TaskCard active={activeTaskCardModel} setActive={setActiveTaskCardModel} taskData={row}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление задачи</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Изменить статус задачи на "Выполнено" и удалить её?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeNotification([row.id])
                        setOpen(false)
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <CheckIcon className="icon_button" aria-label="expand row" size="small" onClick={() => {
                            handleOpen()
                        }}/>
                    </TableCell>
                    <TableCell scope="row" sx={lineStyleInTable}>{row.type} </TableCell>
                    <TableCell
                        scope="row"
                        align='center'
                        sx={{borderRadius: '10px', ...(row.completed === 'Просрочено' && {backgroundColor: '#FFF2ED'}),
                            fontFamily: ['Montserrat'], fontSize: '14px'
                        }}>
                        {row.completed}
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            style={{borderRadius: 35, color: 'black', borderColor: "#FA7A45", fontSize: "12px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                            variant="outlined"
                            size='small'
                            onClick={() => setActiveTaskCardModel(true)}>Ссылка</Button>
                    </TableCell>
                    <TableCell align="right" sx={lineStyleInTable}>{row.students_id !== null && row.students_id.length}</TableCell>
                    <TableCell align="left" sx={lineStyleInTable}>
                        {moment(row.date).locale('ru').format("ll")}
                    </TableCell>
                    <TableCell sx={{maxWidth: '130px'}} align="right" sx={lineStyleInTable}>
                        {row.comment}
                    </TableCell>
                </TableRow>
                <TableRow sx={{'& > *': {background: "#FFF2ED"}}}>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        </>
    );
}

export default function CollapsibleTable() {
    const [notificationList, setNotificationList] = useState([]);
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        getNotifications()
            .then(items => {
                items.map(item => {
                    item.date = new Date(item.date)
                })
                items.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : ((b.date.getTime() < a.date.getTime()) ? -1 : 0)).reverse()

                setNotificationList(items)
            })
    }, [])

    return (
        <>
            <div className="notification_navbar">
                <button
                    onClick={() => setModalActive(true)}
                    className="add_notification_button"> Добавить задачу <AddIcon/>
                </button>
            </div>
            <CreateTaskModalWindow active={modalActive} setActive={setModalActive}/>
            <TableContainer component={Paper}
                            sx={{width: '850px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell sx={textFieldStyle.style}>Тип</TableCell>
                            <TableCell align="center" sx={textFieldStyle.style}>Статус</TableCell>
                            <TableCell align="center" sx={textFieldStyle.style}>Задача</TableCell>
                            <TableCell align="right" sx={textFieldStyle.style}>Cтуденты</TableCell>
                            <TableCell align="left" sx={textFieldStyle.style}>Дата</TableCell>
                            <TableCell align="right" sx={textFieldStyle.style}>Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notificationList.map((row) => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
