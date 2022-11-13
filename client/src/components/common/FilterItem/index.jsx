import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";

export function FilterItem({item, columns, setFilterArr, changeFilterParam, changeFilterOperator, changeFilterValue}) {
    const operators = [
        {value: 'coincidence', label: 'Содержит'},
        {value: 'equals', label: 'Равно'},
        {value: 'more', label: 'Больше'},
        {value: 'less', label: 'Меньше'},
        {value: 'moreE', label: 'Больше или равно'},
        {value: 'lessE', label: 'Меньше или равно'}
    ];

    const [inputType, setInputType] = useState(item.param.type);

    return (
        <MenuItem>
            <div className="filter_container">
                <Select className="first_parameter" placeholder="Описание" options={columns}
                        value={item.param}
                        onChange={(e) => {
                            setInputType(e.type);
                            changeFilterParam(item.id, e);
                        }
                        }/>
                <Select className="second_parameter" placeholder="Оператор" options={operators}
                        value={item.operator}
                        onChange={(e) => {
                            changeFilterOperator(item.id, e);
                        }
                        }/>
                <div className="third_parameter">
                    <input className="search_filter" type={inputType} onChange={(e) => {
                        changeFilterValue(item.id, e.target.value);
                    }
                    }
                           value={item.value}/>
                </div>
                <button className="delete_filter_button"
                        onClick={() => setFilterArr((prevState) => prevState.filter((obj) => {
                            return obj.id !== item.id;
                        }))}>
                    <DeleteIcon sx={{fontSize: 22}}/>
                </button>
            </div>
        </MenuItem>
    );
}