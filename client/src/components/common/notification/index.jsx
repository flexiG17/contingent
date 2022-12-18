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

let notifications = []

// страница для отображения задач и работы с ними. Никак не рализован поиск и пагинация

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
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell>
                        <CheckIcon className="icon_button" aria-label="expand row" size="small" onClick={() => {
                            handleOpen()
                        }}/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.type}
                    </TableCell>
                    <TableCell align="right">
                        <button onClick={() => setActiveTaskCardModel(true)}
                        >Ссылка
                        </button>
                    </TableCell>
                    <TableCell align="right">{row.students_id !== null && row.students_id.length}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.comment}</TableCell>
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
    const [loading, setLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        getNotifications()
            .then(items => setNotificationList(items.reverse()))
            .finally(() => setLoading(false))
    }, [])

    notifications = notificationList
    notifications.map(item => {
        item.date = moment(item.date).format("YYYY-MM-DD")
    })

    console.log(notifications);
    return (
        <>
            <div className="notification_navbar">
                <button
                    onClick={() => setModalActive(true)}
                    className="add_notification_button"> Добавить
                    задачу <AddIcon/></button>
            </div>
            <CreateTaskModalWindow active={modalActive} setActive={setModalActive}/>
            <TableContainer component={Paper}
                            sx={{width: '800px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Тип</TableCell>
                            <TableCell align="right">Задача</TableCell>
                            <TableCell align="right">Cтуденты</TableCell>
                            <TableCell align="right">Дата</TableCell>
                            <TableCell align="right">Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map((row) => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

/*

<Link
    to={row.russian_name !== '' ? ADD_STUDENT_NOTIFICATION_ROUTE : ADD_NOTIFICATION_ROUTE}
    state={[row, {
        type: 'update',
        button: 'Изменить',
        message: 'Вы уверены, что хотите изменить уведомление?',
    }]}
    style={{textDecoration: 'none', color: 'black'}}

> <button onClick={()=> setModalActive(true)}>Ссылка </button>
</Link>*/
