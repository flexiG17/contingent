import * as React from 'react';
import './mainTable.css'
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
import {Button, ButtonGroup, CircularProgress, MenuItem} from "@mui/material";
import {ADD_STUDENT_ROUTE} from "../../../utils/consts/pathRoutes";
import Filter from "../Searchbar/Search/Filter";
import jwt_decode from "jwt-decode";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import {getToken} from "../../../utils/token";
import './TableHeader/HeaderTable.css';
import {lineStyleInTable, listItemStyle, textFieldStyle} from "../../../utils/consts/styles";
import TextField from "@mui/material/TextField";
import moment from "moment";
import DatePicker from "react-datepicker";

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
    const linesPerPage = localStorage.getItem('linesPerPage') ? +localStorage.getItem('linesPerPage') : 10

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(linesPerPage);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState([]);

    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        getStudents()
            .then(items => {
                /*items.map(item => {
                    item.birth_date = moment(item.birth_date).format('DD.MM.YYYY')
                })*/
                setStudentList(items.reverse());
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
        localStorage.setItem('linesPerPage', event.target.value)
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (studentId) => selected.findIndex(student => student.id === studentId) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentList.length) : 0;

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
                    const tmp1 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const tmp2 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && tmp1 !== tmp2) {
                        return false;
                    } else if (item[filter.param.value] === null)
                        return false
                    else if (filter.param.type !== 'date' && item[filter.param.value].toLowerCase() !== filter.value.toLowerCase())
                        return (item[filter.param.value] === filter.value);
                    break;
                case "more":
                    const studentDate = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate <= actualDate) {
                        return false;
                    } else if (item[filter.param.value] <= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "less":
                    const lessStudentDate = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const lessActualDate = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && lessStudentDate >= lessActualDate) {
                        return false;
                    } else if (item[filter.param.value] >= Number(filter.value)) {
                        return false;
                    }
                    break;
                case "moreE":
                    const studentDate1 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate1 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate1 < actualDate1) {
                        return false;
                    } else if (item[filter.param.value] < Number(filter.value)) {
                        return false;
                    }
                    break;
                case "lessE":
                    const studentDate2 = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const actualDate2 = new Date(filter.value).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && studentDate2 > actualDate2) {
                        return false;
                    } else if (item[filter.param.value] > Number(filter.value)) {
                        return false;
                    }
                    break;
                case "range":
                    const valueToFilter = new Date(item[filter.param.value]).setHours(0, 0, 0);
                    const startDate = new Date(filter.value[0]).setHours(0, 0, 0);
                    const endDate = new Date(filter.value[1]).setHours(0, 0, 0);

                    if (filter.param.type === 'date' && !(valueToFilter >= startDate && valueToFilter <= endDate)) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
        return true;
    };

    const [searchType, setSearchType] = useState('')
    const [searchingValue, setSearchingValue] = useState('')

    const [filterCondition, setFilteredCondition] = useState('latin_name');

    let filteredValues = studentList.filter(row => {
        if (searchType === 'filter')
            return multiFilter(row);
        else if (searchType === 'search' && filterCondition === "birth_date") {
            if (searchingValue === '')
                return row
            else
                return new Date(row[filterCondition]).setHours(0, 0, 0) === new Date(searchingValue).setHours(0, 0, 0)
        } else if (searchType === 'search' || searchType === 'program') {
            if (row[filterCondition] === null || row[filterCondition] === '')
                return
            else return row[filterCondition].toLowerCase().includes(searchingValue.toLowerCase())
        } else
            return row
    });

    return (
        <div>
            <div className="nav">
                <div className="filter_position">
                    {!READER_ACCESS &&
                        <NavLink to={ADD_STUDENT_ROUTE} className="add_student_btn">
                            Добавить студента <AddIcon/>
                        </NavLink>}
                </div>
                {!loading &&
                    <>
                        <ButtonGroup variant="outlined" aria-label="outlined button group"
                                     sx={{width: '350px', height: '40px', mr: 1}}>
                            <Button
                                color='warning'
                                sx={listItemStyle}
                                onClick={() => {
                                    setSearchingValue('')
                                    setSearchType('filter')
                                }}
                            >
                                Фильтрация
                            </Button>
                            <Button
                                color='warning'
                                sx={listItemStyle}
                                onClick={() => {
                                    setSearchingValue('')
                                    setFilteredCondition('latin_name')
                                    setSearchType('search')
                                }}
                            >
                                Поиск
                            </Button>
                            <Button
                                color='warning'
                                sx={listItemStyle}
                                onClick={() => {
                                    setSearchingValue('')
                                    setFilteredCondition('hours_number')
                                    setSearchType('program')
                                }}
                            >
                                Программа
                            </Button>
                        </ButtonGroup>

                        {searchType === 'filter' &&
                            <Filter filters={filters} setFilters={setFilters}/>
                        }

                        {searchType === 'search' &&
                            <div className='searchPosition'>
                                <div>
                                    <TextField label="Поиск" type="text" margin='normal' variant="outlined"
                                               color="warning"
                                               size="small" select InputLabelProps={textFieldStyle}
                                               defaultValue={'latin_name'}
                                               sx={{width: '200px', mt: 0, mr: "20px", ml: 1, mb: 0}}
                                               onChange={e => {
                                                   setSearchingValue('')
                                                   setFilteredCondition(e.target.value)
                                               }}>
                                        <MenuItem sx={textFieldStyle} value="latin_name">
                                            <span style={listItemStyle}>ФИО (лат.)</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="russian_name">
                                            <span style={listItemStyle}>ФИО (кир.)</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="passport_number">
                                            <span style={listItemStyle}>Номер паспорта</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="birth_date">
                                            <span style={listItemStyle}>Дата рождения</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="country">
                                            <span style={listItemStyle}>Страна</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="first_student_email">
                                            <span style={listItemStyle}>Эл. почта студента (первая)</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="first_agent_email">
                                            <span style={listItemStyle}>Эл. почта агента (первая)</span>
                                        </MenuItem>
                                        <MenuItem sx={textFieldStyle} value="first_representative_email">
                                            <span style={listItemStyle}>Эл. почта представителя (первая)</span>
                                        </MenuItem>
                                    </TextField>
                                </div>
                                {filterCondition !== "birth_date" &&
                                    <input
                                        className='inputStyle'
                                        type="text"
                                        placeholder={"Введите данные для поиска..."}
                                        value={searchingValue}
                                        onChange={(event => setSearchingValue(event.target.value))}
                                    />}
                                {filterCondition === "birth_date" &&
                                    <DatePicker
                                        todayButton="Today"
                                        selected={typeof (searchingValue) === 'string' ? null : new Date(searchingValue)}
                                        onChange={(date) => {
                                            setSearchingValue(date === null ? '' : date)
                                        }}
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText={"Выберите дату для поиска..."}
                                        className="date_picker_table"
                                    />}
                            </div>
                        }

                        {searchType === 'program' &&
                            <TextField label="Количество часов" name='hours_number' type="text" variant="outlined"
                                       color="warning" margin='normal' size="small" select
                                       sx={{width: '200px', mt: 0, mr: 0.5, ml: 1, mb: 0}}
                                       defaultValue={''}
                                       onChange={(event => {
                                           setSearchingValue(event.target.value)
                                       })}
                                       InputLabelProps={textFieldStyle}>
                                <MenuItem value="1008 (1 год 23-24)">
                                    <span style={listItemStyle}>1008 (1 год 23-24)</span>
                                </MenuItem>
                                <MenuItem value="1008 (1.5 года 23-24)">
                                    <span style={listItemStyle}>1008 (1.5 года 23-24)</span>
                                </MenuItem>
                                <MenuItem value="868">
                                    <span style={listItemStyle}>868</span>
                                </MenuItem>
                                <MenuItem value="728">
                                    <span style={listItemStyle}>728</span>
                                </MenuItem>
                                <MenuItem value="588">
                                    <span style={listItemStyle}>588</span>
                                </MenuItem>
                                <MenuItem value="504">
                                    <span style={listItemStyle}>504</span>
                                </MenuItem>
                                <MenuItem value="288">
                                    <span style={listItemStyle}>288</span>
                                </MenuItem>
                                <MenuItem value="144">
                                    <span style={listItemStyle}>144</span>
                                </MenuItem>
                                <MenuItem value="108">
                                    <span style={listItemStyle}>108</span>
                                </MenuItem>
                                <MenuItem value="72">
                                    <span style={listItemStyle}>72</span>
                                </MenuItem>
                            </TextField>
                        }
                    </>
                }

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
                                email: student.first_student_email
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
                                                        {row.date_creation === null ? 'Не определена' : moment(row.date_creation).format("DD.MM.YYYY")}
                                                    </Link>
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
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100, filteredValues.length]}
                        component="div"
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
