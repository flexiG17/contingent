import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css";

function CustomSingleDatePicker ({name, label, editMode, defaultValue, form, required, size}) {
    const [startDate, setStartDate] = useState(!defaultValue ? null : new Date(defaultValue));

    let sizeLabelArea = ''
    if (size === 'default'){
        if (label.length <= 11 )
            sizeLabelArea = 'extra_small_label_area'
        else if (label.length > 11 && label.length <= 14)
            sizeLabelArea = 'small_label_area'
        else if (label.length > 14 && label.length <= 19)
            sizeLabelArea = 'middle_label_area'
        else if (label.length > 18 && label.length <= 30)
            sizeLabelArea = 'large_label_area'
        else if (label.length > 30)
            sizeLabelArea = 'extra_large_label_area'
    }
    else if (size === 'small')
        sizeLabelArea = 'extra_large_label_area'

    return (
        <div className="date_picker_block">
            <div className={`date_picker_title ${editMode ? 'disabled_title' : 'undisabled_title'}`}>
                {`${label}${required ? ' *' : ''}`}
            </div>
            <div>
                <DatePicker
                    name={name}
                    autoComplete='off'
                    todayButton="Today"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    disabled={editMode}
                    showMonthDropdown
                    showYearDropdown
                    form={form}
                    dateFormat="dd.MM.yyyy"
                    className={`date_picker ${sizeLabelArea} ${size === 'small' ? 'small_input_size' : 'big_input_size'}`}
                    required={required}
                    placeholderText={'Не выбрано'}
                />
            </div>
        </div>
    )
};

export default CustomSingleDatePicker