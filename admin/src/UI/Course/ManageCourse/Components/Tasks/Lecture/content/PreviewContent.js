import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Alert,
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid, Icon, IconButton,
    Paper,
    Snackbar,
    Typography,
    useTheme
} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MuiFileInput } from 'mui-file-input';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import {
    HttpAddCurriculumModuleLectureItemContent,
    HttpAddCurriculumModuleLectureItemContentExtraResource,
    HttpDeleteCurriculumModuleLectureContentExtraResource
} from '../../../../../../../Hooks/request';

// import ReactPlayer from 'react-player';
// import VideoPreviewcontent from './VideoPreviewcontent';
// require("dotenv").config();

const PERMITED_VIDEO_FILES = ["avi", "mpg", "mpeg", "mp4", "webm", "wmv"];

const PERMITED_DOCUMENTS_FILES = ["pdf"];

const PERMITED_RESOURCE_DOCUMENTS_FILES =
    [

        "pdf",
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "vnd.openxmlformats-officedocument.wordprocessingml.template",
        "msword",

        "mspowerpoint",
        "vnd.ms-powerpoint",
        "vnd.openxmlformats-officedocument.presentationml.presentation",

        "vnd.ms-excel",
        "vnd.ms-excel.addin.macroEnabled.12",
        "vnd.ms-excel.sheet.binary.macroEnabled.12",
        "vnd.ms-excel.sheet.macroEnabled.12",
        "vnd.ms-excel.template.macroEnabled.12",
        "vnd.openxmlformats-officedocument.presentationml.presentation",
        "vnd.openxmlformats-officedocument.presentationml.slide",
        "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "vnd.openxmlformats-officedocument.spreadsheetml.template",

    ];

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function PreviewContent(props) {

    const { item, CourseID,
        CurriculumID, ModuleID,
        reload, setreload,
    } = props;

    const playerRef = React.useRef(null);
    const API_URL = process.env.REACT_APP_API_URL;

    const [EditFile, setEditFile] = React.useState(null);
    const [resourceFile, setresourceFile] = React.useState(null);
    const [Edit, setEdit] = React.useState(false);
    const [discription, setdiscription] = React.useState(false);
    const [resource, setresource] = React.useState(false);
    const [Uploadprogress, setUploadprogress] = React.useState(0);
    const [type, settype] = React.useState(0);
    const [url, seturl] = React.useState("");

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [pip, setpip] = React.useState(false);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const [errorfilesnackbaropen, seterrorfilesnackbaropen] = React.useState(false);
    const [Extra_Resourcesnackbaropen, setExtra_Resourcesnackbaropen] = React.useState(false);
    const [Delete_Extra_Resourcesnackbaropen, setDelete_Extra_Resourcesnackbaropen] = React.useState(false);

    const [openDeleteExtraResourseDialog, setopenDeleteExtraResourseDialog] = React.useState(false);
    const [Extra_Resource_ID, setExtra_Resource_ID] = React.useState(0);

    React.useEffect(() => {

        const getimage = async () => {

            var pattern1 = /video*/;
            var pattern2 = /application*/;
            if (item.Content_Type.match(pattern1)) {
                settype(1);
                // const newobj = Object.assign({}, {
                //     LectureID: item.LectureID,
                //     CourseID: CourseID,
                //     CurriculumID: CurriculumID,
                //     ModuleID: ModuleID,
                //     Type: "Video_Content",
                // });
                // const lectureimageresponse = await GetStreamCurriculumModuleLectureContent(newobj, item.Content_Type);
                // var locurl;
                // if (lectureimageresponse) {
                //     locurl = lectureimageresponse;
                // }
                // else {
                //     locurl = "";
                // }
                // console.log({ locurl });
                // seturl(locurl);

                seturl(`${API_URL}/curriculums/StreamCurriculumModuleLectureContent/${CourseID}/${CurriculumID}/${ModuleID}/${item.LectureID}`);
            }
            else if (item.Content_Type.match(pattern2)) {
                settype(2);
            }
            else {
                settype(0);
            }
        };

        getimage();

    }, []);

    const HandleClick = (event, which) => {
        if (which === 0) {
            setEdit(true);
            setdiscription(false);
            setresource(false);
        }
        if (which === 1) {
            setEdit(false);
            setdiscription(true);
            setresource(false);
        }
        if (which === 2) {
            setEdit(false);
            setdiscription(false);
            setresource(true);
        }

    };

    const handlesetvideoChange = (newFile) => {

        const prev_mimetype = item.Content_Type.split("/");
        const mimetype = newFile.type.split("/");
        var find_file_type;

        if (prev_mimetype[0] === "video") {

            find_file_type = PERMITED_VIDEO_FILES.find((row, index) => {
                if (mimetype[1] === row) {
                    return row;
                }
                else {
                    return null;
                }
            });

        }
        else if (prev_mimetype[0] === "application") {

            find_file_type = PERMITED_DOCUMENTS_FILES.find((row, index) => {
                if (mimetype[1] === row) {
                    return row;
                }
                else {
                    return null;
                }
            });

        }
        else {

            find_file_type = null;

        }

        if (find_file_type) {

            const newobj = Object.assign({}, {
                LectureID: item.LectureID,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                newFile: newFile,
                Type: prev_mimetype[0] === "video" ? "Video_Content" : "Resource_Content",
                setUploadprogress
            });

            setEditFile(newFile);

            HttpAddCurriculumModuleLectureItemContent(newobj).then((response) => {
                if (response.done) {
                    setreload(!reload);
                    setsnackbaropen(true);
                    setEditFile(null);
                    setUploadprogress(0);
                } else {
                    setEditFile(null);
                    seterrorsnackbaropen(true);
                    setUploadprogress(0);
                }
            }).catch((error) => {
                seterrorsnackbaropen(true);
                setUploadprogress(0);
            });

        } else {

            seterrorfilesnackbaropen(true);
            setUploadprogress(0);
        }

    };

    const handlesetResourceChange = (newFile) => {

        const mimetype = newFile.type.split("/");

        const find_file_type = PERMITED_RESOURCE_DOCUMENTS_FILES.find((row, index) => {
            if (mimetype[1] === row) {
                return row;
            }
            else {
                return null;
            }
        });

        if (find_file_type) {

            const newobj = Object.assign({}, {
                LectureID: item.LectureID,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                newFile: newFile,
                setUploadprogress
            });

            setresourceFile(newFile);

            HttpAddCurriculumModuleLectureItemContentExtraResource(newobj).then((response) => {
                if (response.done) {
                    setreload(!reload);
                    setExtra_Resourcesnackbaropen(true);
                    setresourceFile(null);
                    setUploadprogress(0);
                    setresource(false);
                } else {
                    setresourceFile(null);
                    seterrorsnackbaropen(true);
                    setUploadprogress(0);
                }
            }).catch((error) => {
                seterrorsnackbaropen(true);
                setUploadprogress(0);
                setresource(false);
                setresourceFile(null);
            });

        } else {
            seterrorfilesnackbaropen(true);
            setUploadprogress(0);
            setresourceFile(null);
            // setresource(false);
        }

    };

    const HandleBack = (event) => {
        setEdit(false);
    };

    const handleclear = (newFile, which) => {
        if (which === 0) {
            setEditFile(null);
        }
        if (which === 1) {
            setdiscription(false);
        }
        if (which === 2) {
            setresource(false);
        }
        if (which === 3) {
            setresourceFile(null);
        }
    };

    const handleEnablePIP = () => {
        console.log('onEnablePIP');
        setpip(true);
    };

    const handleDisablePIP = () => {
        console.log('onDisablePIP');
        setpip(false);
    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
        seterrorfilesnackbaropen(false);
        setExtra_Resourcesnackbaropen(false);
        setDelete_Extra_Resourcesnackbaropen(false);
    };

    const handleDeleteExtraResource = (event, Extra_Resource_ID) => {
        setopenDeleteExtraResourseDialog(true);
        setExtra_Resource_ID(Extra_Resource_ID);
        handlesnackClose();
    };

    const DeleteExtraResourseDialogclose = () => {
        setopenDeleteExtraResourseDialog(false);
        setExtra_Resource_ID(0);
        handlesnackClose();
    };

    const handleDialogDeleteExtraContent = async (event) => {

        if (Extra_Resource_ID > 0) {



            const newobj = Object.assign({}, {
                LectureID: item.LectureID,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                Extra_Resource_ID: Extra_Resource_ID
            });
            console.log({ newobj });

            const response = await HttpDeleteCurriculumModuleLectureContentExtraResource(newobj);

            if (response.done) {
                setreload(!reload);
                setDelete_Extra_Resourcesnackbaropen(true);
                setExtra_Resource_ID(0);

            } else {
                setExtra_Resource_ID(0);
                setDelete_Extra_Resourcesnackbaropen(false);

            }
        }
        else {

        }
    };

    return (

        <Grid container
            sx={{
                background: "#C7C7C7",
                '&:hover': { cursor: "default" },
            }}>

            {!Edit && <React.Fragment>

                {<Grid item xs={12} sx={{ marginBottom: "1em", borderBottom: "1px solid" }}>

                    <Card sx={{ display: 'flex', background: "#C7C7C7", borderBottom: "0px none", padding: "1em" }}>

                        {type === 1 && <CardMedia
                            component="img"
                            sx={{ width: "108px", height: "58px", border: "1px solid" }}
                            image={url}
                            alt="Video Thumnail"
                        />}

                        {/* {type === 1 && <ReactPlayer
                            className='react-player'
                            ref={playerRef} url={url}
                            controls={true}
                            width={"100%"}
                            onEnablePIP={handleEnablePIP} />} */}

                    </Card>

                    <Grid container sx={{ padding: "1em" }} >

                        <Grid item xs={12} md={12}>
                            <Typography component="div" variant="h5">
                                {item.Content}
                            </Typography>
                        </Grid>
                        <Grid item xs={0} md={2}>

                        </Grid>
                        <Grid item xs={12} md={3}>

                        </Grid>

                    </Grid>

                    <Grid container sx={{ padding: "1em" }} columnSpacing={1} rowSpacing={1}>

                        <Grid item xs={12} md={6}>
                            <Button variant="outlined" fullWidth color='firr' onClick={(event) => { HandleClick(event, 0) }} startIcon={<EditIcon></EditIcon>} >Edit Content</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" fullWidth color='firr' >Preview</Button>
                        </Grid>
                    </Grid>

                </Grid>}

                <Divider variant="middle" />

                {item.Extra_Resource.length > 0 &&
                    <Grid item xs={12} sx={{}}>

                        <TableContainer component={Paper} sx={{ background: "#C7C7C7" }}>

                            <Table sx={{}} aria-label="simple table">

                                <TableHead>

                                    <TableRow>

                                        <TableCell align="left">Resource</TableCell>
                                        <TableCell align="left">Resource Content type</TableCell>
                                        <TableCell align="left"></TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>

                                    {item.Extra_Resource.map((row, index) => {

                                        return (<TableRow
                                            sx={{ '&:last-child td, &:last-child th': {} }}
                                            key={`Curriculum-module-lecture-extra_resource-id-${index}`}
                                        >
                                            <TableCell align="left">{row.Resource_Content}</TableCell>

                                            <TableCell align="left">{row.Resource_Content_type}</TableCell>

                                            <TableCell align="left">

                                                <IconButton onClick={(event) => { handleDeleteExtraResource(event, row.Extra_Resource_ID) }}>

                                                    <DeleteIcon color='firr'></DeleteIcon>

                                                </IconButton>

                                            </TableCell>

                                        </TableRow>);

                                    })}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Grid>
                }

                {/* {discription && <Grid item xs={12} sx={{ padding: "1em" }}>

                    <FormControl
                        color='firr'
                        fullWidth
                    >
                        <OutlinedInput color='firr'
                            multiline
                            maxRows={5}
                            fullWidth
                            // value={EditFile}
                            onChange={(event) => { }}
                            placeholder="Add a Description. Include what students will be able to do after completing this lecture. "
                            sx={{ background: "#C7C7C7" }}>

                        </OutlinedInput>

                        <Typography variant='body1' sx={{ marginTop: "1em" }}>Add a Description. Include what students will be able to do after completing this lecture.</Typography>
                    </FormControl>

                    <Button variant="outlined" color='firr' sx={{ marginRight: "1em" }} onClick={(event) => { handleclear(event, 1) }} >Cancel</Button>
                    <Button variant="contained" color='firr' onClick={(event) => { HandleClick(event, 1) }} >Save</Button>

                </Grid>}

                {!discription && <Grid item xs={12} sx={{ margin: "1em" }}>
                    <Button variant="outlined" color='firr' onClick={(event) => { HandleClick(event, 1) }} startIcon={<AddIcon />} >Description</Button>
                </Grid>} */}

                {resource && <Grid item xs={12} sx={{ padding: "1em" }}>

                    <Grid container>

                        {resourceFile === null && <Grid item xs={12}>

                            <FormControl
                                color='firr'
                                fullWidth
                            >
                                <MuiFileInput color='firr'
                                    fullWidth
                                    value={resourceFile}
                                    onChange={handlesetResourceChange}
                                    placeholder="No  File Selected"
                                    sx={{ background: "#C7C7C7" }}
                                />

                                <Typography variant='body1' sx={{ marginTop: "1em" }}>Note: A resource is for any
                                    type of document that can be used to help students in the lecture.
                                    This file is going to be seen as a lecture extra. Make sure everything is legible
                                    and the file size is less than 1 GiB.
                                </Typography>

                            </FormControl>

                            <Button variant="outlined" color='firr' sx={{ marginRight: "1em" }} onClick={(event) => { handleclear(event, 2) }} >Cancel</Button>
                            <Button variant="contained" color='firr' onClick={(event) => { HandleClick(event, 1) }} >Save</Button>

                        </Grid>}

                        {resourceFile !== null && <Grid item xs={12}>

                            <TableContainer component={Paper} sx={{ background: "#C7C7C7" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">FileName</TableCell>
                                            <TableCell align="left">Type</TableCell>
                                            <TableCell align="left">Status</TableCell>

                                            <TableCell align="left"></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{resourceFile.name}</TableCell>
                                            <TableCell align="left">{resourceFile.type}</TableCell>
                                            <TableCell align="left"><CircularProgressWithLabel color='firr' value={Uploadprogress} /></TableCell>

                                            <TableCell align="left">
                                                <IconButton onClick={(event) => { handleclear(event, 3) }}>
                                                    <DeleteIcon color='firr'></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>}

                    </Grid>

                </Grid>}

                {!resource &&
                    <Grid item xs={12} sx={{ margin: "1em" }}>
                        <Button variant="outlined" color='firr' onClick={(event) => { HandleClick(event, 2) }} startIcon={<AddIcon />} >Resources</Button>
                    </Grid>
                }

            </React.Fragment>}

            {Edit && <Grid item xs={12} sx={{ margin: "1em" }}>

                <Grid container >

                    {EditFile === null && <Grid item xs={12}>
                        <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { HandleBack(event) }}>
                            <ArrowBackIosIcon color='firr'></ArrowBackIosIcon>
                        </IconButton>

                        <FormControl
                            color='firr'
                            fullWidth
                            accept=".jpg, .jpeg, .png"
                        >
                            <MuiFileInput color='firr'
                                fullWidth
                                value={EditFile}
                                onChange={handlesetvideoChange}
                                placeholder="No File Selected"
                                sx={{ background: "#C7C7C7" }}
                                accept=".jpg, .jpeg, .png"

                            />
                            <Typography variant='body1' sx={{ marginTop: "1em" }}>
                                Note: All files should be at least 720p(video) and less than 4.0 GB Size.
                            </Typography>

                        </FormControl>

                    </Grid>}

                    {EditFile !== null && <Grid item xs={12}>

                        <TableContainer component={Paper} sx={{ background: "#C7C7C7" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">FileName</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Status</TableCell>

                                        <TableCell align="left"></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{EditFile.name}</TableCell>
                                        <TableCell align="left">{EditFile.type}</TableCell>
                                        <TableCell align="left"><CircularProgressWithLabel color='firr' value={Uploadprogress} /></TableCell>

                                        <TableCell align="left">
                                            <IconButton onClick={(event) => { handleclear(event, 0) }}>
                                                <DeleteIcon color='firr'></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>}

                </Grid>

            </Grid>}

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={errorfilesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error the File Doesnt Fulfill all the Requirments
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfully Edited A Lecture Content
                </Alert>
            </Snackbar>

            <Snackbar open={Extra_Resourcesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfully Added A Lecture Content Extra Resource
                </Alert>
            </Snackbar>

            <Snackbar open={Delete_Extra_Resourcesnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfully Deleted A Lecture Content Extra Resource
                </Alert>
            </Snackbar>

            <Dialog fullScreen={fullScreen} open={openDeleteExtraResourseDialog} onClose={DeleteExtraResourseDialogclose}>

                <DialogTitle sx={{ m: 0, p: 2 }}>

                    <IconButton
                        aria-label="close"
                        onClick={DeleteExtraResourseDialogclose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: "firr",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>


                <DialogContent dividers sx={{ marginTop: "1em" }}>

                    <Grid container>

                        <Grid item xs={12} sx={{ margin: "2em" }}>

                            <Typography sx={{ marginTop: "1em" }}>
                                Are You Sure You Want To Delete?
                            </Typography>

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button color='firr' onClick={DeleteExtraResourseDialogclose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color='firr' onClick={handleDialogDeleteExtraContent}>
                        Delete
                    </Button>

                </DialogActions>

            </Dialog>

        </Grid >

    );

};