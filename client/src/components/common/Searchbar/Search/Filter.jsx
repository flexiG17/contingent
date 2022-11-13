import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Search.css';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {FilterItem} from "../../FilterItem";

const ITEM_HEIGHT = 50;

export default function LongMenu({params, filters, setFilters}) {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const [filterArr, setFilterArr] = useState(filters)
    const [columns, setColumns] = useState([])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setFilters(filterArr);
        setAnchorEl(null);
    };

    const changeFilterParam = (id, value) => {
        setFilterArr((prevState) => {
            const newArr = prevState.map(item => {
                if (item.id === id) {
                    return {...item, param: value};
                }
                return item;
            })

            return newArr;
        })
    }

    const changeFilterOperator = (id, value) => {
        setFilterArr((prevState) => {
            const newArr = prevState.map(item => {
                if (item.id === id) {
                    return {...item, operator: value};
                }
                return item;
            })

            return newArr;
        })
    }

    const changeFilterValue = (id, value) => {
        setFilterArr((prevState) => {
            const newArr = prevState.map(item => {
                if (item.id === id) {
                    return {...item, value: value};
                }
                return item;
            })

            return newArr;
        })
    }

    useEffect(() => {
        let result = axios.get('http://localhost:5000/api/student/columns', {
            headers: {
                'Authorization': localStorage.getItem("jwt"),
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => setColumns(res.data.map((item) => {
            return {
                value: item.name,
                label: item.ru,
                type: item.type
            }
        })))
    }, [])

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
                <MoreVertIcon/>
            </IconButton>
            <Menu
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
                    <FilterItem item={item} columns={columns}
                                setFilterArr={setFilterArr}
                                changeFilterParam={changeFilterParam}
                                changeFilterValue={changeFilterValue}
                                changeFilterOperator={changeFilterOperator}/>
                ))}
                <div className="button_position">
                    <button className="add_filter_button" onClick={() => setFilterArr([...filterArr, {
                        id: filterArr.length !== 0 ? filterArr[filterArr.length - 1].id + 1 : 1,
                        param:
                            {value: '', label: ''},
                        operator:
                            {value: '', label: ''},
                        value: '',
                    }])}>
                        Добавить <AddIcon/>
                    </button>
                </div>
            </Menu>
        </div>
    );
}
