import React from "react";
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';

function Search({placeholder, data}) {
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

export default Search;