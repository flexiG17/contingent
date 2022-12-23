import React, {useState} from 'react';
import '../../../CreateTaskModal/Modal.css';
import './dir.css';
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../../../../store/api-actions";
import {getCurrentDir} from "../../../../../store/slices/ManagerData/selectors";

const ModalDirectory = ({active, setActive, studentId}) => {
    const [name, setName] = useState('');
    const currentDir = useSelector(getCurrentDir);

    const dispatch = useDispatch();


    const createDirHandler = () => {
        dispatch(createDir({studentId: studentId, parentId: currentDir, name: name}));
        setActive(false);
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content dir__content" onClick={e => e.stopPropagation()}>
                <h2>Добавление папки</h2>
                <input className="dir__input" type="text" placeholder='Имя папки' value={name}
                       onChange={(event) => setName(event.target.value)}/>
                <button className="dir__button" onClick={createDirHandler}>Добавить</button>
            </div>
        </div>
    );
};

export default ModalDirectory;