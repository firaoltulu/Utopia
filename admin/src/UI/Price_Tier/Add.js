import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { styled, useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Alert, CardContent, CardHeader, FormControl,
    Grid, IconButton, InputLabel, MenuItem,
    OutlinedInput, Paper, Skeleton, Snackbar, Table, TableBody, TableContainer, TableHead, TableRow, TextField
} from "@mui/material";

import List_Price_Tiers from "./List";
import { AddNewPrice_Tier, GetAllPrice_Tiers } from "../../Hooks/request";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const currencies = [{ Currency_ID: "0", title: "ETB" }];

export default function Price_tier_Add({ setAuthor }) {

    const [maxprice_tier, setmaxprice_tier] = React.useState("");
    const [minprice_tier, setminprice_tier] = React.useState("1.00");
    const [SelectCurrency, setSelectCurrency] = React.useState("");


    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const [erroronesnackbaropen, seterroronesnackbaropen] = React.useState(false);
    const [errortwosnackbaropen, seterrortwosnackbaropen] = React.useState(false);
    const [errorthreesnackbaropen, seterrorthreesnackbaropen] = React.useState(false);


    const [errorresponceonesnackbaropen, seterrorresponceonesnackbaropen] = React.useState(false);
    const [errorresponcetwosnackbaropen, seterrorresponcetwosnackbaropen] = React.useState(false);
    const [errorresponcethreesnackbaropen, seterrorresponcethreesnackbaropen] = React.useState(false);
    const [errorresponcefoursnackbaropen, seterrorresponcefoursnackbaropen] = React.useState(false);
    const [errorresponcefivesnackbaropen, seterrorresponcefivesnackbaropen] = React.useState(false);
    const [errorresponcesixsnackbaropen, seterrorresponcesixsnackbaropen] = React.useState(false);


    const [reload, setreload] = React.useState(false);
    const [price_tiers, setprice_tiers] = React.useState([]);

    const [refresh, setrefresh] = React.useState(false);
    const [loading, setloading] = React.useState(true);

    const theme = useTheme();

    React.useEffect(() => {
        const get = async () => {

            try {
                setloading(true);
                const price_tiers = await GetAllPrice_Tiers();
                if (price_tiers.done) {
                    setprice_tiers(price_tiers.fetcheddata);
                    setloading(false);
                    setrefresh(false);
                }
                else {
                    setrefresh(true);
                    setloading(false);
                    setprice_tiers([]);
                }

            } catch (error) {


            }

        }

        get();



    }, [reload]);

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (event.target.name === "minprice_tier") {
            if (value >= 1) {
                setminprice_tier(value);
            }
        }
        if (event.target.name === "maxprice_tier") {
            if (value >= 0) {
                setmaxprice_tier(value);
            }
        }
        if (event.target.name === "SelectCurrency") {
            setSelectCurrency(value);
        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (parseFloat(maxprice_tier) >= 0 && parseFloat(minprice_tier) >= 0) {

            var max = parseFloat(maxprice_tier, 2);
            var min = parseFloat(minprice_tier, 2);
            // console.log({ max });
            // console.log({ min });

            if (max > min) {

                const foundcurrency = currencies.find((row, index) => {
                    if (row.Currency_ID === SelectCurrency) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundcurrency) {

                    const newobj = Object.assign({}, {
                        minprice_tier: min,
                        maxprice_tier: max,
                        Currency: SelectCurrency
                    });

                    const result = await AddNewPrice_Tier(newobj);

                    console.log({ result });

                    if (result.done) {
                        setmaxprice_tier(0);
                        setminprice_tier(0);
                        setsnackbaropen(true);

                    } else {
                        if (result.reason === 1) {
                            seterrorresponceonesnackbaropen(true);

                        }
                        else if (result.reason === 2) {
                            seterrorresponcetwosnackbaropen(true);

                        }
                        else if (result.reason === 3) {
                            seterrorresponcethreesnackbaropen(true);

                        }
                        else if (result.reason === 4) {
                            seterrorresponcefoursnackbaropen(true);

                        }
                        else if (result.reason === 5) {
                            seterrorresponcefivesnackbaropen(true);

                        }
                        else if (result.reason === 6) {
                            seterrorresponcesixsnackbaropen(true);
                        }
                        else {
                            seterrorsnackbaropen(true);
                        }


                    }

                }
                else {
                    seterrorthreesnackbaropen(true);
                }
            }
            else {
                seterroronesnackbaropen(true);
            }
        }
        else {
            seterrortwosnackbaropen(true);
        }

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
        seterroronesnackbaropen(false);
        seterrortwosnackbaropen(false);
        seterrorthreesnackbaropen(false);


        {
            seterrorresponceonesnackbaropen(false);
            seterrorresponcetwosnackbaropen(false);
            seterrorresponcethreesnackbaropen(false);
            seterrorresponcefoursnackbaropen(false);
            seterrorresponcefivesnackbaropen(false);
            seterrorresponcesixsnackbaropen(false);

        }
    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreload(!reload);
    }

    return (

        <Box>

            {!refresh && !loading && <Box>

                <Card variant="outlined" sx={{ margin: "1em" }}>

                    <CardHeader

                        action={
                            <IconButton aria-label="settings">

                            </IconButton>
                        }
                        title="Add Price Tier"

                    />

                    <CardContent>

                        <Grid container columnSpacing={3}>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    color="firr"
                                    onChange={handleChange}
                                    id="SelectCurrency"
                                    name="SelectCurrency"
                                    label="Currency"
                                    defaultValue="1"
                                    sx={{ marginTop: "1em" }}
                                    helperText="Please select Select Currency"
                                    variant="outlined"
                                    value={SelectCurrency}
                                >
                                    {currencies.map((option, index) => (
                                        <MenuItem key={option.Currency_ID} value={option.Currency_ID}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                    <InputLabel htmlFor="minprice_tier">Enter Minimum Price Tier</InputLabel>
                                    <OutlinedInput
                                        id="minprice_tier"
                                        name="minprice_tier"
                                        type={'number'}
                                        value={minprice_tier}
                                        label="Enter Minimum Price Tier"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl size="medium" sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                    <InputLabel htmlFor="maxprice_tier">Enter Maximum Price Tier</InputLabel>
                                    <OutlinedInput
                                        min="0"
                                        max="1000"
                                        step="0.01"
                                        id="maxprice_tier"
                                        name="maxprice_tier"
                                        type={'number'}
                                        value={maxprice_tier}
                                        label="Enter Maximum Price Tier"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="firr"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Add Price Tier
                                </Button>
                            </Grid>

                        </Grid>

                    </CardContent>

                </Card >

                <List_Price_Tiers currencies={currencies} price_tiers={price_tiers}></List_Price_Tiers>


                <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                        You have successfully Rigster a New Price Tier!
                    </Alert>
                </Snackbar>

                <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                        SomeThing went wrong Please Try Again!!
                    </Alert>
                </Snackbar>

                <Snackbar open={erroronesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                        Maximum Price Tier Should be greater than the Minimum!!
                    </Alert>
                </Snackbar>

                <Snackbar open={errortwosnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                        Maximum & Minimum Price Tier Should be greater than 0 & 1!!
                    </Alert>
                </Snackbar>

                <Snackbar open={errorthreesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                        You Need To select a Currency!!
                    </Alert>
                </Snackbar>

                <Box>
                    <Snackbar open={errorresponceonesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 1
                        </Alert>
                    </Snackbar>

                    <Snackbar open={errorresponcetwosnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 2
                        </Alert>
                    </Snackbar>

                    <Snackbar open={errorresponcethreesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 3
                        </Alert>
                    </Snackbar>

                    <Snackbar open={errorresponcefoursnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 4
                        </Alert>
                    </Snackbar>


                    <Snackbar open={errorresponcefivesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 5
                        </Alert>
                    </Snackbar>

                    <Snackbar open={errorresponcesixsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                        <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                            error number 6
                        </Alert>
                    </Snackbar>
                </Box>

            </Box>}


            {!refresh && loading &&
                <Card variant="outlined" sx={{ margin: "1em" }}>

                    <CardHeader
                        action={
                            <IconButton aria-label="settings">

                            </IconButton>
                        }
                    />

                    <CardContent>

                        <Grid container columnSpacing={3} rowSpacing={3}>

                            <Grid item xs={12} md={3}>
                                <Skeleton variant="rounded" fullWidth height={60} />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Skeleton variant="rounded" fullWidth height={60} />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Skeleton variant="rounded" fullWidth height={60} />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Skeleton variant="rounded" fullWidth height={60} />
                            </Grid>

                        </Grid>

                    </CardContent>

                </Card >
            }

            {!refresh && loading &&
                <Grid container sx={{ marginTop: "1em" }}>

                    <Grid item xs={12} md={12}>
                        <Skeleton variant="rounded" fullWidth height={60} />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: "1em" }}>
                        <TableContainer component={Paper}>

                            <Table sx={{ minWidth: 700 }} aria-label="customized table">

                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Price_TierID</StyledTableCell>
                                        <StyledTableCell align="right">Minimum</StyledTableCell>
                                        <StyledTableCell align="right">Maximum</StyledTableCell>
                                        <StyledTableCell align="right">Added Date</StyledTableCell>
                                        <StyledTableCell align="right"> Delete</StyledTableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {[1].map((row, index) => (
                                        <TableRow key={`list-Price_Tiers-key`}>
                                            <StyledTableCell component="th" scope="row">
                                                <Skeleton variant="rounded" fullWidth height={60} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right" >
                                                <Skeleton variant="rounded" fullWidth height={60} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right" >
                                                <Skeleton variant="rounded" fullWidth height={60} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Skeleton variant="rounded" fullWidth height={60} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Skeleton variant="rounded" fullWidth height={60} />
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>

                            </Table>

                        </TableContainer>
                    </Grid>
                </Grid>
            }

            {
                refresh && <Box>
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
                                <Typography component="h4" variant="h4">
                                    Connect to the internet
                                </Typography>
                                <Typography component="h6" variant="h6">
                                    You're offline. Check your connection.
                                </Typography>
                                <Box
                                    component="form"
                                    // onSubmit={handleSubmit}
                                    noValidate
                                    sx={{ mt: 1 }}
                                >

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="firr"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={(event) => { handleRefresh(event) }}
                                    >
                                        Refresh
                                    </Button>

                                </Box>

                            </Box>

                        </CardContent>

                    </Card >
                </Box>
            }

        </Box >

    );

}
