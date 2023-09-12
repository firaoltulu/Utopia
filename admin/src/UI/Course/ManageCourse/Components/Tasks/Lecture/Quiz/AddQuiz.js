import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import {
    Alert,
    Box, Button, Checkbox, Divider,
    FormControl,
    Grid, IconButton,
    Paper,
    Snackbar,
    Typography,
    alpha,
    useTheme
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';

import { AddNewCurriculumModuleQuestionItem } from '../../../../../../../Hooks/request';

export default function AddQuiz(props) {

    const { CourseID, CurriculumID, ModuleID, LectureID, QuestionID, reload, setreload, } = props;

    const [addQuiz, setaddQuiz] = React.useState(false);
    const [Question, setQuestion] = React.useState("");
    const [Answers, setAnswers] = React.useState([]);
    const [Answersreload, setAnswersreload] = React.useState(false);

    const [Answerserrorsnackbaropen, setAnswerserrorsnackbaropen] = React.useState(false);
    const [Questionserrorsnackbaropen, setQuestionserrorsnackbaropen] = React.useState(false);
    const [QuestionNoRightAnswerserrorsnackbaropen, setQuestionNoRightAnswerserrorsnackbaropen] = React.useState(false);
    const [QuestionAddSucesssnackbaropen, setQuestionAddSucesssnackbaropen] = React.useState(false);
    const [QuestionAddErrorSnackbaropen, setQuestionAddErrorSnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {

        var newobj = [];
        for (var i = 0; i <= 1; i++) {

            var localobj = Object.assign({}, {
                RightAnswer: false,
                AnswerTitle: "",
                AnswerDiscription: "",
            });

            newobj.push(localobj);

        }

        setAnswers(newobj);

    }, [Answersreload]);

    console.log({ Answers });

    const HandleAddQuiz = (event, which) => {
        if (which === 0) {
            setaddQuiz(true);

        }
        // if (which === 1) {
        //     setaddvideo(false);
        //     setadddocument(true);
        // }
    };

    const handlesetquizChange = (event, index) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "Add-quiz-title") {
            setQuestion(value);
        }
        // if (event.target.name === "Add-lecture-description") {
        //     setAddlecturedescriptionlength(200 - value.length);
        //     if (!value) {
        //         setAddlecturedescriptionlength(200);
        //     }
        //     if (Addlecturedescriptionlength > 1) {
        //         setAddLecturedescription(value);
        //     }
        //     else {
        //         console.log({ value });
        //     }

        // }

    };

    const handlesetquizAnswerChange = (event, index) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === `Add-Answer-right-choice-input`) {
            var newobj = [];

            Answers.map((row, index) => {

                var localobj = Object.assign({}, {
                    ...row
                });
                newobj.push(localobj);
            });

            newobj[index].RightAnswer = !newobj[index].RightAnswer;
            setAnswers(newobj);

        }
        else if (event.target.name === `add-Answer-title-input`) {
            var newobj = [];

            Answers.map((row, index) => {

                var localobj = Object.assign({}, {
                    ...row
                });
                newobj.push(localobj);
            });

            newobj[index].AnswerTitle = value;
            setAnswers(newobj);
        }
        else if (event.target.name === `add-Answer-discription-input`) {
            var newobj = [];

            Answers.map((row, index) => {

                var localobj = Object.assign({}, {
                    ...row
                });
                newobj.push(localobj);
            });

            newobj[index].AnswerDiscription = value;
            setAnswers(newobj);

        }




    };

    const handleDeleteAnswer = (event, Answerindex) => {

        if (Answers.length > 2) {

            var newobj = Answers.filter((row, index) => {

                if (Answerindex === index) {
                    return null;
                }
                else {
                    return row;
                }

            });
            setAnswers(newobj);

        }
        else {

            setAnswerserrorsnackbaropen(true);

        }

    };

    const HandleBack = (event) => {
        setaddQuiz(false);
    };

    const handleAddChoice = (event) => {

        if (Answers.length < 15) {

            var newobj = [];
            Answers.map((row, index) => {

                var localobj = Object.assign({}, {
                    ...row
                });
                newobj.push(localobj);
            });

            newobj.push(
                {
                    RightAnswer: false,
                    AnswerTitle: "",
                    AnswerDiscription: ""
                }
            );

            setAnswers(newobj);
        }
        else {
            setAnswerserrorsnackbaropen(true);
        }
    };

    const handleSaveQuiz = async (event) => {

        if (Question !== "" && Answers.length > 1) {

            const errfound = Answers.find((row, index) => {
                if (row.AnswerTitle === "") {
                    return row;
                }
            });

            const errNorightfound = Answers.find((row, index) => {
                if (row.RightAnswer === true) {
                    return row;
                }
            });

            if (errfound) {

                setQuestionserrorsnackbaropen(true);

            }
            else if (!errNorightfound) {

                setQuestionNoRightAnswerserrorsnackbaropen(true);

            }
            else {

                try {

                    const newobj = Object.assign({}, {
                        Question: Question,
                        Answer: Answers,
                        CourseID: CourseID,
                        CurriculumID: CurriculumID,
                        ModuleID: ModuleID,
                        LectureID: LectureID
                    });

                    const response = await AddNewCurriculumModuleQuestionItem(newobj);

                    if (response.done) {
                        setreload(!reload);
                        setQuestion("");
                        setAnswersreload(!Answersreload);
                        setQuestionAddSucesssnackbaropen(true);
                        setaddQuiz(false);
                    }
                    else {
                        setQuestionAddErrorSnackbaropen(true);
                    }

                } catch (e) {

                }

            }

        }
        else {

        }

    };

    const handlesnackClose = (event) => {

        setAnswerserrorsnackbaropen(false);
        setQuestionserrorsnackbaropen(false);
        setQuestionNoRightAnswerserrorsnackbaropen(false);
        setQuestionAddSucesssnackbaropen(false);
        setQuestionAddErrorSnackbaropen(false);
    };

    return (

        <Grid container>

            {<React.Fragment>

                {!addQuiz && <Grid item xs={12} sx={{ margin: "1em" }}>

                    <Grid container spacing={5} >

                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Paper elevation={3}
                                onClick={(event) => { HandleAddQuiz(event, 0) }}
                                sx={{
                                    border: "1px solid",
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                        cursor: "pointer"
                                    },

                                }}
                            >
                                <Box sx={{ padding: "1em" }}>
                                    <QuizIcon fontSize='large' sx={{ marginBottom: "1em" }}></QuizIcon>
                                    <Divider></Divider>
                                    <Typography variant='body1'>
                                        Multiple Choice
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>}

            </React.Fragment>}

            {addQuiz && <Grid item xs={12} sx={{ margin: "1em" }}>

                <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { HandleBack(event) }}>
                    <ArrowBackIosIcon color='firr'></ArrowBackIosIcon>
                </IconButton>

                <Grid container sx={{ border: "1px solid", padding: "1em" }}>

                    {<Grid item xs={12}>

                        <FormControl
                            color='firr'
                            fullWidth
                        >
                            <Typography variant='h6' sx={{ marginTop: "1em" }}>Question.</Typography>

                            <OutlinedInput

                                id='Add-quiz-title'
                                name='Add-quiz-title'
                                color='firr' fullWidth
                                multiline
                                value={Question}
                                onChange={handlesetquizChange}
                                sx={{ background: "#C7C7C7" }}>

                            </OutlinedInput>


                        </FormControl>

                    </Grid>}

                    <Grid item xs={12} >
                        <Typography variant='h6' sx={{ marginTop: "1em" }}>Answers.</Typography>
                    </Grid>

                    {Answers.map((row, Answerindex) => (

                        <Grid item xs={12} sx={{ marginBottom: "1em", padding: "1em", border: "1px solid" }} key={`Add-Quiz-add-answer-${Answerindex}`}>

                            <Grid container>

                                <Grid item xs={12} sx={{ marginTop: "1em" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{}}>
                                            <Checkbox color='firr'
                                                id={`Add-Answer-right-choice-input`}
                                                name={`Add-Answer-right-choice-input`}
                                                checked={row.RightAnswer}
                                                onChange={(event) => { handlesetquizAnswerChange(event, Answerindex) }}
                                            >
                                            </Checkbox>
                                        </Box>
                                        <Box sx={{ ml: "auto" }}>
                                            <IconButton sx={{}} onClick={(event) => { handleDeleteAnswer(event, Answerindex) }}>
                                                <DeleteIcon color='firr'></DeleteIcon>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid>

                                <React.Fragment>

                                    <Grid item xs={1}>

                                    </Grid>

                                    <Grid item xs={10}>

                                        <FormControl
                                            color='firr'
                                            fullWidth>

                                            <OutlinedInput

                                                id={`add-Answer-title-input`}
                                                name={`add-Answer-title-input`}
                                                color='firr' fullWidth
                                                value={Answers.AnswerTitle}
                                                multiline
                                                placeholder='Add an Answer'
                                                onChange={(event) => { handlesetquizAnswerChange(event, Answerindex) }}
                                                sx={{ background: "#C7C7C7" }}>

                                            </OutlinedInput>

                                        </FormControl>

                                    </Grid>

                                </React.Fragment>

                                <React.Fragment>

                                    <Grid item xs={2} sx={{ marginTop: "1em" }}>

                                    </Grid>

                                    <Grid item xs={9} sx={{ marginTop: "1em" }}>
                                        <FormControl
                                            color='firr'
                                            fullWidth
                                        >

                                            <OutlinedInput

                                                id={`add-Answer-discription-input`}
                                                name={`add-Answer-discription-input`}
                                                color='firr' fullWidth
                                                multiline
                                                value={Answers.AnswerDiscription}
                                                placeholder='Explain why this is or isnot the best answer.'
                                                onChange={(event) => { handlesetquizAnswerChange(event, Answerindex) }}
                                                sx={{ background: "#C7C7C7" }}>

                                            </OutlinedInput>


                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={1} sx={{ marginTop: "1em" }}>

                                    </Grid>

                                </React.Fragment>

                            </Grid>

                        </Grid>

                    ))}

                    <Grid item xs={12} sx={{ margin: "1em" }}>

                        <Button size="large" fullWidth color='firr'
                            onClick={(event) => { handleAddChoice(event) }}
                            startIcon={<AddIcon />} variant="outlined">
                            ADD Choice
                        </Button>

                    </Grid>

                </Grid>

                <Box sx={{ display: 'flex', marginTop: "1em" }}>
                    <Box sx={{ ml: "auto" }}>

                        <Button size="large" color='firr'
                            onClick={(event) => { handleSaveQuiz(event) }}
                            variant="contained">
                            Save
                        </Button>

                    </Box>
                </Box>

            </Grid>}

            <Snackbar open={Answerserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Write up to 15 possible answers and indicate which one is the best.
                </Alert>
            </Snackbar>

            <Snackbar open={Questionserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error You Cant Leave Fields empty.
                </Alert>
            </Snackbar>

            <Snackbar open={QuestionNoRightAnswerserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error You Need To at list select one Right Answer.
                </Alert>
            </Snackbar>

            <Snackbar open={QuestionAddSucesssnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have successfully Added A New Question.
                </Alert>
            </Snackbar>

            <Snackbar open={QuestionAddErrorSnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Try Again.
                </Alert>
            </Snackbar>

        </Grid >

    );

};