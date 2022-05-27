import React from "react";
import './HomePage.css';
import {Searchbar, Header, EnhancedTable} from "../components/common";

function HomePage() {
    return (
        <div>
            <Header/>
            <Searchbar/>
            <EnhancedTable/>
        </div>
    )
}

export default HomePage;