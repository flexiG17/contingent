import React from "react";
import './StartPage.css';
import Logo from './logo1.png';
import {NavLink} from "react-router-dom";


function StartPage() {
    return (
        <>
            <div className="greeting_container">
                <div className="LeftSide_greeting">
                    <p className="Top_header">Добро пожаловать!</p>
                    <p className="Sub_header">Чтобы продолжить работу,
                        пожалуйста, авторизуйтесь</p>
                </div>

                <div className="RightSide_greeting">
                    <div className="Start_Logo"><img src={Logo} width="320px" height="196.28px" alt=""/></div>
                    <p className="Sub_sub_header">Вход DoubleApple</p>
                    <NavLink to="/LoginPage" className="button_start"> Войти </NavLink>
                </div>
            </div>
        </>
    )
}

export default StartPage;