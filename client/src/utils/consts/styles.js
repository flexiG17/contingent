import {createTheme} from "@mui/material";

export const textFieldStyle = {
    style:
        {
            fontSize: "14.5px",
            fontFamily: ['Montserrat'],
            fontWeight: '450',
            zIndex: 0
        },
}

export const dateTextFieldStyle = {
    style:
        {
            fontSize: "14.5px",
            fontFamily: ['Montserrat'],
            fontWeight: '450'
        },
    shrink: true
}

export const listItemStyle = {
    fontSize: "14px",
    fontFamily: ['Montserrat'],
    fontWeight: '450'
}

export const lineStyleInTable = {
    textDecoration: 'none',
    color: 'black',
    fontSize: "14px",
    fontFamily: ['Montserrat'],
    fontWeight: '400'
}

export const systemColor = createTheme({
    palette: {
        primary: {
            main: "#FA7A45"
        }
    },
});