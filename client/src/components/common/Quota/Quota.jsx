import React from 'react';
import './Quota.css';
import { useState } from 'react';
import QuotaDoc from './QuotaDoc';
import QuotaEducation from './QuotaEducation';
import QuotaInfo from './QuotaInfo';



function Quota() {

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
            <div className="nav_quota">
                <button onClick={handleClickInfo} type="button" disabled={isActiveDoc && isActiveEducation}  className="button_style_subnav">Личная информация</button>
                <button onClick={handleClickEducation} type="button" disabled={isActiveDoc && isActiveInfo} className="button_style_subnav">Образование</button>
                <button onClick={handleClickDoc} type="button" disabled={isActiveInfo && isActiveEducation} className="button_style_subnav">Документы и оплата</button>
            </div>
            { !isActiveInfo && <QuotaInfo/> }
            
            { !isActiveEducation && <QuotaEducation/> }
            
            { !isActiveDoc && <QuotaDoc/> }
            </>
            )
}

export default Quota;