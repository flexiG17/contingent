import * as React from "react";
import jwt_decode from "jwt-decode";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {createXlsx, importXlsx, removeArrayOfStudents} from "../../../../actions/student";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadIcon from "@mui/icons-material/Upload";
import FilterListIcon from "@mui/icons-material/FilterList";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {getToken} from "../../../../utils/token";
import moment from "moment";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CreateTaskModalWindow from "../../CreateTaskModal";
import {useState} from "react";
import TaskIcon from '@mui/icons-material/Task';
import EmailIcon from '@mui/icons-material/Email';
import ModalMessage from "../../MessageModal";
import {useNavigate} from "react-router-dom";
import './toolbar.css'

export default function TableToolbar({numSelected, selectedRows, selectedEmails}) {
    const [file, setFile] = useState(undefined);
    const [modalActive, setModalActive] = useState(false)
    const [modalMessageActive, setModalMessageActive] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const navigate = useNavigate()
    let decodedToken = jwt_decode(getToken());
    const READER_ACCESS = decodedToken.role === 'Читатель';
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{flex: '1 1 100%'}}>
                        {numSelected} выбрано
                    </Typography>
                ) : (
                    <Typography sx={{flex: '1 1 100%'}}>
                    </Typography>
                )}

                {numSelected > 0 ? (<>
                        {!READER_ACCESS && <Tooltip title={`Рассылка ${selectedEmails.length} указанным студентам`}>
                            <IconButton onClick={() => {
                                setModalMessageActive(true)
                            }}>
                                <EmailIcon sx={{cursor: 'pointer'}}
                                />
                            </IconButton>
                        </Tooltip>}
                        <Tooltip title="Создать задачу">
                            <IconButton onClick={() => {
                                setModalActive(true)
                            }}>
                                <TaskIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Загрузить">
                            <IconButton onClick={() => {
                                createXlsx(selectedRows)
                                    .then(response => {
                                        let url = window.URL.createObjectURL(response.data);
                                        let a = document.createElement('a');
                                        a.href = url;
                                        const date = moment();
                                        a.setAttribute('download', `Выгрузка от ${date.format('DD.M.YYYY')}.xlsx`);

                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    });
                            }}>
                                <FileDownloadIcon/>
                            </IconButton>
                        </Tooltip>
                        {!READER_ACCESS &&
                            <Tooltip title="Удалить">
                                <IconButton onClick={() => {
                                    handleOpen();
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        }


                    </>
                ) : (
                    <>
                        {!READER_ACCESS &&
                            <label htmlFor="input_students" className='file_input'>
                                {file === undefined ? 'Выбрать файл' : file.name}
                                <input className='file_input' type="file" name='input_students' id='input_students'
                                       onChange={e => {
                                           setFile(e.target.files[0]);
                                       }}/>
                                <InsertDriveFileIcon sx={{fontSize: 15}}/>
                            </label>}

                        {!READER_ACCESS && file !== undefined &&
                            <>
                                <DoNotDisturbIcon sx={{cursor: 'pointer', marginRight: '10px'}} onClick={() => {
                                    setFile(undefined)
                                }
                                }/>
                                <Tooltip sx={{cursor: "pointer"}} color='inherit' title="Загрузить студентов">
                                    <UploadIcon fontSize='medium' onClick={() => {
                                        const data = new FormData()
                                        data.append('fileToImport', file)
                                        importXlsx(data, navigate)
                                    }}>
                                        <FilterListIcon/>
                                    </UploadIcon>
                                </Tooltip>
                            </>
                        }
                    </>
                )}
            </Toolbar>
            <CreateTaskModalWindow active={modalActive} setActive={setModalActive} idArray={selectedRows} emails={selectedEmails}/>
            <ModalMessage active={modalMessageActive} setActive={setModalMessageActive} studentEmail={selectedEmails}/>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Удаление студента</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить выбранных студентов?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        removeArrayOfStudents(selectedRows, navigate)
                        setOpen(false);
                    }
                    }>Да</Button>
                    <Button onClick={() => {
                        setOpen(false);
                    }
                    }>Нет</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}