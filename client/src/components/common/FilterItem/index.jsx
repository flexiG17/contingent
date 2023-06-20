import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import iziToast from "izitoast";

export function FilterItem({item, columns, setFilterArr, changeFilterProp}) {
    const operators = [
        {value: 'coincidence', label: 'Содержит'},
        {value: 'equals', label: 'Равно'},
        {value: 'more', label: 'Больше'},
        {value: 'less', label: 'Меньше'},
        {value: 'moreE', label: 'Больше или равно'},
        {value: 'lessE', label: 'Меньше или равно'},
        {value: 'range', label: 'Диапазон'}
    ];

    const [inputType, setInputType] = useState(item.param.type);

    const [dateRange, setDateRange] = useState(
        [
            typeof (item.value) === 'string' ? null : item.value[0],
            typeof (item.value) === 'string' ? null : item.value[1]]
    );
    const [startDate, endDate] = dateRange;
    const [startDateSingleRange, setStartDateSingleRange] = useState(isNaN(new Date(item.value).getDate()) ? null : item.value);

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
                    <option hidden>Выберите поле</option>
                    {
                        columns.filter(item => item.value !== 'id').map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })
                    }
                </select>

                <select name="" id="" className="second_parameter search_filter" value={item.operator}
                        onChange={(e) => {
                            changeFilterProp(item.id, e.target.value, 'operator');
                        }}>
                    <option hidden>Выберите оператор</option>
                    {
                        operators.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })
                    }
                </select>

                <div className="third_parameter">
                    {(item.operator !== 'range' && inputType !== 'date') &&
                        <input className="search_filter" type='text'
                               onChange={(e) => {
                                   changeFilterProp(item.id, e.target.value, 'value');
                               }}
                               value={item.value}/>}
                    {(inputType === 'date' && item.operator !== 'range') &&
                        <DatePicker
                            todayButton="Today"
                            selected={startDateSingleRange}
                            onChange={(date) => {
                                changeFilterProp(item.id, date, 'value')
                                setStartDateSingleRange(date)
                            }}
                            showMonthDropdown
                            showYearDropdown
                            placeholderText="Выберите дату для поиска"
                            dateFormat="dd.MM.yyyy"
                            className="date_picker_filter"
                        />}
                    {(item.operator === 'range') &&
                        <DatePicker
                            selectsRange={true}
                            onChange={(update) => {
                                changeFilterProp(item.id, update, 'value');
                                setDateRange(update);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            showMonthDropdown
                            showYearDropdown
                            required
                            placeholderText="Выберите диапазон дат"
                            dropdownMode="select"
                            dateFormat="dd.MM.yyyy"
                            className="date_picker_filter"
                        />}
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