import React, {useState} from 'react';
import './File.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import {useDispatch} from "react-redux";
import {pushDirStack, setCurrentDir} from "../../../../../../store/slices/ManagerData/manager-data";
import {deleteDir} from "../../../../../../store/api-actions";
import {downloadFile} from "../../../../../../actions/fileManager";

const File = ({file}) => {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    const handleFileClick = () => {
        console.log('ТЫ НЕ ПРОЙДЁШЬ');
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file.id));
            dispatch(pushDirStack(file.parent_id));
        }
    };

    const handleMouseOver = () => {
        if (file.type !== 'dir') {
            setActive(true);
        }
    };

    const handleDeleteFile = () => {
        console.log('НИЗВЁЛ ДО АТОМОВ');
        dispatch(deleteDir({fileId: file.id}));
    }

    const handleDownloadFile = () => {
        console.log('ИДИ К ПАПОЧКЕ');
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
                                <InsertDriveFileIcon/>}</div>
                            <div className="file_name">{file.name}</div>
                            <div className="file_date">{file.date.slice(0, 10)}</div>
                            <div className="file_size">{file.size}</div>
                        </>
                        :
                        <>
                            <div className="icon_file">{file.type === 'dir' ? <FolderIcon/> :
                                <InsertDriveFileIcon/>}</div>
                            <div className="file_name">{file.name}</div>
                            <div className="file_date" onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadFile()
                            }
                            }><Download/></div>
                            <div className="file_size" onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteFile()
                            }}><DeleteIcon/></div>
                        </>
                }
            </div>
        </>
    )
}

export default File;
