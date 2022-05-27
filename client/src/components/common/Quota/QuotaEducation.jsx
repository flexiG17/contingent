import React from "react";
import './QuotaEducation.css';

function QuotaEducation() {
    return (
        <>
        <div className="columns_position">
            <div className="column_style_contract">
                <p className="tytle_contract_education"> Уровень образования</p>
                <input type="text" placeholder="Уровень полученного образования" className="input_style_contract"/>
                <input type="text" placeholder="Наименование учебного заведения" className="input_style_contract"/>
                <input type="text" placeholder="Адрес учебного заведения" className="input_style_contract"/>
                <input type="text" placeholder="Год окончания" className="input_style_contract"/>
                <input type="text" placeholder="Область образования" className="input_style_contract"/>
                <input type="text" placeholder="Контактный телефон" className="input_style_contract"/>
            </div> 
            <div className="column_style_contract">
                <p className="tytle_contract_education"> Нынешнее образование </p>
                <input type="text" placeholder="Уровень желаемого образования" className="input_style_contract"/>
                <input type="text" placeholder="Форма обучения" className="input_style_contract"/>
                <input type="text" placeholder="Образовательная организация" className="input_style_contract"/>
                <input type="text" placeholder="Код направления подготовки" className="input_style_contract"/>
                <input type="text" placeholder="Номер приказа о зачислении" className="input_style_contract"/>
                <input type="text" placeholder="Направление подготовки" className="input_style_contract"/>
                <input type="text" placeholder="Необходимость подфака" className="input_style_contract"/>
                <input type="text" placeholder="Образовательная организация подфака" className="input_style_contract"/>
                <input type="text" placeholder="Количество часов" className="input_style_contract"/>
            </div> 
        </div> 
        <div className="button_position_contract_education">
            <button type="submit" className="button_style_contract_education">Добавить</button>
        </div>
        </>
        )
}

export default QuotaEducation;