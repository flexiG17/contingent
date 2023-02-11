import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useEffect, useState} from "react"
import {getStudents} from '../../../actions/student'
import {Link, NavLink} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import '../Searchbar/Searchbar.css';
import {CircularProgress} from "@mui/material";
import {ADD_STUDENT_ROUTE} from "../../../utils/consts/pathRoutes";
import Filter from "../Searchbar/Search/Filter";
import jwt_decode from "jwt-decode";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import {getToken} from "../../../utils/token";
import './TableHeader/HeaderTable.css';
import {lineStyleInTable} from "../../../utils/consts/styles";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState([]);

    const [list, setList] = useState([]);

    useEffect(() => {
        getStudents()
            .then(items => {
                setList(items.reverse());
            })
            .finally(() => setLoading(false))
    }, []);

    const decodedToken = jwt_decode(getToken())
    const READER_ACCESS = decodedToken.role === 'Читатель'

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [selected, setSelected] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(filteredValues);
            return;
        }
        setSelected([]);
    };

    const handleClick = (studentId, student) => {
        const selectedIndex = selected.findIndex(el => el.id === student.id);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, student);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (studentId) => selected.findIndex(student => student.id === studentId) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

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

    const filteredValues = list.filter(row => {
        return multiFilter(row);
    });

    return (
        <div>
            <div className="nav">
                <div className="filter_position">
                    {!READER_ACCESS &&
                        <NavLink to={ADD_STUDENT_ROUTE} className="add_student_btn"> Добавить
                            студента <AddIcon/></NavLink>}
                    {!loading && <Filter filters={filters} setFilters={setFilters}/>}
                </div>
                {loading && <CircularProgress color="warning"/>}
            </div>
            <Box sx={{width: '1500px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '30px'}}>
                <Paper sx={{
                    width: '100%',
                    mb: 2,
                    boxShadow: 'none',
                    borderBottom: '1px solid #FA7A45',
                    borderRadius: '0px',
                    borderTop: '1px solid #FA7A45'
                }}>
                    <TableToolbar
                        numSelected={selected.length}
                        selectedRows={selected.map(student => student.id)}
                        selectedEmails={selected.map(student => {
                            return {
                                id: student.id,
                                education_type: student.education_type,
                                email: student.student_email
                            };
                        })}
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <TableHeader
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredValues.length}
                            />

                            <TableBody>
                                {stableSort(filteredValues, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover={true}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox onClick={() => {
                                                        handleClick(row.id, row);
                                                    }}
                                                              color="primary" checked={isItemSelected}
                                                              inputProps={{'aria-labelledby': labelId,}}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.education_type}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.hours_number}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.latin_name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.russian_name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.country}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.gender}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.contract_number}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.payment_status}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link className="margin_table" style={lineStyleInTable}
                                                          target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.enrollment_order}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link style={lineStyleInTable} target="_blank"
                                                          to={`/${row.education_type === "Контракт" ? 'contract' : 'quota'}/${row.id}`}
                                                    >
                                                        {row.enrollment}
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        count={filteredValues.length}
                        onPageChange={handleChangePage}
                        page={page}
                        rowsPerPageOptions={[10, 25, 50, 100, filteredValues.length]}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Строк на страницу:"
                        labelDisplayedRows={({
                                                 from,
                                                 to,
                                                 count
                                             }) => `Показано ${from}-${to} (всего ${count})`}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Убрать отступы"
                />
            </Box>
            <div>
            </div>
        </div>
    );
}
