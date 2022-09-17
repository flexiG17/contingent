import "./Tables.css";

import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {useEffect, useState} from "react"
import moment from 'moment'
import {
    getStudents,
    createXlsx,
    getXlsx,
    importXlsx,
    removeArrayOfStudents
} from '../../../services/serverData'
import {Link, NavLink} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import '../Searchbar/Searchbar.css';
import SearchIcon from "@mui/icons-material/Search";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Pagination
} from "@mui/material";
import iziToast from "izitoast";
import {ADD_STUDENT_ROUTE, CARD_CONTRACT_ROUTE, CARD_QUOTA_ROUTE} from "../../../utils/consts";


/*
Самый больной файл по моему мнению
Это код главной страницы с таблицей
*/

let rows = []

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

// название "шапки" таблицы
const headCells = [
    {
        id: 'education_type',
        numeric: false,
        disablePadding: true,
        label: 'Тип обучения',
    },
    {
        id: 'hours_number',
        numeric: false,
        disablePadding: true,
        label: 'Кол-во часов',
    },
    {
        id: 'latin_name',
        numeric: false,
        disablePadding: false,
        label: 'ФИО (лат.)',
    },
    {
        id: 'russian_name',
        numeric: false,
        disablePadding: true,
        label: 'ФИО (кир.)',
    },
    {
        id: 'country',
        numeric: false,
        disablePadding: false,
        label: 'Страна',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'Пол',
    },
    {
        id: 'contract_number',
        numeric: true,
        disablePadding: true,
        label: '№ договора',
    },
    {
        id: 'enrollment_order',
        numeric: false,
        disablePadding: true,
        label: '№ приказа о зачислении',
    },
    {
        id: 'enrollment',
        numeric: false,
        disablePadding: false,
        label: 'Зачисление',
    }
];

// генерирование "шапки" таблицы
function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

let dataToDownload = null
let selectToDelete = null

// плашка с отображением выбранных студентов, их колличеством, кнопка для импорта, экспорта и удаления
const EnhancedTableToolbar = (props) => {
    const {numSelected} = props;
    const [file, setFile] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle1" component="div">
                        {numSelected} выбрано
                    </Typography>
                ) : (
                    <Typography sx={{flex: '1 1 100%'}} variant="h6" id="tableTitle" component="div">
                    </Typography>
                )}

                {numSelected > 0 ? (<>
                        <Tooltip title="Загрузить">
                            <IconButton onClick={() => {
                                createXlsx(dataToDownload)
                                setTimeout(() => {
                                    getXlsx()
                                        .then(response => {
                                            response.blob().then(blob => {
                                                let url = window.URL.createObjectURL(blob);
                                                let a = document.createElement('a');
                                                a.href = url;
                                                a.download = 'studentsByFilter.xlsx';
                                                a.click();
                                            });
                                        });
                                }, 1000)
                            }}>
                                <FileDownloadIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                            <IconButton onClick={() => {
                                handleOpen()
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>

                    </>
                ) : (
                    <>
                        <input type='file' multiple='multiple' onChange={e => setFile(e.target.files[0])}/>
                        <Tooltip sx={{cursor: "pointer"}} color='inherit' title="Загрузить студентов">
                            <UploadIcon fontSize='medium' onClick={() => {
                                const data = new FormData()
                                data.append('fileToImport', file)

                                importXlsx(data)
                                    .then(res => {
                                        switch (res.status) {
                                            case 201: {
                                                iziToast.success({
                                                    title: res.statusText,
                                                    message: 'Студенты успешно импортированы в базу. Обновляю страницу :)',
                                                    position: "topRight"
                                                });
                                                setTimeout(() => {
                                                    window.location.reload()
                                                }, 2000)
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
                            }}>
                                <FilterListIcon/>
                            </UploadIcon>
                        </Tooltip>
                    </>
                )}
            </Toolbar>
            {/* Диалоговое окно для подтверждения удаления*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление студента</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить выбранных студентов?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeArrayOfStudents(selectToDelete)
                            .then((res) => {
                                switch (res.status) {
                                    case 200: {
                                        iziToast.success({
                                            title: res.statusText,
                                            message: 'Студенты успешно удалены из базы. Обновляю страницу :)',
                                            position: "topRight"
                                        });
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 2000)
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
                        setOpen(false)
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


// код с основной таблицей
export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const [selectedForDownloading, setSelectedForDownloading] = useState([]);
    dataToDownload = selectedForDownloading

    const [selected, setSelected] = useState([]);
    selectToDelete = selected

    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    const [list, setList] = useState([]);
    // хук для постоянного получения студентов с бэка
    useEffect(() => {
        getStudents()
            .then(items => setList(items.reverse()))
            .finally(() => setLoading(false))
    }, [])

    rows = list
    // из бд приходит дата в ужасном формате, поэтому вот так криво каждая строка парсится
    rows.map(item => {
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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // нажатие кнопки для выбора всех студентов
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelects = filteredValues.map((n) => n.id);
            setSelected(newSelects);

            const newSelectsForDownloading = filteredValues.map((n) => n);
            setSelectedForDownloading(newSelectsForDownloading)
            return;
        }
        setSelected([]);
    };

    // для выбора по отдельности
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    /*
        в таблице выводятся данные из filteredValues. При внесении в поле для ввода данных происходит моментальная сортировка
        на данный момент поиск происходит только по russian_name и менять можно только в коде
    */
    const [searchingValue, setSearchingValue] = useState('')
    const filteredValues = rows.filter(row => {
        return row['russian_name'].toLowerCase().includes(searchingValue.toLowerCase())
    })
    return (
        <div>
            {/* Перенёс сюда SearchBar.jsx */}
            <div className="nav">
                {loading && <CircularProgress color="warning"/>}
                <NavLink to={ADD_STUDENT_ROUTE} className="add_student_btn"> Добавить студента <AddIcon/></NavLink>
                <div className="serchbar_position">
                    {/* Перенёс сюда Search.jsx */}
                    <div className="search">
                        <div className="searchInput">
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
            <Box sx={{width: '1500px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '30px'}}>
                <Paper sx={{
                    width: '100%',
                    mb: 2,
                    boxShadow: 'none',
                    borderBottom: '1px solid #FA7A45',
                    borderRadius: '0px',
                    borderTop: '1px solid #FA7A45'
                }}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
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
                                                    <Checkbox
                                                        onClick={(event) => {
                                                            handleClick(event, row.id)
                                                        }}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                           align="left">
                                                    {row.education_type}
                                                </TableCell>
                                                <TableCell align="left">{row.hours_number}</TableCell>
                                                <TableCell align="left">{row.latin_name}</TableCell>
                                                <TableCell align="left">
                                                    <Link
                                                        to={row.education_type === "Контракт" ? CARD_CONTRACT_ROUTE : CARD_QUOTA_ROUTE}
                                                        state={row} style={{textDecoration: 'none', color: 'black'}}
                                                    >
                                                        {row.russian_name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">{row.country}</TableCell>
                                                <TableCell align="left">{row.gender}</TableCell>
                                                <TableCell align="left">{row.contract_number}</TableCell>
                                                <TableCell align="left">{row.enrollment_order}</TableCell>
                                                <TableCell align="left">{row.enrollment}</TableCell>
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
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Строк на страницу:"
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
