import React, {useState} from 'react';
import './Search.css';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ITEM_HEIGHT = 50;

export default function LongMenu({params, filters, setFilters}) {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);


    const filter = params.map((item) => {
        return {
            value: item, label: item
        }
    });
    const filter1 = [
        {value: 'coincidence', label: 'Содержит'},
        {value: 'equals', label: 'Равно'},
        {value: 'more', label: 'Больше'},
        {value: 'less', label: 'Меньше'},
        {value: 'moreE', label: 'Больше или равно'},
        {value: 'lessE', label: 'Меньше или равно'}
    ]

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeFilterParam = (id, value) => {
        setFilters((prevState) => {
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
        setFilters((prevState) => {
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
        setFilters((prevState) => {
            const newArr = prevState.map(item => {
                if (item.id === id) {
                    return {...item, value: value};
                }
                return item;
            })

            return newArr;
        })
    }

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
                    {filters.map((item) => (
                        <MenuItem>
                            <div className="filter_container">
                                <Select className="first_parameter" placeholder="Описание" options={filter}
                                        onChange={(e) => {
                                            changeFilterParam(item.id, e.value);
                                        }
                                        }/>
                                <Select className="second_parameter" placeholder="Оператор" options={filter1}
                                        onChange={(e) => {
                                            changeFilterOperator(item.id, e.value);
                                        }
                                        }/>
                                <div className="third_parameter">
                                    <input className="search_filter" type="text" onChange={(e) => {
                                        changeFilterValue(item.id, e.target.value);
                                    }
                                    }/>
                                </div>
                                <button className="delete_filter_button"
                                        onClick={() => setFilters((prevState) => prevState.filter((obj) => {
                                            return obj.id !== item.id;
                                        }))}>
                                    <DeleteIcon sx={{fontSize: 22}}/>
                                </button>
                            </div>
                        </MenuItem>
                    ))}
                    <div className="button_position">
                        <button className="add_filter_button" onClick={() => setFilters([...filters, {
                            id: filters.length !== 0 ? filters[filters.length - 1].id + 1 : 1,
                            param: '',
                            value: '',
                            operator: ''
                        }])}>
                            Добавить <AddIcon/>
                        </button>
                    </div>
                </Menu>
        </div>
    );
}
