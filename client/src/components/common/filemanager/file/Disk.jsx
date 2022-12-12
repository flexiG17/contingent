import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        dispatch(fetchFilesAction({studentId: studentId, parentId: currentDir}))
    }, [studentId, currentDir]);

    const openCreateDir = () => {
        setActive(true);
    };

    const backClickHandler = () => {
        console.log('ТЫ НЕ ПРОЙДЁШЬ!');
        const b = dirStack[dirStack.length - 1];
        dispatch(popDirStack());
        dispatch(setCurrentDir(b));
    };

    return (
        <>
            <div className="disk">
                <div className="disk_btns">
                    <button className="disk_style_btns" onClick={backClickHandler}>Назад</button>
                    <button className="disk_style_btns" onClick={openCreateDir}>Добавить папку</button>
                    <button className="disk_style_btns">Добавить файл</button>
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
