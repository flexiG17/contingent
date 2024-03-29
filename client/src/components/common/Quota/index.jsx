import React, {useState, useRef} from "react";
import {addStudent} from "../../../actions/student";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {LinearProgress, MenuItem, ThemeProvider} from "@mui/material";
import {listItemStyle, systemColor, textFieldStyle} from '../../../utils/consts/styles';
import "./QuotaDoc.css";
import jwtDecode from "jwt-decode";
import {getToken} from "../../../utils/token";
import CustomSingleDatePicker from "../../datePicker";

export default function Quota() {
    const [active, setActive] = useState(true);
    const [isSkipPassport, setSkipPassport] = useState(false);

    const [studentExpelled, setStudentExpelled] = useState('')
    const [RF_location, setRfLocation] = useState('')

    const [loading, setLoading] = useState(false)

    const handleClickContract = () => {
        setActive(!active);
    }

    const handleClickSkipPassport = () => {
        setSkipPassport(!isSkipPassport)
    };

    const navigate = useNavigate();

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        let dataToSave = new FormData(formRef.current);
        const objectData = {};
        dataToSave.forEach((value, key) => (objectData[key] = value))

        dataToSave.set('education_type', 'Квота')
        dataToSave.set('date_creation', new Date().toDateString())
        dataToSave.set('who_created', jwtDecode(getToken()).name)

        dataToSave.set('isSkipPassport', isSkipPassport)

        dataToSave.set('birth_date', objectData.birth_date.split('.').reverse().join('-'))
        dataToSave.set('passport_issue_date', objectData.passport_issue_date.split('.').reverse().join('-'))
        dataToSave.set('passport_expiration', objectData.passport_expiration.split('.').reverse().join('-'))
        dataToSave.set('entry_date', objectData.entry_date.split('.').reverse().join('-'))

        dataToSave.set('enrollment_date', objectData.enrollment_date.split('.').reverse().join('-'))
        dataToSave.set('expulsion_date', objectData.expulsion_date.split('.').reverse().join('-'))

        dataToSave.set('departure_date', objectData.departure_date.split('.').reverse().join('-'))
        dataToSave.set('visa_validity', objectData.visa_validity.split('.').reverse().join('-'))
        dataToSave.set('date_started_learning', objectData.date_started_learning.split('.').reverse().join('-'))

        addStudent(dataToSave, navigate, setLoading);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} id="studentForm">
            <div className="info_and_education_container">
                <div className="title_quota_section">Основные данные студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Личные данные</p>
                        <TextField name='latin_name' label="Ф.И.О. (лат.)" variant="outlined" color="warning"
                                   type="text" margin='normal' required size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='russian_name' label="Ф.И.О. (кир.)" variant="outlined" color="warning"
                                   type="text" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Контактные данные</p>
                        <TextField name='contact_phone_number' label="Контактный телефон студента" variant="outlined"
                                   color="warning" type="tel" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='first_student_email' label="Первая эл. почта студента" variant="outlined" color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='second_student_email' label="Вторая эл. почта студента" variant="outlined" color="warning"
                                   type="email" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Учёба</p>
                        <TextField name='location_educational_institution' label="Местонахождение учебного заведения"
                                   type="text" variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='graduation_year' label="Год окончания" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='desired_education_level' label="Уровень желаемого образования" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='specialty_code' label="Код направления подготовки (специальности)" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='specialty_direction' label="Направление подготовки (специальность)" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='education_field' label="Область образования" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='educational_organization' label="Образовательная организация" type="text"
                                   variant="outlined" color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Паспортные данные </p>
                        <TextField label="Страна" name='country' type="text" variant="outlined" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Пол" name='gender' type="text" variant="outlined" color="warning"
                                   margin='normal' required size="small" select
                                   InputLabelProps={textFieldStyle} defaultValue=''>
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
                            name="birth_date"
                            label='Дата рождения'
                            required={true}
                            form='studentForm'
                            size='default'
                            isOpenCalendar={false}
                        />
                        <TextField label="Номер паспорта" name='passport_number' type="text" variant="outlined"
                                   color="warning" margin='normal' required size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>

                        <label className="checkbox_style_passport_number">
                            <input type="checkbox" onClick={handleClickSkipPassport}/>
                            {`Отключить проверку идентичности паспорта`}
                        </label>
                        {/*<TextField label="Дата выдачи" name='passport_issue_date' type="date"
                                   margin='normal' size="small" color="warning"
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"passport_issue_date"}
                            label={'Дата выдачи'}
                            required={false}
                            size={'default'}
                            isOpenCalendar={false}
                        />
                        {/*<TextField label="Срок действия паспорта" name='passport_expiration' type="date" color="warning"
                                   margin='normal' size="small"
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
                        <TextField label="Место рождения" name='birth_place' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Место проживания в РФ" name='residence_place' type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Гражданство" name='citizenship' type="text" variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField label="Нахождение в РФ" name='RF_location' type="text"
                                   color="warning" variant="outlined"
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
                        {/*<TextField name='entry_date' label="Дата въезда" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
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
                        <TextField label="Приступил к обучению" name='started_learning' type="text" variant="outlined" defaultValue=''
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
                <div className="title_quota_section">Образование студента</div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Уровень образования</p>
                        <TextField name='level_education' label="Уровень полученного образования" type="text"
                                   variant="outlined" color="warning" margin='normal'
                                   size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='name_educational_institution' label="Наименование учебного заведения"
                                   type="text" variant="outlined" color="warning" margin='normal'
                                   size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <p className="title_contract_doc"> Нынешнее образование </p>
                        <TextField name='direction_number' label="Рег. номер направления" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                        <TextField name='form_study' label="Форма обучения" type="text" variant="outlined"
                                   color="warning" margin='normal' size="small" select
                                   InputLabelProps={textFieldStyle} defaultValue=''>
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
                        <TextField name='scholarship' label="Стипендия" type="text" variant="outlined" color="warning"
                                   margin='normal' select size="small"
                                   InputLabelProps={textFieldStyle} defaultValue=''>
                            <MenuItem value="Да">
                                <span style={listItemStyle}>Да</span>
                            </MenuItem>
                            <MenuItem value="Нет">
                                <span style={listItemStyle}>Нет</span>
                            </MenuItem>
                        </TextField>
                        <TextField name='comments' label="Примечания" type="text" variant="outlined" color="warning"
                                   margin='normal' size="small" multiline rows={5}
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
                        <TextField name='tutor_name' label="Куратор" type="text" variant="outlined" color="warning"
                                   margin='normal' size="small"
                                   inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_container">
                <div className="title_quota_section"> Основные даты </div>
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="title_contract_doc"> Виза </p>
                        {/*<TextField name='visa_validity' label="Срок действия визы" type="date" color="warning"
                                   margin='normal' size="small" sx={{width: "325px"}}
                                   inputProps={textFieldStyle} InputLabelProps={dateTextFieldStyle}/>*/}
                        <CustomSingleDatePicker
                            name={"visa_validity"}
                            label={'Срок действия визы'}
                            required={false}
                            size={'default'}
                        />
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
