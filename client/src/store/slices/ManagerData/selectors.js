import {NameSpace} from "../../../utils/consts";

export const getFiles = (state) => state[NameSpace.FileManager].files;

export const getCurrentDir = (state) => state[NameSpace.FileManager].currentDir;

export const getDirStack = (state) => state[NameSpace.FileManager].dirStack;

export const getIsLoading = (state) => state[NameSpace.FileManager].isLoading;
