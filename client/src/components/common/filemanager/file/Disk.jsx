import React from 'react';
import './Disk.css';
import FileList from "./FileList/FileList";

const Disk = () =>{
    return(
        <>
            <div className="disk">
                <div className="disk_btns">
                    <button className="disk_style_btns">Назад</button>
                    <button className="disk_style_btns">Добавить файл</button>
                </div>
                <FileList/>
            </div>
        </>
    )
}

export default Disk;
