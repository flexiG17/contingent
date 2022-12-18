import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import * as React from "react";

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

const studentStyleInTable = {
    textDecoration: 'none',
    color: 'black',
    fontSize: "14px",
    fontFamily: ['Montserrat'],
    fontWeight: '400'
}

export default function TableHeader({onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort}) {
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
                        sx={studentStyleInTable}
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