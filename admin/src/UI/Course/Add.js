import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Discription from "./AddCourse/Discription";
import AddGeneral from "./AddCourse/General";
import Show from "./AddCourse/Show";
import AddTitle from "./AddCourse/Title";

import { AddNewCourse, GetAllLanguages } from "../../Hooks/request";
import { Alert, Snackbar } from "@mui/material";

const steps = ["Title", "Discription", "General Information", "List"];
const theme = createTheme();

export default function AddCourse(props) {

    const [Languages, setLanguages] = React.useState([]);

    const [activeStep, setActiveStep] = React.useState(0);
    const [title, settitle] = React.useState([]);
    const [discription, setdiscription] = React.useState([]);
    const [goals, setgoals] = React.useState([]);
    const [lecturer, setlecturer] = React.useState([]);
    const [courselanguage, setcourselanguage] = React.useState("");
    const [courselevel, setcourselevel] = React.useState("");

    const [photo1, setphoto1] = React.useState(null);
    const [photo2, setphoto2] = React.useState(null);
    const [photo3, setphoto3] = React.useState(null);
    const [photo4, setphoto4] = React.useState(null);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const [alerterroopensnackbaropen, setalerterroopensnackbaropen] = React.useState(false);

    const [newcourse, setnewcourse] = React.useState(null);

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
                }
            }
            else {
                setalerterroopensnackbaropen(true);
            }

        }
        get();
    }, []);

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <AddTitle
                        title={title}
                        settitle={settitle}
                        Languages={Languages}
                    ></AddTitle>
                );
            case 1:
                return (
                    <Discription
                        discription={discription}
                        setdiscription={setdiscription}
                        Languages={Languages}
                    ></Discription>
                );
            // case 2:
            //     return (
            //         <Goals
            //             goals={goals}
            //             setgoals={setgoals}
            //             Languages={Languages}
            //         ></Goals>
            //     );
            // case 3:
            //     return (
            //         <Lecturer
            //             lecturer={lecturer}
            //             setlecturer={setlecturer}
            //             Languages={Languages}
            //         ></Lecturer>
            //     );
            case 2:
                return (
                    <AddGeneral
                        courselanguage={courselanguage}
                        setcourselanguage={setcourselanguage}
                        courselevel={courselevel}
                        setcourselevel={setcourselevel}
                        Languages={Languages}
                    ></AddGeneral>
                );
            // case 5:
            //     return (
            //         <AddPhotos
            //             photo1={photo1}
            //             setphoto1={setphoto1}
            //             photo2={photo2}
            //             setphoto2={setphoto2}
            //             photo3={photo3}
            //             setphoto3={setphoto3}
            //             photo4={photo4}
            //             setphoto4={setphoto4}
            //         ></AddPhotos>
            //     );
            case 3:
                return (
                    <Show
                        newcourse={newcourse}
                        setnewcourse={setnewcourse}
                        Languages={Languages}
                    ></Show>
                );
            default:
                throw new Error("Unknown step");

        }
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            if (title.length === Languages.length) {

                console.log({ title });

                setActiveStep(activeStep + 1);
            } else {

            }
        }
        if (activeStep === 1) {
            if (discription.length === Languages.length) {

                console.log({ discription });
                setActiveStep(activeStep + 1);
            }
            else {
                // setalertpersonalopen(true);
            }
        }
        // if (activeStep === 2) {
        //     if (goals.length > 0) {

        //         console.log({ goals });
        //         setActiveStep(activeStep + 1);
        //     }
        //     else {
        //         // setalertpersonalopen(true);
        //     }
        // }
        // if (activeStep === 3) {
        //     if (lecturer.length > 0) {
        //         console.log({ lecturer });
        //         setActiveStep(activeStep + 1);
        //     } else {
        //         // setalertpersonalopen(true);
        //     }
        // }
        if (activeStep === 2) {
            if (courselanguage !== "" && courselevel !== "") {
                const newobj = Object.assign({}, {
                    Titles: title,
                    Discriptions: discription,
                    courselanguage: courselanguage,
                    courselevel: courselevel,

                });

                console.log({ newobj });

                setnewcourse(newobj);
                setActiveStep(activeStep + 1);
            }
            else {
                // setalertpersonalopen(true);
            }
        }
        // if (activeStep === 5) {
        //     if (photo1 !== null && photo2 !== null && photo3 !== null && photo4 !== null) {
        //         console.log({ photo1 });
        //         console.log({ photo2 });
        //         console.log({ photo3 });
        //         console.log({ photo4 });
        //         const newobj = Object.assign({}, {
        //             Titles: title,
        //             Discriptions: discription,
        //             Goals: goals,
        //             Lecturers: lecturer,
        //             courselanguage: courselanguage,
        //             courselevel: courselevel,
        //             Image1: photo1,
        //             Image2: photo2,
        //             Image3: photo3,
        //             Image4: photo4
        //         });

        //         console.log({ newobj });

        //         setnewcourse(newobj);
        //         setActiveStep(activeStep + 1);
        //     }
        //     else {
        //         // setalertpersonalopen(true);
        //     }
        // }
        if (activeStep === 3) {

            const response = await AddNewCourse(newcourse);

            if (response.done) {

                setsnackbaropen(true);
                setActiveStep(activeStep + 1);
            }
            else {
                seterrorsnackbaropen(true);
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleregisterBack = () => {

        settitle([]);
        setdiscription([]);
        setcourselanguage("");
        setcourselevel("");
        setnewcourse(null);

        setgoals([]);
        setlecturer([]);
        setphoto1(null);
        setphoto2(null);
        setphoto3(null);
        setphoto4(null);
        setActiveStep(0);

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
        setalerterroopensnackbaropen(false);
    };

    return (

        <React.Fragment >

            {<Container component="div"  sx={{  }}>

                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        ADD New Course
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, color: "#a3a3a3" }} >
                        {steps.map((label) => (
                            <Step key={label} sx={{ color: "#a3a3a3" }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you Rigistering New Course Successful.
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={handleregisterBack} color="firr" sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} variant="contained" color="firr" sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? "Register Course" : "Next"}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>

            </Container>}

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Registered A New Course
                </Alert>
            </Snackbar>

            <Snackbar open={alerterroopensnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Please Try Again
                </Alert>
            </Snackbar>

        </React.Fragment>

    );

}