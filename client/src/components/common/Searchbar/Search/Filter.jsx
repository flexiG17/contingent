import React, {useEffect, useState} from 'react';
import './Search.css';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import {FilterItem} from "../../FilterItem";
import {Badge} from "@mui/material";
import {getColumns} from "../../../../actions/student";
import iziToast from "izitoast";
import {priorities} from "../../../../utils/consts/filedPriority";

const ITEM_HEIGHT = 50;

const SortColumns = (columns) => {
    const sortedColumns = [...columns]

    sortedColumns.map(column => {
        priorities.map(priority => {
            if (column.value === priority.label)
                column['rating'] = priority.rating
            else if (!column['rating'])
                column['rating'] = priorities.length + 1
        })
    })
        .sort((a, b) => a.rating - b.rating)

    return sortedColumns.sort((a, b) => a.rating - b.rating)
}

export default function LongMenu({filters, setFilters}) {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const [filterArr, setFilterArr] = useState(filters);
    const [columns, setColumns] = useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeFilterProp = (id, value, operator) => {
        setFilterArr((prevState) => {
            return prevState.map(item => {
                if (item.id === id) {
                    return {...item, [operator]: value};
                }
                return item;
            });
        });
    };

    useEffect(() => {
        getColumns()
            .then(res => setColumns(res.data.map((item) => {
                return {
                    value: item.name,
                    label: item.ru,
                    type: item.type
                }
            })));
    }, []);

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >

                <Badge badgeContent={filters.length} color="info">
                    <FilterAltIcon sx={{color: "#FA7A45"}}/>
                </Badge>
            </IconButton>
            <Menu
                autoFocus={false}
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        minHeight: ITEM_HEIGHT * 7,
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '900px',
                    },
                }}
            >
                {filterArr.map((item) => (
                    <FilterItem key={item.id} item={item} columns={SortColumns(columns)} setFilterArr={setFilterArr}
                                changeFilterProp={changeFilterProp}/>
                ))}
                <div className="button_position">
                    <button className="add_filter_button" onClick={() => {
                        setFilterArr([...filterArr, {
                            id: filterArr.length !== 0 ? filterArr[filterArr.length - 1].id + 1 : 1,
                            param:
                                {value: '', label: ''},
                            operator:
                                {value: '', label: ''},
                            value: '',
                        }]);
                    }}>
                        Добавить <AddIcon/>
                    </button>
                    {
                        (filters.length !== 0 || filterArr.length !== 0) &&
                        <>
                            <button className="add_filter_button" onClick={() => {
                                setFilterArr([]);
                                setFilters([]);
                                handleClose();
                            }}>
                                Сбросить
                            </button>
                            <button className="add_filter_button"
                                    onClick={() => {
                                        for (let i = 0; i < filterArr.length; i++){
                                            if (filterArr[i].operator === 'range' && filterArr[i].param.type !== "date") {
                                                iziToast.error({
                                                    message: `Оператор "Диапазон" применим к полям типа "Дата" (${filterArr[i].param.label})`,
                                                    position: "topRight",
                                                    color: "#FFF2ED"
                                                });
                                                break
                                            }
                                            else if (filterArr[i].operator === 'coincidence' && filterArr[i].param.type === "date") {
                                                iziToast.error({
                                                    message: `Оператор "Содержит" не применим к полям типа "Дата"`,
                                                    position: "topRight",
                                                    color: "#FFF2ED"
                                                });
                                                break
                                            }
                                            else if (typeof(filterArr[i].value) !== 'string' && filterArr[i].param.type !== "date") {
                                                iziToast.error({
                                                    message: `Некорректные введенные данные`,
                                                    position: "topRight",
                                                    color: "#FFF2ED"
                                                });
                                                break
                                            }
                                            else if (filterArr[i].operator.value === '') {
                                                iziToast.error({
                                                    message: `Оператор для фильтрации не выбран (${filterArr[i].param.label})`,
                                                    position: "topRight",
                                                    color: "#FFF2ED"
                                                });
                                                break
                                            }
                                            else if (i === filterArr.length - 1){
                                                setFilters(filterArr);
                                                handleClose();
                                            }
                                        }
                                    }}>
                                Применить
                            </button>
                        </>
                    }
                </div>
            </Menu>
        </div>
    );
}
