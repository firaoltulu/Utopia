import * as React from "react";
import { Route, Router, Routes, useParams, Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppBar, ButtonBase, CardMedia, Divider, Drawer, Grid, Toolbar } from "@mui/material";
import {
    Box, Button, Card, CardActions,
    CardContent, CardHeader, IconButton,
    List, ListItem, ListItemText, Tab, Typography, ListItemButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { alpha } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';


const Languages = [
    { languageID: "2", titleEnglish: "Amharic", title: "አማርኛ", addedDate: "2022/22/2" },
    { languageID: "1", titleEnglish: "English", title: "English", addedDate: "2022/22/2" },
    { languageID: "3", titleEnglish: "Oromifa", title: "Oromifa", addedDate: "2022/22/2" },
    { languageID: "4", titleEnglish: "Tigrna", title: "ትግረኛ", addedDate: "2022/22/2" },
];

const Level = [
    { levelID: "1", title: ["Beginner", "ጀማሪ", "", ""] },
    { levelID: "2", title: ["Intermediate", "መካከለኛ", "", ""] },
    { levelID: "3", title: ["senior", "ከፍተኛ", "", ""] },

];

const course = {

    Titles: [
        {
            title: "Python Programmming",
            languageID: "1"
        },
        {
            title: "Python Programmming",
            languageID: "2"
        },
        {
            title: "Python Programmming",
            languageID: "3"
        },
        {
            title: "Python Programmming",
            languageID: "4"
        }
    ],
    Discriptions: [
        {
            discription: "Discriptionnnnnnnnnnnnnnnn",
            languageID: "1"
        },
        {
            discription: "Discriptionnnnnnnnnnnnnnnn",
            languageID: "2"
        },
        {
            discription: "Discriptionnnnnnnnnnnnnnnn",
            languageID: "3"
        },
        {
            discription: "Discriptionnnnnnnnnnnnnnnn",
            languageID: "4"
        }
    ],
    Goals: [
        {
            goals: "goalssssssssssssss",
            languageID: "1"
        },
        {
            goals: "goalssssssssssssss",
            languageID: "2"
        },
        {
            goals: "goalssssssssssssss",
            languageID: "3"
        },
        {
            goals: "goalssssssssssssss",
            languageID: "4"
        }
    ],
    Lecturers: [
        {
            lecturerName: "firaol tulu",
            lecturerTitle: "Junior Developer",
            languageID: "1"
        },
        {
            lecturerName: "firaol tulu",
            lecturerTitle: "Junior Developer",
            languageID: "2"
        },
        {
            lecturerName: "firaol tulu",
            lecturerTitle: "Junior Developer",
            languageID: "3"
        },
        {
            lecturerName: "firaol tulu",
            lecturerTitle: "Junior Developer",
            languageID: "4"
        }
    ],
    courselanguage: "2",
    courselevel: "3",
    Image1: {},
    Image2: {},
    Image3: {},
    Image4: {}
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    width: '100% !important',
    height: 40,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
    '&:hover': {
        backgroundColor: '#C7C7C7',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#C7C7C7',
        borderColor: '#0062cc',
    },
    '&:focus': {
        boxShadow: 'none',
        borderleft: "2px solid #efefef",
        backgroundColor: '#C7C7C7',
        borderColor: '#0062cc',

    },
}));



const drawerWidth = 300;

export default function ManageCourse(props) {
    // const { setopendrawer } = props;
    const params = useParams();
    const theme = useTheme();



    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const [opendrawer, setopendrawer] = React.useState(false);

    const [editmenuINDEX, seteditmenuINDEX] = React.useState(-1);
    const [AnchorElcoursemenu, setAnchorElcoursemenu] = React.useState(null);
    const [editmenuopen, seteditmenuopen] = React.useState(false);

    React.useEffect(() => {

    }, []);

    const handleListCardHeader = (event, index) => {
        setAnchorElcoursemenu(event.currentTarget);
        seteditmenuINDEX(index);
        handleCourseMenuOpen();
    };

    const handleCourseMenuOpen = () => {
        seteditmenuopen(true);
    }

    const handleCourseMenuClose = (event) => {
        seteditmenuopen(false);
    }

    const handledrawerclose = (event) => {
        setopendrawer(false);
    }

    return (

        <React.Fragment>


            {<AppBar elevation={0} sx={{ borderBottom: "1px solid", padding: "1em", zIndex: theme.zIndex.drawer + 1 }} >

                <Toolbar disableGutters sx={{}}>
                    <Button color="firr" component={Link} to="/course/list" startIcon={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}>Back to List</Button>
                </Toolbar>

            </AppBar>}

            <Grid container sx={{minWidth: "542px",}}>
                {matchesMD && <Grid item xs={12} md={12} sx={{ marginLeft: "1em", marginBottom: "1em", marginTop: "1em" }}>

                    <Button
                        variant="outlined"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={(event) => { setopendrawer(!opendrawer) }}
                        edge="start"
                        sx={{}}>
                        <MenuIcon fontSize="large" />
                    </Button>

                </Grid>}
                {<Grid item xs={12} md={12} sx={{ marginBottom: "1em", marginTop: "1em" }}>
                    <Outlet></Outlet>
                </Grid>}


            </Grid>

            <Drawer
                sx={{
                    width: drawerWidth,
                    paddingTop: "8em",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant={matchesMD ? "temporary" : "permanent"}
                anchor="left"
                open={(!matchesMD || opendrawer)}
                onClose={handledrawerclose}>

                <List sx={{ marginTop: "5em" }}>

                    <ListItem sx={{ pl: "2em", marginBottom: "1em" }}>

                        <Grid container>

                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <Typography variant="h6">Plan your course</Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <ImageButton color="firr2" size="large" fullWidth component={Link} to="goals" onClick={(event) => { handledrawerclose(event) }}>Intended Learners</ImageButton>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <ImageButton color="firr2" size="large" fullWidth component={Link} to="course-structure" onClick={(event) => { handledrawerclose(event) }}>Course Sturcture</ImageButton>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <ImageButton color="firr2" size="large" fullWidth component={Link} to="setup" onClick={(event) => { handledrawerclose(event) }}>Setup & Test Video</ImageButton>
                            </Grid>

                        </Grid>

                    </ListItem>

                    <ListItem sx={{ pl: "2em", marginBottom: "1em" }}>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <Typography variant="h6">Create Content</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{
                                marginBottom: "0.7em",
                                paddingLeft: "2.5em",
                                '&:hover': {
                                    backgroundColor: '#C7C7C7',
                                    borderColor: '#0062cc',
                                    boxShadow: 'none',
                                },
                                '&:active': {
                                    boxShadow: 'none',
                                    backgroundColor: '#C7C7C7',
                                    borderColor: '#0062cc',
                                },
                                '&:focus': {
                                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                                },
                            }} component={Link} to="curriculum" onClick={(event) => { handledrawerclose(event) }}>
                                <Button color="firr2" size="large"><Typography variant="subtitle1" sx={{}}>Curriculum</Typography></Button>
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <Button color="firr2" size="large" fullWidth component={Link} to="captions" onClick={(event) => { handledrawerclose(event) }}><Typography variant="subtitle1" sx={{}}>Caption(optional)</Typography></Button>
                            </Grid>
                            <Grid item xs={12}
                                sx={{
                                    marginBottom: "0.7em",
                                    paddingLeft: "2.5em",
                                    '&:hover': {
                                        backgroundColor: '#C7C7C7',
                                        borderColor: '#0062cc',
                                        boxShadow: 'none',
                                    },
                                    '&:active': {
                                        boxShadow: 'none',
                                        backgroundColor: '#C7C7C7',
                                        borderColor: '#0062cc',
                                    },
                                    '&:focus': {
                                        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                                    },
                                }}
                                component={Link} to="accessibility" onClick={(event) => { handledrawerclose(event) }}
                            >
                                <Button color="firr2" size="large" ><Typography variant="subtitle1" sx={{}}>Accessibility(optional)</Typography></Button>
                            </Grid>

                        </Grid>
                    </ListItem>

                    <ListItem sx={{ pl: "2em", marginBottom: "1em" }}>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <Typography variant="h6">Publish your course</Typography>
                            </Grid>


                            <Grid item xs={12} sx={{ marginBottom: "0.7em", textDecoration: "none", color: "black" }}>
                                <ImageButton focusRipple component={Link} to="basics" onClick={(event) => { handledrawerclose(event) }}>Course Landing Page</ImageButton>
                                {/* <Typography variant="subtitle1" sx={{ padding: "1em" }}>Course Landing Page</Typography> */}
                                {/* <Button color="firr2" size="large" fullWidth component={Link} to="basics" onClick={(event) => { handledrawerclose(event) }}><Typography variant="subtitle1" sx={{}}>Course Landing Page</Typography></Button> */}
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <ImageButton focusRipple color="firr2" size="large" component={Link} to="pricing" onClick={(event) => { handledrawerclose(event) }}>Pricing</ImageButton>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <ImageButton color="firr2" size="large" component={Link} to="messages" onClick={(event) => { handledrawerclose(event) }}>Course Message</ImageButton>
                            </Grid>

                        </Grid>
                    </ListItem>

                    <Divider></Divider>

                </List>
            </Drawer>

        </React.Fragment>

    );

}
