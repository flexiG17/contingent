import './Searchbar.css';
import  Search  from './Search/Search';
import AddIcon from '@mui/icons-material/Add';
import {
    NavLink
  } from "react-router-dom";


function Searchbar() {

        return(
        <div className="nav">

            <NavLink className="add_student_btn" to="/AddStudent"> Добавить студента <AddIcon/></NavLink>
            
            <div className="serchbar_position"> <Search placeholder = "Введите данные для поиска..."/></div> 

        </div>
        )
}   

export default Searchbar;