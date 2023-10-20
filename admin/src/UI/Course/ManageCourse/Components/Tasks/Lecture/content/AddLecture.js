import * as React from 'react';
import {
    Alert,
    Box, Button, Card, FormControl, Grid, IconButton,
    InputAdornment, OutlinedInput, Snackbar, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AddNewCurriculumModuleLectureItem } from '../../../../../../../Hooks/request';

export default function AddLecture(props) {

    const { items, CourseID, CurriculumID, ModuleID, setreload, reload, setCurriculum } = props;
    const [showmore, setshowmore] = React.useState(false);
    const [Addlecture, setAddlecture] = React.useState(false);
    const [AddLectureTitle, setAddLectureTitle] = React.useState("");
    const [AddLecturedescription, setAddLecturedescription] = React.useState("");
    const [AddLectureTitlelength, setAddLectureTitlelength] = React.useState(80);
    const [Addlecturedescriptionlength, setAddlecturedescriptionlength] = React.useState(200);

    const [Addquiz, setAddquiz] = React.useState(false);
    const [AddQuizTitle, setAddQuizTitle] = React.useState("");
    const [Addquizdescription, setAddquizdescription] = React.useState("");
    const [AddquizTitlelength, setAddquizTitlelength] = React.useState(80);
    const [Addquizdescriptionlength, setAddquizdescriptionlength] = React.useState(200);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const handleAddLecture = (event) => {

    };

    const handleCloseAddLecture = (event) => {
        setshowmore(false);
        setAddlecture(false);
        setAddquiz(false);
    };

    const HandleAddLectureChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "Add-lecture-title") {
            setAddLectureTitlelength(80 - value.length);
            if (!value) {
                setAddLectureTitlelength(80);
            }
            if (AddLectureTitlelength > 1) {
                setAddLectureTitle(value);
            }
            else {
                console.log({ value });
            }
        }
        if (event.target.name === "Add-lecture-description") {
            setAddlecturedescriptionlength(200 - value.length);
            if (!value) {
                setAddlecturedescriptionlength(200);
            }
            if (Addlecturedescriptionlength > 1) {
                setAddLecturedescription(value);
            }
            else {
                console.log({ value });
            }

        }
    };

    const HandleAddQuizChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "Add-quiz-title") {
            setAddquizTitlelength(80 - value.length);
            if (!value) {
                setAddquizTitlelength(80);
            }
            if (AddquizTitlelength > 1) {
                setAddQuizTitle(value);
            }
            else {
                console.log({ value });
            }
        }
        if (event.target.name === "Add-quiz-description") {
            setAddquizdescriptionlength(200 - value.length);
            if (!value) {
                setAddquizdescriptionlength(200);
            }
            if (Addquizdescriptionlength > 1) {
                setAddquizdescription(value);
            }
            else {
                console.log({ value });
            }

        }

    };

    const handleDialogAddLectureSave = async (event) => {
        if (AddLectureTitle !== "" && AddLecturedescription !== "") {

            const newobj = Object.assign({}, {
                Title: AddLectureTitle,
                Description: AddLecturedescription,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                Type: "lecture"
            });

            try {

                const response = await AddNewCurriculumModuleLectureItem(newobj);

                if (response.done) {
                    // setreload(!reload);
                    setCurriculum(response.Curriculum);
                    setAddlecture(false);
                    setAddquiz(false);
                    setshowmore(false);
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

    const handleDialogAddQuizSave = async (event) => {
        if (AddQuizTitle !== "" && Addquizdescription !== "") {

            const newobj = Object.assign({}, {
                Title: AddQuizTitle,
                Description: Addquizdescription,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                Type: "quiz"
            });

            try {

                const response = await AddNewCurriculumModuleLectureItem(newobj);

                if (response.done) {
                    // setreload(!reload);
                    setCurriculum(response.Curriculum);
                    setAddlecture(false);
                    setAddquiz(false);
                    setshowmore(false);
                    setsnackbaropen(true);
                    setAddQuizTitle("");
                    setAddquizdescription("");
                    setAddLectureTitlelength(80);
                    setAddquizdescriptionlength(200);
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

        <Grid container>

            {showmore && <IconButton size="large"
                color='firr' variant="outlined"
                onClick={(event) => { handleCloseAddLecture(event) }}>
                <CloseIcon />
            </IconButton>}

            {Addlecture && <Grid item xs={12} sx={{ margin: "1em" }}>
                {<Grid container columnSpacing={2} sx={{ padding: "1em", border: "1px dashed" }}>

                    <Grid item xs={12} sx={{ margin: "2em" }}>

                        <FormControl fullWidth color='firr' >

                            <OutlinedInput value={AddLectureTitle} onChange={HandleAddLectureChange}
                                id='Add-lecture-title' name='Add-lecture-title'
                                endAdornment={
                                    <InputAdornment position="end">{AddLectureTitlelength}
                                    </InputAdornment>} placeholder="Please enter Title">
                            </OutlinedInput>

                            <Typography sx={{ marginTop: "1em" }}>
                                Its The First Thing Students see,
                            </Typography>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} sx={{ margin: "2em" }}>
                        <FormControl fullWidth color='firr'>
                            <OutlinedInput value={AddLecturedescription}
                                onChange={HandleAddLectureChange}
                                id='Add-lecture-description' name='Add-lecture-description'
                                endAdornment={<InputAdornment position="end">
                                    {Addlecturedescriptionlength}</InputAdornment>} placeholder="Enter a Lecture Description ">

                            </OutlinedInput>
                            <Typography sx={{ marginTop: "1em" }}>
                                What will students be able to do at the end of this Lecture?
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ margin: "2em" }}>

                        <Box sx={{ display: 'flex' }}>

                            <Box sx={{ ml: "auto" }}>
                                <Button color='firr' onClick={() => { setAddlecture(false) }}>
                                    Cancel
                                </Button>
                                <Button variant="outlined" color='firr' onClick={() => { handleDialogAddLectureSave() }}>
                                    Add Lecture
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>}
            </Grid>}

            {Addquiz && <Grid item xs={12} sx={{ margin: "1em" }}>
                {<Grid container columnSpacing={2} sx={{ padding: "1em", border: "1px dashed" }}>

                    <Grid item xs={12} sx={{ margin: "2em" }}>

                        <FormControl fullWidth color='firr' >

                            <OutlinedInput value={AddQuizTitle} onChange={HandleAddQuizChange}
                                id='Add-quiz-title' name='Add-quiz-title'
                                endAdornment={
                                    <InputAdornment position="end">{AddquizTitlelength}
                                    </InputAdornment>} placeholder="Please enter Quiz Title">
                            </OutlinedInput>

                            <Typography sx={{ marginTop: "1em" }}>
                                New Quiz
                            </Typography>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} sx={{ margin: "2em" }}>
                        <FormControl fullWidth color='firr'>
                            <OutlinedInput value={Addquizdescription}
                                onChange={HandleAddQuizChange}
                                id='Add-quiz-description' name='Add-quiz-description'
                                endAdornment={<InputAdornment position="end">
                                    {Addquizdescriptionlength}</InputAdornment>} placeholder="Enter a Quiz Description ">

                            </OutlinedInput>
                            <Typography sx={{ marginTop: "1em" }}>
                                Quiz Description
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ margin: "2em" }}>

                        <Box sx={{ display: 'flex' }}>

                            <Box sx={{ ml: "auto" }}>
                                <Button color='firr' onClick={() => { setAddquiz(false) }}>
                                    Cancel
                                </Button>
                                <Button variant="outlined" color='firr' onClick={() => { handleDialogAddQuizSave() }}>
                                    Add Quiz
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>}
            </Grid>}

            {(showmore && !Addlecture && !Addquiz) && <Grid item xs={12} sx={{ margin: "1em" }}>

                {<Grid container columnSpacing={2} sx={{ padding: "1em", border: "1px dashed" }}>

                    <Grid item xs={6}>
                        <Button size="large" fullWidth color='firr' onClick={(event) => { setAddlecture(true) }} startIcon={<AddIcon />} variant="outlined">Lecture</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="large" fullWidth color='firr' onClick={(event) => { setAddquiz(true) }} startIcon={<AddIcon />} variant="outlined">Quiz</Button>
                    </Grid>

                </Grid>}



            </Grid>}

            {!showmore && <Grid item xs={12} sx={{ margin: "1em" }}>
                <Button size="large" color='firr' onClick={(event) => { setshowmore(true) }} startIcon={<AddIcon />} variant="outlined">Curriculum Item</Button>
            </Grid>}

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Added A Lecture
                </Alert>
            </Snackbar>


        </Grid>

    );

};

