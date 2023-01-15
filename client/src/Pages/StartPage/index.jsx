import React from "react";
import './StartPage.css';
import Logo from '.././full_logo.png';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts/pathRoutes";


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
                    <div className="Start_Logo">
                        <img src={Logo} width="250px" height="181px" alt=""/>
                    </div>
                    <p className="Sub_sub_header">Вход ПОдИУ УрФУ</p>
                    <NavLink to={LOGIN_ROUTE} className="button_start"> Войти </NavLink>
                </div>
            </div>
        </>
    )
}

export default StartPage;