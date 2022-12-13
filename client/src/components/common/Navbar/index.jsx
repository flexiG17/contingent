import {useState, useEffect} from 'react';
import './Navbar.css'
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import jwt_decode from 'jwt-decode'
import {HOME_ROUTE, ACCOUNT_ROUTE} from "../../../utils/consts";
import {getCountNotifications} from "../../../actions/notification";
import IconButton from "@mui/material/IconButton";
import {Badge} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {dropToken, getToken} from "../../../utils/token";

export default function Navbar() {
    const [countOfNotifications, setCountOfNotifications] = useState('')

    let tokenName = ''
    let userName = ''
    let decodedToken = jwt_decode(getToken())
    try {
        if (getToken()){
            tokenName = decodedToken.name.split(' ')
            userName =  tokenName.length === 2 ? `${tokenName[0]} ${tokenName[1]}` : tokenName
        }
    } catch (e) {
        userName = "Не авторизовано"
    }


    useEffect(() => {
        getCountNotifications()
            .then(data => setCountOfNotifications(data))
    }, [])
    const [isActive, setIsActive] = useState(false)

    return (
        <section className="navbar">
            <NavLink to={HOME_ROUTE} className="navbar__item"> <HomeIcon sx={{fontSize: 20}}/>
                <div className="nav__pad">Главная</div>
            </NavLink>
            <div className="account">
                <div className="dropdown_btn_account" onClick={() => setIsActive(!isActive)}>
                    <NavLink to={ACCOUNT_ROUTE}>
                        <IconButton aria-label={countOfNotifications}>
                            <Badge badgeContent={countOfNotifications} color="info">
                                <EmailIcon sx={{fontSize: 19, color: "#FA7A45"}}/>
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <div className="nav__pad"> Личный кабинет</div>
                </div>

                {isActive && (
                    <div className="dropdown_content_account">
                        <div className="user_account">
                            <div className="user_name_account">{userName}</div>
                        </div>

                        <NavLink to={ACCOUNT_ROUTE} className="account_button_account">
                            <PersonIcon sx={{fontSize: 19}}/>
                            <div className="nav__pad"> Личный кабинет </div>
                        </NavLink>
                        <button
                            className="exit_button_account"
                            onClick={() => {
                                dropToken()
                                window.location.reload()
                            }}><ExitToAppIcon sx={{fontSize: 19}}/>
                            <div className="nav__pad">Выход</div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}


