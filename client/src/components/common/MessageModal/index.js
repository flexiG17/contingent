import React,{useState} from "react"
import '../ModalWindow/Modal.css'
import '../../../Pages/Account/Account.css';
import TextField from "@mui/material/TextField";




const ModalMessage = ({active, setActive}) => {
    const [editMode, setEditMode] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }
    return(
            <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
                <div className="modal_content" onClick={e => e.stopPropagation()}>
                    <div className="container_position">
                        <div className="title_message_container"> Новое письмо</div>
                        <div className="input_position_message">
                            <TextField label="От кого" variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                       margin='normal' InputLabelProps={propsStyle}
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                            <TextField label="Кому" variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                       margin='normal' InputLabelProps={propsStyle}
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                            <TextField label="Тема пиьсма" variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                       margin='normal' InputLabelProps={propsStyle}
                                       size="small" sx={{width: "300px", marginTop: "25px"}}
                            />
                        </div>
                        <TextField
                            className="input_message_sms"
                            label="Текст письма"
                            multiline
                            rows={5}
                            variant="outlined"
                            sx={{width: "800px", marginTop: "15px", marginBottom: "25px",marginRight:"auto", marginLeft:"auto"}}
                            inputProps={propsStyle} InputLabelProps={propsStyle}
                            color="warning"
                        />
                        <div className="button_message_position">
                            <button className="send_message"> Отправить сообщение</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ModalMessage;