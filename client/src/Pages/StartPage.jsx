import React from "react";
import './StartPage.css';
import Logo from './full_logo.png';
import {NavLink} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts";


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
                        {{/*сделано ссылкой, потому что после авторизации не происходит редирект на главную, а на дефолтную*/}}
                    <a href={HOME_ROUTE}>
                            <img src={Logo} width="250px" height="181px" alt=""/>
                    </a>
                    </div>
                    <p className="Sub_sub_header">Вход ПОдИУ УрФУ</p>
                    <NavLink to={LOGIN_ROUTE} className="button_start"> Войти </NavLink>
                </div>
            </div>
        </>
    )
}

export default StartPage;