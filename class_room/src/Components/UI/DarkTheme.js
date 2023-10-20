import { createTheme } from '@mui/material/styles';



const ListItemTextcolor = "#000000";
const headercolor = "#e7fae3";


export default createTheme({

    palette: {

        mode: "dark",
        common: {
            "black": "#000",
            "white": "#fff"
        },
        primary: {
            "main": "#0d0c22",
            "light": "#e3f2fd",
            "dark": "#42a5f5",
            "contrastText": headercolor
        },
        secondary: {
            "main": "#c4c4c9",
            "light": "#8580cd",
            "dark": "#6f539f",
            "contrastText": "#fefcff"
        },
        error: {
            "main": "#ff0909",
            "light": "#ff0909",
            "dark": "#ff0909",
            "contrastText": "#fff"
        },
        warning: {
            "main": "#ffa726",
            "light": "#ffb74d",
            "dark": "#f57c00",
            "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        info: {
            "main": "#29b6f6",
            "light": "#4fc3f7",
            "dark": "#0288d1",
            "contrastText": "rgba(0, 0, 0, 0.87)"
        },
        success: {
            "main": "#66bb6a",
            "light": "#81c784",
            "dark": "#388e3c",
            "contrastText": "rgba(0, 0, 0, 0.87)"
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
            "primary": "#fff",
            "secondary": "rgba(255, 255, 255, 0.7)",
            "disabled": "rgba(255, 255, 255, 0.5)",
            "icon": "rgba(255, 255, 255, 0.5)"
        },
        divider: "rgba(255, 255, 255, 0.12)",
        background: {
            "paper": "#07091f",
            "default": "#07091f"
        },
        action: {
            "active": "#fff",
            "hover": "rgba(255, 255, 255, 0.08)",
            "hoverOpacity": 0.08,
            "selected": "rgba(255, 255, 255, 0.16)",
            "selectedOpacity": 0.16,
            "disabled": "rgba(255, 255, 255, 0.3)",
            "disabledBackground": "rgba(255, 255, 255, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(255, 255, 255, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.24
        },
        Drawerbackcolor: {
            main: "#d8d9da",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        },
        Breadcrumbs: {
            main: "#0d0c22",
            light: "#e2e3f4",
            dark: "#1565c0",
            contrastText: headercolor
        },
        nextprev_button: {
            main: "#ced0cd",
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
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
        },
        learnButton: {
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold",
        },
    }

});
