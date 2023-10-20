import { createTheme } from '@mui/material/styles';


const ListItemTextcolor = "#000000";
const buttonfocuscolor = "#f0f2f0";
const headercolor = "#1b1d3f";
const secondcolor = "#374434";


export default createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#f4fcf3",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        },

        secondary: {
            main: secondcolor,
            light: "#11154a",
            dark: "#7b1fa2",
            contrastText: secondcolor
        },

        error: {
            main: "#d32f2f",
            light: "#ef5350",
            dark: "#c62828",
            contrastText: "#fff"
        },

        warning: {
            main: "#ed6c02",
            light: "#ff9800",
            dark: "#e65100",
            contrastText: "#fff"
        },

        info: {
            main: "#0288d1",
            light: "#03a9f4",
            dark: "#01579b",
            contrastText: "#fff"
        },

        success: {
            main: "#2e7d32",
            light: "#4caf50",
            dark: "#1b5e20",
            contrastText: "#fff"
        },

        grey: {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,

        text: {
            "primary": headercolor,
            "secondary": headercolor,
            "disabled": headercolor
        },

        divider: "#01087b",

        background: {
            "paper": "#fff",
            "default": "#fff"
        },

        action: {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": buttonfocuscolor,
            "hoverOpacity": 0.1,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": buttonfocuscolor,
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12
        },

        Drawerbackcolor: {
            main: "#d8d9da",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        },
        Breadcrumbs: {
            main: "#d8dbd7",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        },
        nextprev_button: {
            main: "#495347",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        }


    },
    typography: {

        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            color: headercolor,
            fontSize: "1rem",
        },
        h2: {
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            lineHeight: 1.5,
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",

        },
        h4: {
            fontFamily: "Raleway",
            fontSize: "1.75rem",
            fontWeight: 700,
        },
        h6: {
            fontWeight: 800,
            fontFamily: "Raleway",
            // color: headercolor,
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
        },
        subtitle3: {
            fontWeight: 200,
            fontSize: "1rem",
        },
        subtitle4: {
            fontWeight: 200,
            fontSize: "0.91rem",
        },
        subtitle5: {
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Raleway",
        },
        subtitle6: {
            fontFamily: "Pacifico",
            fontSize: "1.5rem",

        },
        listitemtextprimary: {
            fontFamily: "Pacifico",
            fontWeight: 600,
            fontSize: "1rem",
        },
        listitemtextsecondary: {
            fontFamily: "Pacifico",
            fontWeight: 600,
            fontSize: "1rem",
        },
        button: {
            fontWeight: 500,
            fontFamily: "Raleway",
            // color: headercolor,
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "0.9rem",
            textTransform: "none",
        },
        learnButton: {
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold",
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",

        },

    }

});
