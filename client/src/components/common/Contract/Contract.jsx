import React from 'react';
import { useState } from 'react';
import InfoContract from './InfoContract';
import DocContract from './DocContract';
import EducationContract from './EducationContract';
import './Contract.css';

function Contract() {
    const [isActiveInfo, setIsActiveInfo] = useState(false);
    const [isActiveEducation, setIsActiveEducation] = useState(true);
    const [isActiveDoc, setIsActiveDoc] = useState(true);
    
    const handleClickInfo = () => {
        setIsActiveInfo(false)
        setIsActiveEducation(true);
        setIsActiveDoc(true);
       };

    const handleClickEducation = () => {
        setIsActiveInfo(true)
        setIsActiveEducation(false);
        setIsActiveDoc(true);
    };

    const handleClickDoc = () => {
        setIsActiveInfo(true)
        setIsActiveEducation(true);
        setIsActiveDoc(false);
    };

    return (
            <>
            <div className="nav_contract">
                <button onClick={handleClickInfo} type="button" disabled={isActiveDoc && isActiveEducation}  className="button_style_subnav">Личная информация</button>
                <button onClick={handleClickEducation} type="button" disabled={isActiveDoc && isActiveInfo} className="button_style_subnav">Образование</button>
                <button onClick={handleClickDoc} type="button" disabled={isActiveInfo && isActiveEducation} className="button_style_subnav">Документы и оплата</button>
            </div>
            { !isActiveInfo && <InfoContract/> }
            
            { !isActiveEducation && <EducationContract/> }
            
            { !isActiveDoc && <DocContract/> }
            </>
            )
}

export default Contract;