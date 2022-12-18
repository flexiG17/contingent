import React, {useState, useRef} from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {addStudent} from '../../../actions/student';
import {useNavigate} from "react-router-dom";
import './Contract.css';
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

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
                        <p className="title_contract_info"> Личные данные</p>

                        <TextField name='latin_name' label="Ф.И.О. (лат.)" variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   required size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='russian_name' label="Ф.И.О. (кир.)" variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   required size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>

                        <TextField name='RF_location' label="Нахождение в РФ" type="text" variant="outlined"
                                   color="warning"
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
                        <p className="title_contract_info"> Контактные данные</p>
                        <TextField name='contact_phone_number' label="Контактный телефон студента" variant="outlined"
                                   color="warning" type="tel"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='student_email' label="E-mail студента" variant="outlined" color="warning"
                                   type="email"
                                   margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <p className="title_contract_info"> Контактные данные агента</p>
                        <TextField name='agent_name' label="Ф.И.О." variant="outlined" color="warning" type="text"
                                   margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='agent_phone_number' label="Телефон" variant="outlined" color="warning"
                                   type="tel" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='agent_email' label="E-mail" variant="outlined" color="warning" type="email"
                                   margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <p className="title_contract_info"> Контактные данные представителя</p>
                        <TextField name='representative_name' label="Ф.И.О." type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='representative_phone_number' label="Телефон" type="tel" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='representative_email' label="E-mail" type="email" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_info"> Паспортные данные </p>
                        <TextField name='country' label="Страна" type="text" variant="outlined" color="warning"
                                   margin='normal' required
                                   size="small"
                                   sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='birth_place' label="Место рождения" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='birth_date' label="Дата рождения" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='residence_place' label="Место проживания" type="text" variant="outlined"
                                   color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='citizenship' label="Гражданство" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='gender' label="Пол" type="text" variant="outlined" color="warning"
                                   margin='normal' required
                                   size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
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
                                   color="warning" margin='normal' required
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='passport_expiration' label="Срок действия паспорта" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='passport_issued' label="Кем выдан" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='passport_issue_date' label="Дата выдачи" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="title_contract_section">Образование студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Уровень образования</p>
                        <TextField name='level_education' label="Уровень полученного образования" type="text"
                                   variant="outlined"
                                   color="warning" margin='normal' sx={{width: "325px"}}
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='name_educational_institution' label="Наименование учебного заведения"
                                   type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <p className="tytle_contract_education"> Нынешнее образование </p>

                        <TextField name='hours_number' label="Количество часов" type="text" variant="outlined"
                                   color="warning" required
                                   margin='normal' size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="1008 ак.ч. (1 год)">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>1008 ак.ч. (1 год)</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="1008 ак.ч. (1.5 год)">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>1008 ак.ч. (1.5 год)</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="868 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>868 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="728 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>728 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="588 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="504 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>504 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="288 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>588 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="144 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>144 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="108 ак.ч.">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>108 ак.ч.</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="588 ак.ч.">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>72 ак.ч.</span>
                            </MenuItem>
                        </TextField>
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
                        <p className="tytle_contract_education"> Дополнительно </p>
                        <TextField name='comments' label="Примечания" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small" multiline rows={3}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> Статус </p>
                        <TextField name='enrollment' label="Статус зачисления" type="text" variant="outlined"
                                   color="warning" required
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
                                   variant="outlined" color="warning" required
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='expulsion_order' label="Номер приказа об отчислении" type="text"
                                   variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='contract_number' label="Номер договора" type="text" variant="outlined"
                                   color="warning" margin='normal'
                                   size="small" required
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>

                        <TextField name='status_1C' label="Статус 1C" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                    size="small" select
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Прикреплен">
                                <span style={{
                                    fontSize: "14px",
                                    fontFamily: ['Montserrat'],
                                    fontWeight: '400'
                                }}>Прикреплен</span>
                            </MenuItem>
                            <MenuItem sx={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '450'}}
                                      value="Не прикреплен">
                                <span style={{fontSize: "14px", fontFamily: ['Montserrat'], fontWeight: '400'}}>Не прикреплен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='tutor_name' label="Куратор" type="text" variant="outlined" color="warning"
                                   margin='normal'
                                   size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}/>
                        <TextField name='first_payment' label="Платеж 1" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='second_payment' label="Платеж 2" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='third_payment' label="Платеж 3" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='fourth_payment' label="Платеж 4" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="title_contract_section">Основные даты</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Даты </p>

                        <TextField name='entry_date' label="Дата въезда" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='visa_validity' label="Срок действия визы" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='transfer_to_international_service' label="Дата передачи в международную службу"
                                   type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
                        <TextField name='transfer_to_MVD' label="Дата передачи в МВД" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>

                        <TextField name='estimated_receipt_date' label="Ориентировочная дата получения" type="date"
                                   color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>

                        <TextField name='actual_receipt_date_invitation' label="Фактическая дата получения приглашения"
                                   type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       }
                                   }}
                                   InputLabelProps={{
                                       style: {
                                           fontSize: "14px",
                                           fontFamily: ['Montserrat'],
                                           fontWeight: '450'
                                       },
                                       shrink: true
                                   }}/>
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