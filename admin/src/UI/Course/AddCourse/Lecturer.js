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
import {
    FormControl, IconButton, Input, InputAdornment, InputLabel,
    MenuItem, OutlinedInput, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Lecturer(props) {

    const { lecturer, setlecturer, Languages } = props;
    const [locallecturerName, setlocallecturerName] = React.useState("");
    const [locallecturerTitle, setlocallecturerTitle] = React.useState("");
    const [languageID, setlanguageID] = React.useState("");
    const theme = useTheme();

    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "locallecturerName") {
            setlocallecturerName(value);
        }
        if (event.target.name === "locallecturerTitle") {
            setlocallecturerTitle(value);
        }
        if (event.target.name === "languageID") {
            setlanguageID(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (locallecturerName !== "" && locallecturerTitle !== "" && languageID !== "") {
            const newobj = Object.assign({}, {
                lecturerName: locallecturerName,
                lecturerTitle: locallecturerTitle,
                languageID: languageID,
            });

            var loc = lecturer;
            loc.push(newobj);
            setlecturer(loc);
            setlocallecturerName("");
            setlocallecturerTitle("");
            console.log({ loc });
        }
        else {

        }
    };

    const handleDelete = async (event, index) => {
        event.preventDefault();
        const newlecturers = lecturer.filter((row, i) => {
            if (i === index) {
                return;
            } else {
                return row;
            }
        });

        setlecturer(newlecturers);
        console.log({ newlecturers });
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
                                id={`locallecturerName`}
                                name={`locallecturerName`}
                                type={'text'}
                                value={locallecturerName}
                                label={`Enter Course Lecturer`}
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

                        <Grid item xs={7}>

                            <TextField
                                color="firr" variant="outlined"
                                fullWidth required
                                sx={{ marginTop: "1em" }}
                                multiline maxRows={5}
                                id={`locallecturerTitle`}
                                name={`locallecturerTitle`}
                                type={'text'}
                                value={locallecturerTitle}
                                label={`Enter Course Lecturer Title`}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={3}>

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
                    <Grid container>
                        {Languages.map((languages, outindex) => {

                            return (
                                <Grid item xs={12} sx={{ marginBottom: "2em", border: "1px solid" }}
                                    id={`Add-Course-lecturer-information-${outindex}`}
                                    key={`Add-Course-lecturer-information-${outindex}`}>
                                    <Typography variant="h6">{Languages[outindex].title}</Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="Course goals table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Lecturer</TableCell>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {lecturer.map((row, index) => {

                                                    if (row.languageID === languages.languageID) {
                                                        return (
                                                            <TableRow
                                                                id={`Add-Course-lecturer-inner-information-${index}`}
                                                                key={`Add-Course-lecturer-inner-information-${index}`}
                                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                            >
                                                                <TableCell>{row.lecturerName}</TableCell>
                                                                <TableCell>{row.lecturerTitle}</TableCell>
                                                                <TableCell>
                                                                    <Button variant="contained" onClick={e => { handleDelete(e, index) }}>
                                                                        delete
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    else {
                                                        return (<React.Fragment key={`Add-Course-lecturer-inner-information-dont-display-${index}`}></React.Fragment>);
                                                    }

                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                            );

                        })}
                    </Grid>
                </Grid>

            </Grid>

        </Card >

    );
}