import React, {useState, useRef} from 'react';
import {addStudent} from '../../../actions/student';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Accordion, AccordionDetails, AccordionSummary, LinearProgress, MenuItem, ThemeProvider} from "@mui/material";
import './Contract.css';
import {listItemStyle, systemColor, textFieldStyle} from "../../../utils/consts/styles";
import Typography from "@mui/material/Typography";
import {getToken} from "../../../utils/token";
import jwtDecode from "jwt-decode";
import CustomSingleDatePicker from "../../datePicker";
import {prices} from "../../../utils/consts/hoursNumber";

export default function Contract() {
    const [active, setActive] = useState(true);
    const [isSkipPassport, setSkipPassport] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleClickContract = () => {
        setActive(!active);
    };

    const handleClickSkipPassport = () => {
        setSkipPassport(!isSkipPassport)
    };
    const navigate = useNavigate();

    const formRef = useRef(null);

    const [contractAmount, setContractAmount] = useState(140000)
    const [firstPayment, setFirstPayment] = useState(0)
    const [secondPayment, setSecondPayment] = useState(0)
    const [thirdPayment, setThirdPayment] = useState(0)
    const [fourthPayment, setFourthPayment] = useState(0)

    const [paymentStatus, setPaymentStatus] = useState('Не оплачено')

    const [studentExpelled, setStudentExpelled] = useState('')
    const [RF_location, setRfLocation] = useState('')

    const ChangeContractAmountWithHoursNumber = (event) => {
        const selectedHoursNumber = event.target.value.split(' ')[0]

        prices.map(({hour, cost}) => {
            if (selectedHoursNumber === hour)
                setContractAmount(cost)
        })
    }

    const paymentBalance = +contractAmount - +firstPayment - +secondPayment - +thirdPayment - +fourthPayment
    const percentPayment = ((contractAmount - paymentBalance) * 100 / contractAmount).toFixed(2)

    const GetPaymentStatus = () => {
        if (+paymentBalance === +contractAmount) {
            return 'Не оплачено'
        } else if (paymentBalance === 0) {
            return 'Оплачено'
        } else if (+paymentBalance < +contractAmount) {
            return 'Оплачено частично'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        let dataToSave = new FormData(formRef.current);
        const objectData = {};
        dataToSave.forEach((value, key) => (objectData[key] = value))

        dataToSave.set('education_type', 'Контракт')
        dataToSave.set('date_creation', new Date().toDateString())
        dataToSave.set('who_created', jwtDecode(getToken()).name)

        dataToSave.set('isSkipPassport', isSkipPassport)

        dataToSave.set('payment_status', GetPaymentStatus())

        dataToSave.set('birth_date', objectData.birth_date.split('.').reverse().join('-'))
        dataToSave.set('passport_issue_date', objectData.passport_issue_date.split('.').reverse().join('-'))
        dataToSave.set('passport_expiration', objectData.passport_expiration.split('.').reverse().join('-'))
        dataToSave.set('entry_date', objectData.entry_date.split('.').reverse().join('-'))

        dataToSave.set('enrollment_date', objectData.enrollment_date.split('.').reverse().join('-'))
        dataToSave.set('expulsion_date', objectData.expulsion_date.split('.').reverse().join('-'))

        dataToSave.set('visa_validity', objectData.visa_validity.split('.').reverse().join('-'))
        dataToSave.set('first_payment_contract_date', objectData.first_payment_contract_date.split('.').reverse().join('-'))
        dataToSave.set('second_payment_contract_date', objectData.second_payment_contract_date.split('.').reverse().join('-'))
        dataToSave.set('third_payment_contract_date', objectData.third_payment_contract_date.split('.').reverse().join('-'))
        dataToSave.set('fourth_payment_contract_date', objectData.fourth_payment_contract_date.split('.').reverse().join('-'))
        dataToSave.set('first_payment_actual_date', objectData.first_payment_actual_date.split('.').reverse().join('-'))
        dataToSave.set('second_payment_actual_date', objectData.second_payment_actual_date.split('.').reverse().join('-'))
        dataToSave.set('third_payment_actual_date', objectData.third_payment_actual_date.split('.').reverse().join('-'))
        dataToSave.set('fourth_payment_actual_date', objectData.fourth_payment_actual_date.split('.').reverse().join('-'))
        dataToSave.set('transfer_to_international_service', objectData.transfer_to_international_service.split('.').reverse().join('-'))
        dataToSave.set('transfer_to_MVD', objectData.transfer_to_MVD.split('.').reverse().join('-'))
        dataToSave.set('estimated_receipt_date', objectData.estimated_receipt_date.split('.').reverse().join('-'))
        dataToSave.set('actual_receipt_date_invitation', objectData.actual_receipt_date_invitation.split('.').reverse().join('-'))
        dataToSave.set('date_started_learning', objectData.date_started_learning.split('.').reverse().join('-'))

        addStudent(dataToSave, navigate, setLoading)
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} id='studentForm'>
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
                        <TextField name='first_student_email' label="Первая эл. почта студента" variant="outlined"
                                   color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='second_student_email' label="Вторая эл. почта студента" variant="outlined"
                                   color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Контактные данные агента</p>
                        <TextField name='agent_name' label="Ф.И.О." variant="outlined" color="warning" type="text"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='agent_phone_number' label="Телефон" variant="outlined" color="warning"
                                   type="tel" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='first_agent_email' label="Первая эл. почта" variant="outlined" color="warning"
                                   type="email"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='second_agent_email' label="Вторая эл. почта" variant="outlined" color="warning"
                                   type="email"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Контактные данные представителя</p>
                        <TextField name='representative_name' label="Ф.И.О." type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='representative_phone_number' label="Телефон" type="tel" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='first_representative_email' label="Первая эл. почта" type="email"
                                   variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='second_representative_email' label="Вторая эл. почта" type="email"
                                   variant="outlined"
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
                        <TextField label="Пол" name='gender' type="text" variant="outlined" defaultValue=''
                                   color="warning" margin='normal' size="small" required select
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Мужской">
                                <span style={listItemStyle}>Мужской</span>
                            </MenuItem>
                            <MenuItem value="Женский">
                                <span style={listItemStyle}>Женский</span>
                            </MenuItem>
                        </TextField>
                        {/*<TextField label="Дата рождения" name='birth_date' type="date" color="warning"
                                   required margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"birth_date"}
                            label={'Дата рождения'}
                            required={true}
                            size={'default'}
                            form='studentForm'
                            isOpenCalendar={false}
                        />
                        <TextField label="Номер паспорта" name='passport_number' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" required
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>

                        <label className="checkbox_style_passport_number">
                            <input type="checkbox" onClick={handleClickSkipPassport}/>
                            {`Отключить проверку идентичности паспорта`}
                        </label>
                        {/*<TextField label="Дата выдачи" name='passport_issue_date' type="date" color="warning"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"passport_issue_date"}
                            label={'Дата выдачи'}
                            required={false}
                            size={'default'}
                            isOpenCalendar={false}
                        />
                        {/*<TextField label="Срок действия паспорта" name='passport_expiration' type="date"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"passport_expiration"}
                            label={'Срок действия'}
                            required={false}
                            size={'default'}
                            isOpenCalendar={false}
                        />
                        <TextField label="Кем выдан" name='passport_issued' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Данные о местоположении </p>
                        <TextField label="Место проживания в РФ" name='residence_place' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Нахождение в РФ" type="text"
                                   name='RF_location' color="warning" variant="outlined"
                                   margin='normal' select size="small" InputLabelProps={textFieldStyle}
                                   value={RF_location}
                                   onChange={(e) => {
                                       setRfLocation(e.target.value)
                                   }}>
                            <MenuItem value="Да">
                                <span style={listItemStyle}>Да</span>
                            </MenuItem>
                            <MenuItem value="Нет">
                                <span style={listItemStyle}>Нет</span>
                            </MenuItem>
                        </TextField>
                        {/*<TextField name='entry_date' label="Дата въезда"
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"entry_date"}
                            label={'Дата въезда'}
                            required={false}
                            size={'default'}
                        />
                        <CustomSingleDatePicker
                            name={"departure_date"}
                            label={'Дата отъезда'}
                            required={false}
                            size={'default'}
                        />
                        <p className="title_contract_doc"> Начало обучения </p>
                        <TextField label="Приступил к обучению" name='started_learning' type="text" variant="outlined"
                                   defaultValue=''
                                   color="warning" margin='normal' size="small" select
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Да">
                                <span style={listItemStyle}>Да</span>
                            </MenuItem>
                            <MenuItem value="Нет">
                                <span style={listItemStyle}>Нет</span>
                            </MenuItem>
                        </TextField>
                        {/*<TextField label="Дата приступления к обучению" name='date_started_learning'
                                   type="date" color="warning" margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"date_started_learning"}
                            label={'Дата приступления к обучению'}
                            required={false}
                            size={'default'}
                        />
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
                                   InputLabelProps={textFieldStyle}
                                   onChange={ChangeContractAmountWithHoursNumber}
                        >
                            <MenuItem value="1008 (1.5 года 24-25 г.)">
                                <span style={listItemStyle}>1008 (1.5 года 24-25 г.)</span>
                            </MenuItem>
                            <MenuItem value="1008 (1 год 23-24 г.)">
                                <span style={listItemStyle}>1008 (1 год 23-24 г.)</span>
                            </MenuItem>
                            <MenuItem value="1008 (1.5 года 23-24 г.)">
                                <span style={listItemStyle}>1008 (1.5 года 23-24 г.)</span>
                            </MenuItem>
                            <MenuItem value="868 (23-24 уч.г.)">
                                <span style={listItemStyle}>868 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="728 (23-24 уч.г.)">
                                <span style={listItemStyle}>728 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="588 (23-24 уч.г.)">
                                <span style={listItemStyle}>588 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="504 (23-24 уч.г.)">
                                <span style={listItemStyle}>504 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="352 (23-24 уч.г.)">
                                <span style={listItemStyle}>352 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="288 (23-24 уч.г.)">
                                <span style={listItemStyle}>288 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="144 (23-24 уч.г.)">
                                <span style={listItemStyle}>144 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="108 (23-24 уч.г.)">
                                <span style={listItemStyle}>108 (23-24 уч.г.)</span>
                            </MenuItem>
                            <MenuItem value="72 (23-24 уч.г.)">
                                <span style={listItemStyle}>72 (23-24 уч.г.)</span>
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
                                   color="warning" margin='normal' size="small" multiline rows={5}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Статус </p>
                        <TextField label="Статус зачисления" name='enrollment' type="text" variant="outlined"
                                   color="warning" value={studentExpelled}
                                   onChange={(e) => {
                                       if (e.target.value === 'Отчислен')
                                           setRfLocation('Нет')
                                       setStudentExpelled(e.target.value)
                                   }}
                                   margin='normal' size="small" select sx={{width: "325px"}}
                                   InputLabelProps={textFieldStyle}>
                            <MenuItem value="Зачислен">
                                <span style={listItemStyle}>Зачислен</span>
                            </MenuItem>
                            <MenuItem value="Не зачислен">
                                <span style={listItemStyle}>Не зачислен</span>
                            </MenuItem>
                            <MenuItem value="Отчислен">
                                <span style={listItemStyle}>Отчислен</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='enrollment_order' label="Номер приказа о зачислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <CustomSingleDatePicker
                            name={"enrollment_date"}
                            label={'Дата зачисления'}
                            required={false}
                            size={'default'}
                        />
                        <TextField name='expulsion_order' label="Номер приказа об отчислении" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <CustomSingleDatePicker
                            name={"expulsion_date"}
                            label={'Дата отчисления'}
                            required={false}
                            size={'default'}
                        />
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
                <div className="title_contract_section">Приглашение, виза и оплата</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Виза и приглашение </p>
                        <CustomSingleDatePicker
                            name={"visa_validity"}
                            label={'Срок действия визы'}
                            required={false}
                            size={'default'}
                        />
                        <CustomSingleDatePicker
                            name={"transfer_to_international_service"}
                            label={'Дата передачи в международную службу'}
                            required={false}
                            size={'default'}
                        />
                        <CustomSingleDatePicker
                            name={"transfer_to_MVD"}
                            label={'Дата передачи в МВД'}
                            required={false}
                            size={'default'}
                        />
                        <CustomSingleDatePicker
                            name={"estimated_receipt_date"}
                            label={'Ориентировочная дата получения'}
                            required={false}
                            size={'default'}
                        />
                        <CustomSingleDatePicker
                            name={"actual_receipt_date_invitation"}
                            label={'Фактическая дата получения приглашения'}
                            required={false}
                            size={'default'}
                        />
                    </div>
                    <div className="column_style_contract">
                        <div className='elements_in_row'>
                            <TextField label="Cумма для оплаты" name='contract_amount' type="text"
                                       sx={{width: '150px'}}
                                       onChange={(e) => {
                                           setContractAmount(e.target.value)
                                       }}
                                       value={contractAmount} variant="outlined"
                                       color="warning" margin='normal' size="small"
                                       inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        </div>
                        <p className="title_contract_doc">
                            Оплата / остаток: <b>{paymentBalance}</b> руб.
                        </p>
                        <p className="title_contract_doc">
                            Процент оплаченной суммы: <b>{percentPayment}</b> %
                        </p>
                        <p className="title_contract_doc">
                            Статус оплаты: <b>{GetPaymentStatus()}</b>
                        </p>
                        <div style={{width: '325px'}}>
                            <Accordion sx={{borderRadius: '5px', mb: '15px', mt: '10px'}}>
                                <AccordionSummary>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '15px',
                                            color: "#FA7A45",
                                            fontWeight: 500,
                                            fontFamily: 'Montserrat'
                                        }}
                                    >
                                        Первый платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='elements_in_row'>
                                        <CustomSingleDatePicker
                                            name={"first_payment_contract_date"}
                                            label={'Платеж 1 (договор)'}
                                            required={false}
                                            size={'small'}
                                        />
                                        <CustomSingleDatePicker
                                            name={"first_payment_actual_date"}
                                            label={'Платеж 1 (факт)'}
                                            required={false}
                                            size={'small'}
                                        />
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_first_actual_payment' type="text"
                                               color="warning"
                                               onChange={(e) => {
                                                   setFirstPayment(e.target.value)
                                               }}
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
                                        sx={{
                                            fontSize: '15px',
                                            color: "#FA7A45",
                                            fontWeight: 500,
                                            fontFamily: 'Montserrat'
                                        }}
                                    >
                                        Второй платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        <CustomSingleDatePicker
                                            name={"second_payment_contract_date"}
                                            label={'Платеж 2 (договор)'}
                                            required={false}
                                            size={'small'}
                                        />
                                        <CustomSingleDatePicker
                                            name={"second_payment_actual_date"}
                                            label={'Платеж 2 (факт)'}
                                            required={false}
                                            size={'small'}
                                        />
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_second_actual_payment' type="text"
                                               color="warning"
                                               onChange={(e) => {
                                                   setSecondPayment(e.target.value)
                                               }}
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
                                        sx={{
                                            fontSize: '15px',
                                            color: "#FA7A45",
                                            fontWeight: 500,
                                            fontFamily: 'Montserrat'
                                        }}
                                    >
                                        Третий платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        {/*<TextField label="Платеж 3 (договор)" name='third_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>*/}
                                        <CustomSingleDatePicker
                                            name={"third_payment_contract_date"}
                                            label={'Платеж 3 (договор)'}
                                            required={false}
                                            size={'small'}
                                        />

                                        {/*<TextField label="Платеж 3 (факт)" name='third_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>*/}
                                        <CustomSingleDatePicker
                                            name={"third_payment_actual_date"}
                                            label={'Платеж 3 (факт)'}
                                            required={false}
                                            size={'small'}
                                        />
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_third_actual_payment' type="text"
                                               color="warning"
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
                                        sx={{
                                            fontSize: '15px',
                                            color: "#FA7A45",
                                            fontWeight: 500,
                                            fontFamily: 'Montserrat'
                                        }}
                                    >
                                        Четвертый платеж
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="elements_in_row">
                                        {/*<TextField label="Платеж 4 (договор)" name='fourth_payment_contract_date' type="date" color="warning"
                                                   sx={{width: '150px', mr: '25px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>*/}
                                        <CustomSingleDatePicker
                                            name={"fourth_payment_contract_date"}
                                            label={'Платеж 4 (договор)'}
                                            required={false}
                                            size={'small'}
                                        />

                                        {/*<TextField label="Платеж 4 (факт)" name='fourth_payment_actual_date' type="date" color="warning"
                                                   sx={{width: '150px'}}
                                                   margin='normal' size="small" inputProps={textFieldStyle}
                                                   InputLabelProps={dateTextFieldStyle}/>*/}
                                        <CustomSingleDatePicker
                                            name={"fourth_payment_actual_date"}
                                            label={'Платеж 4 (факт)'}
                                            required={false}
                                            size={'small'}
                                        />
                                    </div>
                                    <TextField label="Сумма платежа" name='amount_fourth_actual_payment' type="text"
                                               color="warning"
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

                {!loading
                    ?
                    <button type="submit" className="button_style_contract_doc" disabled={active}>
                        Добавить
                    </button>
                    :
                    <ThemeProvider theme={systemColor}>
                        <LinearProgress color="primary"
                                        sx={{
                                            width: '120px',
                                            height: '25px',
                                            mt: "10px",
                                            mb: "10px",
                                            borderRadius: '7px'
                                        }}/>
                    </ThemeProvider>}
            </div>
        </form>
    );
}