import {createSlice} from "@reduxjs/toolkit";
import {NameSpace} from "../../../utils/consts";

const initialState = {
    files: [],
    currentDir: null,
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
            state.files.push(action.payload);
        },
        pushDirStack: (state, action) => {
            state.dirStack.push(action.payload);
        },
        popDirStack: (state) => {
            state.dirStack.pop();
        }
    }
})

export const {setFiles, setCurrentDir, addFile, pushDirStack, popDirStack} = managerData.actions;