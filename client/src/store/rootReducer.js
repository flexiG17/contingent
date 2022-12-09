import {combineReducers} from "redux";
import {NameSpace} from "../utils/consts";
import {managerData} from "./slices/ManagerData/manager-data";

export const rootReducer = combineReducers({
    [NameSpace.FileManager]: managerData.reducer
})