import {createSlice} from "@reduxjs/toolkit";
import {NameSpace} from "../../../utils/consts";

const initialState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    dirStack: []
};

export const managerData = createSlice({
    name: NameSpace.FileManager,
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload;
        },
        addFile: (state, action) => {
            state.files = [...state.files, action.payload];
        },
        deleteFile: (state, action) => {
            state.files = [...state.files.filter((file) => file.id !== action.payload)];
        },
        setPopupDisplay: (state, action) => {
            state.popupDisplay = action.payload;
        },
        pushDirStack: (state, action) => {
            state.dirStack = [...state.dirStack, action.payload]
        },
    }
})

export const {setFiles, setCurrentDir, addFile, deleteFile, pushDirStack, popDirStack} = managerData.actions;