import React, {useState} from "react";
import './LoginPage.css';
import Logo from '../full_logo.png';
import "izitoast/dist/css/iziToast.css";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {Login} from "../../actions/user";
import {useDispatch} from "react-redux";
import {setAppStatus} from "../../store/slices/AppData/app-data";
import {HOME_ROUTE} from "../../utils/consts";

function LoginPage() {
    const [inputEmail, setEmailItemInput] = useState('');
    const [inputPassword, setPasswordItemInput] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setAppStatus(0));
        await Login(inputEmail, inputPassword, navigate);
        navigate(HOME_ROUTE);
        dispatch(setAppStatus(1));
    };
    return (
        <>
            <div className="form_container">
                <div className="header_greeting">
                    <div className="Login_Logo"><img src={Logo} width="220px" height="160px" alt=""/></div>

                    <form className="form_style" onSubmit={handleSubmit}>

                        <label className="label_style" htmlFor="email">Email</label>
                        <input className="input_style" name="email" type="email" placeholder="Введите свой email"
                               onChange={event => setEmailItemInput(event.target.value)} value={inputEmail}/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите свой пароль"
                               onChange={event => setPasswordItemInput(event.target.value)}
                               value={inputPassword}/>
                        <label className="checkbox_style_login">
                            <Alert
                                sx={{height: '50px', width: "275px", paddingTop: '0px'}}
                                severity="warning"
                                color='warning'
                                variant='outlined'
                            ><span className='checkbox_style_login'>Нет аккаунта? Запросите регистрацию у администратора.</span></Alert>
                        </label>

                        <button type="submit" className="button_style_login"> Войти</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;