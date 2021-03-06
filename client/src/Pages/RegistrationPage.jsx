import React, {useState} from "react";
import './RegistrationPage.css';
// import Logo from './logo.png';
// import {NavLink} from "react-router-dom";
import {registerUser} from '../services/serverData'
import iziToast from "izitoast";
import Logo from "./full_logo.png";

function RegisterPage() {
    const [inputName, setNameItemInput] = useState('')
    const [inputEmail, setEmailItemInput] = useState('')
    const [inputPassword, setPasswordItemInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: inputName,
            email: inputEmail,
            password: inputPassword
        }
        registerUser(data)
            .then((res) => {
                switch (res.status) {
                    case 201: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Сотрудник успешно зарегестрирован',
                            position: "topRight"
                        });
                        setNameItemInput('');
                        setEmailItemInput('');
                        setPasswordItemInput('');
                        break
                    }
                    default: {
                        iziToast.error({
                            title: res.statusText,
                            message: 'Такой пользователь уже есть в системе',
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
                    <div className="Login_Logo"><img src={Logo} width="220px" height="160px" alt=""/></div>

                    <form className="form_style" onSubmit={handleSubmit}>
                        <label className="label_style" htmlFor="name">Имя сотрудника</label>
                        <input className="input_style" name="name" type="text" placeholder="Введите имя сотрудника"
                               onChange={event => setNameItemInput(event.target.value)} value={inputName}/>
                        <label className="label_style" htmlFor="email">Email</label>
                        <input className="input_style" name="email" type="email" placeholder="Введите email сотрудника"
                               onChange={event => setEmailItemInput(event.target.value)} value={inputEmail}/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите пароль сотрудника"
                               onChange={event => setPasswordItemInput(event.target.value)} value={inputPassword}/>
                        <label className="checkbox_style_register">
                            <input type="checkbox" placeholder="Запомните меня"/> Запомните меня
                        </label>
                        <button type="submit" className="button_style_register">Зарегистрировать</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;