import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Alert,
    Box, Button,
    Grid, IconButton,
    Skeleton,
    Snackbar,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { GetCurriculumModuleLectureQuestionsItem } from '../../../../../../../Hooks/request';
import AddQuiz from './AddQuiz';
import EditQuiz from './EditQuiz';

export default function PreviewQuiz(props) {

    const { CourseID, CurriculumID, ModuleID, LectureID, } = props;

    const [quizcontent, setquizcontent] = React.useState([]);
    const [reload, setreload] = React.useState(false);

    const [editquiz, seteditquiz] = React.useState(false);
    const [Addquiz, setAddquiz] = React.useState(false);
    const [deletequiz, setdeletequiz] = React.useState(false);

    const [QuestionID, setQuestionID] = React.useState(-1);
    const [isempty, setisempty] = React.useState(false);

    const [AddAnswerserrorsnackbaropen, setAddAnswerserrorsnackbaropen] = React.useState(false);
    const [AddQuestionserrorsnackbaropen, setAddQuestionserrorsnackbaropen] = React.useState(false);
    const [AddQuestionNoRightAnswerserrorsnackbaropen, setAddQuestionNoRightAnswerserrorsnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {

        const getQuestion = async () => {

            const ques = await GetCurriculumModuleLectureQuestionsItem(CourseID, ModuleID, LectureID);

   
            if (ques.done) {
                if (ques.fetcheddata.data.Questions) {
                    setquizcontent(ques.fetcheddata.data.Questions);
                }
                else {
                    setisempty(true);
                    setquizcontent([]);
                }

            }
            else {
                setquizcontent([]);
            }
         
        };
        setquizcontent([]);
        getQuestion();

    }, [reload]);

    const HandleClick = (event, which, QuestionID) => {
        if (which === 0) {
            seteditquiz(true);
            setdeletequiz(false);

            setQuestionID(QuestionID);
        }
        if (which === 1) {
            seteditquiz(false);
            setdeletequiz(true);

        }
        if (which === 2) {
            seteditquiz(false);
            setdeletequiz(false);

        }
        if (which === 3) {
            seteditquiz(false);
            setdeletequiz(false);

            setAddquiz(true);
            setQuestionID(QuestionID);
        }

    };

    const handlesnackClose = (event) => {

        setAddAnswerserrorsnackbaropen(false);
        setAddQuestionserrorsnackbaropen(false);
        setAddQuestionNoRightAnswerserrorsnackbaropen(false);

    };

  


    return (

        <Grid container sx={{ background: "#C7C7C7", padding: "1em", '&:hover': { cursor: "default" } }}>

            {!editquiz && !Addquiz && <React.Fragment>

                <Grid item xs={12}>

                    <Grid container>

                        <Grid item xs={12} md={3}>
                            <Typography variant='h6'> Questions</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ marginBottom: "1em" }}>
                            <Button variant="outlined" fullWidth color='firr'
                                onClick={(event) => { HandleClick(event, 3, 0) }}
                                startIcon={<AddIcon />} >New Question</Button>
                        </Grid>

                        <Grid item xs={12} md={3} >
                            <Button variant="contained" fullWidth color='firr'
                                onClick={(event) => { }}>Preview</Button>
                        </Grid>

                    </Grid>

                </Grid>

                {quizcontent.length > 0 && <Grid item xs={12} sx={{ marginTop: "1em" }}>

                    <TableContainer sx={{ background: "#C7C7C7" }}>

                        <Table sx={{}} aria-label="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Question</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {quizcontent.map((row, index) => {

                                    return (
                                        <TableRow
                                            key={`list-added-quiz-${index}`}
                                            sx={{ '&:last-child td, &:last-child th': {} }}>

                                            <TableCell align="left">{row.Question}</TableCell>

                                            <TableCell>
                                                <IconButton onClick={(event) => { HandleClick(event, 0, row.QuestionID) }}>
                                                    <EditIcon color='firr'></EditIcon>
                                                </IconButton>
                                            </TableCell>

                                            <TableCell align="left">
                                                <IconButton onClick={(event) => { HandleClick(event, 1, index) }}>
                                                    <DeleteIcon color='firr'></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );

                                })}
                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>}

                {quizcontent.length <= 0 && <Grid item xs={12}>

                    <Stack spacing={1}>

                        <Skeleton variant="rounded" width="100%" height={60}>
                            {isempty && <Typography variant='h6' color={"black"}>Empty</Typography>}
                        </Skeleton>

                    </Stack>
                </Grid>}

            </React.Fragment>}

            {Addquiz && <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ ml: "auto" }}>
                            <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { setAddquiz(false); }}>
                                <CloseIcon color='firr'></CloseIcon>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <AddQuiz
                        LectureID={LectureID}
                        CourseID={CourseID}
                        CurriculumID={CurriculumID}
                        ModuleID={ModuleID}
                        reload={reload}
                        setreload={setreload}>
                    </AddQuiz>
                </Grid>
            </Grid>}

            {editquiz && <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ ml: "auto" }}>
                            <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { seteditquiz(false); }}>
                                <CloseIcon color='firr'></CloseIcon>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ margin: "1em" }}>
                    <EditQuiz
                        LectureID={LectureID}
                        CourseID={CourseID}
                        CurriculumID={CurriculumID}
                        ModuleID={ModuleID}
                        reload={reload}
                        setreload={setreload}
                        QuestionID={QuestionID}
                        quizcontent={quizcontent}
                        seteditquiz={seteditquiz}
                    ></EditQuiz>
                </Grid>
            </Grid>}

            <Snackbar open={AddAnswerserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Write up to 15 possible answers and indicate which one is the best.
                </Alert>
            </Snackbar>

            <Snackbar open={AddQuestionserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error You Cant Leave empty.
                </Alert>
            </Snackbar>

            <Snackbar open={AddQuestionNoRightAnswerserrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error You Need To at list select one Right Answer.
                </Alert>
            </Snackbar>

        </Grid >

    );

};