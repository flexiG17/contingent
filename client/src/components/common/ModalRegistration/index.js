import React,{useState} from "react";
import './ModalRegistration.css';
import {Registration} from "../../../actions/user";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import {listItemStyle, textFieldStyle} from "../../../utils/consts/styles";


const ModalRegistration = ({active,setActive}) => {

    const [inputName, setNameItemInput] = useState('')
    const [inputRole, setRoleItemInput] = useState('')
    const [inputEmail, setEmailItemInput] = useState('')
    const [inputPassword, setPasswordItemInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        Registration(inputName, inputRole, inputEmail, inputPassword)
            .then(() => {
                setActive(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            })
    };

    return(
        <>
            <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <form className="form_style" onSubmit={handleSubmit}>
                        <label className="label_style" htmlFor="name">Имя сотрудника</label>
                        <input className="input_style" name="name" type="text" placeholder="Введите имя сотрудника"
                               onChange={event => setNameItemInput(event.target.value)} value={inputName}/>
                        <label className="label_style" htmlFor="name">Роль</label>
                        <TextField type="text" label='Роль' variant="outlined" color="warning" margin='normal'
                                   size="small" select InputLabelProps={textFieldStyle} focused sx={{width: 305, color: '#FA7A45'}}
                                   onChange={event => setRoleItemInput(event.target.value)} value={inputRole}>
                            <MenuItem value="Администратор">
                                <span style={listItemStyle}>Администратор</span>
                            </MenuItem>
                            <MenuItem value="Редактор">
                                <span style={listItemStyle}>Редактор</span>
                            </MenuItem>
                            <MenuItem value="Читатель">
                                <span style={listItemStyle}>Читатель</span>
                            </MenuItem>
                        </TextField>
                        <label className="label_style" htmlFor="email">Email</label>
                        <input className="input_style" name="email" type="email" placeholder="Введите email сотрудника"
                               onChange={event => setEmailItemInput(event.target.value)} value={inputEmail}/>
                        <label className="label_style" htmlFor="password">Пароль</label>
                        <input className="input_style" name="password" type="password"
                               placeholder="Введите пароль сотрудника"
                               onChange={event => setPasswordItemInput(event.target.value)} value={inputPassword}/>
                        <button type="submit" className="button_style_registration">Зарегистрировать</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalRegistration;