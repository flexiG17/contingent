import React,{useState} from "react";
import "./QuotaDoc.css";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './QuotaEducation.css'
import './QuotaInfo.css'


function QuotaDoc() {

    const[active, setActive] = useState(true);
    const handleClickContract = () =>{
        setActive(!active)
    }

    return (
        <>
        <div className="info_and_education_quota">
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
        </div>
        <div className="info_and_education_quota">
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
        </div>
        <div className="info_and_education_quota">
            <div className="columns_position">
                <div className="column_style_contract">
                    <p className="tytle_contract_doc"> Уровень образования</p>
                    <input type="text" placeholder="Дата въезда" className="input_style_contract"/>
                    <input type="text" placeholder="Срок действия визы" className="input_style_contract"/>
                    <input type="text" placeholder="Рег. номер направления" className="input_style_contract"/>
                    <input type="text" placeholder="Дата передачи в международную службу" className="input_style_contract"/>
                    <input type="text" placeholder="Дата передачи в МВД" className="input_style_contract"/>
                    <input type="text" placeholder="Ориентировочная дата получения" className="input_style_contract"/>
                    <input type="text" placeholder="Фактическая дата получения приглашения" className="input_style_contract"/>
                </div>
                <div className="column_style_contract">
                    <p className="tytle_contract_doc_contaner"> Документы для загрузки в личную карточку контрактника </p>
                    <p className="Doc_list">1) Фото паспорта со сроком действия (.PDF)</p>
                    <p className="Doc_list">2) Перевод паспорта на русский язык (.PDF)</p>
                    <p className="Doc_list">3) Визовая анкета (.PDF)</p>
                    <p className="Doc_list">4) Документ, подтверждающий факт оплаты (.PDF)</p>
                    <p className="Doc_list">5) Удостоверение личности(.PDF)</p>
                    <p className="Doc_list">6) Перевод удостоверения личности(.PDF)</p>
                    <input type="file" id="actual-btn" hidden/>
                    <label for="actual-btn" className="label_doc"> Выберите файлы <InsertDriveFileIcon sx={{ fontSize: 20 }}/></label>
                </div>
            </div>
        </div>
            <label className="checkbox_style_contract">
                <input type="checkbox" onClick={handleClickContract}/> Вы уверены, что хотите добавить студента?
            </label>
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc"  disabled={active}>Добавить</button>
        </div>
        </>
        )
}

export default QuotaDoc;