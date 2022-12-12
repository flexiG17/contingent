import React, {useEffect} from 'react';
import './Disk.css';
import FileList from "./FileList/FileList";
import {useDispatch} from "react-redux";
import {fetchFilesAction} from "../../../../store/api-actions";

const Disk = ({studentId}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilesAction({studentId}))
    }, [studentId])

    return (
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
