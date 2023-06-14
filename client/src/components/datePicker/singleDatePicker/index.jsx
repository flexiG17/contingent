import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css";

export default function CustomSingleDatePicker({name, label, editMode, defaultValue}){
    const [startDate, setStartDate] = useState(defaultValue);

    return(
        <div className="date_picker_block">
            <div className="date_picker_title">
                {label}
            </div>
            <div style={{zIndex: 2}}>
                <DatePicker
                    todayButton="Today"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    disabled={editMode}
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd.MM.yyyy"
                    className="date_picker"
                />
            </div>
        </div>
    )
}