import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff"
        },
        secondary: {
            main: "#000000"
        },
        text:{
            primary:"#000000"
        },
        action: {
            hover: {
                main: "#fff9d4"
            }
        },
        firr:{
            main: "#460CB5"
        },
        firr2:{
            main:"#75F94D",
        }
    },
    mixins: {
        toolbar: {
            minHeight: "2em",
            maxHeight:"3em",
        }
    },
    StyledTableCell: {
        set: true
    },
    shape:{
        borderRadius : 1,
    }
    //    typography:{
    //     subtitle2:{
    //         fontWeight:
    //     }
    //    }
});

export default theme;

