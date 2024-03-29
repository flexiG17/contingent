import React, {useEffect, useState} from 'react';
import './Disk.css';
import FileList from "./FileList/FileList";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilesAction, uploadFile} from "../../../../store/api-actions";
import {getCurrentDir, getDirStack, getIsLoading} from "../../../../store/slices/ManagerData/selectors";
import ModalDirectory from "./ModalDirectory";
import {popDirStack, setCurrentDir} from "../../../../store/slices/ManagerData/manager-data";
import Spinner from "../../Spinner";
import {getDiskSize} from "../../../../actions/fileManager";

const Disk = ({studentId}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(getCurrentDir);
    const dirStack = useSelector(getDirStack);
    const isLoading = useSelector(getIsLoading);

    const [active, setActive] = useState(false);

    const [diskData, setDiskData] = useState({
        freeSpace: 0,
        diskSize: 0
    })

    useEffect(() => {
        dispatch(fetchFilesAction({studentId: studentId, parentId: currentDir}))

        getDiskSize()
            .then(data => {
                setDiskData(data)
            })
    }, [studentId, currentDir]);

    const openCreateDir = () => {
        setActive(true);
    };

    const backClickHandler = () => {
        const b = dirStack[dirStack.length - 1];
        dispatch(popDirStack());
        dispatch(setCurrentDir(b.id));
    };

    const uploadFileHandler = (event) => {
        const files = [...event.target.files];
        dispatch(uploadFile({files: files, studentId: studentId, parentId: currentDir}));
    }

    return (
        <>
            {
                isLoading ?
                    <Spinner/>
                    :
                    <div className="disk">
                        <div className="disk_btns">
                            <button className="disk_style_btns" onClick={backClickHandler}>Назад</button>
                            <button className="disk_style_btns" onClick={openCreateDir}>Добавить папку</button>
                            <div className="disk_style_btns">
                                <label htmlFor="disk_upload_id">Выберите файл</label>
                                <input type="file" id="disk_upload_id" style={{display: "none"}}
                                       onChange={uploadFileHandler} multiple={true}/>
                            </div>

                            <div className="disk_data_label">
                                {`Свободно ${diskData.freeSpace} ГБ из ${diskData.diskSize} ГБ`}
                            </div>
                        </div>
                        {
                            dirStack.map((item) => {
                                return <> <span className='disk_style_bread'>{item.name}</span> /</>
                            })
                        }
                        <FileList/>
                        {
                            active && <ModalDirectory active={active} setActive={setActive} studentId={studentId}/>
                        }
                    </div>
            }
        </>
    )
}

export default Disk;
