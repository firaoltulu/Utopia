import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, ButtonBase, Dialog, DialogContent, DialogTitle, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from "react";
import { Link, Outlet, useParams } from 'react-router-dom';
import { GetAllLanguages } from '../../../Hooks/request';


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


    const [Languages, setLanguages] = React.useState([]);

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const [opendrawer, setopendrawer] = React.useState(false);

    const [editmenuINDEX, seteditmenuINDEX] = React.useState(-1);
    const [AnchorElcoursemenu, setAnchorElcoursemenu] = React.useState(null);
    const [editmenuopen, seteditmenuopen] = React.useState(false);

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
            }

        }
        get();
    }, []);

    React.useEffect(() => {

    })


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
                    <Button color="firr" sx={{ marginRight: "3em" }} component={Link} to="/course/list" startIcon={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}>Back to List</Button>




                </Toolbar>

            </AppBar>}

            <Grid container sx={{ minWidth: "542px", }}>
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
                                <Button color="firr2" size="large" fullWidth component={Link} to="goals" onClick={(event) => { handledrawerclose(event) }}>Intended Learners</Button>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <Button color="firr2" size="large" fullWidth component={Link} to="course-structure" onClick={(event) => { handledrawerclose(event) }}>Course Sturcture</Button>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <Button color="firr2" size="large" fullWidth component={Link} to="setup" onClick={(event) => { handledrawerclose(event) }}>Setup & Test Video</Button>
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
                                <Button fullWidth component={Link} to="basics" onClick={(event) => { handledrawerclose(event) }}>Course Landing Page</Button>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <Button fullWidth color="firr2"  component={Link} to="pricing" onClick={(event) => { handledrawerclose(event) }}>Pricing</Button>
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: "0.7em" }}>
                                <Button fullWidth color="firr2" size="large" component={Link} to="messages" onClick={(event) => { handledrawerclose(event) }}>Course Message</Button>
                            </Grid>

                        </Grid>
                    </ListItem>

                    <Divider></Divider>

                </List>
            </Drawer>

        </React.Fragment>

    );

}
