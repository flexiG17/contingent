import * as React from 'react';
import {Header} from "../components/common";
import './AddNotification.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {createNotification} from "../services/serverData";
import iziToast from "izitoast";


function AddNotification() {
    const [active, setActive] = useState(true);
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [comment, setComment] = useState('')

    const handleClickContract = () => {
        setActive(!active)
    }

    const location = useLocation();
    const rows = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            type: type,
            student_name: rows.russian_name,
            student_id: rows.id,
            date: date,
            comment: comment,
            status: status,
            user_id: 13
        }
        console.log(data)
        createNotification(data)
            .then((res) => {
                switch (res.status) {
                    case 200: {
                        iziToast.success({
                            title: res.statusText,
                            message: 'Уведомление успешно создано',
                            position: "topRight"
                        });
                        break
                    }
                    default: {
                        iziToast.error({
                            title: res.statusText,
                            message: 'Попробуйте ещё раз',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                    }
                }
            })
    };

    return (
        <>
            <Header/>
            <p className="title_addNotification">Добавить уведомление</p>

            <form className="container_addNotification" onSubmit={handleSubmit}>
                <Box component="form" sx={{'& > :not(style)': {mt: 1, ml: 2, width: '25ch'}}} noValidate autoComplete="off">
                    <TextField
                        sx={{'& > :not(style)': {mt: "20px", mb: "20px", width: '30ch'}}}
                        label="Тип уведомления"
                        variant="outlined"
                        color="warning"
                        focused
                        onChange={event => setType(event.target.value)}
                        value={type}/>
                    <TextField
                        sx={{'& > :not(style)': {mt: "20px", mb: "20px", width: '30ch'}}}
                        label="Имя студента"
                        variant="outlined"
                        color="warning"
                        focused
                        value={rows.russian_name}/>
                    <TextField
                        sx={{'& > :not(style)': {mt: "20px", mb: "20px", width: '30ch'}}}
                        label="Дата"
                        variant="outlined"
                        color="warning"
                        focused
                        onChange={event => setDate(event.target.value)}
                        value={date}/>
                    <TextField
                        sx={{'& > :not(style)': {mt: "20px", mb: "20px", width: '30ch'}}}
                        label="Комментарий"
                        variant="outlined"
                        color="warning"
                        focused
                        onChange={event => setComment(event.target.value)}
                        value={comment}/>
                    <TextField
                        sx={{'& > :not(style)': {mt: "20px", mb: "20px", width: '30ch'}}}
                        label="Статус"
                        variant="outlined"
                        color="warning"
                        focused
                        onChange={event => setStatus(event.target.value)}
                        value={status}/>
                </Box>
                <label className="checkbox_style_notification">
                    <input type="checkbox" onClick={handleClickContract}/> Вы уверены, что хотите сдать уведомление?
                </label>
                <div className="button_position_notification">
                    <button type="submit" className="button_style_contract_doc" disabled={active}>Добавить</button>
                </div>
            </form>
        </>
    )
}

export default AddNotification;