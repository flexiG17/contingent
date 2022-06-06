import React,{useState}from "react";
import './Notification.css';
import Calls from "./Calls";
import Tasks from "./Tasks";
import Email from "./Email";

function Notification() {

    const [isActiveCalls, setIsActiveCalls] = useState(false);
    const [isActiveEmail, setIsActiveEmail] = useState(true);
    const [isActiveTasks, setIsActiveTasks] = useState(true);

    const handleClickCalls = () => {
        setIsActiveCalls(false)
        setIsActiveEmail(true);
        setIsActiveTasks(true);
    };

    const handleClickEmail = () => {
        setIsActiveCalls(true)
        setIsActiveEmail(false);
        setIsActiveTasks(true);
    };

    const handleClickTasks = () => {
        setIsActiveCalls(true)
        setIsActiveEmail(true);
        setIsActiveTasks(false);
    };

        return(
        <>
            <div className="nav_contract">
                <button onClick={handleClickCalls} type="button" disabled={isActiveTasks && isActiveEmail}  className="button_style_subnav">Звонки</button>
                <button onClick={handleClickEmail} type="button" disabled={isActiveTasks && isActiveCalls} className="button_style_subnav">E-mail</button>
                <button onClick={handleClickTasks} type="button" disabled={isActiveCalls && isActiveEmail} className="button_style_subnav">Задачи</button>
            </div>
            { !isActiveCalls && <Calls/> }

            { !isActiveEmail && <Email/> }

            { !isActiveTasks && <Tasks/> }
        </>
    )
}

export default Notification;