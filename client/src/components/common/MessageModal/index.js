import React, {useState} from "react"
import '../CreateTaskModal/Modal.css'
import '../../../Pages/Account/Account.css';
import TextField from "@mui/material/TextField";
import {sendMessage} from "../../../actions/student";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemButton, ListItemText
} from "@mui/material";
import Select from 'react-select';
import {LetterTemplates} from "../../../utils/consts";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from "@mui/material/Tooltip";
import iziToast from "izitoast";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
    const [openDialog, setOpenDialog] = useState(false)
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [openEmailList, setOpenEmailList] = useState()
    const [template, setTemplate] = useState()
    const [filesToSend, setFilesToSend] = useState(null);
    const [sender, setSender] = useState('Подготовительное отделение для иностранных учащихся УрФУ')

    const dataToSave = new FormData()

    const handleTypeSelect = e => {
        setTemplate(e.value);
        setText(e.value)
    }
    const mailtoHref = `mailto:${studentEmail}?subject=${subject}&body`

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <div className="container_position">
                        <div className="title_message_container">Новое письмо</div>
                        <div className="input_position_message">
                            <TextField label="От кого" variant="outlined" color="warning" type="text"
                                       inputProps={propsStyle}
                                       value={sender}
                                       margin='normal' InputLabelProps={propsStyle}
                                       onChange={e => setSender(e.target.value)}
                                       size="small" sx={{width: "530px", marginTop: "25px"}}
                            />

                            <Box
                                sx={{
                                    bgcolor: openEmailList ? '#FFB953' : '#FFAA2D',
                                    borderRadius: '5px',
                                    maxHeight: 170,
                                    maxWidth: 300,
                                    overflowY: openEmailList ? 'scroll' : 'visible',
                                    marginTop: "8px"
                                }}
                            >
                                <ListItemButton
                                    alignItems="flex-start"
                                    onClick={() => setOpenEmailList(!openEmailList)}
                                    sx={{
                                        px: 1,
                                        pl: -10,
                                        pb: openEmailList ? 0 : 2.5,
                                        '&:hover, &:focus': {'& svg': {opacity: openEmailList ? 1 : 0}},
                                        height: '40px',
                                    }}
                                >
                                    <ListItemText
                                        primary={`Список почт при рассылке (${studentEmail.length})`}
                                        primaryTypographyProps={propsStyle}
                                        sx={{my: 0, mt: 0.3}}
                                    />
                                </ListItemButton>
                                {openEmailList &&
                                    studentEmail.map((item) => (
                                        <ListItemButton
                                            key={item}
                                            sx={{
                                                background: '#FFD89D',
                                                pt: '5px',
                                                pb: '5px'
                                            }}
                                        >
                                            <ListItemText
                                                primary={item}
                                                primaryTypographyProps={{
                                                    fontSize: 14,
                                                    fontFamily: ['Montserrat'],
                                                    fontWeight: '450'
                                                }}
                                            />
                                        </ListItemButton>
                                    ))}
                            </Box>
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
                        <a className='send_with_other_mail' href={mailtoHref}>Отправить с другой почты</a>
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
                        <label htmlFor="input_students" className='file_input_message'>
                            {filesToSend === null ? 'Выбрать файл' : `Добавлено ${filesToSend.length} файла`}
                            <input type="file" name='input_students' id='input_students' hidden multiple
                                   onChange={e => {
                                       setFilesToSend(e.target.files);
                                   }}/>
                            <InsertDriveFileIcon sx={{ml: 1, fontSize: 15}}/>
                        </label>

                        <button className="send_message" onClick={() => setOpenDialog(true)}> Отправить сообщение
                        </button>
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
                        dataToSave.append('to', studentEmail)
                        dataToSave.append('from', sender)
                        dataToSave.append('subject', subject)
                        dataToSave.append('text', text)
                        Object.values(filesToSend).map(file => {
                            dataToSave.append('files', file)
                        })
                        sendMessage(dataToSave)
                            .then(() => {
                                setActive(false)
                            })
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