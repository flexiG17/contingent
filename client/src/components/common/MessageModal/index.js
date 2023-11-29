import React, {useState} from "react"
import '../CreateTaskModal/Modal.css'
import '../../../Pages/Account/Account.css';
import TextField from "@mui/material/TextField";
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
import {LetterTemplates} from "../../../utils/consts/letterTemplates";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from "@mui/material/Tooltip";
import iziToast from "izitoast";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {lineStyleInTable, textFieldStyle} from "../../../utils/consts/styles";
import {Link} from "react-router-dom";
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

const ModalMessage = ({active, setActive, studentEmail}) => {
    let options = []
    LetterTemplates.map((template) => {
        options.push({value: template.message, label: template.title})
    })
    const [openDialog, setOpenDialog] = useState(false)
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [openEmailList, setOpenEmailList] = useState(false)
    const [template, setTemplate] = useState()
    const [filesToSend, setFilesToSend] = useState(null);
    const [sender, setSender] = useState('Подготовительное отделение для иностранных учащихся УрФУ')

    const dataToSave = new FormData()

    const handleTypeSelect = e => {
        setTemplate(e.value);
        setText(e.value)
    }
    const mailtoHref = `mailto:${studentEmail.map(student => student.email)}?subject=${subject}&body`

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <div className="container_position">
                        <div className="title_message_container">Новое письмо</div>
                        <div className="input_position_message">
                            <TextField label="От кого" variant="outlined" color="warning" type="text"
                                       inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
                                       value={sender} margin='normal'
                                       onChange={e => setSender(e.target.value)}
                                       size="small" sx={{width: "530px", marginTop: "25px"}}
                            />
                            <div className={'template_in_row_with_icon'}>
                            <Box
                                sx={{
                                    bgcolor: openEmailList ? '#FFB953' : '#FFAA2D',
                                    borderRadius: '5px',
                                    maxHeight: 170,
                                    minWidth: 300,
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
                                        primaryTypographyProps={textFieldStyle}
                                        sx={{my: 0, mt: 0.3}}
                                    />
                                </ListItemButton>
                                {openEmailList &&
                                    studentEmail.map((item) => (
                                        <ListItemButton
                                            key={item.id}
                                            sx={{
                                                background: '#FFD89D',
                                                pt: '5px',
                                                pb: '5px'
                                            }}
                                        >
                                            <Link
                                                to={`/${item.education_type === "Контракт" ? 'contract' : 'quota'}/${item.id}`}
                                                target="_blank" style={lineStyleInTable}>
                                                {item.email}
                                            </Link>
                                        </ListItemButton>
                                    ))}
                            </Box>
                            <Tooltip title="Скопировать список почт">
                                <ContactMailOutlinedIcon sx={{position: 'relative', top: '15px', left: '15px'}}
                                                         onClick={() => {
                                                             const arrayStudentEmails = studentEmail
                                                                 .filter(object => object.email !== null && object.email !== '')
                                                                 .map(object => object.email)
                                                                 .join(';')

                                                             navigator.clipboard.writeText(arrayStudentEmails)
                                                                 .then(() =>
                                                                     iziToast.success({
                                                                         message: 'Список почт скопирован',
                                                                         position: 'topRight'
                                                                     })
                                                                 )
                                                         }}/>
                            </Tooltip>
                            </div>
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
                            <TextField label="Тема письма" variant="outlined" color="warning" type="text"
                                       inputProps={textFieldStyle} value={subject}
                                       onChange={e => setSubject(e.target.value)}
                                       margin='normal' InputLabelProps={textFieldStyle}
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
                            inputProps={textFieldStyle} InputLabelProps={textFieldStyle}
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
                <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Montserrat'}}>Отправка письма</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{fontFamily: 'Montserrat'}}>
                        {`На данный момент таким способом сообщение отправить нельзя. 
                        Сделайте это через Outlook, скопировав список почт (нужно нажать на значок человека).
                        
                        Если у студента почта не указана, то её не будет в скопированном списке.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{fontFamily: 'Montserrat', color: "#000"}}
                        onClick={() => {
                        /*studentEmail.map(n => {
                            dataToSave.append('to', n.email)
                        })
                        dataToSave.append('from', sender)
                        dataToSave.append('subject', subject)
                        dataToSave.append('text', text)
                        if (filesToSend)
                            Object.values(filesToSend).map(file => {
                                dataToSave.append('files', file)
                            })
                        sendMessage(dataToSave)
                            .then(() => setActive(false))
                         */
                        setOpenDialog(false)
                    }
                    }>Ок</Button>
                    {/*<Button onClick={() => {
                        setOpenDialog(false)
                    }
                    }>Нет</Button>*/}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalMessage;