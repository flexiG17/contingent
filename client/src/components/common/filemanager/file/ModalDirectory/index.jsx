import React, {useState} from 'react';
import '../../../ModalWindow/Modal.css';
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../../../../store/api-actions";
import {getCurrentDir} from "../../../../../store/slices/ManagerData/selectors";

const ModalDirectory = ({active, setActive, studentId}) => {
    const [name, setName] = useState('');
    const currentDir = useSelector(getCurrentDir);

    const dispatch = useDispatch();


    const createDirHandler = () => {
        console.log(studentId, currentDir, name);
        dispatch(createDir({studentId: studentId, parentId: currentDir, name: name}));
        setActive(false);
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                Добавление папки
                <input type="text" placeholder='Имя папки' value={name}
                       onChange={(event) => setName(event.target.value)}/>
                <button onClick={createDirHandler}>Добавить</button>
            </div>
        </div>
    );
};

export default ModalDirectory;