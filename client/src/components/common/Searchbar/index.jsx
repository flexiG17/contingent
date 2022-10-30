import './Searchbar.css';
import Search from './Search/Filter';
import AddIcon from '@mui/icons-material/Add';
import {
    NavLink
} from "react-router-dom";


export default function Searchbar() {
// по сути не используется, потому что этот код перенесен на сами страницы, т.к. я хз как динамически передавать данные
    return (
        <div className="nav">

            <NavLink className="add_student_btn" to="/AddStudent"> Добавить студента <AddIcon/></NavLink>

            <div className="serchbar_position"><Search placeholder="Введите данные для поиска..."/></div>

        </div>
    )
}   
