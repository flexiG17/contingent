import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css";

export default function CustomRangeDatePicker({}) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="date_picker_block">
                <DatePicker
                    selectsRange={true}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    showMonthDropdown
                    showYearDropdown
                    required
                    dropdownMode="select"
                    dateFormat="dd.MM.yyyy"
                    className="date_picker"
                />
        </div>
    )
}