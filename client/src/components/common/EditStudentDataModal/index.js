import React, {useRef, useState} from "react"
import './editModal.css'
import TextField from "@mui/material/TextField";
import {listItemStyle, systemColor, textFieldStyle} from "../../../utils/consts/styles";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    MenuItem,
    Modal,
    ThemeProvider
} from "@mui/material";
import CustomSingleDatePicker from "../../datePicker";
import Box from "@mui/material/Box";
import iziToast from "izitoast";
import {changeStudentsData} from "../../../actions/student";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'scroll',
    maxHeight: '85vh',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    pl: 5,
    pt: 4,
    pb: 4
};

const EditStudentDataModal = ({active, setActive, studentsList}) => {
    const formRef = useRef(null);
    const studentsId = studentsList.map(student => student.id)
    const studentsDataForEmail =
        studentsList
            .map(student => {
                return {
                    id: student.id,
                    latin_name: student.latin_name,
                    russian_name: student.russian_name
                }
            })
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        setOpenDialog(false)
        setLoading(true)

        let formData = new FormData(formRef.current)
        const formDataToJson = {};
        formData.forEach((value, key, id) => (formDataToJson[key] = value))

        formDataToJson.visa_validity = formDataToJson.visa_validity.split('.').reverse().join('-');
        formDataToJson.date_started_learning = formDataToJson.date_started_learning.split('.').reverse().join('-');
        formDataToJson.transfer_to_international_service = formDataToJson.transfer_to_international_service.split('.').reverse().join('-');

        formDataToJson.enrollment_date = formDataToJson.enrollment_date.split('.').reverse().join('-');
        formDataToJson.expulsion_date = formDataToJson.expulsion_date.split('.').reverse().join('-');

        formDataToJson.transfer_to_MVD = formDataToJson.transfer_to_MVD.split('.').reverse().join('-');
        formDataToJson.estimated_receipt_date = formDataToJson.estimated_receipt_date.split('.').reverse().join('-');
        formDataToJson.actual_receipt_date_invitation = formDataToJson.actual_receipt_date_invitation.split('.').reverse().join('-');

        formDataToJson.first_payment_actual_date = formDataToJson.first_payment_actual_date.split('.').reverse().join('-');
        formDataToJson.second_payment_actual_date = formDataToJson.second_payment_actual_date.split('.').reverse().join('-');
        formDataToJson.third_payment_actual_date = formDataToJson.third_payment_actual_date.split('.').reverse().join('-');
        formDataToJson.fourth_payment_actual_date = formDataToJson.fourth_payment_actual_date.split('.').reverse().join('-');

        formDataToJson['payment_status'] = GetPaymentStatus()

        const jsonToArray = Object.entries(formDataToJson);
        const filteredJson = jsonToArray.filter(([key, value]) => value !== '');
        const arrayToJson = Object.fromEntries(filteredJson);

        if (+arrayToJson.contract_amount === 0) {
            delete arrayToJson.contract_amount
        }

        if (arrayToJson.payment_status === 'Не оплачено' || !arrayToJson.contract_amount) {
            delete arrayToJson.payment_status
        }

        const dataToSave = {
            id: studentsId,
            newData: arrayToJson
        };

        changeStudentsData(dataToSave, setLoading, studentsDataForEmail)
    };


    const [contractAmount, setContractAmount] = useState(0)
    const [firstPayment, setFirstPayment] = useState(0)
    const [secondPayment, setSecondPayment] = useState(0)
    const [thirdPayment, setThirdPayment] = useState(0)
    const [fourthPayment, setFourthPayment] = useState(0)

    const GetPaymentStatus = () => {
        if (+paymentBalance === +contractAmount) {
            return 'Не оплачено'
        } else if (+paymentBalance <= 0) {
            return 'Оплачено'
        } else if (+paymentBalance < +contractAmount) {
            return 'Оплачено частично'
        }
    }

    let paymentBalance = 0

    if (+contractAmount === 0 && GetPaymentStatus() === 'Не оплачено')
        paymentBalance = 0
    else
        paymentBalance = paymentBalance = +contractAmount - +firstPayment - +secondPayment - +thirdPayment - +fourthPayment
    return (
        <>
            <Modal
                open={active}
                onClose={setActive}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form ref={formRef} onSubmit={(e) => {
                        e.preventDefault()
                        setOpenDialog(true)
                    }}>
                        <p className="title_main_text">Массовое редактирование</p>
                        <div className="grid">
                            <div className="left_column">

                                <p className="title_text"> Контактные данные агента</p>
                                <TextField label="Ф.И.О." type="text"
                                           name='agent_name' variant="outlined" color="warning"
                                           margin='normal' sx={{width: '325px'}}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Телефон" type="tel"
                                           name='agent_phone_number' variant="outlined" color="warning"
                                           margin='normal' size="small" sx={{width: '325px'}}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Первая эл. почта агента"
                                           name='first_agent_email' type="email" variant="outlined" color="warning"
                                           margin='normal' size="small" sx={{width: '325px'}}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта агента"
                                           name='second_agent_email' type="email" variant="outlined" color="warning"
                                           margin='normal' size="small" sx={{width: '325px'}}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>

                                <p className="title_text"> Контактные данные представителя</p>
                                <TextField label="Ф.И.О."
                                           name='representative_name' variant="outlined" color="warning" type="text"
                                           margin='normal' sx={{width: '325px'}}
                                           size="small" inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Телефон"
                                           variant="outlined" sx={{width: '325px'}}
                                           name='representative_phone_number' color="warning" type="tel"
                                           margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Первая эл. почта представителя"
                                           name='first_representative_email' variant="outlined"
                                           type="email" color="warning"
                                           sx={{width: '325px'}}
                                           margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта представителя"
                                           name='second_representative_email'
                                           sx={{width: '325px'}}
                                           variant="outlined" type="email" color="warning"
                                           margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>

                                <p className="title_text"> Куратор </p>
                                <TextField label="Куратор (ФИО, номер телефона)" name='tutor_name' type="text"
                                           variant="outlined"
                                           sx={{width: '325px'}}
                                           color="warning" margin='normal'
                                           size="small"
                                           InputLabelProps={textFieldStyle} inputProps={textFieldStyle}/>

                                <p className="title_text"> Дополнительно </p>
                                <TextField label="Примечания" name='comments' type="text" variant="outlined"
                                           color="warning" margin='normal'
                                           sx={{width: '325px'}}
                                           size="small" multiline rows={5}
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>


                                <p className="title_text">Виза и приглашение</p>
                                <CustomSingleDatePicker
                                    name={"visa_validity"}
                                    required={false}
                                    label={'Срок действия визы'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_international_service"}
                                    required={false}
                                    label={'Дата передачи в международную службу'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_MVD"}
                                    required={false}
                                    label={'Дата передачи в МВД'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"estimated_receipt_date"}
                                    required={false}
                                    label={'Ориентировочная дата получения'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"actual_receipt_date_invitation"}
                                    required={false}
                                    label={'Фактическая дата получения приглашения'}
                                    size={'default'}
                                />
                            </div>

                            <div className="left_column">
                                <p className="title_text"> Начало обучения </p>
                                <TextField label="Приступил к обучению" name='started_learning' type="text"
                                           defaultValue=''
                                           variant="outlined"
                                           sx={{width: '325px'}}
                                           color="warning" margin='normal' size="small" select
                                           InputLabelProps={textFieldStyle}>
                                    <MenuItem value="Да">
                                        <span style={listItemStyle}>Да</span>
                                    </MenuItem>
                                    <MenuItem value="Нет">
                                        <span style={listItemStyle}>Нет</span>
                                    </MenuItem>
                                </TextField>
                                <CustomSingleDatePicker
                                    name={"date_started_learning"}
                                    required={false}
                                    label={'Дата приступления к обучению'}
                                    size={'default'}
                                />

                                <p className="title_text"> Статус</p>
                                <TextField label="Статус зачисления" name='enrollment' type="text"
                                           defaultValue=''
                                           onChange={(event) => {
                                               if (event.target.value === 'Отчислен')
                                                   iziToast.info({
                                                       message: `В результате смены <b>Cтатуса зачисления</b> на <b>"Отчислен"</b><br>
                            произойдет автоматическая отправка письма в Визовый отдел<br>
                            по всем студентам <i>(${studentsList.length} чел.)</i>`,
                                                       position: 'topRight',
                                                       timeout: '10000'
                                                   });
                                           }}
                                           variant="outlined" color="warning"
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
                                <TextField label="Номер приказа о зачислении" name='enrollment_order' type="text"
                                           variant="outlined" color="warning"
                                           sx={{width: '325px'}}
                                           margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <CustomSingleDatePicker
                                    name={"enrollment_date"}
                                    label={'Дата зачисления'}
                                    required={false}
                                    size={'default'}
                                />
                                <TextField label="Номер приказа об отчислении" name='expulsion_order' type="text"
                                           variant="outlined"
                                           sx={{width: '325px'}}
                                           color="warning" margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <CustomSingleDatePicker
                                    name={"expulsion_date"}
                                    label={'Дата отчисления'}
                                    required={false}
                                    size={'default'}
                                />
                                <TextField label="Статус 1C" name='status_1c' type="text"
                                           defaultValue=''
                                           variant="outlined"
                                           color="warning" margin='normal'
                                           sx={{width: '325px'}}
                                           size="small" select InputLabelProps={textFieldStyle}>
                                    <MenuItem value="Прикреплен">
                                        <span style={listItemStyle}>Прикреплен</span>
                                    </MenuItem>
                                    <MenuItem value="Не прикреплен">
                                        <span style={listItemStyle}>Не прикреплен</span>
                                    </MenuItem>
                                </TextField>

                                <div className='elements_in_row'>
                                    <TextField label="Сумма для оплаты" name='contract_amount' type="text"
                                               sx={{width: '150px'}}
                                               onChange={(e) => {
                                                   setContractAmount(e.target.value)
                                               }}
                                               variant="outlined"
                                               value={contractAmount}
                                               color="warning" margin='normal' size="small"
                                               inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                </div>
                                <p className="title_contract_doc">
                                    {`Оплата / остаток: `} <b>{paymentBalance}</b>
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
                                                    name={"first_payment_actual_date"}
                                                    label={'Платеж 1 (факт)'}
                                                    required={false}
                                                    size={'small'}
                                                />
                                                <TextField label="Сумма платежа" name='amount_first_actual_payment'
                                                           type="text" color="warning"
                                                           onChange={(e) => setFirstPayment(e.target.value)}
                                                           sx={{ml: '20px', mt: '20px', width: '140px'}}
                                                           size="small" inputProps={textFieldStyle}
                                                           InputLabelProps={textFieldStyle}/>
                                            </div>
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
                                                    name={"second_payment_actual_date"}
                                                    label={'Платеж 2 (факт)'}
                                                    required={false}
                                                    size={'small'}
                                                />
                                                <TextField label="Сумма платежа" name='amount_second_actual_payment'
                                                           type="text" color="warning"
                                                           onChange={(e) => setSecondPayment(e.target.value)}
                                                           sx={{ml: '20px', mt: '20px', width: '140px'}}
                                                           size="small" inputProps={textFieldStyle}
                                                           InputLabelProps={textFieldStyle}/>
                                            </div>
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
                                                <CustomSingleDatePicker
                                                    name={"third_payment_actual_date"}
                                                    label={'Платеж 3 (факт)'}
                                                    required={false}
                                                    size={'small'}
                                                />
                                                <TextField label="Сумма платежа" name='amount_third_actual_payment'
                                                           type="text" color="warning"
                                                           onChange={(e) => setThirdPayment(e.target.value)}
                                                           sx={{ml: '20px', mt: '20px', width: '140px'}}
                                                           size="small" inputProps={textFieldStyle}
                                                           InputLabelProps={textFieldStyle}/>
                                            </div>
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
                                                <CustomSingleDatePicker
                                                    name={"fourth_payment_actual_date"}
                                                    label={'Платеж 4 (факт)'}
                                                    required={false}
                                                    size={'small'}
                                                />
                                                <TextField label="Сумма платежа" name='amount_fourth_actual_payment'
                                                           type="text" color="warning"
                                                           onChange={(e) => setFourthPayment(e.target.value)}
                                                           sx={{ml: '20px', mt: '20px', width: '140px'}}
                                                           size="small" inputProps={textFieldStyle}
                                                           InputLabelProps={textFieldStyle}/>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>

                        {!loading
                            ?
                            <button
                                type='submit'
                                className="submit_button_style"
                            >
                                Изменить
                            </button>
                            :
                            <ThemeProvider theme={systemColor}>
                                <LinearProgress
                                    color="primary"
                                    sx={{
                                        width: '120px',
                                        height: '25px',
                                        mt: "40px",
                                        mb: "15px",
                                        borderRadius: '7px'
                                    }}/>
                            </ThemeProvider>}
                    </form>
                </Box>
            </Modal>

            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{fontFamily: 'Montserrat'}}
                >
                    Массовое редактирование
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{fontFamily: 'Montserrat'}}>
                        {`Вы уверены, что хотите отредактировать информацию у всех выбранных студентов? (${studentsList.length} чел.)`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        sx={{fontFamily: 'Montserrat', color: "#000"}}
                    >
                        Да
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenDialog(false)
                        }}
                        sx={{fontFamily: 'Montserrat', color: "#000"}}
                    >
                        Нет
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default EditStudentDataModal;