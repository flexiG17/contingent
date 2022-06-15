import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getNotifications, getStudents} from "../../../services/serverData";
import {Link, NavLink} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import './Calls.css'
import {CircularProgress} from "@mui/material";

let notifications = []
let students = []

function Row(props) {
    const {row, currentStudent} = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.type}
                </TableCell>
                <TableCell align="right">{row.student_name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>
            </TableRow>
            <TableRow sx={{'& > *': {background: "#FFF2ED"}}}>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Тип обучения</TableCell>
                                        <TableCell>Страна</TableCell>
                                        <TableCell>Пол</TableCell>
                                        <TableCell align="right">Номер договора</TableCell>
                                        <TableCell align="right">Зачисление</TableCell>
                                        <TableCell align="right">Личная карточка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.id}>
                                        <TableCell component="th"
                                                   scope="row"> {currentStudent.education_type} </TableCell>
                                        <TableCell>{currentStudent.country}</TableCell>
                                        <TableCell>{currentStudent.gender}</TableCell>
                                        <TableCell align="right">{currentStudent.contract_number}</TableCell>
                                        <TableCell align="right">{currentStudent.enrollment}</TableCell>
                                        <TableCell align="right">
                                            <Link
                                                to={currentStudent.education_type === "Контракт" ? '/PersonalCardContract' : '/PersonalCardQuota'}
                                                state={currentStudent}
                                                style={{textDecoration: 'none'}}>Ссылка
                                            </Link>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

/*
Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
}*/

function getStudentById(id) {
    let result = []

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            result = students[i]
            break
        }
    }

    return result
}

export default function CollapsibleTable() {
    const [notificationList, setNotificationList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    // выводятся только фильтрующиеся данные
    const [searchingValue, setSearchingValue] = useState('')
    useEffect(() => {
        getNotifications()
            .then(items => setNotificationList(items.reverse()))
            .finally(() => setLoading(false))

        getStudents()
            .then(items => {
                setStudentList(items.reverse())
            })
    }, [])

    notifications = notificationList
    students = studentList

    return (
        <>
            {/* Перенёс сюда SearchBar.jsx */}
            <div className="notification_navbar">
                {loading && <CircularProgress color="warning" sx={{ml: "490px"}}/>}
                <NavLink className="add_notification_button" to="/AddNotification"> Добавить
                    уведомление <AddIcon/></NavLink>
                <div className="serchbar_position">
                    {/* Перенёс сюда Search.jsx */}
                    <div className="search_notification_input">
                        <div className="search_notification">
                            <input
                                type="text"
                                placeholder={"Введите данные для поиска..."}
                                onChange={(event => setSearchingValue(event.target.value))}
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
                            <TableCell align="right">Cтудент</TableCell>
                            <TableCell align="right">Дата</TableCell>
                            <TableCell align="right">Статус</TableCell>
                            <TableCell align="right">Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map((row) => (
                            <Row key={row.id} row={row} currentStudent={getStudentById(row.student_id)}/>
                        ))}
                    </TableBody>
                </Table>
                {/*<TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />*/}
            </TableContainer>
        </>
    );
}