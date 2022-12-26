import React, {useState, useRef} from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {addStudent} from "../../../actions/student";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import "./QuotaDoc.css";

export default function Quota() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active);
    }

    const propsStyle = {
        style:
            {
                fontSize: "14.5px",
                fontFamily: ['Montserrat'],
                fontWeight: '450'
            }
    }

    const navigate = useNavigate();

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(formRef.current);
        data.append('education_type', 'Квота');

        addStudent(data, navigate);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="info_and_education_container">
                <div className="title_quota_section">Основные данные студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Личные данные</p>
                        <TextField name='latin_name' label="Ф.И.О. (лат.)" variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   required size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='russian_name' label="Ф.И.О. (кир.)" variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>

                        <TextField name='RF_location' label="Нахождение в РФ" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal' select size="small"
                                   InputLabelProps={propsStyle}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}} value="Да">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Да</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Нет">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <p className="title_contract_doc"> Контактные данные</p>
                        <TextField name='contact_phone_number' label="Контактный телефон студента" variant="outlined"
                                   color="warning" type="tel"
                                   margin='normal' size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='student_email' label="E-mail студента" variant="outlined" color="warning"
                                   type="email"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <p className="title_contract_doc"> Учёба</p>
                        <TextField name='location_educational_institution' label="Местонахождение учебного заведения"
                                   type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='graduation_year' label="Год окончания" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='desired_education_level' label="Уровень желаемого образования" type="text"
                                   variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='specialty_code' label="Код направления подготовки (специальности)" type="text"
                                   variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='specialty_direction' label="Направление подготовки (специальность)" type="text"
                                   variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='education_field' label="Область образования" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='educational_organization' label="Образовательная организация" type="text"
                                   variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Паспортные данные </p>
                        <TextField name='country' label="Страна" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   sx={{width: "325px"}}
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='birth_place' label="Место рождения" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField label="Дата рождения" name='birth_date' type="date" color="warning"
                                   required margin='normal' size="small"
                                   inputProps={propsStyle} focused
                                   InputLabelProps={propsStyle}/>
                        <TextField name='residence_place' label="Место проживания" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal' size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='citizenship' label="Гражданство" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='gender' label="Пол" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   required size="small" select
                                   InputLabelProps={propsStyle}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Мужской">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Мужской</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Женский">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Женский</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='passport_number' label="Номер паспорта" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   required size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='passport_expiration' label="Срок действия паспорта" type="date" color="warning"
                                   margin='normal' size="small" focused
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='passport_issued' label="Кем выдан" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='passport_issue_date' label="Дата выдачи" type="date" color="warning"
                                   margin='normal' size="small" focused
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="title_quota_section">Образование студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Уровень образования</p>
                        <TextField name='level_education' label="Уровень полученного образования" type="text"
                                   variant="outlined"
                                   color="warning" margin='normal'
                                   size="small" sx={{width: "325px"}}
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='name_educational_institution' label="Наименование учебного заведения"
                                   type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <p className="title_contract_doc"> Нынешнее образование </p>
                        <TextField name='direction_number' label="Рег. номер направления" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='form_study' label="Форма обучения" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Очная">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Очная</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Гибрид">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Гибрид</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Онлайн">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Онлайн</span>
                            </MenuItem>
                        </TextField>
                        <p className="title_contract_doc"> Дополнительно </p>
                        <TextField name='scholarship' label="Стипендия" type="text" variant="outlined" color="warning"
                                   margin='normal' select size="small"
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}} value="Да">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Да</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Нет">
                                <span
                                    style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='comments' label="Примечания" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small" multiline rows={3}
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Статус </p>
                        <TextField name='enrollment' label="Статус зачисления" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal' size="small" select sx={{width: "325px"}}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Зачислен">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Зачислен</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Не зачислен">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Не зачислен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='enrollment_order' label="Номер приказа о зачислении" type="text"
                                   variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='expulsion_order' label="Номер приказа об отчислении" type="text"
                                   variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='tutor_name' label="Куратор" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="title_quota_section">Основные даты</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Даты</p>
                        <TextField name='entry_date' label="Дата въезда" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}} focused
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
                        <TextField name='visa_validity' label="Срок действия визы" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}} focused
                                   inputProps={propsStyle}
                                   InputLabelProps={propsStyle}/>
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
