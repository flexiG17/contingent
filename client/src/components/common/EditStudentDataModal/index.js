import React, {useRef, useState} from "react"
import './editModal.css'
import TextField from "@mui/material/TextField";
import {listItemStyle, textFieldStyle} from "../../../utils/consts/styles";
import {
    Button,
    createTheme, Dialog, DialogActions,
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
import axios from "axios";
import {getToken} from "../../../utils/token";
import {URL_PATH} from "../../../utils/consts/pathRoutes";
import iziToast from "izitoast";

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
        formDataToJson.transfer_to_MVD = formDataToJson.transfer_to_MVD.split('.').reverse().join('-');
        formDataToJson.estimated_receipt_date = formDataToJson.estimated_receipt_date.split('.').reverse().join('-');
        formDataToJson.actual_receipt_date_invitation = formDataToJson.actual_receipt_date_invitation.split('.').reverse().join('-');

        const jsonToArray = Object.entries(formDataToJson);
        const filteredJson = jsonToArray.filter(([key, value]) => value !== '');
        const arrayToJson = Object.fromEntries(filteredJson);

        const dataToSave = {
            id: studentsId,
            newData: arrayToJson
        };
        axios.put(`${URL_PATH}/api/student/editListOfStudents/`, dataToSave, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((result) => {
                iziToast.success({
                    message: result.data.message,
                    position: 'topRight'
                });
                console.log(result, 'then');
                setLoading(false)

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })
            .catch(res => {
                if (res.code === 'ERR_NETWORK')
                    iziToast.error({
                        message: 'Ошибка сервера. Попробуйте снова.',
                        position: "topRight",
                        color: "#FFF2ED"
                    });
                else
                    iziToast.error({
                        message: res.data.message,
                        position: "topRight",
                        color: "#FFF2ED"
                    });
                setLoading(false)
            })
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FA7A45"
            }
        },
    });

    return (

        <>
            <Modal
                open={active}
                onClose={setActive}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form ref={formRef} onSubmit={handleSubmit}>
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
                                    // defaultValue={studentData.second_agent_email}
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
                                    // defaultValue={studentData.first_representative_email}
                                           name='first_representative_email' variant="outlined"
                                           type="email" color="warning"
                                           sx={{width: '325px'}}
                                           margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
                                <TextField label="Вторая эл. почта представителя"
                                    // defaultValue={studentData.second_representative_email}
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
                                <TextField label="Номер приказа об отчислении" name='expulsion_order' type="text"
                                           variant="outlined"
                                           sx={{width: '325px'}}
                                           color="warning" margin='normal' size="small"
                                           inputProps={textFieldStyle} InputLabelProps={textFieldStyle}/>
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

                                <p className="title_text">Виза и приглашение</p>
                                <CustomSingleDatePicker
                                    name={"visa_validity"}
                                    //defaultValue={studentData.visa_validity}
                                    required={false}
                                    label={'Срок действия визы'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_international_service"}
                                    //defaultValue={studentData.transfer_to_international_service}
                                    required={false}
                                    label={'Дата передачи в международную службу'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"transfer_to_MVD"}
                                    //defaultValue={studentData.transfer_to_MVD}
                                    required={false}
                                    label={'Дата передачи в МВД'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"estimated_receipt_date"}
                                    //defaultValue={studentData.estimated_receipt_date}
                                    required={false}
                                    label={'Ориентировочная дата получения'}
                                    size={'default'}
                                />
                                <CustomSingleDatePicker
                                    name={"actual_receipt_date_invitation"}
                                    //defaultValue={studentData.actual_receipt_date_invitation}
                                    required={false}
                                    label={'Фактическая дата получения приглашения'}
                                    size={'default'}
                                />
                            </div>
                        </div>
                    </form>


                    {!loading
                        ?
                        <button className="submit_button_style" onClick={() => {
                            setOpenDialog(true)
                        }}>
                            Изменить
                        </button>
                        :
                        <ThemeProvider theme={theme}>
                            <LinearProgress color="primary"
                                            sx={{
                                                width: '120px',
                                                height: '25px',
                                                mt: "40px",
                                                mb: "15px",
                                                borderRadius: '7px'
                                            }}/>
                        </ThemeProvider>}
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