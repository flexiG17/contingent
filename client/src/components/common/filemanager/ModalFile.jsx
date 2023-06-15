import React from 'react';
import '../CreateTaskModal/Modal.css';
import Disk from './file/Disk';
const ModalFile = ({active,setActive, studentId}) =>{

    return(
        <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <Disk studentId={studentId}/>
            </div>
        </div>
    )
}
export default ModalFile;