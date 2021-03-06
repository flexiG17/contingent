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
import moment from "moment";

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
                                        <TableCell>?????? ????????????????</TableCell>
                                        <TableCell>????????????</TableCell>
                                        <TableCell>??????</TableCell>
                                        <TableCell align="right">?????????? ????????????????</TableCell>
                                        <TableCell align="right">????????????????????</TableCell>
                                        <TableCell align="right">???????????? ????????????????</TableCell>
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
                                                to={currentStudent.education_type === "????????????????" ? '/PersonalCardContract' : '/PersonalCardQuota'}
                                                state={currentStudent}
                                                style={{textDecoration: 'none'}}>????????????
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
    // ?????????????????? ???????????? ?????????????????????????? ????????????
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
    notifications.map(item => {
        item.date = moment(item.date).format("YYYY-MM-DD")
    })

    students = studentList
    students.map(item => {
        item.birth_date = moment(item.birth_date).format("YYYY-MM-DD")
        item.passport_issue_date = moment(item.passport_issue_date).format("YYYY-MM-DD")
        item.passport_expiration = moment(item.passport_expiration).format("YYYY-MM-DD")
        item.entry_date = moment(item.entry_date).format("YYYY-MM-DD")
        item.visa_validity = moment(item.visa_validity).format("YYYY-MM-DD")
        item.first_payment = moment(item.first_payment).format("YYYY-MM-DD")
        item.second_payment = moment(item.second_payment).format("YYYY-MM-DD")
        item.third_payment = moment(item.third_payment).format("YYYY-MM-DD")
        item.fourth_payment = moment(item.fourth_payment).format("YYYY-MM-DD")
        item.transfer_to_international_service = moment(item.transfer_to_international_service).format("YYYY-MM-DD")
        item.transfer_to_MVD = moment(item.transfer_to_MVD).format("YYYY-MM-DD")
        item.estimated_receipt_date = moment(item.estimated_receipt_date).format("YYYY-MM-DD")
        item.actual_receipt_date_invitation = moment(item.actual_receipt_date_invitation).format("YYYY-MM-DD")
    })

    return (
        <>
            {/* ?????????????? ???????? SearchBar.jsx */}
            <div className="notification_navbar">
                {loading && <CircularProgress color="warning" sx={{ml: "490px"}}/>}
                <NavLink className="add_notification_button" to="/AddNotification"> ????????????????
                    ?????????????????????? <AddIcon/></NavLink>
                <div className="serchbar_position">
                    {/* ?????????????? ???????? Search.jsx */}
                    <div className="search_notification_input">
                        <div className="search_notification">
                            <input
                                type="text"
                                placeholder={"?????????????? ???????????? ?????? ????????????..."}
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
                            <TableCell>??????</TableCell>
                            <TableCell align="right">C????????????</TableCell>
                            <TableCell align="right">????????</TableCell>
                            <TableCell align="right">????????????</TableCell>
                            <TableCell align="right">??????????????????????</TableCell>
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