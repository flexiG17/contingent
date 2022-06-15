import React, {useEffect, useState} from "react";
import './LoginPage.css';
import Logo from './logo.png';
import {loginUser} from '../services/serverData'
import "izitoast/dist/css/iziToast.css";
import iziToast from "izitoast";

function LoginPage() {
    const [inputEmail, setEmailItemInput] = useState('')
    const [inputPassword, setPasswordItemInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: inputEmail,
            password: inputPassword
        }
        loginUser(data)
            .then((res) => {
                switch (res.status) {
                    case 200: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Успешная авторизация',
                            position: "topRight"
                        });
                        setEmailItemInput('');
                        setPasswordItemInput('');
                        break
                    }
                    case 401: {
                        iziToast.error({
                            title: res.statusText,
                            message: 'Пароли не совпадают. Попробуйте ещё раз',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                        break
                    }
                    default: {
                        iziToast.error({
                            title: res.statusText,
                            message: 'Такой пользователь не существует',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                    }
                }
            })
    };

    return (
        <>
            <div className="form_container">
                <div className="header_greeting">
                    <div className="Login_Logo"><img src={Logo} width="250px" height="50px" alt=""/></div>


                    <form className="form_style" onSubmit={handleSubmit}>

                        <label className="label_style" htmlFor="email">Email</label>
                        <input className="input_style" name="email" type="email" placeholder="Введите свой email"
                               onChange={event => setEmailItemInput(event.target.value)} value={inputEmail}/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите свой пароль"
                               onChange={event => setPasswordItemInput(event.target.value)} value={inputPassword}/>
                        <label className="checkbox_style_login">
                            <input type="checkbox" placeholder="Запомните меня"/> Запомните меня
                        </label>
                        <button type="submit" className="button_style_login"> Войти</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;