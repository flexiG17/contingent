import React, {useState} from "react"
import './Modal.css'
import TextField from "@mui/material/TextField";
import {Badge, MenuItem} from "@mui/material";
import jwt_decode from "jwt-decode";
import {getToken} from "../../../utils/token";
import {createNotification} from "../../../actions/notification";
import {useNavigate} from "react-router-dom";
import {dateTextFieldStyle, listItemStyle, textFieldStyle} from "../../../utils/consts/styles";


const CreateTaskModalWindow = ({active, setActive, singleId, idArray, emails}) => {
    const [activeClick, setActiveClick] = useState(true);
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [comment, setComment] = useState('')

    const handleClickContract = () => {
        setActiveClick(!activeClick)
    }

    const userId = jwt_decode(getToken()).userId

    let studentIdToSave = ''
    if (singleId === undefined && idArray === undefined)
        studentIdToSave = null
    else if (singleId === undefined)
        studentIdToSave = idArray
    else if (idArray === undefined)
        studentIdToSave = singleId

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            type: type,
            students_id: studentIdToSave,
            date: date,
            comment: comment,
            completed: 'Запланировано',
            user_id: userId
        }
        createNotification(data, navigate)
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <p className="title_addNotification">Добавить задачу</p>

                <form className="container_addNotification" onSubmit={handleSubmit}>
                    <div className='textFields_position'>
                        <TextField
                            sx={{'& > :not(style)': {mb: 2, width: '30ch'}}}
                            label="Тип задачи" type="text" variant="outlined" color="warning"
                            select required InputLabelProps={textFieldStyle}
                            onChange={event => setType(event.target.value)} value={type}>
                            <MenuItem value="Звонок">
                                <span style={listItemStyle}>Звонок</span>
                            </MenuItem>
                            <MenuItem value="E-mail">
                                <span style={listItemStyle}>E-mail</span>
                            </MenuItem>
                            <MenuItem value="Напоминание">
                                <span style={listItemStyle}>Напоминание</span>
                            </MenuItem>
                        </TextField>
                        {
                            type === 'E-mail' && studentIdToSave !== null
                                ? <TextField
                                    sx={{'& > :not(style)': {mt: 2, mb: 2, width: '30ch'}}}
                                    label="E-mail студента" disabled variant="outlined" color="warning"
                                    inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                    value={studentIdToSave.length === 1 ? [emails] : `Кол-во почт: ${idArray.length}`}/>
                                : ''
                        }
                        <TextField
                            label="Дата" type="date" color="warning" inputProps={textFieldStyle}
                            InputLabelProps={dateTextFieldStyle} onChange={event => setDate(event.target.value)}
                            value={date} required
                            sx={{'& > :not(style)': {mt: 2, mb: 4, width: '30ch'}}}/>
                        <TextField
                            sx={{'& > :not(style)': {mb: "15px", width: '30ch'}}}
                            label="Примечания" variant="outlined" color="warning" multiline rows={3}
                            inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                            onChange={event => setComment(event.target.value)} value={comment}/>
                    </div>
                    <label className="checkbox_style_notification">
                        <input type="checkbox" onClick={handleClickContract}/>Вы уверены, что хотите добавить?
                    </label>
                    <div className="button_position_notification">
                        <Badge badgeContent={idArray !== undefined && idArray.length} color="warning">
                            <button type="submit" className="button_style_contract_doc"
                                    disabled={activeClick}>Добавить
                            </button>
                        </Badge>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTaskModalWindow;