import React from 'react';
import '../ModalWindow/Modal.css';
import Disk from './file/Disk';


const ModalFile = ({active,setActive}) =>{

    return(
        <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <Disk/>
            </div>
        </div>
    )
}

export default ModalFile;