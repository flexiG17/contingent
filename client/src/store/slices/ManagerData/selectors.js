import {NameSpace} from "../../../utils/consts";

export const getFiles = (state) => state[NameSpace.FileManager].files;

export const getCurrentDir = (state) => state[NameSpace.FileManager].currentDir;
