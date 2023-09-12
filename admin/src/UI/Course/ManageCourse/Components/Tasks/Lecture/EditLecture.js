import {
    Alert,
    Box, Button,
    FormControl,
    Grid,
    InputAdornment, OutlinedInput,
    Snackbar,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import {
    HttpEditCurriculumModuleLectureItem,
    HttpEditCurriculumModuleQuestionItem
} from '../../../../../../Hooks/request';

export default function EditLecture(props) {

    const { item, ModuleID, reload, CourseID,
        CurriculumID, setreload, HandleClose } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [EditLectureTitle, setEditLectureTitle] = React.useState("");
    const [EditLectureDiscription, setEditLectureDiscription] = React.useState("");
    const [EditLectureTitlelength, setEditLectureTitlelength] = React.useState(80);
    const [EditLectureDiscriptionlength, setEditLectureDiscriptionlength] = React.useState(200);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    React.useEffect(() => {
        if (item) {
            setEditLectureTitle(item.Title);
            setEditLectureDiscription(item.Discription);
            setEditLectureTitlelength(EditLectureTitlelength - item.Title.length);
            setEditLectureDiscriptionlength(EditLectureDiscriptionlength - item.Discription.length);
        }
    }, []);

    const EditLectureDialogclose = () => {
        setEditLectureTitle("");
        setEditLectureDiscription("");
        setEditLectureTitlelength(80);
        setEditLectureDiscriptionlength(200);
        HandleClose();
    };

    const HandleEditLectureChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "Add-Module-title") {
            setEditLectureTitlelength(80 - value.length);
            if (!value) {
                setEditLectureTitlelength(80);
            }
            if (EditLectureTitlelength > 1) {
                setEditLectureTitle(value);
            }
            else {
                console.log({ value });
            }
        }
        if (event.target.name === "Add-Module-objective") {
            setEditLectureDiscriptionlength(200 - value.length);
            if (!value) {
                setEditLectureDiscriptionlength(200);
            }
            if (EditLectureDiscriptionlength > 1) {
                setEditLectureDiscription(value);
            }
            else {
                console.log({ value });
            }

        }

    };

    const handleDialogEditLectureSave = async (event) => {
        if (EditLectureTitle !== "" && EditLectureDiscription !== "") {
            if (EditLectureTitle === item.Title && EditLectureDiscription === item.Discription) {
                HandleClose();
            }
            else {

                try {

                    if (item.Type === "lecture") {

                        const newobj = Object.assign({}, {
                            Title: EditLectureTitle,
                            Discription: EditLectureDiscription,
                            CourseID: CourseID,
                            ModuleID: ModuleID,
                            CurriculumID: CurriculumID,
                            LectureID: item.LectureID,

                        });
                        const response = await HttpEditCurriculumModuleLectureItem(newobj);
                        if (response.done) {

                            setreload(!reload);
                            EditLectureDialogclose();
                            setsnackbaropen(true);

                        }
                        else {
                            seterrorsnackbaropen(true);
                        }
                    }
                    else if (item.Type === "quiz") {
                        const newobj = Object.assign({}, {
                            Title: EditLectureTitle,
                            Discription: EditLectureDiscription,
                            CourseID: CourseID,
                            ModuleID: ModuleID,
                            CurriculumID: CurriculumID,
                            LectureID: item.LectureID,

                        });

                        console.log({ newobj });
                        const response = await HttpEditCurriculumModuleQuestionItem(newobj);
                        if (response.done) {

                            setreload(!reload);
                            EditLectureDialogclose();
                            setsnackbaropen(true);

                        }
                        else {
                            seterrorsnackbaropen(true);
                        }
                    }
                    else {
                        HandleClose();
                        seterrorsnackbaropen(true);
                    }

                } catch (e) {
                    seterrorsnackbaropen(true);
                }

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

                <Grid item xs={12} sx={{ margin: "2em" }}>
                    <FormControl fullWidth color='firr' >

                        <OutlinedInput value={EditLectureTitle} onChange={HandleEditLectureChange} id='Add-Module-title' name='Add-Module-title' endAdornment={<InputAdornment position="end">{EditLectureTitlelength}</InputAdornment>} placeholder="Please enter Title"></OutlinedInput>
                        <Typography sx={{ marginTop: "1em" }}>
                            Its The First Thing Students see,
                        </Typography>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ margin: "2em" }}>
                    <FormControl fullWidth color='firr'>
                        <OutlinedInput value={EditLectureDiscription} onChange={HandleEditLectureChange} id='Add-Module-objective' name='Add-Module-objective' endAdornment={<InputAdornment position="end">{EditLectureDiscriptionlength}</InputAdornment>} placeholder="Enter a Learning Objective "></OutlinedInput>
                        <Typography sx={{ marginTop: "1em" }}>
                            What will students be able to do at the end of this Lecture?
                        </Typography>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ margin: "2em" }}>

                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ ml: "auto" }}>

                            <Button color='firr' onClick={EditLectureDialogclose}>
                                Cancel
                            </Button>

                            <Button variant="outlined" color='firr' onClick={handleDialogEditLectureSave} >
                                Edit
                            </Button>
                        </Box>
                    </Box>

                </Grid>

            </Grid >

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfully Edited A Lecture
                </Alert>
            </Snackbar>

        </React.Fragment >

    );

};