import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import Massages from './Pages/Massages';
import RegistrationPage from './Pages/RegistrationPage'
import StartPage from './Pages/StartPage';
import LoginPage from './Pages/LoginPage';
import AddStudent from './Pages/AddStudent';

import {
    Route, Routes
} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<StartPage/>}/>
                <Route exact path="/Massages" element={<Massages/>}/>
                <Route exact path="/RegistrationPage" element={<RegistrationPage/>}/>
                <Route exact path="/LoginPage" element={<LoginPage/>}/>
                <Route exact path="/HomePage" element={<HomePage/>}/>
                <Route exact path="/AddStudent" element={<AddStudent/>}/>
            </Routes>
        </>
    );
}

export default App;
