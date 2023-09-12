import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, Grid, IconButton,
    InputAdornment, OutlinedInput, Snackbar, Typography,
    useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { AddNewCurriculumItem, GetCurriculumItem } from '../../../../Hooks/request';
import DraggableList from '../Components/Tasks/Module/DraggableList'; //from '../Components/DraggableList';


export default function Curriculum() {

    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [Curriculum, setCurriculum] = React.useState([]);

    const [reload, setreload] = React.useState(true);
    const [openAddModuleDialog, setopenAddModuleDialog] = React.useState(false);
    const [AddModuleTitle, setAddModuleTitle] = React.useState("");
    const [AddModuleObjective, setAddModuleObjective] = React.useState("");
    const [AddModuleTitlelength, setAddModuleTitlelength] = React.useState(80);
    const [AddModuleObjectivelength, setAddModuleObjectivelength] = React.useState(200);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    React.useEffect(() => {
        const get = async () => {
            var newobj = await GetCurriculumItem(params.courseID);
            if (newobj.done) {
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
                // setalerterroopensnackbaropen(true);
            }

        }
        get();

    }, [reload]);


    console.log({ Curriculum });

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
        if (AddModuleTitle !== "" && AddModuleObjective !== "") {

            const newobj = Object.assign({}, {
                Title: AddModuleTitle,
                Objective: AddModuleObjective,
                CourseID: params.courseID
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


    return (

        <Grid container sx={{}}>

            <Grid item xs={12}>
                <Typography variant='h4'>Curriculum</Typography>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                <Typography variant="subtitle1">Start putting together a course by creating modules,
                    lectures and practice activities (quizzes, coding exercises and assignments).
                    Use your course outline to structure your content and label your modules and
                    lectures clearly.
                </Typography>
            </Grid>
            {Curriculum.length <= 0 && <Grid item xs={12}>
                <Stack spacing={1}>

                    <Skeleton variant="rectangular" width="100%" height={60} />
                    <Skeleton variant="rounded" width="100%" height={60} />

                </Stack>
            </Grid>}

            {Curriculum.length > 0 && <DraggableList Curriculum={Curriculum} reload={reload} setreload={setreload} courseID={params.courseID} setCurriculum={setCurriculum}></DraggableList>}


            <Grid item xs={12} sx={{ marginTop: "1em" }}>
                <Button size="large" color='firr' onClick={(event) => { HandleAddModule(event, 0) }} startIcon={<AddIcon />} variant="outlined">ADD Module</Button>
            </Grid>

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

        </Grid>

    );

}
