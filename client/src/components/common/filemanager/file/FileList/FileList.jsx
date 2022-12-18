import React from 'react'
import './FileList.css';
import File from './File/File';
import {useSelector} from "react-redux";
import {getFiles} from "../../../../../store/slices/ManagerData/selectors";


const FileList = () => {

    const files = useSelector(getFiles);

    return (

        <div className="filelist">
            <div className="filelist_header">
                <div className="filelist_name">Название</div>
                <div className="filelist_date">Дата</div>
                <div className="filelist_size">Размер</div>
            </div>
            {files.map(file => <File key={file.id} file={file}/>)}
        </div>

    )
}

export default FileList;