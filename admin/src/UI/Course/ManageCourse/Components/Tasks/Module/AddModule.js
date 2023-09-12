import * as React from 'react';
import { Route, Router, Routes, useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
    Alert,
    Box, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, Grid, IconButton,
    InputAdornment, OutlinedInput, Snackbar, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DraggableList from '../../DraggableList';
import DraggableListLecture from '../Lecture/DraggableListLecture'; //from '../../DraggableListLecture';
import { HttpEditCurriculumModule } from '../../../../../../Hooks/request';
// import AddLecture from '../Components/Tasks/AddLecture';

export default function Module(props) {

    const { Curriculum, reload, setreload } = props;

    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const [Curriculum, setCurriculum] = React.useState([]);
    // const [reload, setreload] = React.useState(true);

    const [show, setshow] = React.useState(true);
    const [openAddModuleDialog, setopenAddModuleDialog] = React.useState(false);
    const [AddModuleTitle, setAddModuleTitle] = React.useState("");
    const [AddModuleObjective, setAddModuleObjective] = React.useState("");
    const [AddModuleTitlelength, setAddModuleTitlelength] = React.useState(80);
    const [AddModuleObjectivelength, setAddModuleObjectivelength] = React.useState(200);
    const [EditModuleIndex, setEditModuleIndex] = React.useState(-1);
    const [dropdrawcontent, setdropdrawcontent] = React.useState([]);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    React.useEffect(() => {
        try {
            const newarr = Curriculum[0].Modules.map((row, index) => {
                return true;
            });
            setdropdrawcontent(newarr);
        }
        catch (e) {

        }

    }, [reload]);

    console.log({ Curriculum });

    const HandleLectureDropDowm = (event, index) => {

        const locarr = dropdrawcontent;
        locarr[index] = !locarr[index];
        setdropdrawcontent(locarr);
        setshow(!show);
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
        setEditModuleIndex(-1);
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

    const handleDialogEditModule = (event, index = -1) => {
        console.log({ index });
        if (index !== -1) {

            const oldobj = Curriculum[0].Modules.find((row, listindex) => {
                if (index === row.ModuleID) {
                    return row;
                }
            });

            setEditModuleIndex(index);
            AddModuleDialogopen();
            setAddModuleTitle(oldobj.Title);
            setAddModuleObjective(oldobj.Objective);

        }
    };

    const handleDialogEditModuleSave = async (event) => {
        if (AddModuleTitle !== "" && AddModuleObjective !== "" && EditModuleIndex > -1) {

            try {

                const newobj = Object.assign({}, {
                    Title: AddModuleTitle,
                    Objective: AddModuleObjective,
                    CourseID: params.courseID,
                    ModuleID: EditModuleIndex
                });

                console.log({ newobj });

                const response = await HttpEditCurriculumModule(newobj);

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
            // seterrorsnackbaropen(true);
        }
    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    return (

        <Grid container sx={{}}>

            {Curriculum.length > 0 && <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em", background: "#E0E0E0", }}>

                {Curriculum[0].Modules.map((row, index) => {

                    return (

                        <Grid container key={`Curriculum-Modules-grid-index-${index}`} sx={{ marginBottom: "1em" }}>

                            <Grid item xs={12} sx={{ border: "1px solid", padding: "1em" }}>

                                {<Grid container>

                                    <Grid item xs={4}>
                                        <Typography variant='h6'>Module {index}</Typography>
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: "center" }}>
                                        <Typography variant='body1'>{row.Title}</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Box sx={{ display: 'flex' }}>

                                            <Box sx={{ ml: "auto" }}>
                                                <IconButton color='firr' variant="outlined"
                                                    onClick={(event) => { handleDialogEditModule(event, row.ModuleID) }}
                                                >
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                                <IconButton color='firr' variant="outlined">
                                                    <DeleteIcon></DeleteIcon>
                                                </IconButton>
                                                <IconButton color='firr' variant="outlined"
                                                    onClick={(event) => { HandleLectureDropDowm(event, index) }}>
                                                    {!dropdrawcontent[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    {!dropdrawcontent[index] && <Grid item xs={12}>
                                        <DraggableListLecture
                                            items={row.Lectures}
                                            CourseID={Curriculum[0].CourseID}
                                            CurriculumID={Curriculum[0].CurriculumID}
                                            ModuleID={row.ModuleID}
                                        ></DraggableListLecture>
                                    </Grid>}

                                </Grid>}

                            </Grid>

                        </Grid>

                    );

                })}

                {/* {<Grid container key={`Curriculum-Modules-grid-index-`} sx={{ marginBottom: "1em" }}>

                    <Grid item xs={12} sx={{ border: "1px solid", padding: "1em" }}>

                        {<Grid container>

                            <Grid item xs={4}>
                                <Typography variant='h6'>Module  1</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{ textAlign: "center" }}>
                                <Typography variant='body1'>Introduction 1</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex' }}>

                                    <Box sx={{ ml: "auto" }}>
                                        <IconButton color='firr' variant="outlined"
                                            onClick={(event) => { handleDialogEditModule(event, "1") }}
                                        >
                                            <EditIcon></EditIcon>
                                        </IconButton>
                                        <IconButton color='firr' variant="outlined">
                                            <DeleteIcon></DeleteIcon>
                                        </IconButton>
                                        <IconButton color='firr' variant="outlined"
                                            onClick={(event) => { }}>
                                            {<KeyboardArrowUpIcon />}
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>

                            {<Grid item xs={12}>
                                <DraggableListLecture items={course.Modules[0].Lectures}></DraggableListLecture>
                            </Grid>}

                        </Grid>}

                    </Grid>

                </Grid> } */}

            </Grid>}

            {/* <Grid item xs={12} sx={{}}>
                <Button size="large" color='firr' onClick={(event) => { HandleAddModule(event, 0) }} startIcon={<AddIcon />} variant="outlined">ADD Module</Button>
            </Grid> */}

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
                    <Button variant="outlined" color='firr' onClick={handleDialogEditModuleSave} >
                        Edit Module
                    </Button>
                </DialogActions>

            </Dialog>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Edited A Module
                </Alert>
            </Snackbar>

        </Grid>

    );

}
