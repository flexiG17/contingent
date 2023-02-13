import React, {useState, useRef} from 'react';
import {addStudent} from '../../../actions/student';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Accordion, AccordionDetails, AccordionSummary, MenuItem} from "@mui/material";
import './Contract.css';
import {listItemStyle, dateTextFieldStyle, textFieldStyle} from "../../../utils/consts/styles";
import Typography from "@mui/material/Typography";

export default function Contract() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active);
    };

    const navigate = useNavigate();

    const formRef = useRef(null);

    const [contractAmount, setContractAmount] = useState(0)
    const [firstPayment, setFirstPayment] = useState(0)
    const [secondPayment, setSecondPayment] = useState(0)
    const [thirdPayment, setThirdPayment] = useState(0)
    const [fourthPayment, setFourthPayment] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(formRef.current);
        data.append('education_type', 'Контракт');

        addStudent(data, navigate);
    };

    const paymentBalance = +contractAmount - +firstPayment - +secondPayment - +thirdPayment - +fourthPayment

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="info_and_education_container">
                <div className="title_contract_section">Основные данные студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc">Личные данные</p>
                        <TextField label="Ф.И.О. (лат.)" name='latin_name' variant="outlined" color="warning"
                                   type="text" margin='normal'
                                   required size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Ф.И.О. (кир.)" name='russian_name' variant="outlined" color="warning"
                                   type="text" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>

                        <p className="title_contract_doc"> Контактные данные</p>
                        <TextField name='contact_phone_number' label="Контактный телефон студента" variant="outlined"
                                   color="warning" type="tel" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='student_email' label="E-mail студента" variant="outlined" color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Контактные данные агента</p>
                        <TextField name='agent_name' label="Ф.И.О." variant="outlined" color="warning" type="text"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='agent_phone_number' label="Телефон" variant="outlined" color="warning"
                                   type="tel" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='agent_email' label="E-mail" variant="outlined" color="warning" type="email"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Контактные данные представителя</p>
                        <TextField name='representative_name' label="Ф.И.О." type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='representative_phone_number' label="Телефон" type="tel" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='representative_email' label="E-mail" type="email" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc">Куратор</p>
                        <TextField name='tutor_name' label="Куратор (ФИО, номер телефона)" type="text"
                                   variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Паспортные данные </p>
                        <TextField label="Страна" name='country' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Дата рождения" name='birth_date' type="date" color="warning"
                                   required margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='gender' label="Пол" type="text" variant="outlined" defaultValue=''
                                   color="warning" margin='normal' size="small" required select
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Мужской">
                                <span style={listItemStyle}>Мужской</span>
                            </MenuItem>
                            <MenuItem value="Женский">
                                <span style={listItemStyle}>Женский</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='passport_number' label="Номер паспорта" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" required
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='passport_expiration' label="Срок действия паспорта" type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='passport_issued' label="Кем выдан" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='passport_issue_date' label="Дата выдачи" type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <p className="title_contract_doc"> Данные о местоположении </p>
                        <TextField name='residence_place' label="Место проживания в РФ" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='RF_location' label="Нахождение в РФ" type="text" variant="outlined"
                                   color="warning" margin='normal' select size="small" defaultValue=''
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Да">
                                <span style={listItemStyle}>Да</span>
                            </MenuItem>
                            <MenuItem value="Нет">
                                <span style={listItemStyle}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='entry_date' label="Дата въезда"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_container">
                <div className="title_contract_section">Образование студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Уровень образования</p>
                        <TextField name='level_education' label="Уровень полученного образования" type="text"
                                   variant="outlined" sx={{width: "325px"}}
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='name_educational_institution' label="Наименование учебного заведения"
                                   type="text" variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Нынешнее образование </p>
                        <TextField name='hours_number' label="Количество часов" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select defaultValue=''
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="1008 (1 год)">
                                <span style={listItemStyle}>1008 (1 год)</span>
                            </MenuItem>
                            <MenuItem value="1008 (1.5 год)">
                                <span style={listItemStyle}>1008 (1.5 год)</span>
                            </MenuItem>
                            <MenuItem value="868">
                                <span style={listItemStyle}>868</span>
                            </MenuItem>
                            <MenuItem value="728">
                                <span style={listItemStyle}>728</span>
                            </MenuItem>
                            <MenuItem value="588">
                                <span style={listItemStyle}>588</span>
                            </MenuItem>
                            <MenuItem value="504">
                                <span style={listItemStyle}>504</span>
                            </MenuItem>
                            <MenuItem value="288">
                                <span style={listItemStyle}>288</span>
                            </MenuItem>
                            <MenuItem value="144">
                                <span style={listItemStyle}>144</span>
                            </MenuItem>
                            <MenuItem value="108">
                                <span style={listItemStyle}>108</span>
                            </MenuItem>
                            <MenuItem value="72">
                                <span style={listItemStyle}>72</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='form_study' label="Форма обучения" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select defaultValue=''
                                   InputLabelProps={textFieldStyle}>
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
                        <p className="title_contract_doc"> Дополнительно </p>
                        <TextField name='comments' label="Примечания" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" multiline rows={3}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Статус </p>
                        <TextField name='enrollment' label="Статус зачисления" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select sx={{width: "325px"}}
                                   InputLabelProps={textFieldStyle} defaultValue=''>
                            <MenuItem value="Зачислен">
                                <span style={listItemStyle}>Зачислен</span>
                            </MenuItem>
                            <MenuItem value="Не зачислен">
                                <span style={listItemStyle}>Не зачислен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='enrollment_order' label="Номер приказа о зачислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='expulsion_order' label="Номер приказа об отчислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='contract_number' label="Номер договора" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='status_1c' label="Статус 1C" type="text"
                                   variant="outlined" color="warning" defaultValue=''
                                   margin='normal' size="small" select
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Прикреплен">
                                <span style={listItemStyle}>Прикреплен</span>
                            </MenuItem>
                            <MenuItem value="Не прикреплен">
                                <span style={listItemStyle}>Не прикреплен</span>
                            </MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="title_contract_section">Приглшание, виза и оплата</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Виза и приглашение </p>
                        <TextField name='visa_validity' label="Срок действия визы"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='transfer_to_international_service' label="Дата передачи в международную службу"
                                   type="date" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='transfer_to_MVD' label="Дата передачи в МВД"
                                   type="date" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='estimated_receipt_date' label="Ориентировочная дата получения"
                                   type="date" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                        <TextField name='actual_receipt_date_invitation' label="Фактическая дата получения приглашения"
                                   type="date" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc">
                            {`Оплата / остаток: `} <b>{paymentBalance}</b>
                        </p>
                        <div className='elements_in_row'>
                            <TextField label="Cумма для оплаты" name='contract_amount' type="text"
                                       sx={{width: '150px', mr: '25px'}}
                                       onChange={(e) => {setContractAmount(e.target.value)}}
                                       variant="outlined" defaultValue={136000}
                                       color="warning" margin='normal' size="small"
                                       inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                            <TextField label="Статус оплаты" name='payment_status' type="text"
                                       sx={{width: '150px'}} variant="outlined" defaultValue={'Не оплачено'}
                                       color="warning" margin='normal' size="small"
                                       inputProps={textFieldStyle} InputLabelProps={textFieldStyle} select>
                                <MenuItem value="Оплачено">
                                    <span style={listItemStyle}>Оплачено</span>
                                </MenuItem>
                                <MenuItem value="Не оплачено">
                                    <span style={listItemStyle}>Не оплачено</span>
                                </MenuItem>
                                <MenuItem value="Оплачено частично">
                                    <span style={listItemStyle}>Оплачено частично</span>
                                </MenuItem>
                            </TextField>
                        </div>
                        <div style={{width: '325px'}}>
                            <Accordion sx={{borderRadius: '5px', mb: '15px', mt: '10px'}}>
                                <AccordionSummary>
                                    <Typography
                                        variant="body2"
                                        sx={{fontSize: '15px', color: "#FA7A45", fontWeight: 500, fontFamily: 'Montserrat'}}
                                    >
                                        Первый платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='elements_in_row'>
                                        <TextField label="Платеж 1 (договор)" name='first_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                        <TextField label="Платеж 1 (факт)" name='first_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_first_actual_payment' type="text" color="warning"
                                               onChange={(e) => setFirstPayment(e.target.value)}
                                               sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                               size="small" inputProps={textFieldStyle}
                                               InputLabelProps={textFieldStyle}/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                <AccordionSummary
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{fontSize: '15px', color: "#FA7A45", fontWeight: 500, fontFamily: 'Montserrat'}}
                                    >
                                        Второй платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        <TextField label="Платеж 2 (договор)" name='second_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                        <TextField label="Платеж 2 (договор)" name='second_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_second_actual_payment' type="text" color="warning"
                                               onChange={(e) => setSecondPayment(e.target.value)}
                                               sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                               size="small" inputProps={textFieldStyle}
                                               InputLabelProps={textFieldStyle}/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                <AccordionSummary
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{fontSize: '15px', color: "#FA7A45", fontWeight: 500, fontFamily: 'Montserrat'}}
                                    >
                                        Третий платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        <TextField label="Платеж 3 (договор)" name='third_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>

                                        <TextField label="Платеж 3 (договор)" name='third_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_third_actual_payment' type="text" color="warning"
                                               onChange={(e) => setThirdPayment(e.target.value)}
                                               sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                               size="small" inputProps={textFieldStyle}
                                               InputLabelProps={textFieldStyle}/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{borderRadius: '5px', mb: '15px'}}>
                                <AccordionSummary
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{fontSize: '15px', color: "#FA7A45", fontWeight: 500, fontFamily: 'Montserrat'}}
                                    >
                                        Четвертый платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        <TextField label="Платеж 4 (договор)" name='fourth_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>

                                        <TextField label="Платеж 4 (договор)" name='fourth_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_fourth_actual_payment' type="text" color="warning"
                                               onChange={(e) => setFourthPayment(e.target.value)}
                                               sx={{ml: '50px', mt: '10px', mb: '10px', width: '200px'}}
                                               size="small" inputProps={textFieldStyle}
                                               InputLabelProps={textFieldStyle}/>
                                </AccordionDetails>
                            </Accordion>
                        </div>
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