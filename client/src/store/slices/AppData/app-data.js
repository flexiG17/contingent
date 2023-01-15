import {createSlice} from "@reduxjs/toolkit";
import {NameSpace} from "../../../utils/consts/file";

const initialState = {
    appStatus: 1,
}

export const appData = createSlice({
    name: NameSpace.App,
    initialState,
    reducers: {
        setAppStatus: (state, action) => {
            state.appStatus = action.payload;
        },
    }
})

export const {setAppStatus} = appData.actions;