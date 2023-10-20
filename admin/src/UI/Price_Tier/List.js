import CloseIcon from '@mui/icons-material/Close';
import { Alert, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Snackbar, TextField, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled, useTheme } from '@mui/material/styles';
import * as React from "react";
import { GetAllPrice_Tiers, EditPrice_Tier, httpAbortLanguage } from "../../Hooks/request";
import { Form } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
    },


}));

const ListDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ListDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function List_Price_Tiers({ currencies, price_tiers, setprice_tiers }) {


    const [SelectCurrency, setSelectCurrency] = React.useState("0");
    const [foundcurrency, setfoundcurrency] = React.useState({});


    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);


    const [title, settitle] = React.useState("");
    const [titleenglish, settitleenglish] = React.useState("");
    const [LanguageID, setLanguageID] = React.useState(0);

    const [Min_Price_Tier, setMin_Price_Tier] = React.useState("");
    const [Max_Price_Tier, setMax_Price_Tier] = React.useState("");
    const [Price_Tier_ID, setPrice_Tier_ID] = React.useState(0);

    const [Prev_Min_Price_Tier, setPrev_Min_Price_Tier] = React.useState(null);
    const [NextMax_Price_Tier, setNextMax_Price_Tier] = React.useState(null);


    const [reload, setreload] = React.useState(false);
    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const [errorresponceonesnackbaropen, seterrorresponceonesnackbaropen] = React.useState(false);
    const [errorresponcetwosnackbaropen, seterrorresponcetwosnackbaropen] = React.useState(false);
    const [errorresponcethreesnackbaropen, seterrorresponcethreesnackbaropen] = React.useState(false);
    const [errorresponcefoursnackbaropen, seterrorresponcefoursnackbaropen] = React.useState(false);
    const [errorresponcefivesnackbaropen, seterrorresponcefivesnackbaropen] = React.useState(false);
    const [errorresponcesixsnackbaropen, seterrorresponcesixsnackbaropen] = React.useState(false);


    const theme = useTheme();

    React.useEffect(() => {

        const ordered_arr = price_tiers.sort((rowx, rowy) => {
            if (rowx.Max_Price_Tier > rowy.Max_Price_Tier) {
                return 1;
            }
            else {
                return -1;
            }
        });

        var perv_price = null;
        ordered_arr.find((row, index) => {
            if (row.Price_Tier_ID === Price_Tier_ID) {
                try {
                    perv_price = ordered_arr[index - 1];
                    return perv_price;
                } catch (error) {
                    console.log("catch an error");
                    perv_price = null;
                }
            }
            else {
                return null;
            }
        });

        if (perv_price) {
            setPrev_Min_Price_Tier(perv_price);
        }
        else {
            setPrev_Min_Price_Tier(null);
        }

        const Max_ordered_arr = price_tiers.sort((rowx, rowy) => {
            if (rowx.Min_Price_Tier > rowy.Min_Price_Tier) {
                return 1;
            }
            else {
                return -1;
            }
        });

        var next_price = null;
        Max_ordered_arr.find((row, index) => {
            if (row.Price_Tier_ID === Price_Tier_ID) {
                try {
                    next_price = Max_ordered_arr[index + 1];
                    return next_price;
                } catch (error) {
                    console.log("catch an error");
                    next_price = null;
                }
            }
            else {
                return null;
            }
        });

        if (next_price) {
            setNextMax_Price_Tier(next_price);
        }
        else {
            setNextMax_Price_Tier(null);
        }



    }, [Price_Tier_ID]);


    const handleEdit = async (event, Min_Price_Tier, Max_Price_Tier, Price_Tier_ID) => {
        setMin_Price_Tier(Min_Price_Tier);
        setMax_Price_Tier(Max_Price_Tier);
        setPrice_Tier_ID(Price_Tier_ID);
        handleClickOpenEdit();
    };

    const handleClickOpenEdit = async () => {
        setOpenEdit(true);
    };

    const handleEditClose = async () => {
        settitle("");
        settitleenglish("");
        setLanguageID(0);
        setOpenEdit(false);
    };

    const handleChange = async (event) => {

        event.preventDefault();

        const value = event.target.value;

        if (event.target.name === "minprice_tier") {

            const minprice = parseFloat(value);
            const maxprice = parseFloat(Max_Price_Tier);
            if (minprice >= 0 && (minprice + 1) < maxprice) {

                if (Prev_Min_Price_Tier) {
                    if (Prev_Min_Price_Tier.Max_Price_Tier < minprice) {
                        setMin_Price_Tier(value);
                    }
                    else {
                    }
                }
                else {
                    console.log({ Prev_Min_Price_Tier });
                    setMin_Price_Tier(value);
                }

            }
            else {
            }

        }
        if (event.target.name === "maxprice_tier") {

            const maxprice = parseFloat(value);
            const minprice = parseFloat(Min_Price_Tier);
            if (maxprice >= 0 && maxprice > (minprice + 1)) {

                if (NextMax_Price_Tier) {

                    if (NextMax_Price_Tier.Min_Price_Tier > maxprice) {
                        setMax_Price_Tier(value);
                    }
                    else {
                    }

                }
                else {
                    setMax_Price_Tier(value);
                }

            }

        }
        if (event.target.name === "SelectCurrency") {
            setSelectCurrency(value);

            const loc_foundcurrency = currencies.find((option, index) => {
                if (option.Currency_ID === value) {
                    return option;
                } else {
                    return null;
                }
            });

            setfoundcurrency(loc_foundcurrency);


        }

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (Min_Price_Tier !== "" && Max_Price_Tier !== "" && Price_Tier_ID > 0) {

            var max = parseFloat(Max_Price_Tier, 2);
            var min = parseFloat(Min_Price_Tier, 2);

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
                        Price_Tier_ID: Price_Tier_ID,
                    });

                    const responce = await EditPrice_Tier(newobj);

                    if (responce.done) {

                        setMax_Price_Tier(0);
                        setMin_Price_Tier(0);
                        setsnackbaropen(true);
                        setprice_tiers(responce.result);
                        setOpenEdit(false);

                    }
                    else {

                        if (responce.reason === 1) {
                            seterrorresponceonesnackbaropen(true);
                        }
                        else if (responce.reason === 2) {
                            seterrorresponcetwosnackbaropen(true);

                        }
                        else if (responce.reason === 3) {
                            seterrorresponcethreesnackbaropen(true);

                        }
                        else if (responce.reason === 4) {
                            seterrorresponcefoursnackbaropen(true);

                        }
                        else if (responce.reason === 5) {
                            seterrorresponcefivesnackbaropen(true);

                        }
                        else if (responce.reason === 6) {
                            seterrorresponcesixsnackbaropen(true);
                        }
                        else {
                            seterrorsnackbaropen(true);
                        }

                    }

                }
                else {
                    // seterrorthreesnackbaropen(true);
                }
            }



        }
        else {

            handleEditClose();

        }

    };

    const handleDelete = async (event, Title, EnglishTitle, LanguageID) => {
        settitle(Title);
        settitleenglish(EnglishTitle);
        setLanguageID(LanguageID);
        handleClickOpenDelete();
    };

    const handleClickOpenDelete = async () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = async () => {
        setOpenDelete(false);
    };

    const handleSubmitDelete = async (event) => {
        event.preventDefault();

        const result = await httpAbortLanguage(LanguageID);
        if (result.done) {

            handleDeleteClose();
            setsnackbaropen(true);
            setreload(!reload);
        } else {
            seterrorsnackbaropen(true);
        }

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    return (

        <React.Fragment>

            <Grid container sx={{ marginBottom: "8em" }}>

                <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>
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
                        // helperText="Please select Select Currency"
                        variant="outlined"
                        value={SelectCurrency}
                    >
                        {currencies.map((option, index) => {
                            return (<MenuItem key={option.Currency_ID} value={option.Currency_ID}>
                                {option.title}
                            </MenuItem>);
                        })}
                    </TextField>

                </Grid>

                <Grid item xs={12}>
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

                            {price_tiers.length > 0 && <TableBody>


                                {price_tiers.map((row, index) => {

                                    if (row.Currency_ID === SelectCurrency) {

                                        return (
                                            <StyledTableRow key={`list-Price_Tiers-key-${index}`}>
                                                <StyledTableCell component="th" scope="row" onClick={(event) => { handleEdit(event, row.Min_Price_Tier, row.Max_Price_Tier, row.Price_Tier_ID) }}>{row.Price_Tier_ID}</StyledTableCell>
                                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Min_Price_Tier, row.Max_Price_Tier, row.Price_Tier_ID) }}>{row.Min_Price_Tier} {foundcurrency.title}</StyledTableCell>
                                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Min_Price_Tier, row.Max_Price_Tier, row.Price_Tier_ID) }}>{row.Max_Price_Tier} {foundcurrency.title}</StyledTableCell>
                                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Min_Price_Tier, row.Max_Price_Tier, row.Price_Tier_ID) }}>{row.AddedDate}</StyledTableCell>
                                                <StyledTableCell align="right"><Button variant="text" color="firr" onClick={(event) => { handleDelete(event, row.Min_Price_Tier, row.Max_Price_Tier, row.Price_Tier_ID) }}> Delete</Button></StyledTableCell>
                                            </StyledTableRow>);
                                    }
                                    else {

                                    }
                                })}

                            </TableBody>}

                        </Table>

                    </TableContainer>
                </Grid>

            </Grid>

            <ListDialog
                onClose={handleEditClose}
                aria-labelledby="Edit-dialog-title"
                open={openEdit}
            >

                <ListDialogTitle id="Edit-dialog-title" onClose={handleEditClose}>
                    Edit
                </ListDialogTitle>

                <DialogContent dividers>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}>

                        <Grid container columnSpacing={3}>

                            <Grid item xs={12} md={12}>
                                <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                    <InputLabel htmlFor="minprice_tier">Enter Minimum Price Tier</InputLabel>
                                    <OutlinedInput
                                        id="minprice_tier"
                                        name="minprice_tier"
                                        type={'number'}
                                        value={Min_Price_Tier}
                                        label="Enter Minimum Price Tier"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={12} sx={{ marginTop: "1em" }}>
                                <FormControl size="medium" sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                                    <InputLabel htmlFor="maxprice_tier">Enter Maximum Price Tier</InputLabel>
                                    <OutlinedInput
                                        min="0"
                                        max="1000"
                                        step="0.01"
                                        id="maxprice_tier"
                                        name="maxprice_tier"
                                        type={'number'}
                                        value={Max_Price_Tier}
                                        label="Enter Maximum Price Tier"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>

                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="firr"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </DialogActions>

            </ListDialog>

            <Dialog
                onClose={handleDeleteClose}
                aria-labelledby="Delete-dialog-title"
                open={openDelete}>
                <DialogTitle id="Delete-dialog-title" >Delete</DialogTitle>
                <DialogContent> Are You Sure You Want To Delete Language "{title}" ?</DialogContent>
                <DialogActions>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="firr"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitDelete}
                        >
                            Delete
                        </Button>


                    </Box>

                </DialogActions>
            </Dialog>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You have successfully Edited a Price Tier!
                </Alert>
            </Snackbar>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Course with that id couldnt be found!!
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

        </React.Fragment >

    );

};
