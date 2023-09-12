import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Alert,
    Box, Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl,
    Grid, IconButton,
    InputAdornment, OutlinedInput, Snackbar,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import {
    Draggable
} from 'react-beautiful-dnd';

import { HttpEditCurriculumModule, GetCurriculumModuleItem } from '../../../../../../Hooks/request';
import DraggableListLecture from '../Lecture/DraggableListLecture';

const getItemStyle = (isDragging, draggableStyle, dropdrawcontent) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
    '&:hover': {
        cursor: !dropdrawcontent ? "default" : "grab"
    },

    // styles we need to apply on draggables
    ...draggableStyle,
    border: "1px solid",
    padding: "1em"

});

export default function DraggableListItem(props) {

    const { item, index, reload, setreload, courseID } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const [item, setitem] = React.useState(null);

    const [openAddModuleDialog, setopenAddModuleDialog] = React.useState(false);
    const [AddModuleTitle, setAddModuleTitle] = React.useState("");
    const [AddModuleObjective, setAddModuleObjective] = React.useState("");
    const [AddModuleTitlelength, setAddModuleTitlelength] = React.useState(80);
    const [AddModuleObjectivelength, setAddModuleObjectivelength] = React.useState(200);
    const [EditModuleIndex, setEditModuleIndex] = React.useState(-1);
    const [dropdrawcontent, setdropdrawcontent] = React.useState(true);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    // console.log({ ModuleID });

    // React.useEffect(() => {
    //     const get = async () => {
    //         var newobj = await GetCurriculumModuleItem(courseID, ModuleID);
    //         if (newobj.done) {
    //             try {
    //                 if (newobj.fetcheddata.data.Module) {

    //                     setitem(newobj.fetcheddata.data.Module);
    //                 }
    //                 else {
    //                     setitem(null);
    //                 }
    //             }
    //             catch (e) {
    //                 setitem(null);
    //             }

    //         }
    //         else {
    //             // setalerterroopensnackbaropen(true);
    //         }
    //     }
    //     get();
    // }, []);

    // console.log({ item });

    const HandleLectureDropDowm = (event, index) => {

        //     const locarr = dropdrawcontent;
        //     locarr[index] = !locarr[index];
        setdropdrawcontent(!dropdrawcontent);
        //     setshow(!show);
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

            setEditModuleIndex(index);
            AddModuleDialogopen();
            setAddModuleTitle(item.Title);
            setAddModuleObjective(item.Objective);

        }

    };

    const handleDialogEditModuleSave = async (event) => {
        if (AddModuleTitle !== "" && AddModuleObjective !== "" && EditModuleIndex > -1) {

            try {

                const newobj = Object.assign({}, {
                    Title: AddModuleTitle,
                    Objective: AddModuleObjective,
                    CourseID: courseID,
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
            seterrorsnackbaropen(true);
        }
    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    return (

        <React.Fragment>

            <Grid container sx={{}}>

                {item && <Grid item xs={12} sx={{ margin: "1em", }}>

                    <Draggable key={`Draggable-list-Module-ID-${item.ModuleID}`} draggableId={item.ModuleID.toString()}
                        index={index} style={{ cursor: "cell" }}>

                        {(provided, snapshot) => {

                            return (

                                <Grid container>

                                    {<Grid item xs={12}
                                        ref={provided.innerRef}
                                        // {...provided.draggableProps}
                                        {...(dropdrawcontent) ? { ...provided.draggableProps }
                                            : ""}
                                        {...provided.dragHandleProps}
                                        sx={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            dropdrawcontent
                                        )}>
                                        <Grid container sx={{

                                        }}>

                                            <Grid item xs={4}>
                                                <Typography variant='h6'>Module {index}</Typography>
                                            </Grid>

                                            <Grid item xs={4} sx={{ textAlign: "center" }}>
                                                <Typography variant='body1'>{item.Title}</Typography>
                                            </Grid>

                                            <Grid item xs={4}>

                                                <Box sx={{ display: 'flex' }}>

                                                    <Box sx={{ ml: "auto" }}>
                                                        <IconButton color='firr' variant="outlined"
                                                            onClick={(event) => { handleDialogEditModule(event, item.ModuleID) }}
                                                        >
                                                            <EditIcon></EditIcon>
                                                        </IconButton>
                                                        <IconButton color='firr' variant="outlined">
                                                            <DeleteIcon></DeleteIcon>
                                                        </IconButton>
                                                        <IconButton color='firr' variant="outlined"
                                                            onClick={(event) => { HandleLectureDropDowm(event, index) }}>
                                                            {!dropdrawcontent ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                        </IconButton>
                                                    </Box>

                                                </Box>

                                            </Grid>

                                            {!dropdrawcontent && <Grid item xs={12}>
                                                <DraggableListLecture
                                                    items={item.Lectures}
                                                    CourseID={courseID}
                                                    CurriculumID={courseID}
                                                    ModuleID={item.ModuleID}
                                                    reload={reload}
                                                    setreload={setreload}
                                                ></DraggableListLecture>
                                            </Grid>}

                                        </Grid>

                                    </Grid>}

                                </Grid>

                            );

                        }}

                    </Draggable>

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

            </Grid >

        </React.Fragment >

    );

};