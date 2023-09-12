import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { CardContent, CardMedia, FormControl, Hidden, } from "@mui/material";

import { CartStorageSet, CartStorageGet } from "./library/localstorage";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Cart({ setAuthor }) {

    const [showPassword, setShowPassword] = React.useState(false);
    const theme = useTheme();
    const navigate = useNavigate();


    const matchesUPLG = useMediaQuery(theme.breakpoints.up('lg'));
    const matchesUPXL = useMediaQuery(theme.breakpoints.up('xl'));
    const matchesUPMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesUPSM = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesDOWNSM = useMediaQuery(theme.breakpoints.down('sm'));


    const handleOnClick = (event, contentID = "") => {
        event.preventDefault();
        if (contentID !== "") {
            navigate(`/course/${contentID}`);
        } else {

        }
    };

    return (

        <Grid container sx={{ padding: "2em" }}>
            <Hidden mdDown>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Shopping Cart
                    </Typography>
                </Grid>
            </Hidden>

            {CartStorageGet() !== null && <Hidden mdUp>
                <Grid item xs={12} md={4} sx={{}}>
                    <Grid container >
                        <Grid item xs={12} sx={{ borderBottom: "1px solid" }}>
                            <Typography variant="body1">
                                Total
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{}}>
                            <Typography variant="h5">
                                118.93 USD
                            </Typography>
                            <Button fullWidth color="firr" variant="contained" sx={{ marginTop: "2em" }}>CheckOut</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Hidden>}

            {CartStorageGet() !== null &&
                <Grid item xs={12} sx={{ marginTop: "1em" }}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={8} sx={{}}>

                            <Grid container>

                                <Grid item xs={12} sx={{}}>
                                    <Typography variant="body1">
                                        {CartStorageGet().listofcourseId.length} Courses in cart
                                    </Typography>
                                </Grid>

                                {CartStorageGet().cart.map((row, index) => {

                                    return (

                                        <Grid item xs={12} key={`cart-list-item-key-${index}`}
                                            onClick={(event) => { handleOnClick(event, row.contentID) }}
                                            sx={{
                                                borderTop: "1px solid",
                                                marginBottom: "1em",
                                                '&:hover': {
                                                    cursor: "pointer"
                                                },
                                            }}>

                                            <Card sx={{ display: "flex", }} elevation={0}>

                                                <Grid container>

                                                    <Grid item xs={3}>

                                                        {matchesUPSM && !matchesUPMD && !matchesUPLG && !matchesUPXL && <CardMedia
                                                            component="img"
                                                            sx={{ minwidth: 100, maxWidth: 104, padding: "1em" }}
                                                            image="/static/images/cards/live-from-space.jpg"
                                                            alt="Live from space album cover"
                                                        />}

                                                        {matchesUPMD && !matchesUPLG && !matchesUPXL && <CardMedia
                                                            component="img"
                                                            sx={{ minwidth: 105, maxWidth: 157, padding: "1em" }}
                                                            image="/static/images/cards/live-from-space.jpg"
                                                            alt="Live from space album cover"
                                                        />}

                                                        {matchesUPLG && !matchesUPXL && <CardMedia
                                                            component="img"
                                                            sx={{ minwidth: 158, maxWidth: 209, padding: "1em" }}
                                                            image="/static/images/cards/live-from-space.jpg"
                                                            alt="Live from space album cover"
                                                        />}

                                                        {matchesUPXL && <CardMedia
                                                            component="img"
                                                            sx={{ minwidth: 210, padding: "1em" }}
                                                            image="/static/images/cards/live-from-space.jpg"
                                                            alt="Live from space album cover"
                                                        />}

                                                    </Grid>

                                                    <Grid item xs={6}>

                                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Typography component="div" variant="h6">
                                                                    {row.Title}
                                                                </Typography>
                                                                <Typography variant="caption" component="div">
                                                                    Author {row.Author}
                                                                </Typography>
                                                                <Typography variant="subtitle" component="div" sx={{ marginTop: "1em" }}>
                                                                    View {row.Views}
                                                                </Typography>
                                                                <Typography variant="caption" component="div">
                                                                    Rating {row.Rating}
                                                                </Typography>
                                                                <Typography variant="caption" component="div" sx={{ marginTop: "2em" }}>
                                                                    Total Hours {row.Total_Hours}.
                                                                    {row.Course_Languages}.
                                                                    {row.ForWho}.
                                                                </Typography>
                                                            </CardContent>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                                                <Button aria-label="previous" color="secondary">
                                                                    Remove
                                                                </Button>
                                                                <Button aria-label="play/pause" color="secondary">
                                                                    Save for Later
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', p: "1em" }}>

                                                            <Typography component="div" variant="body1">
                                                                {row.price}
                                                            </Typography>

                                                        </Box>
                                                    </Grid>

                                                </Grid>

                                            </Card>

                                        </Grid>
                                    );

                                })}

                            </Grid>

                        </Grid>

                        <Hidden mdDown>
                            <Grid item xs={12} md={4} sx={{}}>
                                <Grid container >
                                    <Grid item xs={12} sx={{ borderBottom: "1px solid" }}>
                                        <Typography variant="body1">
                                            Total
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sx={{}}>
                                        <Typography variant="h5">
                                            118.93 USD
                                        </Typography>
                                        <Button fullWidth color="firr" variant="contained" sx={{ marginTop: "2em" }}>CheckOut</Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Hidden>

                    </Grid>

                </Grid>
            }

            {CartStorageGet() === null &&
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} sx={{}}>
                            <Typography variant="body1">
                                0 Courses in cart
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ border: "1px solid" }}>

                        </Grid>

                    </Grid>
                </Grid>
            }

        </Grid >

    );
}
