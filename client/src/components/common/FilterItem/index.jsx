import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";

export function FilterItem({item, columns, setFilterArr, changeFilterProp}) {
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

                <select name="" id="" className="first_parameter search_filter" value={item.param.value}
                        onChange={(e) => {
                            window.scrollTo(0, 0);
                            let tmp = columns.filter((item) => e.target.value === item.value);
                            setInputType(tmp[0].type);
                            changeFilterProp(item.id, tmp[0], 'param');
                        }
                        }>
                    <option>Выберите поле</option>
                    {
                        columns.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })
                    }
                </select>

                <select name="" id="" className="second_parameter search_filter" value={item.operator}
                        onChange={(e) => {
                            changeFilterProp(item.id, e.target.value, 'operator');
                        }
                        }>
                    <option>Выберите оператор</option>
                    {
                        operators.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })
                    }
                </select>

                <div className="third_parameter">
                    <input className="search_filter" type={inputType} onChange={(e) => {
                        changeFilterProp(item.id, e.target.value, 'value');
                    }}
                           value={item.value}/>
                </div>
                <button className="delete_filter_button"
                        onClick={() => {
                            setFilterArr((prevState) => prevState.filter((obj) => {
                                return obj.id !== item.id;
                            }));
                        }}>
                    <DeleteIcon sx={{fontSize: 22}}/>
                </button>
            </div>
        </MenuItem>
    );
}