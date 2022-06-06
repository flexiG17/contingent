import React from 'react';
import SearchNotification from "./SearchNotification";
import AddIcon from '@mui/icons-material/Add';
import './CallsEmailTasks.css'


function SearchbarNotification() {

    return(
        <div className="nav_calls">

            <button type="submit" className="add_student_search_btn"> Добавить уведомление <AddIcon/> </button>
            <div className="serchbar_position"> <SearchNotification placeholder = "Введите данные для поиска..."/></div>

        </div>
    )
}

export default SearchbarNotification;