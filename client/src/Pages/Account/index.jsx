import React, {useState} from 'react';
import './Account.css';
import {Header} from "../../components/common";
import TextField from "@mui/material/TextField";
import CollapsibleTable from "../../components/common/notification";
import jwt_decode from "jwt-decode";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


function Index() {
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

    const decodedToken = jwt_decode(localStorage.getItem('jwt'))
    const ADMIN_ACCESS = decodedToken.role === 'Администратор'

    return (
        <>
            <Header/>
            <div className="container_account">
                <div className="left_side_container_account">
                    <div className="container_information">
                        <div className="title_container_information">Ваши данные</div>
                        <TextField label="Ф.И.О." variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.name}
                                   size="small" sx={{width: "400px", marginTop: "50px"}} disabled={editMode}
                        />
                        <TextField label="Роль в системе" variant="outlined" color="warning" type="text" disabled
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.role}
                                   size="small" sx={{width: "400px", marginTop: "30px"}}
                                   inputProps={propsStyle}
                        />
                        <TextField label="Логин" variant="outlined" color="warning" type="text" disabled={editMode}
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.email}
                                   size="small" sx={{width: "400px", marginTop: "30px"}}
                                   inputProps={propsStyle}
                        />
                        {!editMode && <TextField label="Новый пароль" variant="outlined" color="warning" type="text"
                                                 disabled={editMode}
                                                 margin='normal' InputLabelProps={propsStyle}
                                                 size="small" sx={{width: "400px", marginTop: "30px"}}
                                                 inputProps={propsStyle}
                        />}
                        <div className="button_container_information_position">
                            <button className="change_parameters_button" onClick={() => {
                                setEditMode(!editMode)
                            }}>Редактировать профиль*
                            </button>
                            {!editMode && <button className="change_password"
                                                  onClick={() => setOpenDialog(true)}>Изменить</button>}
                        </div>
                    </div>

                    {ADMIN_ACCESS &&
                        <div className="users_table">
                            <div className="title_container_information">Список пользователей</div>
                        </div>}
                </div>
                <div className="right_side_container_account">
                    <div className="container_table_notification">
                        <div className="title_container_information">Список задач</div>
                        <div className="table_notification"><CollapsibleTable/></div>
                    </div>
                </div>
            </div>

            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Изменение информации</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите изменить данные пользователя?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        // тут запрос на бэк
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

export default Index;
