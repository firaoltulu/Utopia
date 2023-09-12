import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Alert,
    Box, Button, Card, CardActions,
    CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Snackbar, TextField, alpha
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, useParams } from 'react-router-dom';
import { GetAllLanguages, GetCourse, HttpEditCourse } from "../../Hooks/request";

const ListDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
        width: '80%', maxHeight: 435
    }
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

// const Level = [
//     { levelID: "1", title: ["Beginner", "ጀማሪ", "", ""] },
//     { levelID: "2", title: ["Intermediate", "መካከለኛ", "", ""] },
//     { levelID: "3", title: ["senior", "ከፍተኛ", "", ""] },

// ];

// const course = {

//     Titles: [
//         {
//             title: "Python Programmming",
//             languageID: "1"
//         },
//         {
//             title: "Python Programmming",
//             languageID: "2"
//         },
//         {
//             title: "Python Programmming",
//             languageID: "3"
//         },
//         {
//             title: "Python Programmming",
//             languageID: "4"
//         }
//     ],
//     Discriptions: [
//         {
//             discription: "Discriptionnnnnnnnnnnnnnnn",
//             languageID: "1"
//         },
//         {
//             discription: "Discriptionnnnnnnnnnnnnnnn",
//             languageID: "2"
//         },
//         {
//             discription: "Discriptionnnnnnnnnnnnnnnn",
//             languageID: "3"
//         },
//         {
//             discription: "Discriptionnnnnnnnnnnnnnnn",
//             languageID: "4"
//         }
//     ],
//     Goals: [
//         {
//             goals: "goalssssssssssssss",
//             languageID: "1"
//         },
//         {
//             goals: "goalssssssssssssss",
//             languageID: "2"
//         },
//         {
//             goals: "goalssssssssssssss",
//             languageID: "3"
//         },
//         {
//             goals: "goalssssssssssssss",
//             languageID: "4"
//         }
//     ],
//     Lecturers: [
//         {
//             lecturerName: "firaol tulu",
//             lecturerTitle: "Junior Developer",
//             languageID: "1"
//         },
//         {
//             lecturerName: "firaol tulu",
//             lecturerTitle: "Junior Developer",
//             languageID: "2"
//         },
//         {
//             lecturerName: "firaol tulu",
//             lecturerTitle: "Junior Developer",
//             languageID: "3"
//         },
//         {
//             lecturerName: "firaol tulu",
//             lecturerTitle: "Junior Developer",
//             languageID: "4"
//         }
//     ],
//     courselanguage: "2",
//     courselevel: "3",
//     Image1: {},
//     Image2: {},
//     Image3: {},
//     Image4: {}
// };

export default function EditCourse(props) {
    // const { } = props;
    const params = useParams();
    const theme = useTheme();

    const [Languages, setLanguages] = React.useState([]);
    const [Course, setCourse] = React.useState(null);
    const [NewLanguages, setNewLanguages] = React.useState([]);
    const [NewdiscriptionLanguages, setNewdiscriptionLanguages] = React.useState([]);

    const [update, setupdate] = React.useState("");
    const [LanguageID, setLanguageID] = React.useState(-1);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [which, setwhich] = React.useState(-1);

    const [localtitle, setlocaltitle] = React.useState("");
    const [locallanguageID, setlocallanguageID] = React.useState("");
    const [openAddTitle, setopenAddTitle] = React.useState(false);

    const [localdiscription, setlocaldiscription] = React.useState("");
    const [openAdddiscription, setopenAdddiscription] = React.useState(false);

    const [reload, setreload] = React.useState(false);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const [alerterroopensnackbaropen, setalerterroopensnackbaropen] = React.useState(false);

    React.useEffect(() => {

        const get = async () => {
            var newobj = await GetAllLanguages();
            if (newobj.done) {
                if (newobj.fetcheddata.data.Languages.length > 0) {
                    var locarr = [];

                    newobj.fetcheddata.data.Languages.map((row, index) => {

                        var locobj = Object.assign({}, {
                            languageID: row.LanguageID,
                            titleEnglish: row.EnglishTitle,
                            title: row.Title,
                            addedDate: row.AddedDate,
                        });


                        locarr.push(locobj);
                    });


                    setLanguages(locarr);
                }
            }
            else {
                // setalerterroopensnackbaropen(true);
            }

        }
        get();
    }, [reload]);

    React.useEffect(() => {

        const get = async () => {

            try {
                var newobj = await GetCourse(parseInt(params.courseID));

                if (newobj.done) {
                    if (newobj.fetcheddata.data.Course) {
                        var Course = newobj.fetcheddata.data.Course;

                        var locobj = Object.assign({}, {
                            CourseID: Course.CourseID,
                            Titles: Course.Titles,
                            Discriptions: Course.Discriptions,
                            Goals: Course.Goals,
                            Lecturers: Course.Lecturers,
                            courselanguage: Course.CourseLanguage,
                            courselevel: Course.CourseLevel,
                        });

                        setCourse(locobj);
                    }
                    else {
                        console.log("responce is null");

                    }
                }
                else {
                    // setalerterroopensnackbaropen(true);
                }
            }
            catch (e) {

            }

        }

        get();

    }, [reload]);

    React.useEffect(() => {

        try {
            if (Languages.length > 0 && Course !== null) {

                var newobj = Languages.filter((Language, index) => {
                    var locobj = Course.Titles.find((Title, Titleindex) => {
                        if (Title.LanguageID === Language.languageID) {
                            return Title;
                        } else {
                            return null;
                        }
                    });
                    if (locobj) {
                        return null;
                    } else {
                        return Language;
                    }
                });

                setNewLanguages(newobj);

                newobj = Languages.filter((Language, index) => {
                    var locobj = Course.Discriptions.find((Discription, Titleindex) => {
                        if (Discription.LanguageID === Language.languageID) {
                            return Discription;
                        } else {
                            return null;
                        }
                    });
                    if (locobj) {
                        return null;
                    } else {
                        return Language;
                    }
                });

                setNewdiscriptionLanguages(newobj);

            } else {

            }
        } catch (e) {

        }
    }, [Languages, Course]);

    console.log({ Course });

    const handlelanguage = (LanguageID) => {
        var found = Languages.find((row, index) => {
            if (row.languageID === LanguageID) {
                return row;
            } else {
                return null;
            }
        });
        if (found) {

            return found.title;
        }
        else {
            return "";

        }
    };

    const handleedit = (title, languageID, which) => {
        if (languageID > 0) {
            setupdate(title);
            setLanguageID(languageID);
            setwhich(which);
            setOpenEdit(true);
        }
        else {

        }

    };

    const handleEditClose = async () => {
        setupdate("");
        setLanguageID(0);
        setOpenEdit(false);
    };

    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (event.target.name === "update") {
            setupdate(value);
        }
        if (event.target.name === "title") {
            setlocaltitle(value);
        }
        if (event.target.name === "locallanguageID") {
            setlocallanguageID(value);
        }
        if (event.target.name === "Discription") {
            setlocaldiscription(value);
        }
    };

    const handleAddClose = async () => {
        setlocaltitle("");
        setlocallanguageID("");
        setopenAddTitle(false);

        setlocaldiscription("");
        setopenAdddiscription(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (update !== "" && LanguageID > 0 && which > -1) {

            var newobj = null;
            if (which === 0) {
                newobj = Object.assign({}, {
                    update: update,
                    LanguageID: LanguageID,
                    CourseID: Course.CourseID,
                    Which: "title"
                });
            }
            else if (which === 1) {
                newobj = Object.assign({}, {
                    update: update,
                    LanguageID: LanguageID,
                    CourseID: Course.CourseID,
                    Which: "discription"
                });
            }
            else {
                newobj = null;
            }

            if (newobj) {

                console.log({ newobj });
                const result = await HttpEditCourse(newobj);
                if (result.done) {

                    handleEditClose();
                    setsnackbaropen(true);
                    setreload(!reload);
                } else {
                    seterrorsnackbaropen(true);
                }
                handleEditClose();

            }
            else {
                handleEditClose();
                seterrorsnackbaropen(true);
            }
        }
        else {
            seterrorsnackbaropen(true);
        }

    };

    const handleADDSubmit = async (event) => {
        event.preventDefault();

        if (localtitle !== "" && locallanguageID !== "") {

            var newobj;

            newobj = Object.assign({}, {
                CourseID: Course.CourseID,
                update: localtitle,
                LanguageID: locallanguageID,
                Which: "title"
            });

            console.log({ newobj });
            const result = await HttpEditCourse(newobj);
            if (result.done) {

                handleAddClose();
                setsnackbaropen(true);
                setreload(!reload);
            }
            else {
                seterrorsnackbaropen(true);
            }

        }
        else {
            seterrorsnackbaropen(true);
            // handleEditClose();
        }

    };

    const handleADDDiscriptionSubmit = async (event) => {
        event.preventDefault();

        if (localdiscription !== "" && locallanguageID !== "") {

            var newobj;

            newobj = Object.assign({}, {
                CourseID: Course.CourseID,
                update: localdiscription,
                LanguageID: locallanguageID,
                Which: "discription"
            });

            console.log({ newobj });

            const result = await HttpEditCourse(newobj);
            if (result.done) {

                handleAddClose();
                setsnackbaropen(true);
                setreload(!reload);
            } else {
                seterrorsnackbaropen(true);
            }
            handleAddClose();
        }
        else {
            seterrorsnackbaropen(true);
            // handleEditClose();
        }

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
        setalerterroopensnackbaropen(false);
    };

    return (

        <Grid container sx={{ margin: "1em" }}>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>
                <Button color="firr" component={Link} to="/course/list" startIcon={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}>Back to List</Button>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1
                }}>

                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Course Title"
                    />

                    <CardContent>

                        <Grid container>
                            <Grid item xs={12} sx={{}}>
                                <TableContainer fontSize="small">
                                    <Table size="small" sx={{ minWidth: "100%" }}>

                                        <TableHead>
                                            <TableRow sx={{ fontWeight: "700" }}>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Language</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {Course !== null && <TableBody>
                                            {Course.Titles.map((row, index) => (
                                                <TableRow
                                                    key={`course-title-Information-${index}`}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        '&:hover': {
                                                            backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                            cursor: "pointer"
                                                        },

                                                    }}
                                                    onClick={(event) => { handleedit(row.Title, row.LanguageID, 0) }}
                                                >
                                                    <TableCell >{row.Title}</TableCell>
                                                    <TableCell >{handlelanguage(row.LanguageID)}</TableCell>

                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>}

                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </CardContent>

                    {NewLanguages.length > 0 && <Box>
                        {<CardActions>
                            <Button color="firr" startIcon={<AddIcon></AddIcon>}
                                onClick={(event) => { setopenAddTitle(true) }}
                            >
                                add
                            </Button>
                        </CardActions>}
                    </Box>}

                </Card>

            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Course Discription"
                    />

                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{}}>
                                <TableContainer fontSize="small">
                                    <Table size="small" sx={{ minWidth: "100%" }}>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Discription</TableCell>
                                                <TableCell>Language</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {Course !== null && <TableBody>
                                            {Course.Discriptions.map((row, index) => (
                                                <TableRow
                                                    key={`course-Discriptions-Information-${index}`}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        '&:hover': {
                                                            backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                            cursor: "pointer"
                                                        },
                                                    }}
                                                    onClick={(event) => { handleedit(row.Discription, row.LanguageID, 1) }}
                                                >
                                                    <TableCell >{row.Discription}</TableCell>
                                                    <TableCell >{handlelanguage(row.LanguageID)}</TableCell>

                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>}

                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </CardContent>

                    {NewdiscriptionLanguages.length > 0 && <Box>
                        {<CardActions>
                            <Button color="firr"
                                startIcon={<AddIcon></AddIcon>}
                                onClick={(event) => { setopenAdddiscription(true) }}
                            >
                                Add
                            </Button>
                        </CardActions>}
                    </Box>}

                </Card>

            </Grid>

            <ListDialog
                onClose={handleEditClose}
                aria-labelledby="Edit-dialog"
                open={openEdit}
            >

                <ListDialogTitle id="Edit-dialog" onClose={handleEditClose}>
                    Edit
                </ListDialogTitle>

                <DialogContent dividers>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}>

                        <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined">
                            <InputLabel htmlFor="update" sx={{
                                fontWeight: "500"
                            }}>Edit for a course in language {LanguageID}.</InputLabel>
                            <OutlinedInput
                                id="update"
                                name="update"
                                type={'text'}
                                value={update}
                                label={`Edit for a course in language ${LanguageID}`}
                                onChange={handleChange}
                                sx={{
                                    fontWeight: "500"
                                }}
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
                        edit
                    </Button>

                </DialogActions>

            </ListDialog>

            <ListDialog

                onClose={handleAddClose}
                aria-labelledby="Add-dialog"
                open={openAddTitle}

            >

                <ListDialogTitle id="Add-dialog" onClose={handleAddClose}>
                    ADD Title
                </ListDialogTitle>

                <DialogContent dividers>

                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={12}>
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

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                color="firr"
                                required
                                onChange={handleChange}
                                id="locallanguageID"
                                name="locallanguageID"
                                label="locallanguageID"
                                defaultValue="1"
                                sx={{ marginTop: "1em" }}
                                helperText="Please select language ID"
                                variant="outlined"
                                value={locallanguageID}
                            >
                                {NewLanguages.map((option, index) => (
                                    <MenuItem key={option.languageID} value={option.languageID}>
                                        {option.languageID}.{option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="firr"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleADDSubmit}
                    >
                        Save
                    </Button>

                </DialogActions>

            </ListDialog>

            <ListDialog

                onClose={handleAddClose}
                aria-labelledby="Add-dialog"
                open={openAdddiscription}

            >

                <ListDialogTitle id="Add-dialog" onClose={handleAddClose}>
                    ADD Discription
                </ListDialogTitle>

                <DialogContent dividers>

                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={12}>
                            <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-course-Form-control`}>
                                <InputLabel htmlFor={`title`}>Enter Course Discription</InputLabel>
                                <OutlinedInput
                                    id={`Discription`}
                                    name={`Discription`}
                                    type={'text'}
                                    value={localdiscription}
                                    label={`Enter Course Discription`}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                color="firr"
                                required
                                onChange={handleChange}
                                id="locallanguageID"
                                name="locallanguageID"
                                label="locallanguageID"
                                defaultValue="1"
                                sx={{ marginTop: "1em" }}
                                helperText="Please select language ID"
                                variant="outlined"
                                value={locallanguageID}
                            >
                                {NewdiscriptionLanguages.map((option, index) => (
                                    <MenuItem key={option.languageID} value={option.languageID}>
                                        {option.languageID}.{option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="firr"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleADDDiscriptionSubmit}
                    >
                        Save
                    </Button>

                </DialogActions>

            </ListDialog>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Edited A Course
                </Alert>
            </Snackbar>

        </Grid>

    );

}