import IconButton from "@mui/material/IconButton";
import {Badge} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Menu from "@mui/material/Menu";
import {FilterItem} from "../FilterItem";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import {getColumns} from "../../../actions/student";

const ITEM_HEIGHT = 50;

export default function TaskFilter({filters, setFilters}) {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const [filterArr, setFilterArr] = useState(filters);
    const [columns, setColumns] = useState([
        {value: 'type', label: 'Тип', type: 'text'},
        {value: 'completed', label: 'Статус', type: 'text'},
        {value: 'date', label: 'Дата', type: 'date'}
    ]);

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

    // useEffect(() => {
    //     getColumns()
    //         .then(res => setColumns(res.data.map((item) => {
    //             return {
    //                 value: item.name,
    //                 label: item.ru,
    //                 type: item.type
    //             }
    //         })));
    // }, []);

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
                    <FilterItem key={item.id} item={item} columns={columns} setFilterArr={setFilterArr}
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
                            <button className="add_filter_button" onClick={() => {
                                setFilters(filterArr);
                                handleClose();
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