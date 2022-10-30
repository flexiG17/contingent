import React from "react";
import {Header, PersonalCardContract} from "../../components/common";
import './PersonalCardContract.css';


function CreatePersonalContractCard() {
    return (
        <>
            <Header/>
            <div className="container_AddStudent">
                <PersonalCardContract/>
            </div>
        </>
    )
}

export default CreatePersonalContractCard;