import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#141921"
        },
        secondary: {
            main: "#000000"
        },
        text: {
            primary: "#000000"
        },
        action: {
            hover: {
                main: "#C7C7C7",
            },
            selected: "#C7C7C7",
            active: "#C7C7C7",

        },
        firr: {
            main: "#460CB5"
        },
        firr2: {
            main: "#000000",
        },

    },
    mixins: {
        toolbar: {
            minHeight: "1.5em",
            maxHeight: "1.7em",
        },
        minWidth: "600px",
    },
    StyledTableCell: {
        set: true
    },
    shape: {
        borderRadius: 1,
    },
    typography: {
        htmlFontSize: 16,
        fontSize: 12,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        h6: {
            fontFamily: `"Roboto","Helvetica","Arial","sans-serif"`,
            fontWeight: 500,
            fontSize: "1.0rem",
            lineHeight: 1.6,
            letterSpacing: "0.0075em"

        },
        subtitle1: {
            fontFamily: `"Roboto","Helvetica","Arial","sans-serif"`,
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.57,
            letterSpacing: "0.00714em"
        }

        // subtitle2: {
        //     fontWeight:
        // }
    }
});

export default theme;

