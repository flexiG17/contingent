import {combineReducers} from "redux";
import {NameSpace} from "../utils/consts";
import {managerData} from "./slices/ManagerData/manager-data";
import {appData} from "./slices/AppData/app-data";

export const rootReducer = combineReducers({
    [NameSpace.FileManager]: managerData.reducer,
    [NameSpace.App]: appData.reducer
})