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

export default function Discription(props) {

    const { discription, setdiscription, Languages } = props;

    const [localdiscription, setlocaldiscription] = React.useState("");
    const [languageID, setlanguageID] = React.useState("");

    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const theme = useTheme();

    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "localdiscription") {
            setlocaldiscription(value);
        }
        if (event.target.name === "languageID") {
            setlanguageID(value);
        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (localdiscription !== "" && languageID !== "" && discription.length <= Languages.length) {
            const newobj = Object.assign({}, {
                discription: localdiscription,
                languageID: languageID,
            });
            try {
                discription.map((row, index) => {
                    if (row.languageID === newobj.languageID) {
                        throw new Error();
                    }
                });
                var loc = discription;
                loc.push(newobj);
                setdiscription(loc);
                setlocaldiscription("");
                setlanguageID("");
                console.log({ loc });
            } catch (e) {
                console.log("the discription in the same Languages exist");
                seterrorsnackbaropen(true);
                return;
            }

        }
        else {

        }
    };

    const handleDelete = async (event, index) => {
        event.preventDefault();
        const newtitle = discription.filter((row, i) => {
            if (i === index) {
                return;
            } else {
                return row;
            }
        });

        setdiscription(newtitle);
        console.log({ newtitle });
    };

    const handlesnackClose = (event) => {
        seterrorsnackbaropen(false);
    };

    return (

        <Card variant="outlined">

            <Grid container component="div">

                <Grid item xs={12}>
                    <Grid container spacing={2}>

                        <Grid item xs={7}>

                            <TextField
                                color="firr" variant="outlined"
                                fullWidth required
                                sx={{ marginTop: "1em" }}
                                multiline maxRows={5}
                                id={`localdiscription`}
                                name={`localdiscription`}
                                type={'text'}
                                value={localdiscription}
                                label={`Enter Course Discription`}
                                onChange={handleChange}
                            />

                        </Grid>
                        <Grid item xs={3}>

                            <TextField
                                select
                                fullWidth
                                required
                                color="firr"
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
                        <Table sx={{ minWidth: 650 }} aria-label="Course discription table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Discription</TableCell>
                                    <TableCell>Language</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {discription.map((row, index) => (
                                    <TableRow
                                        id={`Add-Course-discription-information-${index}`}
                                        key={`Add-Course-discription-information-${index}`}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{row.discription}</TableCell>
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
                    Error The Discription in the same Languages exist
                </Alert>
            </Snackbar>

        </Card >
        
    );
}