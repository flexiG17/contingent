import React from "react";
import {Header, PersonalCard} from "../components/common";
import './PersonalCard.css';


function CreatePersonalCard() {
    return (
        <>
            <Header/>
            <div className="container_AddStudent">
                <p className="title_AddStudent">Добавить студента</p>
                <PersonalCard/>
            </div>
        </>
    )
}

export default CreatePersonalCard;