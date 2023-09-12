import React from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
    Box, Button, Card, CardActions, CardContent, CardMedia,
    Fade, Grid, Hidden, IconButton, List, ListItem, ListItemAvatar,
    ListItemIcon, ListItemText, Pagination, Paper, Popper,
    Tab, Tabs, Typography
} from "@mui/material";
import { useTheme, styled, alpha } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { CartStorageSet, CartStorageGet } from "./library/localstorage";


const coursecontent =
{
    English: {
        contentID: "0",
        Title: "The Modern Python 3 BootCamp",
        AddedDate: "2022/2/2",
        UpdatedDate: ["2023/2/2", "2023/2/3", "2023/2/4", "2023/2/5"],
        ForWho: "All Levels",
        Author: "Firaol tulu",
        price: 16.33,
        Views: 400,
        Rating: 4.7,
        Course_Languages: "English",
        Discription: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
        Goals: ["You will learn how to leverage the power of Python to solve tasks.",
            "You will build games and programs that use Python libraries.",
            "You will build games and programs that use Python libraries.",
            "You will build games and programs that use Python libraries.",
            "You will build games and programs that use Python libraries.",
            "You will build games and programs that use Python libraries.",
            "You will build games and programs that use Python libraries.",
            "You will be able to use Python for your own work problems or personal projects."],
        Modules: 3,
        lectures: 87,
        Total_Hours: 20,
        Contents: [
            {
                Title: "Introduction",
                lectures: [
                    {
                        Title: "what is this Course",
                        Discription: "A brief overview of what you're going to learn from this course.",
                        Content_type: "video/mp4",
                        Content_Length: 80,
                        Isfree: true,
                    },
                    {
                        Title: "About Me",
                        Discription: "Get to know your instructor, his educational background, work experience and interests outside programming.",
                        Content_type: "video/mp4",
                        Content_Length: 100,
                        Isfree: false,
                    },
                    {
                        Title: "A Note On Taking this Course",
                        Discription: "",
                        Content_type: "video/mp4",
                        Content_Length: 14,
                        Isfree: false,
                    },
                    {
                        Title: "Asking Questions",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 1,
                        Isfree: false,
                    },
                    {
                        Title: "Before You Get Started",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 5,
                        Isfree: false,
                    },
                ],
                Assessment: [
                    {
                        Title: "Practice Quiz:",
                        Discription: "ReSharper is a commercial plug-in for Visual Studio that helps you write code faster with less effort. If you're a student or work on open-source projects, you can get a free license.",
                        Content_type: "text/plain",
                        Content_Length: 28,
                    },

                ],
                Summary: [
                    {
                        Title: "Summary:",
                        Discription: "A quick wrap of what you learned in this section and what is coming next..",
                        Content_type: "video/mp4",
                        Content_Length: 73,
                        Isfree: false,
                    },
                ],
            },
            {
                Title: "Introduction to C# and .NET Framework",
                lectures: [
                    {
                        Title: "Introduction",
                        Discription: "A brief overview of what you're going to learn in this section.",
                        Content_type: "video/mp4",
                        Content_Length: 55,
                        Isfree: false,
                    },
                    {
                        Title: "C# vs .NET",
                        Discription: "What is the difference between C# and .NET? That's a common question amongst beginners that is answered in this lecture.",
                        Content_type: "video/mp4",
                        Content_Length: 53,
                        Isfree: false,
                    },
                    {
                        Title: "What is CLR?",
                        Discription: "Learn about the run-time environment of .NET applications and how it is different from native C and C++ applications.",
                        Content_type: "video/mp4",
                        Content_Length: 140,
                        Isfree: false,
                    },
                    {
                        Title: "Architecture of .NET Applications",
                        Discription: "Learn about the building blocks of .NET applications: classes, namespaces, assemblies",
                        Content_type: "video/mp4",
                        Content_Length: 162,
                        Isfree: false,
                    },
                    {
                        Title: "Getting Visual Studio",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 1,
                        Isfree: false,
                    },
                    {
                        Title: "Our First C# Application",
                        Discription: "Write your first C# program to get a feel for the language.",
                        Content_type: "video/mp4",
                        Content_Length: 593,
                        Isfree: false,
                    },
                    {
                        Title: "What is ReSharper?",
                        Discription: "ReSharper is a commercial plug-in for Visual Studio that helps you write code faster with less effort. If you're a student or work on open-source projects, you can get a free license.",
                        Content_type: "text/plain",
                        Content_Length: 28,
                        Isfree: false,
                    },
                ],
                Assessment: [
                    {
                        Title: "Practice Quiz: Fundamentals of C# and .NET",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 28,
                    },
                ],
                Summary: [
                    {
                        Title: "Summary:",
                        Discription: "A quick wrap of what you learned in this section and what is coming next..",
                        Content_type: "video/mp4",
                        Content_Length: 73,
                        Isfree: false,
                    },
                ],
            },
            {
                Title: "Primitive Types and Expressions",
                lectures: [
                    {
                        Title: "Introduction",
                        Discription: "A quick overview of what you're going to learn in this section.",
                        Content_type: "video/mp4",
                        Content_Length: 26,
                        Isfree: true,
                    },
                    {
                        Title: "Variables and Constants",
                        Discription: "What is overflowing and the effect of checked keyword in C#",
                        Content_type: "video/mp4",
                        Content_Length: 523,
                        Isfree: false,
                    },
                    {
                        Title: "Overflowing",
                        Discription: "Learn about the run-time environment of .NET applications and how it is different from native C and C++ applications.",
                        Content_type: "video/mp4",
                        Content_Length: 133,
                        Isfree: false,
                    },
                    {
                        Title: "Scope",
                        Discription: "Where does a variable or constant has meaning? That's determined by the scope.",
                        Content_type: "video/mp4",
                        Content_Length: 62,
                        Isfree: false,
                    },
                    {
                        Title: "Demo: Variables and Constants",
                        Discription: "A demo of declaring various variables and constants.",
                        Content_type: "video/mp4",
                        Content_Length: 687,
                        Isfree: false,
                    },
                    {
                        Title: "Type Conversion",
                        Discription: "Various kinds of type conversion: implicit, explicit and conversion between non-compatible types using the Convert class.",
                        Content_type: "video/mp4",
                        Content_Length: 616,
                        Isfree: false,
                    },
                    {
                        Title: "Operators",
                        Discription: "List of arithmetic, comparison, assignment, logical and bitwise operators.",
                        Content_type: "video/mp4",
                        Content_Length: 252,
                        Isfree: false,
                    },
                    {
                        Title: "What are Logical Operations?",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 2,
                        Isfree: false,
                    },
                    {
                        Title: "Demo: Operators",
                        Discription: "Demonstration of using operators to build expressions.",
                        Content_type: "video/mp4",
                        Content_Length: 381,
                        Isfree: false,
                    },
                    {
                        Title: "Comments",
                        Discription: "Different types of commenting notations in C#.",
                        Content_type: "video/mp4",
                        Content_Length: 103,
                        Isfree: false,
                    },
                ],
                Assessment: [
                    {
                        Title: "Primitive Types and Expressions",
                        Discription: "",
                        Content_type: "text/plain",
                        Content_Length: 6,
                    },
                ],
                Summary: [
                    {
                        Title: "Summary:",
                        Discription: "A quick wrap of what you learned in this section and what is coming next..",
                        Content_type: "video/mp4",
                        Content_Length: 35,
                        Isfree: false,
                    },
                ],

            },
        ],
    },
};

const content = [
    {
        English: {
            contentID: "0",
            Title: "The Modern Python 3 BootCamp",
            AddedDate: "2022/2/2",
            UpdatedDate: ["2023/2/2", "2023/2/3", "2023/2/4", "2023/2/5"],
            ForWho: "All Levels",
            Author: "Firaol tulu",
            price: 16.33,
            Views: 400,
            Rating: 4.7,
            Total_Hours: 20,
            Course_Languages: "English",
            Discription: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
            Goals: ["You will learn how to leverage the power of Python to solve tasks.",
                "You will build games and programs that use Python libraries.",
                "You will be able to use Python for your own work problems or personal projects."],

        }
    },
    {
        English: {
            contentID: "1",
            Title: "Automate the boring Stuff With Python Programming",
            AddedDate: "2023/2/2",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 100,
            Rating: 4.6,
            Total_Hours: 9.5,
            Course_Languages: "English",
            Discription: "A practical programming course for office workers, academics, and administrators who want to improve their productivity.",
            Goals: ["Automate tasks on their computer by writing simple Python programs.",
                "Write programs that can do text pattern recognition with regular expressions.",
                "Programmatically generate and update Excel spreadsheets."],

        }
    },
    {
        English: {
            contentID: "2",
            Title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "3",
            Title: "The Modern Python 3 BootCamp",
            AddedDate: "2022/2/2",
            UpdatedDate: ["2023/2/2", "2023/2/3", "2023/2/4", "2023/2/5"],
            ForWho: "All Levels",
            Author: "Firaol tulu",
            price: 16.33,
            Views: 400,
            Rating: 4.7,
            Total_Hours: 20,
            Course_Languages: "English",
            Discription: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
            Goals: ["You will learn how to leverage the power of Python to solve tasks.",
                "You will build games and programs that use Python libraries.",
                "You will be able to use Python for your own work problems or personal projects."],

        }
    },
    {
        English: {
            contentID: "4",
            Title: "Automate the boring Stuff With Python Programming",
            AddedDate: "2023/2/2",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 100,
            Rating: 4.6,
            Total_Hours: 9.5,
            Course_Languages: "English",
            Discription: "A practical programming course for office workers, academics, and administrators who want to improve their productivity.",
            Goals: ["Automate tasks on their computer by writing simple Python programs.",
                "Write programs that can do text pattern recognition with regular expressions.",
                "Programmatically generate and update Excel spreadsheets."],

        }
    },
    {
        English: {
            contentID: "5",
            Title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "6",
            Title: "Machine Learning A-Z™A-Z™A-Z™A-Z™A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "7",
            Title: "MachineMachineMachineMachine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "8",
            Title: "Machine LearningLearningLearningLearningLearning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "9",
            Title: "Machine LearningLearningLearningLearningLearning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "10",
            Title: "Machine LearningLearningLearningLearningLearning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "11",
            Title: "Machine LearningLearningLearningLearningLearning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
    {
        English: {
            contentID: "12",
            Title: "Machine Learning Learning Learning Learning  Learning Learning Learning Learning Learning Learning Learning A-Z™: AI, Python & R + ChatGPT Bonus [2023]",
            AddedDate: "2023/1/1",
            UpdatedDate: ["2023/11/2", "2023/12/3", "2023/22/4", "2023/11/5"],
            ForWho: "All Levels",
            Author: "Miki Ha",
            price: 16.99,
            Views: 50,
            Rating: 4.5,
            Total_Hours: 42.5,
            Course_Languages: "English",
            Discription: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
            Goals: ["Master Machine Learning on Python & R",
                "Have a great intuition of many Machine Learning models",
                "Make accurate predictions"],

        }
    },
];

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid`,

    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: "1em" }}>
                    <Grid container>
                        {children}
                    </Grid>
                </Box>
            )}
        </div>
    );
}

export default function Course(props) {

    const { courseselectindex, languages, selectlanguage } = props;
    const params = useParams();
    const theme = useTheme();

    const navigate = useNavigate();

    const ref = React.useRef(null);

    const [localcourse, setlocalCourse] = React.useState(null);
    const [courseanchorEl, setcourseanchorEl] = React.useState(null);
    const [openPopper, setopenPopper] = React.useState(false);
    const [tabvalue, settabValue] = React.useState(0);
    const [expandedAccordion, setExpandedAccordion] = React.useState(0);
    const [paginationCount, setpaginationCount] = React.useState(1);
    const [reload, setreload] = React.useState(false);


    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesupMD = useMediaQuery(theme.breakpoints.up('md'));



    React.useEffect(() => {
        const element = document.querySelector('#firrrrrrrrr');
        setcourseanchorEl(element);
        setopenPopper(true);
    }, []);

    React.useEffect(() => {
        var localarray;
        try {
            localarray = coursecontent[languages[selectlanguage]];
        } catch (e) {
            localarray = null;
        }
        if (localarray) {
            setlocalCourse(localarray);

        } else {
            setlocalCourse(null);
        }
    }, [selectlanguage, languages]);



    const handleTabChange = (event, newValue) => {
        settabValue(newValue);
    };

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpandedAccordion(newExpanded ? panel : false);
    };

    const handleViewFreeCourse = (event, Moduleindex, Lectureindex) => {
        if (localcourse.Contents[Moduleindex].lectures[Lectureindex].Isfree) {

        } else {

        }

    }

    const handlePagination = (event, number) => {
        console.log({ number });
        setpaginationCount(number);
    }

    const handlecourseonClick = (event, index) => {
        // setcourseselectindex(index);
        // setlocalarrayPopOver(null);
        // handlecourseMouseOverMenuClose();
        var contentID;
        try {
            const row = content[index];
            contentID = row[languages[selectlanguage]].contentID;
        } catch (e) {
            contentID = "";
        }
        if (contentID !== "") {
            navigate(`/course/${contentID}`);

        }
        else {

        }

    }

    const HandleAddToCart = (event, localarrayPopOver) => {

        const ret = CartStorageSet(localarrayPopOver);


    }

    return (
        <Grid container>

            <Grid item xs={12} sx={{ padding: matchesMD ? "1em" : "2em", backgroundColor: theme.palette.firr.main }}>
                <Grid container sx={{ marginLeft: "1em", marginRight: "1em", }}>

                    <Grid item xs={12} md={12}>
                        <Hidden mdUp>
                            <Card sx={{ border: '1px solid', }}>
                                <Box sx={{ display: 'flex', position: "absolute", alignItems: 'center', pl: "40%", pt: "3em", }}>

                                    <IconButton aria-label="play/pause">
                                        <PlayCircleFilledWhiteIcon fontSize="large" sx={{ height: 38, width: 38 }} />
                                    </IconButton>

                                </Box>
                                <CardMedia
                                    component={"img"}
                                    sx={{
                                        maxHeight: "20em",
                                        minHeight: "12em",
                                        borderBottom: "1px solid",
                                        '&:hover': {
                                            cursor: "pointer"
                                        },
                                    }}
                                    src="/africastudents.jpg"
                                    title="green iguana"
                                />

                            </Card>
                        </Hidden>
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} sx={{ borderRight: '1px solid', color: "white" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography></Typography>
                            </Grid>


                            <Grid item xs={12} sx={{}}>
                                <Typography variant="h5"> C# Basics for Beginners: Learn C# Fundamentals by Coding</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Master C# fundamentals in 6 hours - The most popular
                                    course with 50,000+ students, packed with tips and exercises!Master C# fundamentals in 6 hours - The most popular
                                    course with 50,000+ students, packed with tips and exercises!
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Rating: 4.5
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Created by: firaoltulu
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Created by: firaoltulu
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} sx={{ padding: "2em", }} >

                        <Box id={"firrrrrrrrr"} className={"firrrrrrrrr"} ref={ref}>

                        </Box>

                        {<Popper
                            anchorEl={courseanchorEl}
                            open={openPopper && matchesupMD}
                            placement="top"
                            transition

                            modifiers={[
                                {
                                    name: 'flip',
                                    enabled: true,
                                    options: {
                                        altBoundary: true,
                                        rootBoundary: 'document',
                                        padding: 8,
                                    },
                                },
                                {
                                    name: 'preventOverflow',
                                    enabled: true,
                                    options: {
                                        altAxis: true,
                                        altBoundary: true,
                                        tether: false,
                                        rootBoundary: 'viewport',
                                        padding: 8,
                                    },
                                },
                                {
                                    name: 'arrow',
                                    enabled: true,
                                    options: {
                                        //  element: arrowRef,
                                    },
                                },
                            ]}
                        >
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={0}>

                                    <Card sx={{ border: '1px solid', maxWidth: 345 }}>
                                        <Box sx={{ display: 'flex', position: "absolute", alignItems: 'center', pl: "40%", pt: "3em", }}>

                                            <IconButton aria-label="play/pause">
                                                <PlayCircleFilledWhiteIcon fontSize="large" sx={{ height: 38, width: 38 }} />
                                            </IconButton>

                                        </Box>
                                        <CardMedia
                                            component={"img"}
                                            sx={{
                                                maxHeight: "20em",
                                                minHeight: "12em",
                                                borderBottom: "1px solid",
                                                '&:hover': {
                                                    cursor: "pointer"
                                                },
                                            }}
                                            src="/africastudents.jpg"
                                            title="green iguana"
                                        />

                                        <CardContent
                                            sx={{
                                                paddingTop: "0"
                                            }}
                                        >
                                            <Tabs
                                                value={tabvalue}
                                                onChange={handleTabChange}
                                                textColor="secondary"
                                                variant="fullWidth"
                                                indicatorColor="secondary"
                                                aria-label="Courses-popper-tabs"
                                            >
                                                <Tab value={0} label="Personal" id="Courses-popper-tabs-tab-0"
                                                    aria-controls="Courses-popper-tabs-tab-aria-controls-0" />
                                                <Tab value={1} label="For Company" id="Courses-popper-tabs-tab-1"
                                                    aria-controls="Courses-popper-tabs-tab-aria-controls-1" />

                                            </Tabs>


                                            <TabPanel value={tabvalue} index={0} >
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        Subscribe to Utopia Personal Plan
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1">
                                                        Get this course, plus 8,000+ of our top-rated courses, with Personal Plan.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ marginTop: "2em" }}>
                                                    <Typography variant="body1">
                                                        123.22 USD
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ marginTop: "2em" }}>
                                                    {CartStorageGet() !== null && CartStorageGet().listofcourseId.includes(params.courseID) &&
                                                        <Button fullWidth variant="contained"
                                                            color="firr2"
                                                            sx={{ color: "white" }}
                                                            component={Link} to="/cart"
                                                            endIcon={<ShoppingCartOutlinedIcon />}
                                                        >
                                                            Go To Cart
                                                        </Button>
                                                    }

                                                    {CartStorageGet() !== null && !CartStorageGet().listofcourseId.includes(params.courseID) &&

                                                        <Button fullWidth variant="contained"
                                                            color="firr"
                                                            sx={{ color: "white" }}
                                                            onClick={(event) => { HandleAddToCart(event, localcourse) }}
                                                            endIcon={<ShoppingCartOutlinedIcon />}
                                                        >
                                                            Add To Cart
                                                        </Button>
                                                    }

                                                    {CartStorageGet() === null && <Button fullWidth variant="contained"
                                                        color="firr"
                                                        sx={{ color: "white" }}
                                                        onClick={(event) => { HandleAddToCart(event, localcourse) }}
                                                        endIcon={<ShoppingCartOutlinedIcon />}
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                    }
                                                </Grid>

                                                <Grid item xs={12} sx={{ marginTop: "1em", textAlign: "center" }}>
                                                    <Typography variant="caption">
                                                        30-Day Money-Back Guarantee
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sx={{ marginTop: "1em", textAlign: "center" }}>
                                                    <Typography variant="caption">
                                                        Full Lifetime Access
                                                    </Typography>
                                                </Grid>


                                            </TabPanel>

                                            <TabPanel value={tabvalue} index={1} >

                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        Subscribe to Utopia For Company Plan
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1">
                                                        Get this course, plus 8,000+ of our top-rated courses, with Company Plan.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ marginTop: "2em" }}>
                                                    <Button fullWidth variant="contained" color="firr" sx={{ color: "white" }}>
                                                        Try Utopia For Company
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sx={{ marginTop: "2em", textAlign: "center" }}>
                                                    <Typography variant="caption">
                                                        For teams of 5 or more users
                                                    </Typography>
                                                </Grid>



                                            </TabPanel>

                                        </CardContent>
                                    </Card>

                                </Fade>
                            )}
                        </Popper>}

                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={7} sx={{ margin: "2em" }}>
                <Grid container sx={{ marginRight: "1em", border: '1px solid', borderRadius: "1em" }}>
                    {localcourse !== null && <Grid item xs={12} sm={12} md={12} sx={{ padding: "1em", }}>
                        <Grid container>

                            <Grid item xs={12} sx={{}}>
                                <Typography variant="h5">What you'll learn</Typography>
                            </Grid>

                            <Grid item xs={12} sx={{}}>

                                <List dense={true}>
                                    <Grid container>

                                        {localcourse.Goals.map((goal, index) => {

                                            if (matchesMD && index > 5) {
                                                return (<React.Fragment></React.Fragment>);
                                            }
                                            else {

                                                return (
                                                    <Grid item xs={12} md={6} sx={{}} key={`course-list-goals-${index}`}>
                                                        <ListItem >
                                                            <ListItemIcon>
                                                                <CheckIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={goal}
                                                            />
                                                        </ListItem>
                                                    </Grid>
                                                );
                                            }
                                        })
                                        }
                                    </Grid>
                                </List>

                            </Grid>
                        </Grid>
                    </Grid>}
                </Grid>
            </Grid >

            <Grid item xs={12} sm={12} md={7} sx={{ margin: "2em" }}>
                <Grid container sx={{ marginRight: "1em" }}>
                    <Grid item xs={12} sm={12} md={12} sx={{}}>
                        <Grid container>

                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <Typography variant="h5">Course content</Typography>
                            </Grid>

                            {localcourse !== null && <Grid item xs={12} sx={{}}>
                                <Typography variant="caption">{localcourse.Modules} Modules.</Typography>
                                <Typography variant="caption">{localcourse.lectures} lectures.</Typography>
                                <Typography variant="caption">{localcourse.Total_Hours} minutes total length.</Typography>
                            </Grid>}

                            {localcourse !== null &&
                                <Grid item xs={12} sx={{}}>
                                    {localcourse.Contents.map((content, Moduleindex) => {
                                        var Modulelength = 0;

                                        const detail = content.lectures.map((content, Lectureindex) => {
                                            var pattern = /video*/;
                                            var video = false;
                                            var lecturelength = content.Content_Length.toString();
                                            if (content.Content_type.match(pattern)) {
                                                video = true;
                                                Modulelength = Modulelength + content.Content_Length;
                                                var date = new Date(0);
                                                date.setSeconds(content.Content_Length);
                                                lecturelength = date.toISOString().substring(11, 19);
                                                // lecturelength = new Date(content.Content_Length * 1000).toString();
                                            }

                                            return (
                                                <ListItem key={`course-content-Accordion-AccordionSummary-Typography${Lectureindex}`}>
                                                    {video && <ListItemAvatar>
                                                        <OndemandVideoIcon fontSize="small"></OndemandVideoIcon>
                                                    </ListItemAvatar>}

                                                    {!video && <ListItemAvatar>
                                                        <TextSnippetIcon fontSize="small"></TextSnippetIcon>
                                                    </ListItemAvatar>}

                                                    <Grid container >
                                                        <Grid item xs={4}>
                                                            <Typography variant="caption"
                                                                onClick={(event) => { handleViewFreeCourse(event, Moduleindex, Lectureindex) }}
                                                                sx={{
                                                                    textDecoration: content.Isfree ? "underline" : "none",
                                                                    color: content.Isfree ? theme.palette.firr.main : "black",
                                                                    '&:hover': {
                                                                        cursor: content.Isfree ? "pointer" : "",
                                                                    },
                                                                }}>
                                                                {content.Title}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={5}></Grid>

                                                        <Grid item xs={3} sx={{ textAlign: "end" }}>
                                                            <Typography variant="caption">
                                                                {lecturelength}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                </ListItem>

                                            );
                                        })

                                        return (
                                            <Accordion expanded={expandedAccordion === Moduleindex} onChange={handleAccordionChange(Moduleindex)}
                                                key={`course-content-Accordion-${Moduleindex}`}>
                                                <AccordionSummary aria-controls="panel1d-content" id={`course-content-Accordion-header-${Moduleindex}`}>
                                                    <Grid container>
                                                        <Grid item xs={8}>
                                                            <Typography>{content.Title}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="caption">{content.lectures.length} lectures</Typography>
                                                            <Typography variant="caption"> . {Math.ceil(Modulelength / 60)} Min</Typography>

                                                        </Grid>
                                                    </Grid>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List dense={true}>
                                                        {detail}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        );

                                    })
                                    }

                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >

            <Grid item xs={12} sm={12} md={7} sx={{ margin: "2em", border: '1px solid' }} >
                <Paper sx={{ padding: "2em" }}>
                    <Grid container>

                        <Grid item xs={12} sx={12} >
                            <Typography variant="h4">Same Topic Courses</Typography>
                        </Grid>

                        {content.length > 0 && <Grid item xs={12} sm={12} sx={{ marginTop: "1em" }}>

                            <Grid container sx={{}}>

                                <Grid item xs={12} sx={12} >

                                    <Grid container columnSpacing={1}>
                                        {content.map((row, index) => {
                                            var localarray = {};

                                            try {
                                                localarray = row[languages[selectlanguage]];
                                            } catch (e) {
                                                localarray = null;
                                            }
                                            if (paginationCount > 1 && index < paginationCount * 6 && index >= ((paginationCount - 1) * 6)) {
                                                return (
                                                    <Grid item xs={12} sd={12} md={12} key={`Course-Page-Grid-View-same-topic-Content-index-${index}`}

                                                        sx={{
                                                            maxHeight: "30em", marginTop: "2em",
                                                            marginBottom: "2em",
                                                        }} >
                                                        {localarray !== null && <Card
                                                            onClick={(event) => { handlecourseonClick(event, index) }}
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: alpha("#000000", 0.25),
                                                                    cursor: "pointer"
                                                                },
                                                                height: 400
                                                            }}>
                                                            <CardMedia sx={{ height: 140 }}
                                                                image="./africastudents.jpg"
                                                                title="green iguana">
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {matchesupMD ? localarray.Title : (localarray.Title.substring(0, 90) + "...")}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {localarray.Author}
                                                                </Typography>
                                                                <Typography variant="h6" color="text.secondary">
                                                                    Rating: {localarray.Rating}<StarIcon fontSize="small" sx={{ color: "#FFAF06" }}></StarIcon>
                                                                </Typography>
                                                                <Typography variant="subtitle2" color="text.secondary">Views: ({localarray.Views})</Typography>
                                                                <Typography variant="h5">
                                                                    {localarray.price}
                                                                </Typography>
                                                            </CardContent>


                                                        </Card>}
                                                    </Grid>
                                                );
                                            }
                                            if (paginationCount === 1 && index < paginationCount * 6) {
                                                return (
                                                    <Grid item xs={12} sd={12} md={12} key={`Course-Page-Grid-View-same-topic-Content-index-${index}`}

                                                        sx={{

                                                            maxHeight: "30em",
                                                            marginTop: "2em",
                                                            marginBottom: "2em",
                                                        }} >
                                                        {localarray !== null && <Card
                                                            onClick={(event) => { handlecourseonClick(event, index) }}
                                                            sx={{
                                                                border: "1px solid",
                                                                '&:hover': {
                                                                    backgroundColor: alpha("#000000", 0.25),
                                                                    cursor: "pointer"
                                                                },
                                                                height: 400
                                                            }}>
                                                            <CardMedia sx={{ height: 140 }}
                                                                image="./africastudents.jpg"
                                                                title="green iguana">
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {localarray.Title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {localarray.Author}
                                                                </Typography>
                                                                <Typography variant="h6" color="text.secondary">
                                                                    Rating: {localarray.Rating}<StarIcon fontSize="small" sx={{ color: "#FFAF06" }}></StarIcon>
                                                                </Typography>
                                                                <Typography variant="subtitle2" color="text.secondary">Views: ({localarray.Views})</Typography>
                                                                <Typography variant="h5">
                                                                    {localarray.price}
                                                                </Typography>
                                                            </CardContent>


                                                        </Card>}
                                                    </Grid>
                                                );
                                            }
                                            return (<React.Fragment></React.Fragment>);

                                        })}
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={12}>
                                    <Box component={"div"} sx={{ textAlign: "center" }}>
                                        <Pagination count={Math.ceil(content.length / 6)} color="firr" onChange={handlePagination} />
                                    </Box>

                                </Grid>

                            </Grid>

                        </Grid>}

                    </Grid>
                </Paper >
            </Grid >

        </Grid >
        // 
    );
}