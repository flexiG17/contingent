import React from 'react';
import './InfoContacts.css';

function InfoContract() {

    return (
            <>
            <div className="columns_position">
                <div className="column_style_contract">
                    <p className="tytle_contract_info"> Личные данные</p>
                    <input type="text" placeholder="Имя" className="input_style_contract"/>
                    <input type="text" placeholder="Фамилия" className="input_style_contract"/>
                    <input type="text" placeholder="Name" className="input_style_contract"/>
                    <input type="text" placeholder="Secont name" className="input_style_contract"/>
                    <p className="tytle_contract_info"> Контактные данные</p>
                    <input type="text" placeholder="Контактный телефон" className="input_style_contract"/>
                    <input type="text" placeholder="E-mail" className="input_style_contract"/>
                </div> 
                <div className="column_style_contract">
                    <p className="tytle_contract_info"> Паспортные данные </p>
                    <input type="text" placeholder="Страна" className="input_style_contract"/>
                    <input type="text" placeholder="Место рождения" className="input_style_contract"/>
                    <input type="text" placeholder="Дата рождения" className="input_style_contract"/>
                    <input type="text" placeholder="Место проживания" className="input_style_contract"/>
                    <input type="text" placeholder="Гражданство" className="input_style_contract"/>
                    <input type="text" placeholder="Пол" className="input_style_contract"/>
                    <input type="text" placeholder="Номер паспорта" className="input_style_contract"/>
                    <input type="text" placeholder="Срок действия паспорта" className="input_style_contract"/>
                    <input type="text" placeholder="Кем выдан" className="input_style_contract"/>
                    <input type="text" placeholder="Дата выдачи" className="input_style_contract"/>
                </div> 
            </div> 
            <div className="button_position_contract_info">
                <button type="submit" className="button_style_contract_info">Добавить</button>
            </div>
            </>
            )
}

export default InfoContract;