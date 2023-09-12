import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import {
    Alert,
    Box,
    Divider,
    FormControl,
    Grid, IconButton,
    LinearProgress,
    Paper, Snackbar,
    Typography,
    alpha,
    useTheme
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MuiFileInput } from 'mui-file-input';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { HttpAddCurriculumModuleLectureItemContent } from '../../../../../../../Hooks/request';

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


export default function AddContent(props) {
    const { item, CourseID, CurriculumID, ModuleID,
        reload, setreload, addcontentdraw, setaddcontentdraw } = props;

    const [videofile, setvideoFile] = React.useState(null);
    const [documentfile, setdocumentfile] = React.useState(null);
    const [addvideo, setaddvideo] = React.useState(false);
    const [adddocument, setadddocument] = React.useState(false);
    const [Uploadprogresss, setUploadprogress] = React.useState(0);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);
    const [errorfilesnackbaropen, seterrorfilesnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {

    }, []);

    const HandleAddContent = (event, which) => {
        if (which === 0) {
            setaddvideo(true);
            setadddocument(false);
        }
        if (which === 1) {
            setaddvideo(false);
            setadddocument(true);
        }

    }

    const handlesetvideoChange = async (newFile) => {
        var pattern = /video*/;
        console.log({ newFile });
        if (newFile.type.match(pattern) && newFile.size <= 4000000000) {
        
            const newobj = Object.assign({}, {
                LectureID: item.LectureID,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                newFile: newFile,
                Type: "Video_Content",
                setUploadprogress
            });

            setvideoFile(newFile);

            HttpAddCurriculumModuleLectureItemContent(newobj).then((response) => {
                if (response.done) {

                    setreload(!reload);
                    setsnackbaropen(true);
                    setvideoFile(null);
                    setaddcontentdraw(!addcontentdraw);

                } else {
                    setvideoFile(null);
                    seterrorsnackbaropen(true);
                }
            }).catch((error) => {
                seterrorsnackbaropen(true);
            });


        } else {
            seterrorfilesnackbaropen(true);
        }

    };

    const handlesetdocumentChange = async (newFile) => {
        var pattern = /video*/;
        console.log({ newFile });
        if (newFile.type === "application/pdf" && newFile.size <= 4000000000) {

            const newobj = Object.assign({}, {
                LectureID: item.LectureID,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
                newFile: newFile,
                Type: "Resource_Content",
                setUploadprogress
            });

            console.log({ newobj });

            setdocumentfile(newFile);
            HttpAddCurriculumModuleLectureItemContent(newobj).then((response) => {
                if (response.done) {

                    setreload(!reload);
                    setsnackbaropen(true);
                    setdocumentfile(null);
                    setaddcontentdraw(!addcontentdraw);

                } else {

                    seterrorsnackbaropen(true);
                    setdocumentfile(null);
                }
            }).catch((err) => {
                seterrorsnackbaropen(true);
            });


        } else {
            seterrorfilesnackbaropen(true);
        }
    };

    const handleclear = (newFile, which) => {
        if (which === 0) {
            setvideoFile(null);
        }
        if (which === 1) {
            setdocumentfile(null);
        }
    };

    const HandleBack = (event) => {
        setaddvideo(false);
        setadddocument(false);
    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
        seterrorfilesnackbaropen(false);
    };
    

    return (

        <Grid container>

            {(!addvideo && !adddocument) && <React.Fragment>

                <Grid item xs={12} sx={{ textAlign: "center" }}>

                    <Typography variant='body1'>
                        Select the main type of content. It can be Video, Documents and PDF.
                    </Typography>

                </Grid>

                {<Grid item xs={12} sx={{ margin: "1em" }}>

                    <Grid container spacing={5} >

                        <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <Paper elevation={3}
                                onClick={(event) => { HandleAddContent(event, 0) }}
                                sx={{
                                    border: "1px solid",
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                        cursor: "pointer"
                                    },

                                }}
                            >
                                <Box sx={{ padding: "1em" }}>
                                    <PlayCircleFilledWhiteIcon fontSize='large' sx={{ marginBottom: "1em" }}></PlayCircleFilledWhiteIcon>
                                    <Divider></Divider>
                                    <Typography variant='body1'>
                                        Video
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <Paper elevation={3}
                                onClick={(event) => { HandleAddContent(event, 1) }}
                                sx={{
                                    border: "1px solid",
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
                                        cursor: "pointer"
                                    },
                                }}
                            >
                                <Box sx={{ padding: "1em" }}>
                                    <ArticleIcon fontSize='large' sx={{ marginBottom: "1em" }}></ArticleIcon>
                                    <Divider></Divider>
                                    <Typography variant='body1'>
                                        Documents & PDF
                                    </Typography>
                                </Box>

                            </Paper>
                        </Grid>


                    </Grid>

                </Grid>}

            </React.Fragment>}

            {addvideo && <Grid item xs={12} sx={{ margin: "1em" }}>

                <Grid container >
                    {videofile === null && <Grid item xs={12}>
                        <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { HandleBack(event) }}>
                            <ArrowBackIosIcon color='firr'></ArrowBackIosIcon>
                        </IconButton>

                        <FormControl
                            color='firr'
                            fullWidth
                        >
                            <MuiFileInput color='firr' fullWidth
                                value={videofile} onChange={handlesetvideoChange}
                                placeholder="No Video File Selected"
                                sx={{ background: "#C7C7C7" }}
                            />
                            <Typography variant='body1' sx={{ marginTop: "1em" }}>Note: All files should be at least 720p and less than 4.0 GB.</Typography>
                        </FormControl>

                    </Grid>}

                    {videofile !== null && <Grid item xs={12}>

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
                                        <TableCell align="left">{videofile.name}</TableCell>
                                        <TableCell align="left">{videofile.type}</TableCell>
                                        <TableCell align="left"><CircularProgressWithLabel color='firr' value={Uploadprogresss} /></TableCell>

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

            {adddocument && <Grid item xs={12} sx={{ margin: "1em" }}>

                <Grid container >
                    {documentfile === null && <Grid item xs={12}>
                        <IconButton sx={{ marginBottom: "1em" }} onClick={(event) => { HandleBack(event) }}>
                            <ArrowBackIosIcon color='firr'></ArrowBackIosIcon>
                        </IconButton>

                        <FormControl
                            color='firr'
                            fullWidth
                        >
                            <MuiFileInput color='firr' fullWidth
                                value={documentfile} onChange={handlesetdocumentChange}
                                placeholder="No PDF File Selected"
                                sx={{ background: "#C7C7C7" }}
                            />
                            <Typography variant='body1' sx={{ marginTop: "1em" }}>Note: All files should be Pdf Format and less than 4.0 GB.</Typography>
                        </FormControl>

                    </Grid>}

                    {documentfile !== null && <Grid item xs={12}>

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
                                        <TableCell align="left">{documentfile.name}</TableCell>
                                        <TableCell align="left">{documentfile.type}</TableCell>
                                        <TableCell align="left"><CircularProgressWithLabel color='firr' value={Uploadprogresss} /></TableCell>

                                        <TableCell align="left">
                                            <IconButton onClick={(event) => { handleclear(event, 1) }}>
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
                    You Have Successfullly Added A Lecture Content
                </Alert>
            </Snackbar>

        </Grid>

    );

};

