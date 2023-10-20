import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import { Avatar, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Pagination, Skeleton, Stack, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import LanguageIcon from '@mui/icons-material/Language';
import { GetAllCourses, GetAllLanguages } from "../../Hooks/request";
import placeholder from "./placeholder.jpg";

function Media(props) {
    const { loading = false } = props;

    return (
        <Card sx={{ maxWidth: "100%", m: 2 }} elevation={8}>
            <CardHeader
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton
                        animation="wave"
                        height={8}
                        width="60%"
                        style={{ marginBottom: 6 }}
                    />
                }
            />

            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />


            <CardContent>

                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} />
                </React.Fragment>


            </CardContent>
        </Card>
    );
}

export default function ListCourse({ setAuthor }) {

    const API_URL = process.env.REACT_APP_API_URL;


    const [Languages, setLanguages] = React.useState([]);
    const [Courses, setCourses] = React.useState([]);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [title, settitle] = React.useState("");
    const [titleenglish, settitleenglish] = React.useState("");
    const [tableView, settableView] = React.useState(false);

    const [loading, setloading] = React.useState(false);

    const [courseID, setcourseID] = React.useState(-1);

    const [AnchorElcoursemenu, setAnchorElcoursemenu] = React.useState(null);
    const [coursemenuopen, setcoursemenuopen] = React.useState(false);

    const [openLanguageDialog, setopenLanguageDialog] = React.useState(false);

    const [selectlanguage, setselectlanguage] = React.useState(107);


    const theme = useTheme();
    const navigate = useNavigate();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

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
                // setalerterroopensnackbaropen(true);
            }

        }
        get();
    }, []);

    React.useEffect(() => {

        const get = async () => {
            var newobj = await GetAllCourses();
            if (newobj.done) {
                try {
                    if (newobj.fetcheddata.data.Courses.length > 0) {

                        // if (newobj.fetcheddata.data.Courses.Image1.length > 0) {

                        //     setcourse(newobj.fetcheddata.data.Course);
                        //     setImage1s(newobj.fetcheddata.data.Course.Image1);

                        // }

                        setCourses(newobj.fetcheddata.data.Courses);
                    }
                    else {
                        setCourses([]);
                    }
                }
                catch (e) {

                }

            }
            else {
                // setalerterroopensnackbaropen(true);
            }

        }
        get();
    }, []);

    console.log({ Courses });

    const handleListCardHeader = (event, courseID) => {
        setcourseID(courseID);
        setAnchorElcoursemenu(event.currentTarget);
        handleCourseMenuOpen();
    };

    const handleCourseMenuOpen = () => {
        setcoursemenuopen(true);
    }

    const handleCourseMenuClose = (event, which = 0) => {
        if (which === 0) {
            setcoursemenuopen(false);
        }
        if (which === 1) {
            navigate(`/course/edit/${courseID}`);
            setcoursemenuopen(false);
        }
        if (which === 2) {
            setcoursemenuopen(false);
        }
        else {
            setcoursemenuopen(false);
        }
    };

    const handleDelete = async (event, index, languageID) => {
        settitle(Languages[index].title);
        settitleenglish(Languages[index].titleEnglish);
        handleClickOpenDelete();
    };

    const handleClickOpenDelete = async () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = async () => {
        setOpenDelete(false);
    };

    const handleSubmitDelete = async (event) => {
        event.preventDefault();

        const newobj = Object.assign({}, {
            languageID: "languageID",
            title: title,
            titleenglish: titleenglish
        });

        handleDeleteClose();


    };

    const handleonContextMenu = async (event) => {
        // console.log("event.which = " + event.which);
        // if (event.which === 3) {
        event.preventDefault();

        console.log("Right mouse cilcked!!!!!");

    };

    const handleMangecourse = async (event, courseID) => {
        navigate(`/course/managecourse/manage/${courseID}`);
    };

    const handleLanguageDialogClose = (event) => {
        setopenLanguageDialog(false);
    };

    const handleLanguageSelectButton = (event, languageID) => {
        setselectlanguage(languageID);
        handleLanguageDialogClose();
    };

    const languageused = (row, which) => {
        if (selectlanguage > -1) {
            if (which === 0) {
                var loc = row.Titles.find((title, index) => {
                    if (title.LanguageID === selectlanguage) {
                        return title;
                    }
                    else {
                        return null;
                    }

                });
                if (loc) {
                    return loc.Title;
                } else {
                    return;
                }

            }
            if (which === 1) {
                var loc = row.Discriptions.find((Discription, index) => {
                    if (Discription.LanguageID === selectlanguage) {
                        return Discription;
                    }
                    else {
                        return null;
                    }

                });
                if (loc) {
                    return loc.Discription;
                } else {
                    return;
                }

            }
        }
        else {
            if (which === 0) {
                var loc = row.Titles.find((title, index) => {
                    if (title.LanguageID === selectlanguage) {
                        return title;
                    }
                    else {
                        return null;
                    }

                });
                if (loc) {
                    return loc.Title;
                } else {
                    return;
                }
            }
            if (which === 1) {
                var loc = row.Discriptions.find((Discription, index) => {
                    if (Discription.LanguageID === selectlanguage) {
                        return Discription;
                    }
                    else {
                        return null;
                    }

                });
                if (loc) {
                    return loc.Discription;
                } else {
                    return;
                }

            }
        }

    };

    return (

        <React.Fragment>

            <Grid container sx={{ minWidth: "542px", }}>

                <Grid item xs={12} sx={{ padding: "1em" }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">Courses</Typography>
                        </Grid>
                        <Grid item xs={6}>

                            <Box sx={{ display: "flex" }}>

                                <Box sx={{ ml: "auto" }}>

                                    <Button variant="outlined" color="firr" sx={{ marginRight: "1em" }} onClick={(event) => { settableView(false) }} ><ReorderOutlinedIcon></ReorderOutlinedIcon></Button>
                                    <Button variant="outlined" color="firr" sx={{ marginRight: "1em" }} onClick={(event) => { setopenLanguageDialog(true) }} ><LanguageIcon></LanguageIcon></Button>

                                </Box>

                            </Box>

                        </Grid>

                    </Grid>

                </Grid>

                {<Grid item xs={12}>

                    <Grid container sx={{ minWidth: "542px", }}>

                        {Courses.length <= 0 && [0, 1, 2, 4, 5, 6, 7, 8, 9].map((row, index) => {
                            return (
                                <Grid item xs={12} md={4} sx={{ marginBottom: "2em" }} key={`list-all-courses-skeleten-${index}`}>

                                    <Media loading />

                                </Grid>
                            )
                        })}

                        {Courses.length > 0 && Courses.map((row, index) => {

                            return (

                                <Grid item xs={12} md={4} sx={{ padding: "1em" }}
                                    key={`List-course-Grid-index-${index}`}>

                                    {matchesMD && <Card
                                        width="100%"
                                        height="566px"
                                        sx={{
                                            minWidth: "502px", maxWidth: "652px",
                                            minHeight: "383px", maxHeight: "566px",
                                        }}>

                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings" onClick={(event) => { handleListCardHeader(event, row.CourseID) }}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={languageused(row, 0)}
                                            subheader={new Date(row.AddedDate).toDateString()}

                                        />

                                        <Box
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                    cursor: "pointer"
                                                },
                                            }}
                                            onClick={(event) => { handleMangecourse(event, row.CourseID) }}
                                            onContextMenu={(event) => { handleonContextMenu(event) }}
                                        >
                                            <CardMedia
                                                component="img"
                                                width="100%"
                                                height="366px"
                                                src={row.Image1.length > 0 ? `${API_URL}/courses/StreamCourseCover/${row.Image1[row.Image1.length - 1].ImageID}` : placeholder}
                                                // image="/static/images/cards/paella.jpg"
                                                alt="Course image"
                                                sx={{
                                                    width: "100%", height: "auto",
                                                    minWidth: "502px", maxWidth: "652px",
                                                    minHeight: "283px", maxHeight: "366px",
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {languageused(row, 1)}
                                                </Typography>
                                            </CardContent>
                                        </Box>

                                    </Card>}

                                    {!matchesMD && <Box height="414px" sx={{}}>
                                        <Card
                                            height="316px"
                                            sx={{
                                                // minWidth: "502px", maxWidth: "652px",
                                                border: "1px solid",
                                                minHeight: "316px", maxHeight: "414px",
                                            }}>

                                            <CardHeader
                                                action={
                                                    <IconButton aria-label="settings" onClick={(event) => { handleListCardHeader(event, row.CourseID) }}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={languageused(row, 0)}
                                                subheader={new Date(row.AddedDate).toDateString()}

                                            />

                                            <Box
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                                        cursor: "pointer"
                                                    },
                                                }}
                                                onClick={(event) => { handleMangecourse(event, row.CourseID) }}
                                                onContextMenu={(event) => { handleonContextMenu(event) }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    width="100%"
                                                    height="214px"
                                                    src={row.Image1.length > 0 ? `${API_URL}/courses/StreamCourseCover/${row.Image1[row.Image1.length - 1].ImageID}` : placeholder}
                                                    // image="/static/images/cards/paella.jpg"
                                                    alt="Course image"
                                                    sx={{
                                                        width: "100%", height: "auto",
                                                        // minWidth: "278px", maxWidth: "380px",
                                                        minHeight: "156px", maxHeight: "214px",
                                                    }}
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {languageused(row, 1)}
                                                    </Typography>
                                                </CardContent>
                                            </Box>

                                        </Card>
                                    </Box>}

                                </Grid>

                            );

                        })}

                        {Courses.length > 0 && <Grid item xs={12} sx={{ margin: "2em" }}>
                            <Pagination count={10} color="primary" />
                        </Grid>}

                    </Grid>

                </Grid>}

            </Grid>

            <Menu
                id={`Course-menu`}
                anchorEl={AnchorElcoursemenu}
                open={coursemenuopen}
                onClose={(event) => { handleCourseMenuClose(event, 0) }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>

                <MenuItem key={1} onClick={(event) => { handleCourseMenuClose(event, 1) }}><EditIcon />
                    Edit
                </MenuItem>
                <MenuItem key={2} onClick={(event) => { handleCourseMenuClose(event, 2) }}><DeleteIcon></DeleteIcon>
                    Delete
                </MenuItem>

            </Menu>

            <Dialog
                open={openLanguageDialog}
                onClose={handleLanguageDialogClose}
                aria-labelledby="Language-dialog"
                sx={{
                    '& .MuiDialogContent-root': {
                        padding: theme.spacing(2),
                    },
                    '& .MuiDialogActions-root': {
                        padding: theme.spacing(1),
                    },
                }}
            >

                <DialogTitle
                    id="Language-dialog-title"
                    onClose={handleLanguageDialogClose}
                    sx={{ borderBottom: '1px solid' }}
                >
                    Choose a Language
                </DialogTitle>
                <DialogContent>
                    <List>
                        {Languages.map((row, index) => {

                            return (
                                <ListItem disablePadding key={`Language-dialog-list-listItem-${index}`}>
                                    <ListItemButton id={`Language-dialog-list-listItem-button-${index}`} onClick={(event) => { handleLanguageSelectButton(event, row.languageID) }}>
                                        <ListItemText primary={row.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}

                    </List>
                </DialogContent>

            </Dialog>

        </React.Fragment >

    );

}
