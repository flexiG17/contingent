import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css";

const CustomSingleDatePicker = React.forwardRef(({name, label, editMode, defaultValue, zIndex}, ref) => {
    const [startDate, setStartDate] = useState(!defaultValue ? null : new Date(defaultValue));

    return (
        <div className="date_picker_block">
            <div className="date_picker_title">
                {label}
            </div>
            <div>
                <DatePicker
                    name={name}
                    todayButton="Today"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    disabled={editMode}
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd.MM.yyyy"
                    className="date_picker"
                    ref={ref}
                    placeholderText={'Не выбрано'}
                />
            </div>
        </div>
    )
});

export default CustomSingleDatePicker