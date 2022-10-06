import * as React from 'react';
import {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getNotifications, removeNotification} from "../../../actions/notification";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import moment from "moment";
import jwt_decode from 'jwt-decode'
import {
    ADD_NOTIFICATION_ROUTE,
    ADD_STUDENT_NOTIFICATION_ROUTE,
} from "../../../utils/consts";
import './Calls.css'
import iziToast from "izitoast";

let notifications = []

// страница для отображения уведомлений и работы с ними. Никак не рализован поиск и пагинация

function Row(props) {
    const {row} = props;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление уведомления</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить уведомление?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeNotification(row.id)
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
                                                    window.location.reload()
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
                        <IconButton aria-label="expand row" size="small" onClick={() => {
                            handleOpen()
                        }}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.type}
                    </TableCell>
                    <TableCell align="right">
                        <Link
                            to={row.russian_name !== '' ? ADD_STUDENT_NOTIFICATION_ROUTE : ADD_NOTIFICATION_ROUTE}
                            state={[row, {
                                type: 'update',
                                button: 'Изменить',
                                message: 'Вы уверены, что хотите изменить уведомление?',
                            }]}
                            style={{textDecoration: 'none', color: 'black'}}
                        >Ссылка
                        </Link>
                    </TableCell>
                    <TableCell align="right">{row.russian_name}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
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

    useEffect(() => {
        const userId = jwt_decode(localStorage.getItem('jwt')).userId
        getNotifications(userId)
            .then(items => setNotificationList(items.reverse()))
            .finally(() => setLoading(false))
    }, [])

    notifications = notificationList
    notifications.map(item => {
        item.date = moment(item.date).format("YYYY-MM-DD")
    })

    return (
        <>
            <div className="notification_navbar">
                {loading && <CircularProgress color="warning" sx={{ml: "490px"}}/>}
                <Link
                    to={ADD_NOTIFICATION_ROUTE}
                    state={[{}, {
                        type: 'create',
                        button: 'Добавить',
                        message: 'Вы уверены, что хотите создать уведомление?',
                    }]}
                    className="add_notification_button"> Добавить
                    уведомление <AddIcon/></Link>
                <div className="searchbar_position">
                    <div className="search_notification_input">
                        <div className="search_notification">
                            <input
                                type="text"
                                placeholder={"Введите данные для поиска..."}
                                onChange={(event => (event.target.value))}
                            />
                            <div className="searchIcon"><SearchIcon/></div>
                        </div>
                        <div className="dataResult"></div>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}
                            sx={{width: '1000px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Тип</TableCell>
                            <TableCell align="right">Уведомление</TableCell>
                            <TableCell align="right">Cтудент</TableCell>
                            <TableCell align="right">Дата</TableCell>
                            <TableCell align="right">Статус</TableCell>
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