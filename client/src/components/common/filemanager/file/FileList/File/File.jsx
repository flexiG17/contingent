import React from 'react';
import './File.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

const File =({file})=>{
    return(
        <>
            <div className="file">
                <div className="icon_file">{file.type === 'dir' ? <FolderIcon/> : <InsertDriveFileIcon/> }</div>
                <div className="file_name">{file.name}</div>
                <div className="file_date">{file.date}</div>
                <div className="file_size">{file.size}</div>
            </div>
        </>
    )
}

export default File;
