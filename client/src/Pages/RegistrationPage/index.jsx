import React, {useState} from "react";
import './RegistrationPage.css';
import Logo from "../full_logo.png";
import {Registration} from "../../actions/user";
import {useNavigate} from "react-router-dom";
import {MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";

function RegisterPage() {
    const [inputName, setNameItemInput] = useState('')
    const [inputRole, setRoleItemInput] = useState('')
    const [inputEmail, setEmailItemInput] = useState('')
    const [inputPassword, setPasswordItemInput] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        Registration(inputName, inputRole, inputEmail, inputPassword, navigate)
    };

    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }
    return (
        <>
            <div className="form_container">
                <div className="header_greeting">
                    <form className="form_style" onSubmit={handleSubmit}>
                        <label className="label_style" htmlFor="name">Имя сотрудника</label>
                        <input className="input_style" name="name" type="text" placeholder="Введите имя сотрудника"
                               onChange={event => setNameItemInput(event.target.value)} value={inputName}/>
                        <label className="label_style" htmlFor="name">Роль</label>
                        <TextField type="text" variant="outlined" color="warning" margin='normal'
                                   size="small" select InputLabelProps={propsStyle}
                                   onChange={event => setRoleItemInput(event.target.value)} value={inputRole}>
                            <MenuItem sx={propsStyle} value="Администратор">
                                <span style={propsStyle.style}>Администратор</span>
                            </MenuItem>
                            <MenuItem sx={propsStyle} value="Редактор">
                                <span style={propsStyle.style}>Редактор</span>
                            </MenuItem>
                            <MenuItem sx={propsStyle} value="Читатель">
                                <span style={propsStyle.style}>Читатель</span>
                            </MenuItem>
                        </TextField>
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