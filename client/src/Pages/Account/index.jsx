import React, {useEffect, useState} from 'react';
import './Account.css';
import {Header} from "../../components/common";
import TextField from "@mui/material/TextField";
import CollapsibleTable from "../../components/common/notification";
import jwt_decode from "jwt-decode";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, List, ListItem, ListItemAvatar,
    ListItemText
} from "@mui/material";
import {changeUserData, getUsers} from "../../actions/user";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";


function FolderIcon() {
    return null;
}

function DeleteIcon() {
    return null;
}

function Index() {
    const [editMode, setEditMode] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [userList, setUserList] = useState([]);

    const [userName, setUserName] = useState(jwt_decode(localStorage.getItem('jwt')).name)
    const [userEmail, setUserEmail] = useState(jwt_decode(localStorage.getItem('jwt')).email)
    const [userRole, setUserRole] = useState(jwt_decode(localStorage.getItem('jwt')).role)
    const [userId, setUserId] = useState(jwt_decode(localStorage.getItem('jwt')).id)
    const [userPassword, setUserPassword] = useState()

    const dataToChange = {
        name: userName,
        email: userEmail,
        password: userPassword,
        role: userRole
    }

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

    useEffect(() => {
        ADMIN_ACCESS && getUsers()
            .then(users => setUserList(users))
    }, [])

    const currentUser = decodedToken.id === userId

    return (
        <>
            <Header/>
            <div className="container_account">
                <div className="left_side_container_account">
                    <div className="container_information">
                        <div
                            className="title_container_information">{currentUser ? 'Ваши данные' : `Данные пользователя ${userName}`}</div>
                        <TextField label="Ф.И.О." variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                   margin='normal' InputLabelProps={propsStyle} value={userName}
                                   size="small" sx={{width: "400px", marginTop: "30px"}} disabled={editMode}
                                   onChange={event => setUserName(event.target.value)}
                        />
                        <TextField label="Роль в системе" variant="outlined" color="warning" type="text"
                                   disabled={(ADMIN_ACCESS && editMode) || !ADMIN_ACCESS}
                                   margin='normal' InputLabelProps={propsStyle} value={userRole}
                                   size="small" sx={{width: "400px", marginTop: "30px"}}
                                   inputProps={propsStyle} onChange={event => setUserRole(event.target.value)}
                        />
                        <TextField label="Логин" variant="outlined" color="warning" type="text" disabled={editMode}
                                   margin='normal' InputLabelProps={propsStyle} value={userEmail}
                                   size="small" sx={{width: "400px", marginTop: "30px"}}
                                   inputProps={propsStyle} onChange={event => setUserEmail(event.target.value)}
                        />
                        {!editMode && <TextField label="Новый пароль" variant="outlined" color="warning" type="text"
                                                 disabled={editMode} value={userPassword}
                                                 margin='normal' InputLabelProps={propsStyle}
                                                 size="small" sx={{width: "400px", marginTop: "30px"}}
                                                 inputProps={propsStyle}
                                                 onChange={event => setUserPassword(event.target.value)}
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
                            {userList.map(user => {
                                return (
                                    <List
                                        sx={{cursor: 'pointer', marginBottom: '10px'}}
                                        onClick={() => {
                                            setUserName(user.name)
                                            setUserEmail(user.email)
                                            setUserRole(user.role)
                                            setUserId(user.id)
                                        }}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.name}
                                                secondary={user.role}
                                            />
                                        </ListItem>
                                    </List>
                                )
                            })}
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
                        changeUserData(dataToChange, userId)
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
