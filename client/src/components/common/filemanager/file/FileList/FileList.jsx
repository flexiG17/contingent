import React from 'react'
import './FileList.css';
import File from './File/File';


const FileList = () =>{

    const files = [{id:1,name:'direc',type:'dir',size:'5gb',date:'11.12.2022'},
        {id:1,name:'file1',type:'file',size:'5gb',date:'11.12.2022'},
        {id:1,name:'direc3',type:'dir',size:'5gb',date:'11.12.2022'}].map(file=><File file={file} key={file.id}/>)

    return(

        <div className="filelist">
            <div className="filelist_header">
                <div className="filelist_name">Название</div>
                <div className="filelist_date">Дата</div>
                <div className="filelist_size">Размер</div>
            </div>
            {files}
        </div>

    )
}

export default FileList;