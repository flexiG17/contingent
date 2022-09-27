import React from "react";
import {Header, Quota, Contract} from "../../components/common";
import './AddStudent.css';
import {useState} from 'react';


function AddStudent() {

    const [isActiveContract, setIsActiveContract] = useState(false);
    const [isActiveQuota, setIsActiveQuota] = useState(true);

    const handleClickContract = () => {
        setIsActiveQuota(!isActiveQuota);
        setIsActiveContract(!isActiveContract);
    };

    const handleClickQuota = () => {
        setIsActiveContract(!isActiveContract);
        setIsActiveQuota(!isActiveQuota);
    };

    return (
        <>
            <Header/>
            <div className="container_AddStudent">
                <p className="title_AddStudent">Добавить студента</p>
                <div className="button_position_addStud">
                    <button onClick={handleClickContract} type="button" disabled={isActiveQuota}
                            className="button_style_addStudent">Контракт
                    </button>
                    <button onClick={handleClickQuota} type="button" disabled={isActiveContract}
                            className="button_style_addStudent">Квота
                    </button>
                </div>
                {
                    isActiveContract ? <Quota/> : <Contract/>
                }
            </div>
        </>
    )
}

export default AddStudent;