import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import {
    Alert,
    Box, Button, Checkbox, Dialog, DialogContent, Divider,
    FormControl,
    Grid, IconButton,
    Paper,
    Snackbar,
    Typography,
    alpha,
    useTheme
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { EditNewCurriculumModuleQuestionItemContent } from '../../../../../../../Hooks/request';

function FacebookCircularProgress(props) {
    return (

        <Box sx={{ position: 'absolute', }}>

            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>

    );
}

export default function EditQuiz(props) {

    const { CourseID, CurriculumID, ModuleID,
        LectureID, QuestionID, quizcontent,
        reload, setreload, seteditquiz } = props;

    const [Question, setQuestion] = React.useState("");
    const [Answers, setAnswers] = React.useState([]);
    const [Answersreload, setAnswersreload] = React.useState(false);

    const [openSaveLoadDialog, setopenSaveLoadDialog] = React.useState(false);
    const [disabled, setdisabled] = React.useState(false);

    const [Answerserrorsnackbaropen, setAnswerserrorsnackbaropen] = React.useState(false);
    const [Questionserrorsnackbaropen, setQuestionserrorsnackbaropen] = React.useState(false);
    const [QuestionNoRightAnswerserrorsnackbaropen, setQuestionNoRightAnswerserrorsnackbaropen] = React.useState(false);
    const [QuestionAddSucesssnackbaropen, setQuestionAddSucesssnackbaropen] = React.useState(false);
    const [QuestionAddErrorSnackbaropen, setQuestionAddErrorSnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {

        const foundquestion = quizcontent.find((row, index) => {
            if (row.QuestionID === QuestionID) {
                return row;
            }
        });

        if (foundquestion) {

            var newobj = [];

            setQuestion(foundquestion.Question);
            foundquestion.Answer.map((row, index) => {

                var localobj = Object.assign({}, {
                    ...row
                });

                newobj.push(localobj);

            });
            setAnswers(newobj);
        }

    }, []);

    const handleEditquizChange = (event, index) => {
        event.preventDefault();
        const value = event.target.value;
        if (QuestionID !== -1) {
            if (event.target.name === "edit-quiz-title") {
                setQuestion(value);
            }
        } else {
            // seteditquiz(false);
        }
    };

    const handleEditquizAnswerChange = (event, Answerindex) => {
        event.preventDefault();
        const value = event.target.value;
        if (QuestionID !== -1) {

            if (event.target.name === `Edit-Answer-right-choice-input-${Answerindex}`) {
                Answers[Answerindex].RightAnswer = !Answers[Answerindex].RightAnswer;
                setAnswersreload(!Answersreload);
            }
            if (event.target.name === `Edit-Answer-title-input-${Answerindex}`) {
                Answers[Answerindex].AnswerTitle = value;

                setAnswersreload(!Answersreload);
            }
            if (event.target.name === `Edit-Answer-discription-input-${Answerindex}`) {
                Answers[Answerindex].AnswerDiscription = value;

                setAnswersreload(!Answersreload);
            }


        } else {

        }
    };

    const handleSaveEdit = async (event) => {
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
                        LectureID: LectureID,
                        QuestionID: QuestionID
                    });
                    setdisabled(true);
                    setopenSaveLoadDialog(true);
                    const response = await EditNewCurriculumModuleQuestionItemContent(newobj);

                    if (response.done) {
                        setdisabled(false);
                        setopenSaveLoadDialog(false);
                        setQuestion("");
                        setAnswers([]);
                        seteditquiz(false);
                        setQuestionAddSucesssnackbaropen(true);
                        setreload(!reload);

                    }
                    else {
                        setdisabled(false);
                        setopenSaveLoadDialog(false);
                        setQuestionAddErrorSnackbaropen(true);
                    }

                } catch (e) {
                    setQuestionAddErrorSnackbaropen(true);
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


    return (

        <Grid container>

            {<Grid item xs={12} sx={{ margin: "1em" }}>

                <Grid container sx={{ border: "1px solid", padding: "1em" }}>

                    {openSaveLoadDialog && <Grid item xs={12} sx={{ marginRight: "2em" }}>
                        <Box sx={{ display: 'flex' }}>

                            <Box sx={{ ml: "auto" }}>
                                <FacebookCircularProgress />
                            </Box>
                        </Box>
                    </Grid>}



                    {<Grid item xs={12}>

                        <FormControl
                            color='firr'
                            fullWidth
                        >
                            <Typography variant='h6' sx={{ marginTop: "1em" }}>Question.</Typography>

                            <OutlinedInput
                                id='edit-quiz-title'
                                name='edit-quiz-title'
                                color='firr'
                                fullWidth
                                value={Question}
                                disabled={disabled}
                                multiline
                                onChange={(event) => { handleEditquizChange(event) }}
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
                                                id={`Edit-Answer-right-choice-input-${Answerindex}`}
                                                name={`Edit-Answer-right-choice-input-${Answerindex}`}
                                                checked={row.RightAnswer}
                                                disabled={disabled}
                                                onChange={(event) => { handleEditquizAnswerChange(event, Answerindex) }}
                                            >
                                            </Checkbox>
                                        </Box>
                                        <Box sx={{ ml: "auto" }}>
                                            <IconButton disabled={disabled} sx={{}} onClick={(event) => { handleDeleteAnswer(event, Answerindex) }}>
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

                                                id={`Edit-Answer-title-input-${Answerindex}`}
                                                name={`Edit-Answer-title-input-${Answerindex}`}
                                                color='firr' fullWidth
                                                value={row.AnswerTitle}
                                                multiline
                                                disabled={disabled}
                                                placeholder='Edit an Answer'
                                                onChange={(event) => { handleEditquizAnswerChange(event, Answerindex) }}
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

                                                id={`Edit-Answer-discription-input-${Answerindex}`}
                                                name={`Edit-Answer-discription-input-${Answerindex}`}
                                                color='firr' fullWidth
                                                multiline
                                                disabled={disabled}
                                                value={row.AnswerDiscription}
                                                placeholder='Explain why this is or isnot the best answer.'
                                                onChange={(event) => { handleEditquizAnswerChange(event, Answerindex) }}
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

                        <Button disabled={disabled} size="large" fullWidth color='firr'
                            onClick={(event) => { handleAddChoice(event) }}
                            startIcon={<AddIcon />} variant="outlined">
                            Add Extra Choice
                        </Button>

                    </Grid>

                </Grid>

                <Grid item xs={12} sx={{ margin: "1em" }}>
                    <Box sx={{ display: 'flex', marginTop: "1em" }}>
                        <Box sx={{ ml: "auto" }}>

                            <Button disabled={disabled} ss size="large" color='firr'
                                onClick={(event) => { handleSaveEdit(event) }}
                                variant="contained">
                                Save
                            </Button>

                        </Box>
                    </Box>
                </Grid>


            </Grid>}

            {/* <Dialog open={openSaveLoadDialog} onClose={SaveLoadDialogclose}>
                <DialogContent >
                    <FacebookCircularProgress />
                </DialogContent>
            </Dialog> */}
            s
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
                    You Have successfully Edited A Question.
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