import {
    Card, CardContent,
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

// import {
//     GetAllLanguages, GetCourse, GetCurriculumItem,
// } from '../../Hooks/request';


const PERMITED_VIDEO_FILES = ["avi", "mpg", "mpeg", "mp4", "webm", "wmv"];

const PERMITED_DOCUMENTS_FILES = ["pdf"];

function Module_Selected(props) {

    const { CourseID, CurriculumID, ModuleID } = useParams();

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ExploreanchorEl, setExploreAnchorEl] = React.useState(null);
    const [ExploreMoreanchorEl, setExploreMoreAnchorEl] = React.useState(null);
    const OnlineExploreopen = Boolean(ExploreanchorEl);
    const OnlineExploreMoreopen = Boolean(ExploreMoreanchorEl);

    const [module, setmodule] = React.useState(null);
    const [listmoduleopen, setlistmoduleopen] = React.useState(true);
    const [listlectureopen, setlistlectureopen] = React.useState(true);


    const handleChange = (event, newValue) => {

    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreloadtwo(!reloadtwo);
    };

    const handleOpenlistmodule = (event) => {
        setlistmoduleopen(!listmoduleopen);
    };

    const handleOpenlistlecture = (event) => {
        setlistlectureopen(!listlectureopen);
    };


    React.useEffect(() => {
        if (Curriculum) {

            try {

                const ffmID = parseInt(ModuleID);

                const foundmodule = Curriculum.Modules.find((row, index) => {
                    if (row.ModuleID === ffmID) {
                        return row;
                    }
                });

                if (foundmodule) {

                    foundmodule?.Lectures.map((row, index) => {

                        if (row.Type === "lecture") {
                            const mimetype = row.Content_Type.split("/");

                            var find_file_type = PERMITED_VIDEO_FILES.find((inrow, index) => {
                                if (inrow === mimetype[1]) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (find_file_type) {

                                row.LocType = "video";

                                // const newobj = Object.assign({}, {
                                //     ...row,
                                //     Type: "video"

                                // });
                                // return newobj;
                            }
                            else {
                                const mimetype = row.Content_Type.split("/");

                                var find_file_type = PERMITED_DOCUMENTS_FILES.find((inrow, index) => {
                                    if (inrow === mimetype[1]) {
                                        return row;
                                    }
                                    else {
                                        return null;
                                    }
                                });
                                if (find_file_type) {
                                    row.LocType = "pdf";
                                    // const newobj = Object.assign({}, {
                                    //     ...row,
                                    //     Type: "pdf"

                                    // });
                                    // return newobj;
                                } else {
                                    return null;
                                }

                            }

                        }
                        else if (row.Type === "quiz") {
                            row.LocType = "quiz";
                            // const newobj = Object.assign({}, {
                            //     ...row
                            // });
                            // return newobj;
                        }

                    });

                    setmodule(foundmodule);

                }
                else {
                    setmodule(null);

                }


            } catch (error) {

            }

        }
    }, [ModuleID, Curriculum]);


    // console.log({ module });
    // console.log({ ModuleID });

    return (

        <Box sx={{}}>

            {!refreshtwo && !loadingtwo && <React.Fragment>

                <Box sx={{ padding: "0.5em", border: "0.01em solid", borderRadius: "5px", marginBottom: "2em" }}>

                    {module && <Grid container sx={{}}>

                        <Grid item xs={12} sx={{}}>

                            <List>

                                <ListItem disablePadding>

                                    <ListItemButton id="Explore-more-button-1"
                                        aria-controls={'Exploremenu'}
                                        aria-haspopup="true"
                                        aria-expanded={'true'}
                                        onClick={(event) => { handleOpenlistmodule() }}
                                    >

                                        {listmoduleopen ? <ExpandLess fontSize='large' /> : <ExpandMore fontSize='large' />}
                                        <Typography sx={{ marginLeft: "0.5em" }} variant="h6">
                                            {module.Title}
                                        </Typography>


                                    </ListItemButton>

                                </ListItem>

                                <Divider></Divider>

                                <Collapse in={listmoduleopen} timeout="auto" unmountOnExit>

                                    <Grid container sx={{ paddingLeft: "2em", paddingRight: "2em" }}>
                                        <Grid item xs={12}>
                                            <Typography variant='h6'>{module.Objective}</Typography>
                                        </Grid>

                                        <Grid item xs={12} sx={{ marginTop: "2em" }}>
                                            <List sx={{ padding: "0em" }}>

                                                <ListItem disablePadding >

                                                    <ListItemButton id="Explore-more-button-1"
                                                        aria-controls={'Exploremenu'}
                                                        aria-haspopup="true"
                                                        aria-expanded={'true'}
                                                        onClick={(event) => { handleOpenlistlecture() }}
                                                    >

                                                        {listlectureopen ? <ExpandLess fontSize='small' /> : <ExpandMore fontSize='small' />}
                                                        <Typography sx={{ marginLeft: "0.5em" }} variant="subtitle2">
                                                            Lectures
                                                        </Typography>

                                                    </ListItemButton>

                                                </ListItem>

                                            </List>
                                            <Divider></Divider>

                                            <Collapse in={listlectureopen} timeout="auto" unmountOnExit sx={{ paddingLeft: "1em", paddingRight: "1em" }}>

                                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                                    {module?.Lectures.map((row, index) => {

                                                        if (row.LocType === "video") {
                                                            return (
                                                                <ListItemButton component={Link} to={`Lecture/${row.LectureID}/`}
                                                                    sx={{
                                                                        borderRadius: "1em"
                                                                    }} key={`list-module-lecture-index-${index}`}>

                                                                    <ListItemIcon>
                                                                        <Avatar>
                                                                            {<PlayCircleOutlineIcon fontSize='large' />}
                                                                        </Avatar>
                                                                    </ListItemIcon>

                                                                    <ListItemText sx={{
                                                                        " .MuiListItemText-primary": {
                                                                            ...theme.typography.listitemtextprimary
                                                                        },
                                                                        ".MuiListItemText-secondary": {
                                                                            ...theme.typography.listitemtextsecondary
                                                                        }

                                                                    }} primary={row.Title} secondary={row.LocType} />

                                                                </ListItemButton>
                                                            )
                                                        }
                                                        else if (row.LocType === "pdf") {
                                                            return (
                                                                <ListItemButton component={Link} to={`Lecture/${row.LectureID}/`}
                                                                    sx={{
                                                                        borderRadius: "1em"
                                                                    }} key={`list-module-lecture-index-${index}`}>

                                                                    <ListItemIcon>
                                                                        <Avatar>
                                                                            {<CodeIcon fontSize='large' />}
                                                                        </Avatar>
                                                                    </ListItemIcon>

                                                                    <ListItemText
                                                                        sx={{
                                                                            " .MuiListItemText-primary": {
                                                                                ...theme.typography.listitemtextprimary
                                                                            },
                                                                            ".MuiListItemText-secondary": {
                                                                                ...theme.typography.listitemtextsecondary
                                                                            }
                                                                        }} primary={row.Title} secondary="Document" />
                                                                </ListItemButton>
                                                            )
                                                        }
                                                        else if (row.LocType === "quiz") {
                                                            return (
                                                                <ListItemButton component={Link} to={`Lecture/${row.LectureID}/`}
                                                                    sx={{
                                                                        borderRadius: "1em"
                                                                    }} key={`list-module-lecture-index-${index}`}>

                                                                    <ListItemIcon>
                                                                        <Avatar>
                                                                            {<HelpOutlineIcon fontSize='large' />}
                                                                        </Avatar>
                                                                    </ListItemIcon>

                                                                    <ListItemText
                                                                        sx={{
                                                                            " .MuiListItemText-primary": {
                                                                                ...theme.typography.listitemtextprimary
                                                                            },
                                                                            ".MuiListItemText-secondary": {
                                                                                ...theme.typography.listitemtextsecondary
                                                                            }
                                                                        }} primary={row.Title} secondary={row.LocType} />
                                                                </ListItemButton>
                                                            )
                                                        }

                                                    })}

                                                </List>

                                            </Collapse>

                                        </Grid>

                                    </Grid>
                                </Collapse>

                            </List>

                        </Grid>

                    </Grid>}

                    {!module && <Grid container sx={{}}>
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
                    </Grid>}

                </Box>

            </React.Fragment>}


            {((!refreshtwo && loadingtwo)) &&

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

            {(refreshtwo) && <Box>

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

            </Box>}

        </Box >

    );

};

export default Module_Selected;
