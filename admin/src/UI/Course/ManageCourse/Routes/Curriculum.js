import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, Grid, IconButton,
    InputAdornment, List, ListItem, ListItemButton, ListItemText, OutlinedInput, Snackbar, Typography,
    useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useParams } from 'react-router-dom';


import {
    AddNewCurriculumItem,
    GetAllLanguages,
    GetCurriculumItem
} from '../../../../Hooks/request';
import DraggableList from '../Components/Tasks/Module/DraggableList';


export default function Curriculum() {

    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [Languages, setLanguages] = React.useState([]);
    const [Curriculum, setCurriculum] = React.useState([]);
    const [FoundCurriculum, setFoundCurriculum] = React.useState([]);


    const [languagereload, setlanguagereload] = React.useState(true);
    const [reload, setreload] = React.useState(true);
    const [openAddModuleDialog, setopenAddModuleDialog] = React.useState(false);
    const [AddModuleTitle, setAddModuleTitle] = React.useState("");
    const [AddModuleObjective, setAddModuleObjective] = React.useState("");
    const [AddModuleTitlelength, setAddModuleTitlelength] = React.useState(80);
    const [AddModuleObjectivelength, setAddModuleObjectivelength] = React.useState(200);


    const [openLanguageDialog, setopenLanguageDialog] = React.useState(false);
    const [selectlanguage, setselectlanguage] = React.useState(0);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const [refresh, setrefresh] = React.useState(false);
    const [loading, setloading] = React.useState(true);

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
                    setselectlanguage(locarr[0].languageID);
                }
            }
            else {
                setrefresh(true);
                setloading(false);
            }

        };
        get();
    }, [languagereload]);

    React.useEffect(() => {
        const get = async () => {

            var newobj = await GetCurriculumItem(params.courseID);
            if (newobj.done) {
                setloading(false);
                setrefresh(false);
                try {
                    if (newobj.fetcheddata.data.Curriculums.length > 0) {

                        setCurriculum(newobj.fetcheddata.data.Curriculums);
                    }
                    else {
                        setCurriculum([]);
                    }
                }
                catch (e) {
                    setCurriculum([]);
                }

            }
            else {
                setrefresh(true);
                setloading(false);
                // setalerterroopensnackbaropen(true);
            }
            setloading(false);
        }
        get();

    }, [reload]);

    // React.useEffect(() => {
    //     if (Curriculum.length > 0) {

    //         const foundcurr = Curriculum.find((row, index) => {
    //             if (row.CurriculumID === selectlanguage) {
    //                 return row;
    //             }
    //             else {
    //                 return null;
    //             }
    //         });

    //         console.log({ foundcurr });

    //         if (foundcurr) {
    //             setFoundCurriculum(foundcurr);
    //         }
    //         else {
    //             setFoundCurriculum([]);
    //         }
    //     }

    // }, [selectlanguage, Curriculum]);


    const HandleAddModule = (event, index) => {
        AddModuleDialogopen();

    };

    const AddModuleDialogopen = () => {
        setopenAddModuleDialog(true);
    };

    const AddModuleDialogclose = () => {
        setopenAddModuleDialog(false);
        setAddModuleTitle("");
        setAddModuleObjective("");
        setAddModuleTitlelength(80);
        setAddModuleObjectivelength(200);

    };

    const HandleAddModuleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "Add-Module-title") {
            setAddModuleTitlelength(80 - value.length);
            if (!value) {
                setAddModuleTitlelength(80);
            }
            if (AddModuleTitlelength > 1) {
                setAddModuleTitle(value);
            }
            else {
                console.log({ value });
            }
        }
        if (event.target.name === "Add-Module-objective") {
            setAddModuleObjectivelength(200 - value.length);
            if (!value) {
                setAddModuleObjectivelength(200);
            }
            if (AddModuleObjectivelength > 1) {
                setAddModuleObjective(value);
            }
            else {
                console.log({ value });
            }

        }

    };

    const handleDialogAddModule = async (event) => {
        if (AddModuleTitle !== "" && AddModuleObjective !== "" && selectlanguage !== 0) {

            const newobj = Object.assign({}, {
                Title: AddModuleTitle,
                Objective: AddModuleObjective,
                CourseID: params.courseID,
                LanguageID: selectlanguage
            });

            try {

                console.log({ newobj });

                const response = await AddNewCurriculumItem(newobj);

                if (response.done) {
                    setreload(!reload);
                    AddModuleDialogclose();
                    setsnackbaropen(true);
                }
                else {
                    seterrorsnackbaropen(true);
                }

            } catch (e) {
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
    };

    const handleLanguageDialogClose = (event) => {
        setopenLanguageDialog(false);
    };

    const handleLanguageSelectButton = (event, languageID) => {
        setselectlanguage(languageID);
        handleLanguageDialogClose();
    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreload(!reload);
        setlanguagereload(!languagereload);
    };

    const Curriculumfind = () => {
        const foundarr = Curriculum.find((row, index) => {
            if (row.CurriculumID === selectlanguage) {
                return row;
            }
            else {
                return null;
            }
        });

        if (foundarr) {
            return foundarr;
        }
        else {
            return null;
        }

    };

    return (

        <Grid container sx={{}}>

            {!refresh && <React.Fragment>

                <Grid item xs={12}>

                    {selectlanguage !== 0 && <Box sx={{ display: "flex", padding: "5px", border: "1px dotted", borderRadius: "1em" }}>
                        <Box sx={{ padding: "1em" }}>

                            <Typography variant='h6'>Language Selected {Languages.find((row, index) => {
                                if (row.languageID === selectlanguage) {
                                    return row;
                                }
                            }).titleEnglish}</Typography>

                        </Box>

                        <Box sx={{ ml: "auto", padding: "1em" }}>

                            <Button variant="outlined" color="firr" onClick={(event) => { setopenLanguageDialog(true) }}><LanguageIcon></LanguageIcon></Button>

                        </Box>

                    </Box>}

                    {selectlanguage === 0 && <Stack spacing={1}>

                        <Skeleton variant="rounded" width="100%" height={60} />

                    </Stack>}

                </Grid>

                <Grid item xs={12} sx={{ marginTop: "1em" }}>
                    <Typography variant='h4'>Curriculum</Typography>
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                    <Typography variant="subtitle1">Start putting together a course by creating modules,
                        lectures and practice activities (quizzes, coding exercises and assignments).
                        Use your course outline to structure your content and label your modules and
                        lectures clearly.
                    </Typography>
                </Grid>

            </React.Fragment>}

            {loading && !refresh && <Grid item xs={12}>
                <Stack spacing={1}>

                    <Skeleton variant="rectangular" width="100%" height={60} />
                    <Skeleton variant="rounded" width="100%" height={60} />

                </Stack>
            </Grid>}

            {Curriculum.length > 0 && !refresh && <DraggableList
                Curriculum={Curriculumfind()}
                selectlanguage={selectlanguage}
                reload={reload}
                setreload={setreload}
                courseID={params.courseID}
                setCurriculum={setCurriculum}
            >
            </DraggableList>}

            {/* {Curriculum.length <= 0 && !refresh && <Grid container alignContent={'center'} justifyContent={"center"} sx={{ padding: "1em" }}>
                <Typography variant='h6'>Empty</Typography>
            </Grid>} */}


            {!refresh && <Grid item xs={12} sx={{ marginTop: "1em" }}>
                <Grid container alignContent={'center'} justifyContent={"center"}>
                    <Button size="large" color='firr' onClick={(event) => { HandleAddModule(event, 0) }} startIcon={<AddIcon />} variant="outlined">ADD Module</Button>
                </Grid>
            </Grid>}

            {refresh && <Grid item xs={12} sx={{ marginTop: "1em" }}>
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
            </Grid>}

            <Dialog fullScreen={fullScreen} open={openAddModuleDialog} onClose={AddModuleDialogclose}>

                <DialogTitle sx={{ m: 0, p: 2 }}>

                    <IconButton
                        aria-label="close"
                        onClick={AddModuleDialogclose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: "firr",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>

                <DialogContent dividers>

                    <Grid container>
                        <Grid item xs={12} sx={{ margin: "2em" }}>
                            <FormControl fullWidth color='firr' >

                                <OutlinedInput value={AddModuleTitle} onChange={HandleAddModuleChange} id='Add-Module-title' name='Add-Module-title' endAdornment={<InputAdornment position="end">{AddModuleTitlelength}</InputAdornment>} placeholder="Please enter Title"></OutlinedInput>
                                <Typography sx={{ marginTop: "1em" }}>
                                    Its The First Thing Students see,
                                </Typography>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ margin: "2em" }}>
                            <FormControl fullWidth color='firr'>
                                <OutlinedInput value={AddModuleObjective} onChange={HandleAddModuleChange} id='Add-Module-objective' name='Add-Module-objective' endAdornment={<InputAdornment position="end">{AddModuleObjectivelength}</InputAdornment>} placeholder="Enter a Learning Objective "></OutlinedInput>
                                <Typography sx={{ marginTop: "1em" }}>
                                    What will students be able to do at the end of this Module?
                                </Typography>
                            </FormControl>
                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button color='firr' onClick={AddModuleDialogclose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color='firr' onClick={handleDialogAddModule}>
                        Add Module
                    </Button>

                </DialogActions>

            </Dialog>

            <Dialog
                open={openLanguageDialog}
                onClose={handleLanguageDialogClose}
                aria-labelledby="Language-dialog"
                sx={{
                    '& .MuiDialogContent-root': {
                        padding: theme.spacing(2),
                    },
                    '& .MuiDialogActions-root': {
                        padding: theme.spacing(1),
                    },
                }}
            >

                <DialogTitle
                    id="Language-dialog-title"
                    onClose={handleLanguageDialogClose}
                    sx={{ borderBottom: '1px solid' }}
                >
                    Choose a Language
                </DialogTitle>
                <DialogContent>
                    <List>
                        {Languages.map((row, index) => {

                            return (
                                <ListItem disablePadding key={`Language-dialog-list-listItem-${index}`}>
                                    <ListItemButton id={`Language-dialog-list-listItem-button-${index}`} onClick={(event) => { handleLanguageSelectButton(event, row.languageID) }}>
                                        <ListItemText primary={row.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}

                    </List>
                </DialogContent>

            </Dialog>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Registered A New Module
                </Alert>
            </Snackbar>

        </Grid >

    );

}
