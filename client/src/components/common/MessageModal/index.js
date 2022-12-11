import React, {useState} from "react"
import '../ModalWindow/Modal.css'
import '../../../Pages/Account/Account.css';
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import {sendMessage} from "../../../actions/student";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Select from 'react-select';

const ModalMessage = ({active, setActive, studentEmail}) => {
    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }
    const [openDialog, setOpenDialog] = useState(false)
    //const [destination, setDestination] =  useState()
    const [subject, setSubject] =  useState()
    const [text, setText] =  useState()

    const data = {
        to: Array(studentEmail),
        subject: subject,
        text: text
    }

    const options = [
        { value: 'type1', label: 'Первый шаблон' },
        { value: 'type2', label: 'Второй шаблон' },
        { value: 'type3', label: 'Третий шаблон' }
    ]

    const decodeToken = jwt_decode(localStorage.getItem('jwt'))
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <div className="container_position">
                        <div className="title_message_container">Новое письмо</div>
                        <div className="input_position_message">
                            <TextField label="От кого" variant="outlined" color="warning" type="text"
                                       inputProps={propsStyle} value={decodeToken.email} disabled
                                       margin='normal' InputLabelProps={propsStyle}
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                            <TextField label="Кому" variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                       margin='normal' InputLabelProps={propsStyle} value={studentEmail} disabled
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                            <Select className="message_type" placeholder="Шаблоны письма" options={options}/>
                            <TextField label="Тема пиьсма" variant="outlined" color="warning" type="text"
                                       inputProps={propsStyle} value={subject}
                                       onChange={e => setSubject(e.target.value)}
                                       margin='normal' InputLabelProps={propsStyle}
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                        </div>
                        <TextField
                            className="input_message_sms"
                            label="Текст письма"
                            multiline value={text} onChange={e => setText(e.target.value)}
                            rows={5}
                            variant="outlined"
                            sx={{
                                width: "800px",
                                marginTop: "15px",
                                marginBottom: "25px",
                                marginRight: "auto",
                                marginLeft: "auto"
                            }}
                            inputProps={propsStyle} InputLabelProps={propsStyle}
                            color="warning"
                        />
                        <div className="button_message_position">
                            <label className="confirm_message">
                                Вы действительно хотите отправить письмо?
                                <input type="checkbox" name = "confirm_message"/>
                            </label>
                            <button className="send_message" onClick={() => setOpenDialog(true)}> Отправить сообщение</button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Отправка письма</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите отправить сообщение?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        sendMessage(data)
                        setOpenDialog(false)
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpenDialog(false)
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalMessage;