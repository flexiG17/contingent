import React, {useEffect, useRef, useState} from 'react';
import './Disk.css';
import FileList from "./FileList/FileList";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilesAction} from "../../../../store/api-actions";
import {getCurrentDir, getDirStack} from "../../../../store/slices/ManagerData/selectors";
import ModalDirectory from "./ModalDirectory";
import {popDirStack, setCurrentDir} from "../../../../store/slices/ManagerData/manager-data";

const Disk = ({studentId}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(getCurrentDir);
    const dirStack = useSelector(getDirStack);

    const [active, setActive] = useState(false);
    const fileRef = useRef(null);
    console.log(fileRef)

    useEffect(() => {
        dispatch(fetchFilesAction({studentId: studentId, parentId: currentDir}))
    }, [studentId, currentDir]);

    const openCreateDir = () => {
        setActive(true);
    };

    const backClickHandler = () => {
        const b = dirStack[dirStack.length - 1];
        dispatch(popDirStack());
        dispatch(setCurrentDir(b));
    };

    const uploadFileHandler = (event) => {

    }

    return (
        <>
            <div className="disk">
                <div className="disk_btns">
                    <button className="disk_style_btns" onClick={backClickHandler}>Назад</button>
                    <button className="disk_style_btns" onClick={openCreateDir}>Добавить папку</button>
                    <div className="disk_style_btns">
                        <label htmlFor="disk_upload_id">Выберете файл</label>
                        <input ref={fileRef} type="file" id="disk_upload_id" style={{display: "none"}}
                               onClick={uploadFileHandler} multiple={true}/>
                    </div>
                </div>
                <FileList/>
                {
                    active && <ModalDirectory active={active} setActive={setActive} studentId={studentId}/>
                }
            </div>
        </>
    )
}

export default Disk;
