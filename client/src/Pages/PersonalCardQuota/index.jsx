import React from "react";
import {Header, PersonalCardQuota} from "../../components/common";
import './PersonalCardQuota.css';


function CreatePersonalQuotaCard() {
    return (
        <>
            <Header/>
            <div className="container_AddStudent">
                <PersonalCardQuota/>
            </div>
        </>
    )
}

export default CreatePersonalQuotaCard;