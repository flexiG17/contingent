import {React, useState} from 'react';
import './Navbar.css'
import {
  NavLink
} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../Navbar/no-avatar.png';




function Navbar () {
  
  const [isActive,setIsActive] = useState (false)

  return (
    
    <section className="navbar">
        <NavLink to="/HomePage" className="navbar__item"> <HomeIcon sx={{ fontSize: 20 }}/> <div className="nav__pad"> Главная </div></NavLink>
        <div className="account"> {/*dropdown */}
          <div className="dropdown_btn_account" onClick={(e) => setIsActive(!isActive)}><PersonIcon sx={{ fontSize: 20 }} />  <div className="nav__pad"> Личный кабинет </div> </div> {/*dropdown_btn */}

          {isActive && (
            <div className="dropdown_content_account"> {/*dropdown_content */}
            <div className="user_account"> <div className="user_name_accoutn"> Иванов И. И. </div></div>
            <NavLink to="/Massages" className="mail_button_account"><EmailIcon sx={{ fontSize: 19 }} /> <div className="nav__pad"> Уведомления </div> </NavLink>
            <NavLink to="/" className="exit_button_account"><ExitToAppIcon sx={{ fontSize: 19 }} /> <div className="nav__pad"> Выход </div> </NavLink >
          </div>
          )}
          
        </div>
  </section>
  )
}

export default Navbar;


/*<NavLink to="/Massages" className="navbar__item"><EmailIcon sx={{ fontSize: 20 }} /> <div className="nav__pad"> Уведомления </div> </NavLink>
<NavLink to="/" className="navbar__item"><ExitToAppIcon sx={{ fontSize: 20 }} /> <div className="nav__pad"> Выход </div> </NavLink >*/