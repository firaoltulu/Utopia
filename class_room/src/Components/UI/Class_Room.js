import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import ContactsIcon from '@mui/icons-material/Contacts';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkIcon from '@mui/icons-material/Work';
import {
    Card, CardContent, CardHeader, Grid, List,
    ListItem, ListItemButton, ListItemText, Menu, Skeleton,
    Tab, Tabs, useMediaQuery
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme, alpha } from '@mui/material/styles';
import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams, Outlet } from "react-router-dom";


import Header from './Header';
import {
    GetAllLanguages, GetCourse, GetCurriculumItem,
} from '../../Hooks/request';

const drawerWidth = "18em";

function Class_Room(props) {

    const { CourseID, CurriculumID } = useParams();

    const { window, setMode, navvalue, setnavValue, settabclicked,
        Course, setCourse,
        Languages, setLanguages,
        Curriculum, setCurriculum,
        selectedlanguage, setselectedlanguage,
        reloadtwo, refreshtwo, loadingtwo,
        setreloadtwo, setrefreshtwo, setloadingtwo } = props;

    const [mobileOpen, setMobileOpen] = React.useState(true);

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ExploreanchorEl, setExploreAnchorEl] = React.useState(null);
    const [ExploreMoreanchorEl, setExploreMoreAnchorEl] = React.useState(null);
    const OnlineExploreopen = Boolean(ExploreanchorEl);
    const OnlineExploreMoreopen = Boolean(ExploreMoreanchorEl);

    const [reload, setreload] = React.useState(false);
    const [refresh, setrefresh] = React.useState(false);
    const [loading, setloading] = React.useState(true);

    const [reloadone, setreloadone] = React.useState(false);
    const [refreshone, setrefreshone] = React.useState(false);
    const [loadingone, setloadingone] = React.useState(true);


    React.useEffect(() => {

        const get = async () => {
            try {
                setloading(true);
                const response = await GetAllLanguages(CourseID);
                if (response.done) {
                    setLanguages(response.fetcheddata.data.Languages);
                    setselectedlanguage(CurriculumID);
                    // setselectedlanguage(response.fetcheddata.data.Languages[0].LanguageID);
                    setloading(false);
                    setrefresh(false);
                }
                else {
                    setrefresh(true);
                    setloading(false);
                    setLanguages([]);
                }
            } catch (error) {
                setrefresh(true);
                setloading(false);
                setLanguages([]);
            }
        }

        get();

    }, [reload]);


    React.useEffect(() => {

        const get = async () => {
            try {
                setloadingone(true);
                const response = await GetCourse(CourseID);
                if (response.done) {
                    setCourse(response.fetcheddata.data.Course);
                    setloadingone(false);
                    setrefreshone(false);
                }
                else {
                    setrefreshone(true);
                    setloadingone(false);
                    setCourse(null);
                }
            } catch (error) {
                setrefreshone(true);
                setloadingone(false);
                setCourse(null);
            }
        }

        get();

    }, [reloadone]);

    React.useEffect(() => {

        const get = async () => {
            try {
                if (selectedlanguage !== "") {

                    setloadingtwo(true);
                    const response = await GetCurriculumItem(CourseID, selectedlanguage);
                    if (response.done) {
                        setCurriculum(response.fetcheddata.data.Curriculum);
                        setloadingtwo(false);
                        setrefreshtwo(false);
                    }
                    else {
                        setrefreshtwo(true);
                        setloadingtwo(false);
                        setCurriculum({});
                    }

                }
            } catch (error) {
                setrefreshtwo(true);
                setloadingtwo(false);
                setCurriculum({});
            }
        }

        get();

    }, [selectedlanguage, reloadtwo]);

    // console.log({ Course });

    const handleChange = (event, newValue) => {
        setnavValue({ currentValue: newValue, oldValue: navvalue.currentValue });
    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreload(!reload);
    };

    return (

        <Box sx={{}}>

            {!refresh && !loading && !refreshone && !loadingone && <React.Fragment>

                <Header Course={Course} setMode={setMode}
                    navvalue={navvalue} setnavValue={setnavValue}
                    settabclicked={settabclicked} drawerWidth={drawerWidth}
                    selectedlanguage={selectedlanguage} setselectedlanguage={setselectedlanguage}
                    Languages={Languages} Curriculum={Curriculum} setCurriculum={setCurriculum}>
                </Header>

                <Box sx={{ marginLeft: matchesMD ? "" : drawerWidth, padding: "0.5em" }}>
                    <Outlet></Outlet>
                </Box>

            </React.Fragment>}

            {((!refresh && loading) || (!refreshone && loadingone)) &&
                <Grid container columnSpacing={1} rowSpacing={1} sx={{ padding: "4px" }}>

                    <Grid item xs={12} md={12}>
                        <Skeleton variant="rounded" animation="wave" height={60} />
                    </Grid>

                    {!matchesMD && <Grid item xs={0} md={3}>
                        <Skeleton variant="rounded" animation="wave" height={1000} />
                    </Grid>}

                    <Grid item xs={12} md={9}>
                        <Grid container direction={"column"} rowSpacing={1} >
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={170} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={170} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={170} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={170} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={170} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={100} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            }

            {(refresh || refreshone) && <Box>
                <Card variant="outlined" sx={{ margin: "1em" }}>

                    <CardContent >

                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h4" variant="h4">
                                Connect to the internet
                            </Typography>
                            <Typography component="h6" variant="h6">
                                You're offline. Check your connection.
                            </Typography>

                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                            >

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // color="firr"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={(event) => { handleRefresh(event) }}
                                >
                                    Refresh
                                </Button>

                            </Box>

                        </Box>

                    </CardContent>

                </Card >
            </Box>}

        </Box >

    );

};

export default Class_Room;



