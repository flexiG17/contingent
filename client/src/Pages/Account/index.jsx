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
    ListItemText, MenuItem
} from "@mui/material";
import {changeUserData, getUsers, removeUserById} from "../../actions/user";
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import AddIcon from '@mui/icons-material/Add';
import ModalRegistration from "../../components/common/ModalRegistration";
import {getToken} from "../../utils/token";
import Tooltip from "@mui/material/Tooltip";
import {listItemStyle, textFieldStyle} from "../../utils/consts/styles";

function Index() {
    const [editMode, setEditMode] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [userList, setUserList] = useState([]);
    const [modalRegistrationActive, setModalRegistrationActive] = useState(false)

    const [userName, setUserName] = useState(jwt_decode(getToken()).name)
    const [userEmail, setUserEmail] = useState(jwt_decode(getToken()).email)
    const [userRole, setUserRole] = useState(jwt_decode(getToken()).role)
    const [userId, setUserId] = useState(jwt_decode(getToken()).userId)
    const [userPassword, setUserPassword] = useState()
    const [titleDialog, setTitleDialog] = useState(null)
    const [textDialog, setTextDialog] = useState(null)
    const [actionDialog, setActionDialog] = useState(null)

    const decodedToken = jwt_decode(getToken())
    const currentUserId = decodedToken.userId
    const isCurrentUserChanged = currentUserId === userId
    const ADMIN_ACCESS = decodedToken.role === 'Администратор'

    useEffect(() => {
        ADMIN_ACCESS && getUsers()
            .then(users => setUserList(users))
    }, [])
    const currentUser = decodedToken.userId === userId
    return (
        <>
            <Header/>
            <div className="container_account">
                <div className="left_side_container_account">
                    <div className="container_information">
                        <div
                            className="title_container_information">{currentUser ? 'Ваши данные' : `Данные пользователя ${userName}`}</div>

                        {ADMIN_ACCESS &&
                            <Tooltip title='Удалить сотрудника'>

                                <PersonRemoveOutlinedIcon sx={{ml: '87%', cursor: 'pointer'}} onClick={() => {
                                    setTitleDialog('Удаление сотрудника')
                                    setTextDialog(`Вы уверены, что хотите удалить сотрудника ${userName}?`)
                                    setActionDialog('delete')
                                    setOpenDialog(true)
                                }}/>
                            </Tooltip>}
                        <TextField label="Ф.И.О." variant="outlined" color="warning" type="text" inputProps={textFieldStyle}
                                   margin='normal' InputLabelProps={textFieldStyle} value={userName}
                                   size="small" sx={{width: "400px", marginTop: "30px"}} disabled={editMode}
                                   onChange={event => setUserName(event.target.value)}
                        />
                        <TextField type="text" label='Роль в системе' variant="outlined" color="warning" margin='normal'
                                   disabled={(ADMIN_ACCESS && editMode) || !ADMIN_ACCESS}
                                   size="small" select InputLabelProps={textFieldStyle} focused
                                   sx={{width: "400px", marginTop: "30px"}}
                                   onChange={event => setUserRole(event.target.value)} value={userRole}>
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
                        <TextField label="Логин" variant="outlined" color="warning" type="text" disabled={editMode}
                                   margin='normal' InputLabelProps={textFieldStyle} value={userEmail}
                                   size="small" sx={{width: "400px", marginTop: "30px"}}
                                   inputProps={textFieldStyle} onChange={event => setUserEmail(event.target.value)}
                        />
                        {!editMode && <TextField label="Новый пароль" variant="outlined" color="warning" type="text"
                                                 disabled={editMode} value={userPassword}
                                                 margin='normal' InputLabelProps={textFieldStyle}
                                                 size="small" sx={{width: "400px", marginTop: "30px"}}
                                                 inputProps={textFieldStyle}
                                                 onChange={event => setUserPassword(event.target.value)}
                        />}
                        <div className="button_container_information_position">
                            <button className="change_parameters_button" onClick={() => {
                                setEditMode(!editMode)
                            }}>Редактировать профиль*
                            </button>
                            {!editMode &&
                                <button className="change_password"
                                        onClick={() => {
                                            setTitleDialog('Изменение данных')
                                            setTextDialog(`Вы уверены, что хотите изменить данные сотрудника?`)
                                            setActionDialog('update')
                                            setOpenDialog(true)
                                        }}>Изменить</button>}
                        </div>
                    </div>

                    {ADMIN_ACCESS &&
                        <div className="users_table">
                            <div className="title_container_information">Список пользователей</div>
                            <button className="add_account" onClick={() => setModalRegistrationActive(true)}> Добавить
                                пользователя <AddIcon/></button>
                            <ModalRegistration active={modalRegistrationActive} setActive={setModalRegistrationActive}/>
                            {userList.map(user => {
                                return (
                                    <List
                                        sx={{cursor: 'pointer', marginBottom: '10px'}}
                                        key={user.id}
                                        onClick={() => {
                                            setUserName(user.name)
                                            setUserEmail(user.email)
                                            setUserRole(user.role)
                                            setUserId(user.id)
                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                behavior: 'smooth'
                                            });
                                        }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar/>
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
                    <div className="container_table_notification">
                        <div className="title_container_information">Список задач</div>
                        <div className="table_notification"><CollapsibleTable/></div>
                </div>
            </div>

            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{textDialog}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        if (actionDialog === 'update')
                            changeUserData({
                                name: userName,
                                email: userEmail,
                                password: userPassword,
                                role: userRole,
                                isCurrentUserChanged: isCurrentUserChanged
                            }, userId)
                        else if (actionDialog === 'delete')
                            removeUserById(userId)

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
