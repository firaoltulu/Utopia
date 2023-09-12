import {
    Alert,
    Box,
    Grid,
    Snackbar, Typography,
    useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

import { GetAllLanguages, GetCourse, HttpEditCourseContent } from '../../../../Hooks/request';
import AddGoals from '../IntendedLearnerComponents/AddGoals';
import AddIntendedLearners from '../IntendedLearnerComponents/AddIntended';
import AddRequirements from '../IntendedLearnerComponents/AddRequirements';


export default function Intendedlearners() {

    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const courseID = params.courseID;

    const [Languages, setLanguages] = React.useState([]);
    const [course, setcourse] = React.useState({});

    const [Requirements, setRequirements] = React.useState([]);
    const [Intended, setIntended] = React.useState([]);
    const [Goals, setGoals] = React.useState([]);

    const [localIntendedLearners, setlocalIntendedLearners] = React.useState([]);
    const [localGoals, setlocalGoals] = React.useState([]);


    const [havebeenchange, sethavebeenchange] = React.useState(false);
    const [reload, setreload] = React.useState(false);

    const [donereload, setdonereload] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [Addsnackbaropen, setAddsnackbaropen] = React.useState(false);
    const [Editsnackbaropen, setEditsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    function loadeverything(Course) {

        if (Course.Requirements.length <= 0) {

            var locnewobj = [];

            setRequirements(locnewobj);

        }
        if (Course.Requirements.length > 0) {
            var locnewobj = [];

            Course.Requirements.map((row, index) => {
                var newobj = Object.assign({}, {
                    ...row
                });
                locnewobj.push(newobj);
            });

            setRequirements(locnewobj);
        }
        if (Course.IntendedLearners.length <= 0) {
            var locnewobj = [];
            setIntended(locnewobj);
        }
        if (Course.IntendedLearners.length > 0) {
            var locnewobj = [];

            Course.IntendedLearners.map((row, index) => {
                var newobj = Object.assign({}, {
                    ...row
                });
                locnewobj.push(newobj);
            });
            setIntended(locnewobj);
        }
        if (Course.Goals.length <= 0) {
            var locnewobj = [];
            setGoals(locnewobj);
        }
        if (Course.Goals.length > 0) {
            var locnewobj = [];

            Course.Goals.map((row, index) => {
                var newobj = Object.assign({}, {
                    ...row
                });
                locnewobj.push(newobj);
            });
            setGoals(locnewobj);
        }
        else {

        }
        setcourse(Course);
        setdonereload(true);
    };

    React.useEffect(() => {

        const get = async () => {

            var newobj = await GetAllLanguages();

            if (newobj.done) {
                if (newobj.fetcheddata.data.Languages.length > 0) {
                    var locarr = [];

                    newobj.fetcheddata.data.Languages.map((row, index) => {

                        var locobj = Object.assign({}, {
                            LanguageID: row.LanguageID,
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

            }

        }
        get();

    }, []);

    React.useEffect(() => {

        const get = async () => {

            var newobj = await GetCourse(courseID);
            if (newobj.done) {

                if (newobj.fetcheddata.data.Course) {

                    loadeverything(newobj.fetcheddata.data.Course);
                }
                else {

                }

            }
            else {
                // setalerterroopensnackbaropen(true);
            }

        }

        get();

    }, [reload]);

    const HandleSaveClick = async (event) => {

        if (havebeenchange) {

            setLoading(true);

            const updateRequirement = [];
            const updateIntend = [];
            const updateGoal = [];

            Requirements.map((row, index) => {

                if (course.Requirements.length > 0) {

                    const foundRequirement = course.Requirements.find((inrow, index) => {
                        try {
                            if (row.RequirementID === inrow.RequirementID) {
                                return inrow;
                            }
                            else {
                                return null;
                            }
                        } catch (error) {
                            return null;
                        }

                    });

                    if (foundRequirement) {

                        if (foundRequirement.Requirement !== row.Requirement) {

                            var newobj = Object.assign({}, {
                                RequirementID: foundRequirement.RequirementID,
                                LanguageID: foundRequirement.LanguageID,
                                Requirement: row.Requirement,
                            });

                            updateRequirement.push(newobj);

                        }
                        else {
                        }
                    }
                    else {

                        if (row.Requirement !== "") {

                            var newobj = Object.assign({}, {
                                RequirementID: row.RequirementID,
                                LanguageID: row.LanguageID,
                                Requirement: row.Requirement,
                            });

                            updateRequirement.push(newobj);
                        }
                        else {

                        }



                    }

                }
                else if (course.Requirements.length <= 0) {

                    if (row.Requirement !== "") {

                        var newobj = Object.assign({}, {
                            RequirementID: row.RequirementID,
                            LanguageID: row.LanguageID,
                            Requirement: row.Requirement,
                        });

                        updateRequirement.push(newobj);

                    }
                    else {

                    }

                }
                else {

                }

            });

            Intended.map((row, index) => {

                if (course.IntendedLearners.length > 0) {

                    const foundIntendedLearner = course.IntendedLearners.find((inrow, index) => {
                        try {
                            if (row.IntendedLearnerID === inrow.IntendedLearnerID) {
                                return inrow;
                            }
                            else {
                                return null;
                            }
                        } catch (error) {
                            return null;
                        }

                    });

                    if (foundIntendedLearner) {

                        if (foundIntendedLearner.IntendedLearner !== row.IntendedLearner) {

                            var newobj = Object.assign({}, {
                                IntendedLearnerID: foundIntendedLearner.IntendedLearnerID,
                                LanguageID: foundIntendedLearner.LanguageID,
                                IntendedLearner: row.IntendedLearner,
                            });

                            updateIntend.push(newobj);

                        }
                        else {
                        }
                    }
                    else {
                        if (row.IntendedLearner !== "") {

                            var newobj = Object.assign({}, {
                                IntendedLearnerID: row.IntendedLearnerID,
                                LanguageID: row.LanguageID,
                                IntendedLearner: row.IntendedLearner,
                            });

                            updateIntend.push(newobj);
                        }
                        else {

                        }



                    }

                }
                else if (course.IntendedLearners.length <= 0) {

                    if (row.IntendedLearner !== "") {

                        var newobj = Object.assign({}, {

                            IntendedLearnerID: row.IntendedLearnerID,
                            LanguageID: row.LanguageID,
                            IntendedLearner: row.IntendedLearner,
                        });

                        updateIntend.push(newobj);

                    }
                    else {

                    }

                }
                else {


                }

            });

            Goals.map((row, index) => {

                if (course.Goals.length > 0) {

                    const foundGoals = course.Goals.find((inrow, index) => {

                        try {
                            if (row.GoalID === inrow.GoalID) {
                                return inrow;
                            }
                            else {
                                return null;
                            }
                        } catch (error) {
                            return null;
                        }

                    });

                    if (foundGoals) {

                        if (foundGoals.Goal !== row.Goal) {

                            var newobj = Object.assign({}, {
                                GoalID: foundGoals.GoalID,
                                LanguageID: foundGoals.LanguageID,
                                Goal: row.Goal,
                            });

                            updateGoal.push(newobj);

                        }
                        else {
                        }
                    }
                    else {
                        if (row.Goal !== "") {

                            var newobj = Object.assign({}, {
                                GoalID: row.GoalID,
                                LanguageID: row.LanguageID,
                                Goal: row.Goal,
                            });

                            updateGoal.push(newobj);
                        }
                        else {

                        }



                    }

                }
                else if (course.Goals.length <= 0) {

                    if (row.Goal !== "") {

                        var newobj = Object.assign({}, {

                            GoalID: row.GoalID,
                            LanguageID: row.LanguageID,
                            Goal: row.Goal,
                        });

                        updateGoal.push(newobj);

                    }
                    else {

                    }

                }
                else {


                }

            });


            const updatecontent = Object.assign({}, {

                CourseID: courseID,
                Requirements: updateRequirement,
                Goals: updateGoal,
                IntendedLearners: updateIntend,

            });

            console.log({ updatecontent });

            const response = await HttpEditCourseContent(updatecontent);

            if (response.done) {
                var updatecourse = response.course;
                console.log({ updatecourse });
                loadeverything(updatecourse);
                setEditsnackbaropen(true);
                sethavebeenchange(false);
                setLoading(false);
            }
            else {
                seterrorsnackbaropen(true);
                setLoading(false);
            }


        }
        else {

        }

    };

    const handlesnackClose = (event) => {
        setAddsnackbaropen(false);
        setEditsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    // console.log({ course });
    // console.log({ Goals });

    return (

        <Grid container sx={{ border: "1px solid", padding: "1em" }}>

            <Grid item xs={12}>
                <Grid container sx={{}}>
                    <Grid item xs={6}>
                        <Typography variant='h4'>Intended learners</Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    {<Grid item xs={2} sx={{
                        position: "fixed",
                        top: "10px",
                        right: "0",
                        marginRight: "1em",
                        zIndex: theme.zIndex.drawer + 2
                    }}>

                        <Button
                            disabled={!havebeenchange ? true : false}
                            fullWidth
                            variant="contained"
                            color='firr'
                            size="large"
                            startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
                            onClick={(event) => { HandleSaveClick(event) }}
                        > <span>Save</span></Button>

                    </Grid>}
                </Grid>

            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                <Typography variant="subtitle1">The following descriptions will be publicly
                    visible on your Course Landing Page and will have a direct impact on your course performance.
                    These descriptions will help learners decide if your course is right for them.
                </Typography>
            </Grid>

            <React.Fragment>

                <Grid item xs={12} md={12} sx={{ marginTop: "1em" }}>
                    <Typography variant="h6">What will students learn in your course?</Typography>
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                    <Typography variant="subtitle1">You must enter at least 4 learning objectives
                        sor outcomes that learners can expect to achieve after completing your course.
                    </Typography>
                </Grid>

                {<AddGoals Goals={Goals}
                    setGoals={setGoals}
                    Languages={Languages}
                    sethavebeenchange={sethavebeenchange}
                    donereload={donereload}
                    setdonereload={setdonereload}>
                </AddGoals>}

            </React.Fragment >

            <React.Fragment>

                <Grid item xs={12} md={12} sx={{ marginTop: "1em" }}>
                    <Typography variant="h6">What are the requirements or prerequisites for taking your course?</Typography>
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                    <Typography variant="subtitle1">List the required skills, experience, tools or
                        equipment learners should have prior to taking your course.
                        If there are no requirements, use this space as an opportunity
                        to lower the barrier for beginners.
                    </Typography>
                </Grid>

                {<AddRequirements Requirements={Requirements}
                    setRequirements={setRequirements}
                    Languages={Languages}
                    sethavebeenchange={sethavebeenchange}
                    donereload={donereload}
                    setdonereload={setdonereload}
                >
                </AddRequirements>}

            </React.Fragment>

            <React.Fragment>

                <Grid item xs={12} md={12} sx={{ marginTop: "1em" }}>
                    <Typography variant="h6">Who is this course for?</Typography>
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>
                    <Typography variant="subtitle1">Write a clear description of the intended learners
                        sfor your course who will find your course content valuable.
                        This will help you attract the right learners to your course.
                    </Typography>
                </Grid>

                {<AddIntendedLearners IntendedLearners={Intended}
                    setIntendedLearners={setIntended}
                    Languages={Languages}
                    sethavebeenchange={sethavebeenchange}
                    reload={reload} setreload={setreload}
                    donereload={donereload}
                    setdonereload={setdonereload}
                >
                </AddIntendedLearners>}

            </React.Fragment>


            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Try Again..
                </Alert>
            </Snackbar>

            <Snackbar open={Addsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have been Successful
                </Alert>
            </Snackbar>

            <Snackbar open={Editsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have been Successful
                </Alert>
            </Snackbar>

        </Grid>

    );

}