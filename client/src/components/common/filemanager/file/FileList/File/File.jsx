import React, {useState} from 'react';
import './File.css';
import '../../../../CreateTaskModal/Modal.css';
import '../../ModalDirectory/dir.css';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import {useDispatch} from "react-redux";
import {pushDirStack, setCurrentDir} from "../../../../../../store/slices/ManagerData/manager-data";
import {downloadFile} from "../../../../../../actions/fileManager";
import {fileSizes} from "../../../../../../utils/consts/file";
import {deleteDir} from "../../../../../../store/api-actions";

const File = ({file}) => {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const calculateFileSize = (fSize) => {
        if (fSize === null || fSize === undefined) {
            return null;
        }
        let tmp = fSize;
        let size = 0;

        while (tmp >= 1024) {
            tmp /= 1024;
            size++;
        }

        return `${tmp.toFixed(1)} ${fileSizes[size]}`
    }

    const handleFileClick = () => {
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file.id));
            dispatch(pushDirStack({name: file.name, id: file.parent_id}));
        }
    };

    const handleMouseOver = () => {
        if (file.type !== 'dir') {
            setActive(true);
        }
    };

    const handleDeleteFile = () => {
        dispatch(deleteDir({fileId: file.id}));
    }

    const handleDownloadFile = () => {
        downloadFile(file.id)
            .then((response) => {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', file.name);

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
    }

    return (
        <>
            <div className="file" onClick={handleFileClick} onMouseOver={handleMouseOver}
                 onMouseOut={() => setActive(false)}>
                {
                    !active ?
                        <>
                            <div className="icon_file">{file.type === 'dir' ? <FolderIcon/> :
                                <InsertDriveFileOutlinedIcon/>}</div>
                            <div className="file_name">{file.name}</div>
                            <div className="file_date">{file.date.slice(0, 10)}</div>
                            <div className="file_size">{calculateFileSize(file.size)}</div>
                        </>
                        :
                        <>
                            <div className="icon_file">{file.type === 'dir' ? <FolderIcon/> :
                                <InsertDriveFileOutlinedIcon/>}</div>
                            <div className="file_name">{file.name}</div>
                            <div className="file_date" onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadFile()
                            }
                            }><Download/></div>
                            <div className="file_size" onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}><DeleteIcon/></div>
                        </>
                }
            </div>
            {
                isOpen &&
                <div className={isOpen ? "modal active" : "modal"} onClick={() => setIsOpen(false)}>
                    <div className="modal_content dir__content" onClick={e => e.stopPropagation()}>
                        <h2>Вы уверны, что хотите удалить выбранный файл?</h2>
                        <div>
                            <button className="dir__button" onClick={handleDeleteFile}>Да</button>
                            <button className="dir__button" onClick={() => setIsOpen(false)}>Нет</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default File;
