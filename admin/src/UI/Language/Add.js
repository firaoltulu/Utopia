import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useTheme } from '@mui/material/styles';
import { Alert, CardContent, FormControl, InputLabel, OutlinedInput, Snackbar } from "@mui/material";
import { AddNewLanguage } from "../../Hooks/request";

export default function Add({ setAuthor }) {

    const [title, settitle] = React.useState("");
    const [titleenglish, settitleenglish] = React.useState("");

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const theme = useTheme();

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (event.target.name === "titleenglish") {
            settitleenglish(value);

        }
        if (event.target.name === "title") {
            settitle(value);

        }

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title !== "" && titleenglish !== "") {

            const newobj = Object.assign({}, {
                title: title,
                titleenglish: titleenglish
            });

            const result = await AddNewLanguage(newobj);
            if (result.done) {
                settitle("");
                settitleenglish("");
                setsnackbaropen(true);
                console.log({ result });
            } else {
                seterrorsnackbaropen(true);
            }
        }
        else {
            seterrorsnackbaropen(true);
        }

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    }

    return (

        <Box>
            <Card variant="outlined" sx={{ margin: "1em" }}>

                <CardContent >

                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Add Language
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >

                            <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                <InputLabel htmlFor="titleenglish">Enter Language Title in English</InputLabel>
                                <OutlinedInput
                                    id="titleenglish"
                                    name="titleenglish"
                                    type={'text'}
                                    value={titleenglish}
                                    label="Enter Language Title in English"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                <InputLabel htmlFor="title">Enter Language Title in the new Language</InputLabel>
                                <OutlinedInput
                                    id="title"
                                    name="title"
                                    value={title}
                                    label="Enter Language Title in the new Language"
                                    onChange={handleChange}
                                />
                            </FormControl>


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

                        </Box>

                    </Box>

                </CardContent>

            </Card >

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You have successfully Rigster a New Language!
                </Alert>
            </Snackbar>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    SomeThing went wrong Please Try Again!!
                </Alert>
            </Snackbar>


        </Box>
    );
}
