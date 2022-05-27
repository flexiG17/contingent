import React from 'react';
import "./DocContract.css";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


function DocContract() {
   
    return (
            <>
            <div className="columns_position">
                <div className="column_style_contract">
                    <p className="tytle_contract_doc"> Уровень образования</p>
                    <input type="text" placeholder="Дата въезда" className="input_style_contract"/>
                    <input type="text" placeholder="Срок действия визы" className="input_style_contract"/>
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
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc">Добавить</button>
            </div>
            </>
            )
}

export default DocContract;