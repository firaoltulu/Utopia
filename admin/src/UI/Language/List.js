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
import { Alert, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Snackbar } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import { GetAllLanguages, EditLanguage, httpAbortLanguage } from "../../Hooks/request";

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

export default function List({ setAuthor }) {

    const [languages, setlanguages] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [title, settitle] = React.useState("");
    const [titleenglish, settitleenglish] = React.useState("");
    const [LanguageID, setLanguageID] = React.useState(0);
    const [reload, setreload] = React.useState(false);
    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {
        const get = async () => {
            var newobj = await GetAllLanguages();
            if (newobj.done) {
                if (newobj.fetcheddata.data.Languages.length > 0) {
                    setlanguages(newobj.fetcheddata.data.Languages);
                }
            }
            else {
                seterrorsnackbaropen(true);
            }

        }

        get();

    }, [reload]);

    const handleEdit = async (event, Title, EnglishTitle, LanguageID) => {
        settitle(Title);
        settitleenglish(EnglishTitle);
        setLanguageID(LanguageID);
        handleClickOpenEdit();
    }
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
        if (event.target.name === "titleenglish") {
            settitleenglish(value);

        }
        if (event.target.name === "title") {
            settitle(value);

        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title !== "" && titleenglish !== "" && LanguageID > 0) {

            const newobj = Object.assign({}, {
                title: title,
                titleenglish: titleenglish
            });
            const result = await EditLanguage(LanguageID, newobj);
            if (result.done) {

                handleEditClose();
                setsnackbaropen(true);
                setreload(!reload);
            } else {
                seterrorsnackbaropen(true);
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

            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>languageID</StyledTableCell>
                            <StyledTableCell align="right">Title</StyledTableCell>
                            <StyledTableCell align="right">Title in English</StyledTableCell>
                            <StyledTableCell align="right">Added Date</StyledTableCell>
                            <StyledTableCell align="right"> Delete</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    {languages.length > 0 && <TableBody>
                        {languages.map((row, index) => (
                            <StyledTableRow key={`list-languages-key-${index}`}>
                                <StyledTableCell component="th" scope="row" onClick={(event) => { handleEdit(event, row.Title, row.EnglishTitle, row.LanguageID) }}>{row.LanguageID}</StyledTableCell>
                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Title, row.EnglishTitle, row.LanguageID) }}>{row.Title}</StyledTableCell>
                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Title, row.EnglishTitle, row.LanguageID) }}>{row.EnglishTitle}</StyledTableCell>
                                <StyledTableCell align="right" onClick={(event) => { handleEdit(event, row.Title, row.EnglishTitle, row.LanguageID) }}>{row.AddedDate}</StyledTableCell>
                                <StyledTableCell align="right"><Button variant="text" color="firr" onClick={(event) => { handleDelete(event, row.Title, row.EnglishTitle, row.LanguageID) }}> Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>}
                </Table>

            </TableContainer>

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
                    You have successfully Deleted a Language!
                </Alert>
            </Snackbar>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    SomeThing went wrong Please Try Again!!
                </Alert>
            </Snackbar>

        </React.Fragment >

    );

};
