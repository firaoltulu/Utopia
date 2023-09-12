import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color=""
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="#">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function LogIn({ setAuthor }) {


    const theme = useTheme();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // const user = {
        //     employeeid: data.get("Employee_id"),
        //     password: data.get("password"),
        // };
        // const res = await VerifyUsers(user);
        // console.log({
        //     res
        // });
        // setAuthor(res.done);
    };

    return (

        <Card variant="outlined">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >

                    <Typography component="h1" variant="h5">
                        LogIn
                    </Typography>
                    <Box
                        sx={{ mt: 1 }}
                    >

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="firr"
                            sx={{ mb: "1em" }}
                            startIcon={<GoogleIcon sx={{ marginRight: "2em" }} />}
                            size="large"
                        >
                            <Typography variant="subtitle">
                                Continue with Google
                            </Typography>

                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="firr"
                            sx={{ mb: "1em" }}
                            size="large"
                            startIcon={<FacebookRoundedIcon sx={{ marginRight: "1.1em" }} />}
                        >
                            <Typography variant="subtitle">
                                Continue with Facebook
                            </Typography>

                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="firr"
                            sx={{ mb: "1em" }}
                            size="large"
                            startIcon={<AppleIcon sx={{ marginRight: "2.5em" }} />}
                        >
                            <Typography variant="subtitle">
                                Continue with Apple
                            </Typography>

                        </Button>



                        <Grid container>
                            <Grid item xs={12} sx={{ textAlign: "center", color: "#323232" }}>
                                <Typography variant="body2" color="#460CB5"
                                >

                                    {" Thank You For Choosing Us"}

                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </Card >

    );
}
