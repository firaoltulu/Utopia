import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import {
    Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia,
    Fade, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu,
    MenuItem, Pagination, Popper, Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Hidden } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { CartStorageSet, CartStorageGet } from "./library/localstorage";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

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
];

const CartDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    zIndex: theme.zIndex.modal + 2,
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CartDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => "black",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function DashBoard(props) {
    const { selectlanguage, languages, courseselectindex, setcourseselectindex } = props;

    const PopperarrowRef = React.useRef(null);

    const navigate = useNavigate();

    const [courseanchorEl, setCourseAnchorEl] = React.useState(null);
    const [localarrayPopOver, setlocalarrayPopOver] = React.useState(null);
    const [DialogCartopen, setDialogCartopen] = React.useState(false);



    const OnlineCourseopen = Boolean(courseanchorEl);
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const handlecourseMouseOverMenuOpen = (event, localarray) => {

        setCourseAnchorEl(event.currentTarget);
        setlocalarrayPopOver(localarray);
    };

    const handlecourseMouseOverMenuClose = () => {
        setCourseAnchorEl(null);
        setlocalarrayPopOver(null);
    };

    const handlecourseonClick = (event, index) => {
        setcourseselectindex(index);
        setlocalarrayPopOver(null);
        handlecourseMouseOverMenuClose();
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

        setDialogCartopen(true);

    }

    const handleDialogCartClose = (event) => {

        setDialogCartopen(false);

    }

    return (
        <Grid container justifyContent="center" alignItems="stretch" sx={{ flexGrow: 1, }}>

            <Grid item xs={12} >
                <Paper variant="outlined" square elevation={24}>
                    <Grid container>
                        <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={12} sm={4} sx={{ marginLeft: matchesMD ? "2em" : "6em", marginRight: "2em", paddingTop: "8.5em", paddingBottom: "9em" }}>
                                    <Grid container>
                                        <Grid item xs={12}>

                                            <Typography variant="h3">Learn without limits</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Start, switch, or advance your career with more than
                                                200 courses, Professional Certificates,
                                                and degrees from Top universities and companies.</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container columnSpacing={1}>
                                                <Grid item xs={4}>
                                                    <Button fullWidth size="small" variant="contained" color="firr" sx={{ minHeight: "5em" }}>
                                                        <Typography>Join For Free</Typography>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Button fullWidth size="small" variant="outlined" color="secondary" sx={{ minHeight: "5em", }}>
                                                        <Typography>Try Utopia For </Typography>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Hidden smDown>
                                    <Grid item xs={12} sm={4} sx={{ marginTop: "2em", marginBottom: "2em" }}>
                                        <img src="./africa students.jpg"></img>

                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}  >
                <Paper sx={{ padding: "2em" }}>
                    <Grid container>

                        <Grid item xs={12} sx={12} >
                            <Typography variant="h4">A broad selection of courses</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} sx={{ marginTop: "2em" }}>
                            <Typography variant="subtitle1">Choose from 200 online video courses with
                                new additions published every month</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} sx={{ marginTop: "1em" }}>
                            <Paper sx={{}}>
                                <Grid container sx={{ padding: "2em" }}>

                                    <Grid item xs={12} sx={12} >
                                        <Typography variant="h6">Expand your career opportunities with Us
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sx={12} >

                                        <Grid container columnSpacing={1} onMouseLeave={handlecourseMouseOverMenuClose} >

                                            {content.map((row, index) => {
                                                var localarray = {};
                                                var Createpoper = true;
                                                try {

                                                    localarray = row[languages[selectlanguage]];
                                                } catch (e) {
                                                    localarray = null;
                                                }

                                                return (
                                                    <Grid item xs={12} sd={6} md={4} key={`Home-Page-Grid-ViewContent-index-${index}`}

                                                        sx={{
                                                            maxHeight: "30em", marginTop: "2em",
                                                            marginBottom: "2em",
                                                        }} >
                                                        {localarray !== null && <Card
                                                            onMouseEnter={(event) => { handlecourseMouseOverMenuOpen(event, localarray) }}
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

                                            })};

                                            <Hidden mdDown>

                                                {localarrayPopOver !== null && <Popper
                                                    anchorEl={courseanchorEl}
                                                    open={OnlineCourseopen}
                                                    onMouseLeave={handlecourseMouseOverMenuClose}
                                                    placement="right-start"
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
                                                            // options: {
                                                            //     element: PopperarrowRef,
                                                            // },
                                                        },

                                                    ]}
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={0}>
                                                            {localarrayPopOver !== null && <Card sx={{ border: '1px solid', maxWidth: 345 }}>
                                                                <CardHeader
                                                                    title={localarrayPopOver.Title}
                                                                    subheader="">
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <Grid container>

                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item xs={4}>
                                                                                    <Typography variant="subtitle2" color="text.secondary">{localarrayPopOver.Total_Hours} Total Hours</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Typography variant="subtitle2" color="text.secondary">{localarrayPopOver.ForWho}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={4}>
                                                                                    <Typography variant="subtitle2" color="text.secondary">{localarrayPopOver.Course_Languages}</Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid item xs={12}>
                                                                            <Typography variant="subtitle2" color="text.secondary">{localarrayPopOver.Discription}</Typography>
                                                                        </Grid>

                                                                        <Grid item xs={12}>
                                                                            <List dense={true}>
                                                                                {localarrayPopOver.Goals.map((goal, index) => {
                                                                                    if (index > 3) {
                                                                                        return (<React.Fragment></React.Fragment>);
                                                                                    }
                                                                                    else {
                                                                                        return (
                                                                                            <ListItem key={`DashBoard-course-popover-list-item-${index}`}>
                                                                                                <ListItemIcon>
                                                                                                    <CheckIcon fontSize="small" />
                                                                                                </ListItemIcon>
                                                                                                <ListItemText
                                                                                                    primary={goal}

                                                                                                />
                                                                                            </ListItem>
                                                                                        );
                                                                                    }
                                                                                })
                                                                                }
                                                                            </List>
                                                                        </Grid>

                                                                    </Grid>

                                                                </CardContent>

                                                                <CardActions disableSpacing>
                                                                    {CartStorageGet() !== null && CartStorageGet().listofcourseId.includes(localarrayPopOver.contentID) &&
                                                                        <Button fullWidth variant="contained"
                                                                            color="firr2"
                                                                            sx={{ color: "white" }}
                                                                            component={Link} to="/cart"
                                                                            endIcon={<ShoppingCartOutlinedIcon />}
                                                                        >
                                                                            Go To Cart
                                                                        </Button>
                                                                    }

                                                                    {CartStorageGet() !== null && !CartStorageGet().listofcourseId.includes(localarrayPopOver.contentID) &&

                                                                        <Button fullWidth variant="contained"
                                                                            color="firr"
                                                                            sx={{ color: "white" }}
                                                                            onClick={(event) => { HandleAddToCart(event, localarrayPopOver) }}
                                                                            endIcon={<ShoppingCartOutlinedIcon />}
                                                                        >
                                                                            Add To Cart
                                                                        </Button>
                                                                    }

                                                                    {CartStorageGet() === null && <Button fullWidth variant="contained"
                                                                        color="firr"
                                                                        sx={{ color: "white" }}
                                                                        onClick={(event) => { HandleAddToCart(event, localarrayPopOver) }}
                                                                        endIcon={<ShoppingCartOutlinedIcon />}
                                                                    >
                                                                        Add To Cart
                                                                    </Button>
                                                                    }

                                                                </CardActions>

                                                            </Card>
                                                            }

                                                        </Fade>
                                                    )}
                                                </Popper>}
                                            </Hidden>

                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} sx={12}>
                                        <Box component={"div"} sx={{ textAlign: "center" }}>
                                            <Pagination count={10} color="firr" />
                                        </Box>

                                    </Grid>

                                </Grid>

                            </Paper>
                        </Grid>

                    </Grid>
                </Paper >
            </Grid >

            <Grid item xs={12}  >
                <Paper sx={{ padding: "2em" }}>
                    <Grid container>
                        <Grid item xs={12} sx={12}  >
                            <Typography variant="h4">Top Categories</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} sx={{ marginTop: "1em" }}>

                            <Grid container columnSpacing={1} >

                                <Grid item xs={12} sx={6} md={4} >
                                    <Card sx={{
                                        marginBottom: "1em",
                                        '&:hover': {
                                            backgroundColor: alpha("#000000", 0.25),
                                            cursor: "pointer"
                                        },
                                    }}>
                                        <CardMedia sx={{ height: 140 }}
                                            image="./africastudents.jpg"
                                            title="green iguana">
                                        </CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Design
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sx={6} md={4} >
                                    <Card sx={{ marginBottom: "1em" }}>
                                        <CardMedia sx={{ height: 140 }}
                                            image="./africastudents.jpg"
                                            title="green iguana">
                                        </CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Development
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sx={6} md={4} >
                                    <Card sx={{ marginBottom: "1em" }}>
                                        <CardMedia sx={{ height: 140 }}
                                            image="./africastudents.jpg"
                                            title="green iguana">
                                        </CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Marketing
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sx={6} md={4} >
                                    <Card sx={{ marginBottom: "1em" }}>
                                        <CardMedia sx={{ height: 140 }}
                                            image="./africastudents.jpg"
                                            title="green iguana">
                                        </CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                IT and Software
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sx={6} md={4} >
                                    <Card sx={{ marginBottom: "1em" }}>
                                        <CardMedia sx={{ height: 140 }}
                                            image="./africastudents.jpg"
                                            title="green iguana">
                                        </CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Personal Development
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>



                            </Grid>

                        </Grid>

                    </Grid>
                </Paper >
            </Grid >


            <CartDialog
                onClose={handleDialogCartClose}
                aria-labelledby="customized-dialog-title"
                open={DialogCartopen}
            >
                <CartDialogTitle id="customized-dialog-title" onClose={handleDialogCartClose}>
                    Added to Cart
                </CartDialogTitle>
                <DialogContent >
                    <Grid container>
                        <Grid item xs={12} sx={{}}>
                            <Grid container>
                                <Grid item xs={1} sx={{ textAlign: "center", verticalAlign: "center" }}>
                                    <CheckCircleRoundedIcon color="firr" fontSize="large" sx={{}}></CheckCircleRoundedIcon>
                                </Grid>

                                <Grid item xs={11}>
                                    <Card elevation={0} sx={{ display: 'flex' }}>

                                        <CardMedia
                                            component="img"
                                            sx={{ minwidth: 151, maxWidth: 151 }}
                                            image="/afircastudents.jpg"
                                            alt="Live from space album cover"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h6">
                                                    Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2023]
                                                    firaol
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" component="div">
                                                    firaol tulu
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'end', pl: 1, pb: 1 }}>
                                                <Button fullWidth variant="contained" color="secondary" > Go To Cart</Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        {CartStorageGet() !== null && <Grid item xs={12} sx={{ border: "1px solid", marginTop: "2em", p: "1em" }}>
                            <Typography variant="h6" >
                                Cart Items
                            </Typography>
                            <Grid container>
                                {CartStorageGet().cart.map((row, index) => {

                                    return (
                                        <Grid item xs={12} sx={{ mt: "1em" }} key={`DashBoard-course-Dialog-DialogContent-list-item-${index}`}>

                                            <Card elevation={0} sx={{ display: 'flex' }}>

                                                <CardMedia
                                                    component="img"
                                                    sx={{ minwidth: 151, maxWidth: 151 }}
                                                    image="/afircastudents.jpg"
                                                    alt="Live from space album cover"
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h6">
                                                            {row.Title}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" component="div">
                                                            {row.Author}
                                                        </Typography>
                                                    </CardContent>
                                                    {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                                        <IconButton aria-label="previous">
                                                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                                        </IconButton>
                                                        <IconButton aria-label="play/pause">
                                                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                                        </IconButton>
                                                        <IconButton aria-label="next">
                                                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                                        </IconButton>
                                                    </Box> */}
                                                </Box>
                                            </Card>

                                        </Grid>
                                    );
                                })}
                            </Grid>

                        </Grid>}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogCartClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </CartDialog>

        </Grid >
    );
}