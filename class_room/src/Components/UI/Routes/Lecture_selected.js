import {
    AppBar,
    Breadcrumbs,
    Card, CardContent,
    CardMedia,
    Chip,
    Collapse,
    Divider,
    Grid,
    ListItemButton,
    ListItemIcon,
    Skeleton,
    useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useParams, Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactPlayer from 'react-player';

import {
    GetLectureItem,
    GetStreamCurriculumModuleLectureVideoContent
} from '../../../Hooks/request';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.26),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.26),
        },
    };
});

const PERMITED_VIDEO_FILES = ["avi", "mpg", "mpeg", "mp4", "webm", "wmv"];

const PERMITED_DOCUMENTS_FILES = ["pdf"];

const API_URL = "http://localhost:8014/v1";

function Lecture_Selected(props) {

    const { CourseID, CurriculumID, ModuleID, LectureID } = useParams();

    const {
        Course, setCourse,
        Languages, setLanguages,
        Curriculum, setCurriculum,
        selectedlanguage, setselectedlanguage,
        reloadtwo, refreshtwo, loadingtwo,
        setreloadtwo, setrefreshtwo, setloadingtwo
    } = props;

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const playerRef = React.useRef(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ExploreanchorEl, setExploreAnchorEl] = React.useState(null);
    const [ExploreMoreanchorEl, setExploreMoreAnchorEl] = React.useState(null);
    const OnlineExploreopen = Boolean(ExploreanchorEl);
    const OnlineExploreMoreopen = Boolean(ExploreMoreanchorEl);

    const [module, setmodule] = React.useState(null);
    const [listmoduleopen, setlistmoduleopen] = React.useState(true);
    const [listlectureopen, setlistlectureopen] = React.useState(true);

    const [reload, setreload] = React.useState(false);
    const [refresh, setrefresh] = React.useState(false);
    const [loading, setloading] = React.useState(true);

    const [Lecture, setLecture] = React.useState(null);
    const [pip, setpip] = React.useState(false);
    const [url, seturl] = React.useState("");

    React.useEffect(() => {

        const get = async () => {
            try {
                setloading(true);
                const response = await GetLectureItem(CourseID, CurriculumID, ModuleID, LectureID);
                if (response.done) {


                    if (response.fetcheddata.data.Lecture.Type === "lecture") {
                        const mimetype = response.fetcheddata.data.Lecture.Content_Type.split("/");

                        var find_file_type = PERMITED_VIDEO_FILES.find((inrow, index) => {
                            if (inrow === mimetype[1]) {
                                return inrow;
                            }
                            else {
                                return null;
                            }
                        });

                        if (find_file_type) {

                            response.fetcheddata.data.Lecture.LocType = "video";
                        }
                        else {
                            const mimetype = response.fetcheddata.data.Lecture.Content_Type.split("/");

                            var find_file_type = PERMITED_DOCUMENTS_FILES.find((inrow, index) => {
                                if (inrow === mimetype[1]) {
                                    return inrow;
                                }
                                else {
                                    return null;
                                }
                            });
                            if (find_file_type) {
                                response.fetcheddata.data.Lecture.LocType = "pdf";
                            } else {
                                return null;
                            }

                        }

                    }
                    else if (response.fetcheddata.data.Lecture.Type === "quiz") {
                        response.fetcheddata.data.Lecture.LocType = "quiz";
                    }

                    setLecture(response.fetcheddata.data.Lecture);
                    setloading(false);
                    setrefresh(false);
                }
                else {
                    setrefresh(true);
                    setloading(false);
                    setLecture(null);
                }

            } catch (error) {
                setrefresh(true);
                setloading(false);
                setLecture(null);
            }
        }

        get();

    }, [reload, CourseID, CurriculumID, ModuleID, LectureID]);

    console.log({ CourseID })

    React.useEffect(() => {

        const getimage = async () => {

            var pattern1 = /video*/;
            var pattern2 = /application*/;
            if (Lecture?.LocType === "video") {
                // settype(1);
                const newobj = Object.assign({}, {
                    CourseID: CourseID,
                    CurriculumID: CurriculumID,
                    ModuleID: ModuleID,
                    LectureID: LectureID,
                    Type: "Video_Content",
                    seturl: seturl
                });

                GetStreamCurriculumModuleLectureVideoContent(newobj, Lecture?.Content_Type).then(
                    (lectureimageresponse) => {

                        var locurl;
                        if (lectureimageresponse) {
                            locurl = lectureimageresponse;
                        }
                        else {
                            locurl = "";
                        }
                    });
                // console.log({ locurl });
                // seturl(locurl);

                // seturl(`${API_URL}/curriculums/StreamCurriculumModuleLectureContent/${CourseID}/${CurriculumID}/${ModuleID}/${Lecture?.LectureID}`);
            }
            else {
                // settype(0);
            }
        };

        getimage();

    }, [Lecture]);


    console.log({ url });


    const handleChange = (event, newValue) => {

    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreload(!reload);
    };

    const handleOpenlistmodule = (event) => {
        setlistmoduleopen(!listmoduleopen);
    };

    const handleOpenlistlecture = (event) => {
        setlistlectureopen(!listlectureopen);
    };

    const handleClickBreadcrumbs = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };

    const handleclicknextlecture = (event) => {

    };

    const handleEnablePIP = () => {
        console.log('onEnablePIP');
        setpip(true);
    };

    console.log({ Lecture });
    // console.log({ ModuleID });

    return (

        <Box sx={{}}>

            {!refresh && !loading && <React.Fragment>

                <Box sx={{ padding: "0em", marginBottom: "2em" }}>

                    {Lecture && <Grid container direction={"row"} sx={{}}>

                        <Grid item xs={12} md={12} sx={{ marginBottom: "1em", backgroundColor: theme.palette.Breadcrumbs.main, padding: "1em", }}>
                            <Grid container sx={{}}>

                                <Grid item xs={8} >
                                    <Breadcrumbs sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} aria-label="breadcrumb">

                                        <StyledBreadcrumb
                                            component={Link}
                                            to={`/Class_Room/${CourseID}/Curriculum/${CurriculumID}/`}
                                            // component="a"
                                            // href="#"
                                            label="Home"
                                            icon={<HomeIcon fontSize="small" />}
                                        />

                                        <StyledBreadcrumb component={Link} to={`/Class_Room/${CourseID}/Curriculum/${CurriculumID}/Module/${ModuleID}`} label="Module" />

                                        <StyledBreadcrumb
                                            label={Lecture?.Title}
                                            deleteIcon={<ExpandMoreIcon />}
                                            onDelete={handleClickBreadcrumbs}
                                        />
                                    </Breadcrumbs>
                                </Grid>
                                <Grid item xs={4} >
                                    <Box>
                                        <Button size="small" color='nextprev_button' variant="text" startIcon={<ArrowBackIosIcon />}>Previous</Button>
                                        <Button sx={{ marginLeft: "1em" }} color='nextprev_button' size="small" variant="text" endIcon={<ArrowForwardIosIcon />} onClick={(event) => { handleclicknextlecture(event) }}>Next</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ padding: "1em", marginTop: "1em" }}>
                            <Grid container>

                                <Grid item xs={12} sx={{}}>
                                    <Typography variant='h3'>{Lecture.Title}</Typography>
                                </Grid>

                                {/* <Card sx={{ display: 'flex', background: "#C7C7C7", borderBottom: "0px none", padding: "1em" }}>

                                    {<CardMedia
                                        component="img"
                                        sx={{ width: "108px", height: "58px", border: "1px solid" }}
                                        image={url}
                                        alt="Video Thumnail"
                                    />}

                                </Card> */}


                                {Lecture.LocType === "video" && <Grid item xs={12} sx={{}}>
                                    {/* <Card sx={{ display: 'flex', background: "#C7C7C7", borderBottom: "0px none", padding: "1em" }}>

                                        {<CardMedia
                                            component="img"
                                            sx={{ width: "108px", height: "58px", border: "1px solid" }}
                                            image={url}
                                            alt="Video Thumnail"
                                        />}

                                    </Card> */}
                                    <ReactPlayer
                                        className='react-player'
                                        ref={playerRef}
                                        url={url}
                                        controls={true}
                                        width={"100%"}
                                        onEnablePIP={handleEnablePIP} />

                                </Grid>}

                                <Grid item xs={12} sx={{}}>




                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>}

                    {/* {!module && <Grid container sx={{}}>
                        <Grid item xs={12}>
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
                                            Module Not Found.
                                        </Typography>
                                        <Typography component="h6" variant="h6">
                                            Error. Module With this ID Not Found.
                                        </Typography>

                                    </Box>

                                </CardContent>

                            </Card >
                        </Grid>
                    </Grid>} */}

                </Box>

            </React.Fragment>}

            {((!refresh && loading)) &&

                <Grid container columnSpacing={1} rowSpacing={1} sx={{ padding: "4px" }}>

                    <Grid item xs={12} md={12}>
                        <Skeleton variant="rounded" animation="wave" height={60} />
                    </Grid>

                    <Grid item xs={12} md={12}>
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

                        </Grid>

                    </Grid>

                </Grid>
            }

            {(refresh) &&

                <Box>
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
                                    // onSubmit={handleSubmit}
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

                </Box>
            }

        </Box >

    );

};

export default Lecture_Selected;



