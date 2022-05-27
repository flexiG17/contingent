import React from "react";
import './LoginPage.css';
import Logo from './logo.png';
import {NavLink} from "react-router-dom";

function LoginPage() {
    return (
        <>
            <div className="form_container">
                <div className="header_greeting">
                    <div className="Login_Logo"><img src={Logo} width="250px" height="50px" alt=""/></div>


                    <form className="form_style">
                        <label className="label_style" htmlFor="email">Имя пользователя или email</label>
                        <input className="input_style" name="email" type="text" placeholder="Введите свой логин"/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите свой пароль"/>
                        <label className="checkbox_style_login"><input type="checkbox"
                                                                       placeholder="Запомните меня"/> Запомните меня
                        </label>
                        <NavLink to="/HomePage" className="button_style_login"> Войти </NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;