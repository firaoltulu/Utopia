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
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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



export default function SignIn({ setAuthor }) {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const theme = useTheme();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = (event) => {
        setShowConfirmPassword((show) => !show);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="FullName"
                            label="Full Name"
                            name="FullName"
                            autoComplete="Full Name"
                            autoFocus
                            color="firr"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Email"
                            label="Email"
                            id="Email"
                            autoComplete="Email"
                            color="firr"
                        />

                        <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                            <InputLabel htmlFor="Password">Password</InputLabel>
                            <OutlinedInput
                                id="Password"
                                name="Password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                            <InputLabel htmlFor="ConfirmPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="ConfirmPassword"
                                name="ConfirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="firr"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs={12} sx={{ textAlign: "center", color: "#323232" }}>
                                <Typography variant="body2" color="#460CB5"
                                >
                                    <Link href="#" variant="inherit" color="#460CB5" >
                                       {" Already have an account? Log in"}
                                    </Link>
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
