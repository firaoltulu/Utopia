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
import { Alert, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// const defaultId = 100;

export default function AddTitle(props) {

    const { title, settitle, Languages } = props;

    // const [title, settitle] = React.useState([]);

    const [localtitle, setlocaltitle] = React.useState("");
    const [languageID, setlanguageID] = React.useState("");

    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const theme = useTheme();

    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "title") {
            setlocaltitle(value);
        }
        if (event.target.name === "languageID") {
            setlanguageID(value);
        }

    };

    const handlesnackClose = (event) => {
        seterrorsnackbaropen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (localtitle !== "" && languageID !== "" && title.length <= Languages.length) {
            const newobj = Object.assign({}, {
                title: localtitle,
                languageID: languageID,
            });
            try {
                title.map((row, index) => {
                    if (row.languageID === newobj.languageID) {
                        throw new Error();
                    }
                });

                var loc = title;

                loc.push(newobj);
                console.log({ loc });
                settitle(loc);
                setlocaltitle("");
                setlanguageID("");

            } catch (e) {
                console.log("the title in the same Languages exist");
                seterrorsnackbaropen(true);
                return;
            }


        }
        else {

        }
    };

    const handleDelete = async (event, index) => {
        event.preventDefault();
        const newtitle = title.filter((row, i) => {
            if (i === index) {
                return;
            } else {
                return row;
            }
        });
        console.log({ newtitle });

        settitle(newtitle);
    };

    return (

        <Card variant="outlined">
            <Grid container component="div">
                <Grid item xs={12}>
                    <Grid container spacing={2}>

                        <Grid item xs={5}>
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

                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                select
                                fullWidth
                                color="firr"
                                required
                                onChange={handleChange}
                                id="languageID"
                                name="languageID"
                                label="languageID"
                                defaultValue="1"
                                sx={{ marginTop: "1em" }}
                                helperText="Please select language ID"
                                variant="outlined"
                                value={languageID}
                            >
                                {Languages.map((option, index) => (
                                    <MenuItem key={option.languageID} value={option.languageID}>
                                        {option.languageID}.{option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="firr"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Add
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="Title table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Language</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {title.map((row, index) => (
                                    <TableRow
                                        id={`Add-Course-General-information-${index}`}
                                        key={`Add-Course-General-information-${index}`}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.languageID}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={e => { handleDelete(e, index) }}>
                                                delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>

            </Grid>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error The title in the same Languages exist
                </Alert>
            </Snackbar>
            
        </Card >

    );
}