import React from 'react';
import './File.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import {useDispatch} from "react-redux";
import {pushDirStack, setCurrentDir} from "../../../../../../store/slices/ManagerData/manager-data";

const File = ({file}) => {
    const dispatch = useDispatch();

    const handleFileClick = () => {
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file.id));
            dispatch(pushDirStack(file.parent_id));
        }
    };


    return (
        <>
            <div className="file" onClick={handleFileClick}>
                <div className="icon_file">{file.type === 'dir' ? <FolderIcon/> : <InsertDriveFileIcon/>}</div>
                <div className="file_name">{file.name}</div>
                <div className="file_date">{file.date.slice(0, 10)}</div>
                <div className="file_size">{file.size}</div>
            </div>
        </>
    )
}

export default File;
