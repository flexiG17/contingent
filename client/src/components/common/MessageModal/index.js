import React, {useState} from "react"
import '../ModalWindow/Modal.css'
import '../../../Pages/Account/Account.css';
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import {sendMessage} from "../../../actions/student";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Select from 'react-select';
import {getToken} from "../../../utils/token";
import {LetterTemplates} from "../../../utils/consts";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Link} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import iziToast from "izitoast";

const ModalMessage = ({active, setActive, studentEmail}) => {
    let options = []
    LetterTemplates.map((template) => {
        options.push({value: template.message, label: template.title})
    })
    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }
    const destination = Array(studentEmail)
    const [openDialog, setOpenDialog] = useState(false)
    //const [destination, setDestination] =  useState()
    const [subject, setSubject] = useState()
    const [text, setText] = useState()
    const [sender, setSender] = useState()
    const [template, setTemplate] = useState()

    const data = {
        to: destination,
        subject: subject,
        text: text
    }
    const handleTypeSelect = e => {
        setTemplate(e.value);
        setText(e.value)
    }
    const mailtoHref = `mailto:${destination}?subject=${subject}&body`

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <div className="container_position">
                        <div className="title_message_container">Новое письмо</div>
                        <div className="input_position_message">
                            <TextField label="От кого" variant="outlined" color="warning" type="text"
                                       inputProps={propsStyle}
                                       value='Подготовительное отделение для иностранных учащихся УрФУ'
                                       margin='normal' InputLabelProps={propsStyle}
                                       onChange={e => setSender(e.target.value)}
                                       size="small" sx={{width: "530px", marginTop: "25px"}}
                            />
                            <a className='send_with_other_mail' href={mailtoHref}>Отправить с другой почты</a>

                            <TextField label="Кому" variant="outlined" color="warning" type="text"
                                       inputProps={propsStyle}
                                       margin='normal' InputLabelProps={propsStyle} value={studentEmail} disabled
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                            <div className={'template_in_row_with_icon'}>
                                <Select className="message_type" placeholder="Шаблоны письма" options={options}
                                        onChange={handleTypeSelect}
                                        value={options.filter(function (option) {
                                            return option.value === template;
                                        })}/>
                                <Tooltip title="Скопировать шаблон">
                                    <ContentCopyIcon sx={{cursor: 'pointer', marginTop: '22px', marginLeft: '15px'}}
                                                     onClick={() => {
                                                         navigator.clipboard.writeText(text === undefined ? 'Ничего не скопировано' : text)
                                                             .then(() =>
                                                                 iziToast.success({
                                                                     message: 'Шаблон скопирован',
                                                                     position: 'topRight'
                                                                 })
                                                             )
                                                     }}/>
                                </Tooltip>
                            </div>
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
                            focused
                            multiline value={text} onChange={e => setText(e.target.value)}
                            rows={8}
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
                            <button className="send_message" onClick={() => setOpenDialog(true)}> Отправить сообщение
                            </button>
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
                        setActive(false)
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