import React, {useState, useRef} from 'react';
import {addStudent} from '../../../actions/student';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import './Contract.css';
import {listItemStyle, propsDataStyle, propsStyle} from "../../../utils/consts/styles";

export default function Contract() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active);
    };

    const navigate = useNavigate();

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(formRef.current);
        data.append('education_type', 'Контракт');

        addStudent(data, navigate);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="info_and_education_container">
                <div className="title_contract_section">Основные данные студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Личные данные</p>
                        <TextField label="Ф.И.О. (лат.)" name='latin_name' variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   required size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField label="Ф.И.О. (кир.)" name='russian_name' variant="outlined" color="warning"
                                   type="text" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='RF_location' label="Нахождение в РФ" type="text" variant="outlined"
                                   color="warning" margin='normal' select size="small" defaultValue=''
                                   InputLabelProps={propsStyle}>
                            <MenuItem value="Да">
                                <span style={listItemStyle}>Да</span>
                            </MenuItem>
                            <MenuItem value="Нет">
                                <span style={listItemStyle}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <p className="title_contract_doc"> Контактные данные</p>
                        <TextField name='contact_phone_number' label="Контактный телефон студента" variant="outlined"
                                   color="warning" type="tel" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='student_email' label="E-mail студента" variant="outlined" color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <p className="title_contract_doc"> Контактные данные агента</p>
                        <TextField name='agent_name' label="Ф.И.О." variant="outlined" color="warning" type="text"
                                   margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='agent_phone_number' label="Телефон" variant="outlined" color="warning"
                                   type="tel" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='agent_email' label="E-mail" variant="outlined" color="warning" type="email"
                                   margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <p className="title_contract_doc"> Контактные данные представителя</p>
                        <TextField name='representative_name' label="Ф.И.О." type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='representative_phone_number' label="Телефон" type="tel" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='representative_email' label="E-mail" type="email" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Паспортные данные </p>
                        <TextField label="Страна" name='country' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='birth_place' label="Место рождения" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField label="Дата рождения" name='birth_date' type="date" color="warning"
                                   required margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='residence_place' label="Место проживания" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='citizenship' label="Гражданство" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='gender' label="Пол" type="text" variant="outlined" defaultValue=''
                                   color="warning" margin='normal' size="small" required select
                                   InputLabelProps={propsStyle}>
                            <MenuItem value="Мужской">
                                <span style={listItemStyle}>Мужской</span>
                            </MenuItem>
                            <MenuItem value="Женский">
                                <span style={listItemStyle}>Женский</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='passport_number' label="Номер паспорта" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" required
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='passport_expiration' label="Срок действия паспорта" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='passport_issued' label="Кем выдан" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='passport_issue_date' label="Дата выдачи" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="title_contract_section">Образование студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Уровень образования</p>
                        <TextField name='level_education' label="Уровень полученного образования" type="text"
                                   variant="outlined" sx={{width: "325px"}}
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='name_educational_institution' label="Наименование учебного заведения"
                                   type="text" variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <p className="tytle_contract_education"> Нынешнее образование </p>
                        <TextField name='hours_number' label="Количество часов" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select defaultValue=''
                                   InputLabelProps={propsStyle}>
                            <MenuItem value="1008 ак.ч. (1 год)">
                                <span style={listItemStyle}>1008 ак.ч. (1 год)</span>
                            </MenuItem>
                            <MenuItem value="1008 ак.ч. (1.5 год)">
                                <span style={listItemStyle}>1008 ак.ч. (1.5 год)</span>
                            </MenuItem>
                            <MenuItem value="868 ак.ч.">
                                <span style={listItemStyle}>868 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="728 ак.ч.">
                                <span style={listItemStyle}>728 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="588 ак.ч.">
                                <span style={listItemStyle}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="504 ак.ч.">
                                <span style={listItemStyle}>504 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="288 ак.ч.">
                                <span style={listItemStyle}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="144 ак.ч.">
                                <span style={listItemStyle}>144 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="108 ак.ч.">
                                <span style={listItemStyle}>108 ак.ч.</span>
                            </MenuItem>
                            <MenuItem value="588 ак.ч.">
                                <span style={listItemStyle}>72 ак.ч.</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='form_study' label="Форма обучения" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select defaultValue=''
                                   InputLabelProps={propsStyle}>
                            <MenuItem value="Очная">
                                <span style={listItemStyle}>Очная</span>
                            </MenuItem>
                            <MenuItem value="Гибрид">
                                <span style={listItemStyle}>Гибрид</span>
                            </MenuItem>
                            <MenuItem value="Онлайн">
                                <span style={listItemStyle}>Онлайн</span>
                            </MenuItem>
                        </TextField>
                        <p className="tytle_contract_education"> Дополнительно </p>
                        <TextField name='comments' label="Примечания" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" multiline rows={3}
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <TextField name='enrollment' label="Статус зачисления" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select sx={{width: "325px"}}
                                   InputLabelProps={propsStyle} defaultValue=''>
                            <MenuItem value="Зачислен">
                                <span style={listItemStyle}>Зачислен</span>
                            </MenuItem>
                            <MenuItem value="Не зачислен">
                                <span style={listItemStyle}>Не зачислен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='enrollment_order' label="Номер приказа о зачислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='expulsion_order' label="Номер приказа об отчислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='contract_number' label="Номер договора" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='status_1C' label="Статус 1C" type="text" variant="outlined" color="warning"
                                   margin='normal' size="small" select
                                   InputLabelProps={propsStyle} defaultValue=''>
                            <MenuItem value="Прикреплен">
                                <span style={listItemStyle}>Прикреплен</span>
                            </MenuItem>
                            <MenuItem value="Не прикреплен">
                                <span style={listItemStyle}>Не прикреплен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='tutor_name' label="Куратор" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsStyle}/>
                        <TextField name='first_payment' label="Платеж 1" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='second_payment' label="Платеж 2" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='third_payment' label="Платеж 3" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='fourth_payment' label="Платеж 4" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="title_contract_section">Основные даты</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Даты </p>
                        <TextField name='entry_date' label="Дата въезда"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='visa_validity' label="Срок действия визы"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='transfer_to_international_service' label="Дата передачи в международную службу"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='transfer_to_MVD' label="Дата передачи в МВД"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='estimated_receipt_date' label="Ориентировочная дата получения"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                        <TextField name='actual_receipt_date_invitation' label="Фактическая дата получения приглашения"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle} InputLabelProps={propsDataStyle}/>
                    </div>
                </div>
            </div>
            <label className="checkbox_style_contract">
                <input type="checkbox" onClick={handleClickContract}/> Вы уверены, что хотите добавить студента?
            </label>
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>Добавить</button>
            </div>
        </form>
    );
}