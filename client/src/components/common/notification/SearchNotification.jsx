import React from "react";
import SearchIcon from '@mui/icons-material/Search';

function SearchNotification({placeholder, data}) {
    return(
        <div className="search">
            <div className="searchInput">
                <input type="text" placeholder={placeholder}/>
                <div className="searchIcon"><SearchIcon /></div>
            </div>
            <div className="dataResult"></div>
        </div>
    )
}

export default SearchNotification;