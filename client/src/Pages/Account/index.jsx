import React from 'react';
import './Account.css';
import {Header} from "../../components/common";
import TextField from "@mui/material/TextField";
import CollapsibleTable from "../../components/common/notification";
import jwt_decode from "jwt-decode";

function Index(){
    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }

    const decodedToken = jwt_decode(localStorage.getItem('jwt'))

    return(
        <>
            <Header/>
            <div className="container_account">
                <div className="left_side_container_account">
                    <div className="container_information">
                        <div className="title_container_information">Ваши данные</div>
                        <TextField label="Ф.И.О." variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.name}
                                   required size="small" sx={{width: "400px",marginTop: "50px"}}
                                   />
                        <TextField label="Роль в системе" variant="outlined" color="warning" type="text"
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.role}
                                   required size="small" sx={{width: "400px",marginTop: "30px"}} inputProps={propsStyle}
                        />
                        <TextField label="Почта" variant="outlined" color="warning" type="text" inputProps={propsStyle}
                                   margin='normal' InputLabelProps={propsStyle}
                                   required size="small" sx={{width: "400px",marginTop: "30px"}}
                        />
                        <TextField label="Логин" variant="outlined" color="warning" type="text"
                                   margin='normal' InputLabelProps={propsStyle} value={decodedToken.email}
                                   required size="small" sx={{width: "400px",marginTop: "30px"}} inputProps={propsStyle}
                        />
                        <div className="button_container_information_position">
                            <button className="change_parameters_button">Редактировать профиль*</button>
                            <button className="change_password">Сменить пароль</button>
                        </div>
                    </div>
                    <div className="users_table">
                        <div className="title_container_information">Список пользователей</div>
                    </div>
                </div>
                <div className="right_side_container_account">
                    <div className="container_table_notification">
                        <div className="title_container_information">Список задач</div>
                        <div className="table_notification"><CollapsibleTable/></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index;
