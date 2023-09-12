import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useTheme } from '@mui/material/styles';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Level = [
    { levelID: "1", title: ["Beginner", "ጀማሪ", "", ""] },
    { levelID: "2", title: ["Intermediate", "መካከለኛ", "", ""] },
    { levelID: "3", title: ["senior", "ከፍተኛ", "", ""] },

];

const defaultId = 100;

export default function AddGeneral(props) {

    const { courselanguage, setcourselanguage, courselevel, setcourselevel, Languages } = props;

    // const [title, settitle] = React.useState([]);
    // const [localtitle, setlocaltitle] = React.useState("");
    // const [languageID, setlanguageID] = React.useState("");

    const theme = useTheme();

    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "courselanguage") {
            setcourselanguage(value);
        }
        if (event.target.name === "courselevel") {
            setcourselevel(value);
        }

    };

    return (

        <Card variant="outlined">
            <Grid container component="div">
                <Grid item xs={12}>
                    <Grid container spacing={2}>

                        {/* <Grid item xs={5}>
                            <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-course-Form-control`}>
                                <InputLabel htmlFor={`title`}>Enter Course Title</InputLabel>
                                <OutlinedInput
                                    id={`title`}
                                    name={`title`}
                                    type={'text'}
                                    value={localtitle}
                                    label={`Enter Course Title`}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </Grid> */}

                        <Grid item xs={5}>
                            <TextField
                                select
                                fullWidth
                                color="firr"
                                required
                                onChange={handleChange}
                                id="courselanguage"
                                name="courselanguage"
                                label="course language"
                                defaultValue="1"
                                sx={{ marginTop: "1em" }}
                                helperText="Please select course language"
                                variant="outlined"
                                value={courselanguage}
                            >
                                {Languages.map((option, index) => (
                                    <MenuItem key={option.languageID} value={option.languageID}>
                                        {index}.{option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField
                                select
                                fullWidth
                                color="firr"
                                required
                                onChange={handleChange}
                                id="courselevel"
                                name="courselevel"
                                label="Course level"
                                defaultValue="1"
                                sx={{ marginTop: "1em" }}
                                helperText="Please select course level"
                                variant="outlined"
                                value={courselevel}
                            >
                                {Level.map((option, index) => (
                                    <MenuItem key={option.levelID} value={option.levelID}>
                                        {index}.{option.title[0]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </Card >
    );
}