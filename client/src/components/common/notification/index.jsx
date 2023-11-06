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
import TaskFilter from "../TaskFilter";

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
                <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Montserrat'}}>Удаление задачи</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{fontFamily: 'Montserrat'}}>
                        Изменить статус задачи на "Выполнено" и удалить её?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{fontFamily: 'Montserrat', color: "#000"}}
                        onClick={() => {
                        removeNotification([row.id])
                        setOpen(false)
                    }
                    }>Да</Button>
                    <Button
                        sx={{fontFamily: 'Montserrat', color: "#000"}}
                        onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
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
                    sx={{
                        borderRadius: '10px', ...(row.completed === 'Просрочено' && {backgroundColor: '#FFF2ED'}),
                        fontFamily: ['Montserrat'], fontSize: '14px'
                    }}>
                    {row.completed}
                </TableCell>
                <TableCell align="center">
                    <Button
                        style={{
                            borderRadius: 35,
                            color: 'black',
                            borderColor: "#FA7A45",
                            fontSize: "12px",
                            fontFamily: ['Montserrat'],
                            fontWeight: '450'
                        }}
                        variant="outlined"
                        size='small'
                        onClick={() => setActiveTaskCardModel(true)}>Ссылка</Button>
                </TableCell>
                <TableCell align="left" sx={{whiteSpace: 'nowrap', fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>
                    {moment(row.date).locale('ru').format("ll")}
                </TableCell>
                <TableCell align="right"
                           sx={lineStyleInTable}>{row.students_id !== null && row.students_id.length}</TableCell>
                <TableCell align="right" sx={lineStyleInTable}>
                    {row.comment}
                </TableCell>
            </TableRow>
            <TableRow sx={{'& > *': {background: "#FFF2ED"}}}>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function CollapsibleTable() {
    const [notificationList, setNotificationList] = useState([]);
    const [modalActive, setModalActive] = useState(false);

    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        getNotifications()
            .then(items => {
                items.map(item => {
                    item.date = new Date(item.date)
                })
                items.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : ((b.date.getTime() < a.date.getTime()) ? -1 : 0)).reverse()
                items.map(item => {
                    const date = new Date(item.date)
                    const offset = date.getTimezoneOffset()
                    item.date = new Date(date.getTime() - (offset*60*1000)).toISOString().split('T')[0]
                })
                setNotificationList(items)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const multiFilter = (item) => {
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            if (item[filter.param.value] === undefined) return false;
            switch (filter.operator) {
                case "coincidence":
                    if (
                        !String(item[filter.param.value])
                            .toLowerCase()
                            .includes(filter.value.toLowerCase())
                    )
                        return false;
                    break;
                case "equals":
                    const tmp1 = new Date(item[filter.param.value]);
                    const tmp2 = new Date(filter.value);
                    if (filter.param.type === 'date' && tmp1.getTime() !== tmp2.getTime()) {
                        return false;
                    } else if (item[filter.param.value] === Number(filter.value)) {
                        return false;
                    }
                    break;
                case "less":
                    if (filter.param.type === 'date' && new Date(item[filter.param.value]) >= new Date(filter.value)) {
                        return false;
                    } else if (item[filter.param.value] >= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "lessE":
                    if (filter.param.type === 'date' && new Date(item[filter.param.value]) > new Date(filter.value)) {
                        return false;
                    } else if (item[filter.param.value] > Number(filter.value)) {
                        return false;
                    }
                    break;
                case "more":
                    if (filter.param.type === 'date' && new Date(item[filter.param.value]) <= new Date(filter.value)) {
                        return false;
                    } else if (item[filter.param.value] <= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "moreE":
                    if (filter.param.type === 'date' && new Date(item[filter.param.value]) < new Date(filter.value)) {
                        return false;
                    } else if (item[filter.param.value] < Number(filter.value)) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
        return true;
    };

    const filteredValues = notificationList.filter(row => {
        return multiFilter(row);
    });

    return (
        <>
            <CreateTaskModalWindow active={modalActive} setActive={setModalActive}/>
            <div className="notification_navbar">
                <button
                    onClick={() => setModalActive(true)}
                    className="add_notification_button"> Добавить задачу <AddIcon/>
                </button>
                {!loading && <TaskFilter filters={filters} setFilters={setFilters}/>}
            </div>
            <TableContainer component={Paper}
                            sx={{width: '850px', ml: 'auto', mr: 'auto', mt: '30px', mb: '30px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell sx={textFieldStyle.style}>Тип</TableCell>
                            <TableCell align="center" sx={textFieldStyle.style}>Статус</TableCell>
                            <TableCell align="center" sx={textFieldStyle.style}>Задача</TableCell>
                            <TableCell align="left" sx={textFieldStyle.style}>Дата</TableCell>
                            <TableCell align="right" sx={textFieldStyle.style}>Cтуденты</TableCell>
                            <TableCell align="right" sx={textFieldStyle.style}>Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredValues.map((row) => (
                            <Row key={row.id} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
