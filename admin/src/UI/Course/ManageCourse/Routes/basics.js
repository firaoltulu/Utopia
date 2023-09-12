import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Card,
    CardMedia,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Fab, FormControl, Grid, IconButton,
    InputAdornment, OutlinedInput, Paper, Snackbar, TextField, Typography,
    useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';
import placeholder from "./placeholder.jpg";
import ImageCropComponent from '../Components/Tasks/Basics/ImageCropper';
import { HttpEditCourseContentImage, GetCourse, GetStreamCourseCover } from '../../../../Hooks/request';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', border: "1px solid" }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress color="success" variant="determinate" {...props} sx={{ height: 15, borderRadius: 5, }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};

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
};

// function centerAspectCrop(mediaWidth, mediaHeight, aspect) {

//     return centerCrop(
//         makeAspectCrop(
//             {
//                 unit: '%',
//                 width: 20,
//             },
//             aspect,
//             mediaWidth,
//             mediaHeight,
//         ),
//         mediaWidth,
//         mediaHeight,
//     );
// }
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: "0px",
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
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
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function Course_basics() {

    function Course_Images(props) {

        const { item } = props;

        return (

            <Box sx={{ margin: "0", padding: "0px", }}>

                <Card sx={{ display: 'flex', background: "#C7C7C7", borderBottom: "0px none", padding: "0", width: "100%" }}>

                    {<CardMedia
                        component="img"
                        width="100%" height="366px"
                        sx={{ width: "100%", height: "auto", minWidth: "502px", minHeight: "283px", maxHeight: "366px", maxWidth: "652px", filter: photo1selected ? "blur(8px)" : "blur(0px)" }}
                        // image={url1}
                        src={item}
                        alt="Course Image"
                    />}

                    {photo1selected && <Box sx={{
                        position: "absolute",
                        top: '40%',
                        left: "40%",
                    }}>

                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            color='firr'
                            sx={{
                                animationDuration: '1050ms',
                                position: 'absolute',
                                left: 0,
                            }}
                            size={50}
                            thickness={7}
                        />


                        {/* <CircularProgressWithLabel color="firr" value={Uploadprogresss} /> */}

                    </Box>}

                </Card>

            </Box>

        );

    };

    function Course_Images_large(props) {
        const { item } = props;
        return (

            <Box sx={{ margin: "0", padding: "0px", }}>

                <Card sx={{ display: 'flex', background: "#C7C7C7", borderBottom: "0px none", padding: "0", width: "100%" }}>

                    {<CardMedia
                        component="img"
                        width="100%" height="366px"
                        sx={{ width: "100%", height: "auto", minWidth: "278px", minHeight: "156px", maxHeight: "214px", maxWidth: "380px", filter: photo1selected ? "blur(8px)" : "blur(0px)" }}
                        // image={url1}
                        src={item}
                        alt="Course Image"
                    />}

                    {photo1selected && <Box sx={{
                        position: "absolute",
                        top: '40%',
                        left: "40%",
                    }}>

                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            color='firr'
                            sx={{
                                animationDuration: '1050ms',
                                position: 'absolute',
                                left: 0,
                            }}
                            size={50}
                            thickness={7}
                        />


                        {/* <CircularProgressWithLabel color="firr" value={Uploadprogresss} /> */}

                    </Box>}

                </Card>

            </Box>

        );

    };

    const params = useParams();
    const theme = useTheme();
    const API_URL = process.env.REACT_APP_API_URL;

    const uplg = useMediaQuery(theme.breakpoints.up('lg'));
    const downlg = useMediaQuery(theme.breakpoints.down('lg'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const courseID = params.courseID;

    const [course, setcourse] = React.useState(null);
    const [Image1s, setImage1s] = React.useState([]);

    const defaultimageID = -1;


    const [photo1selected, setphoto1selected] = React.useState(false);



    const [photo1_error_reason1, setphoto1_error_reason1] = React.useState(false);
    const [photo1_error_reason3, setphoto1_error_reason3] = React.useState(false);


    const [reload, setreload] = React.useState(true);


    const [Uploadprogresss, setUploadprogress] = React.useState(0);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const [photo1, setphoto1] = React.useState("");
    const [photo2, setphoto2] = React.useState(null);
    const [photo3, setphoto3] = React.useState(null);
    const [photo4, setphoto4] = React.useState(null);

    const [url1, seturl1] = React.useState("");
    const [url2, seturl2] = React.useState("");
    const [url3, seturl3] = React.useState("");
    const [url4, seturl4] = React.useState("");


    const [tobe_crop_url1, settobe_crop_url1] = React.useState(null);

    const [cropConfig, setCropConfig] = React.useState(
        // default crop config
        {
            unit: '%',
            x: 5,
            y: 5,
            width: 50,
            height: 322,
            // aspect: 16 / 9,
        }
    );

    const [imageToCrop, setImageToCrop] = React.useState(undefined);
    const [croppedImage, setCroppedImage] = React.useState(undefined);

    // function loadeverything(Course) {

    //     if (Course.Image1.length < 0) {

    //         seturl1(`${API_URL}/courses/StreamCourseCover/${defaultimageID}`);

    //     }
    //     if (Course.Image1.length > 0) {
    //         seturl1(`${API_URL}/courses/StreamCourseCover/${Course.Image1[Course.Image1.length - 1].ImageID}`);
    //     }
    //     // if (Course.IntendedLearners.length <= 0) {
    //     //     var locnewobj = [];
    //     //     setIntended(locnewobj);
    //     // }
    //     // if (Course.IntendedLearners.length > 0) {
    //     //     var locnewobj = [];

    //     //     Course.IntendedLearners.map((row, index) => {
    //     //         var newobj = Object.assign({}, {
    //     //             ...row
    //     //         });
    //     //         locnewobj.push(newobj);
    //     //     });
    //     //     setIntended(locnewobj);
    //     // }
    //     else {

    //     }

    // };

    React.useEffect(() => {

        const get = async () => {

            try {

                var newobj = await GetCourse(courseID);

                if (newobj.done) {

                    if (newobj.fetcheddata.data.Course) {

                        if (newobj.fetcheddata.data.Course.Image1.length > 0) {

                            setcourse(newobj.fetcheddata.data.Course);
                            // setImage1s(newobj.fetcheddata.data.Course.Image1);

                            var newarr = [];

                            newobj.fetcheddata.data.Course.Image1.map((row, index) => {
                                const newobjobj = `${API_URL}/courses/StreamCourseCover/${row.ImageID}`;
                                newarr.push(newobjobj);
                            });

                            setImage1s(newarr);

                            // console.log({ newarr });

                        }
                        // loadeverything(newobj.fetcheddata.data.Course);

                    }
                    else {

                    }

                }
                else {
                    // setalerterroopensnackbaropen(true);
                }
            } catch (error) {

                console.log("Error Happen try again");

            }

        }

        get();

    }, [reload]);

    React.useEffect(() => {

        if (Image1s.length > 0) {

            seturl1(Image1s[Image1s.length - 1]);

            // const new_new = Object.assign({}, {
            //     ImageID: Image1s[Image1s.length - 1].ImageID
            // });

            // GetStreamCourseCover(new_new).then((response) => {
            //     if (response.done) {
            //         seturl1(response.url);
            //     }
            // });
        }

    }, [Image1s]);


    // React.useEffect(() => {
    //     if (photo1 !== null) {
    //         var fReader = new FileReader();
    //         fReader.readAsDataURL(photo1);
    //         fReader.onloadend = function (event) {
    //             seturl1(event.target.result);
    //         }
    //     }
    //     if (photo2 !== null) {
    //         var fReader = new FileReader();
    //         fReader.readAsDataURL(photo2);
    //         fReader.onloadend = function (event) {
    //             seturl2(event.target.result);
    //         }
    //     }
    //     if (photo3 !== null) {
    //         var fReader = new FileReader();
    //         fReader.readAsDataURL(photo3);
    //         fReader.onloadend = function (event) {
    //             seturl3(event.target.result);
    //         }
    //     }
    //     if (photo4 !== null) {
    //         var fReader = new FileReader();
    //         fReader.readAsDataURL(photo4);
    //         fReader.onloadend = function (event) {
    //             seturl4(event.target.result);
    //         }
    //     }

    // }, []);


    const handleChange = async (event) => {
        event.preventDefault();

        const value = event.target.value;
        try {
            if (event.target.name === "photo1") {

                let files = event.target.files[0];
                var pattern = /image-*/;
                console.log({ files });
                if (files !== null && files.type.match(pattern)) {

                    const updatecontent = Object.assign({}, {

                        CourseID: courseID,
                        Type: "Image1",
                        newFile: files,
                        setUploadprogress: setUploadprogress

                    });

                    setphoto1selected(true);

                    HttpEditCourseContentImage(updatecontent).then(async (response) => {

                        if (response.done) {

                            setphoto1selected(false);
                            seturl1("");
                            setphoto1_error_reason1(false);
                            setphoto1_error_reason3(false);
                            setphoto1(files.name);
                            setUploadprogress(0);
                            setsnackbaropen(true);
                            setreload(!reload);
                        }
                        else {

                            setUploadprogress(0);

                            if (response.reason === 1) {
                                setphoto1selected(false);
                                setphoto1_error_reason1(true);
                                setphoto1_error_reason3(false);
                                setphoto1("");
                                setUploadprogress(0);
                            }
                            if (response.reason === 3) {

                                // const loccc = async (files) => {
                                //     var fReader = new FileReader();
                                //     fReader.readAsDataURL(files);
                                //     fReader.onloadend = function (event) {
                                //         settobe_crop_url1(event.target.result);
                                //     }
                                // };

                                // const yyyy = await loccc(files);

                                // settobe_crop_url1(files);

                                settobe_crop_url1(URL.createObjectURL(files));

                                setphoto1selected(false);
                                setphoto1_error_reason1(false);
                                setphoto1_error_reason3(true);
                                setphoto1(files.name);
                                setUploadprogress(0);
                                setsnackbaropen(false);

                            }

                        }

                    }).catch((error) => {
                        seterrorsnackbaropen(true);
                    });

                    return;

                }
                else {
                    setphoto1("");
                    seturl1("");
                    seterrorsnackbaropen(true);
                }
            }
            if (event.target.name === "photo2") {
                let files = event.target.files[0];
                var pattern = /image-*/;
                if (files !== null && files.type.match(pattern)) {
                    var fReader = new FileReader();
                    fReader.readAsDataURL(files);
                    fReader.onloadend = function (event) {
                        seturl2(event.target.result);
                    }
                    setphoto2(files);

                    return;
                }
                else {
                    setphoto2(null);
                    seturl2("");
                    seterrorsnackbaropen(true);

                }
            }
            if (event.target.name === "photo3") {
                let files = event.target.files[0];
                var pattern = /image-*/;
                if (files !== null && files.type.match(pattern)) {
                    var fReader = new FileReader();
                    fReader.readAsDataURL(files);
                    fReader.onloadend = function (event) {
                        seturl3(event.target.result);
                    }
                    setphoto3(files);

                    return;
                }
                else {
                    setphoto3(null);
                    seturl3("");
                    seterrorsnackbaropen(true);
                }
            }
            if (event.target.name === "photo4") {
                let files = event.target.files[0];
                var pattern = /image-*/;
                if (files !== null && files.type.match(pattern)) {
                    var fReader = new FileReader();
                    fReader.readAsDataURL(files);
                    fReader.onloadend = function (event) {
                        seturl4(event.target.result);
                    }
                    setphoto4(files);
                    return;
                }
                else {
                    setphoto4(null);
                    seturl4("");
                    seterrorsnackbaropen(true);
                }
            }
        } catch (error) {

        }

    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    const handleurl1nextclick = (next, active) => {
        // seturl1(`${API_URL}/courses/StreamCourseCover/${Image1s[Image1s.length - (1 + next)].ImageID}`);
    };

    const handleurl1pervclick = (prev, active) => {
        // seturl1(`${API_URL}/courses/StreamCourseCover/${Image1s[Image1s.length - (1 + prev)].ImageID}`);
    };

    const handleCropClose = () => {
        setphoto1_error_reason3(false);
    };

    return (

        <Grid container sx={{ border: "1px solid", padding: "1em", minWidth: "542px", }}>

            <Grid item xs={12}>
                <Typography variant='h4'>Course landing page</Typography>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "3em", marginTop: "1em" }}>

                <Typography variant="subtitle1">Your course landing page is crucial.
                    If it’s done right, it can also help you gain visibility in search engines like Google.
                    As you complete this section, think about creating a compelling Course Landing Page that
                    demonstrates why someone would want to enroll in your course.
                </Typography>

            </Grid>

            <Grid item xs={12}>

                <Grid container spacing={2}>

                    <Grid item xs={12} sx={{ borderBottom: "1px solid", padding: "2em" }} >

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={5} sx={{ padding: "2em", marginTop: "2em" }}>

                                <Typography variant="subtitle1">Upload your course image here. It must meet our course image quality standards
                                    to be accepted. Important guidelines:  480x270 pixels; .jpg, .jpeg,. gif, or .png.
                                    no text on the image.</Typography>

                                <TextField
                                    disabled={photo1selected}
                                    name="photo1"
                                    value={photo1}
                                    onChange={handleChange}
                                    placeholder='Insert File Here.'
                                    fullWidth
                                    readOnly
                                    InputProps={{
                                        endAdornment: (
                                            <input
                                                name="photo1"
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleChange}
                                                tabIndex={-1}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    opacity: 0,
                                                }} />
                                        ),
                                    }} />


                                {photo1selected && <Box sx={{ width: '100%', marginTop: "1em" }}>
                                    <LinearProgressWithLabel value={Uploadprogresss} />
                                </Box>}


                                {photo1_error_reason1 && <Typography variant='subtitle2' color={"red"}>The uploaded image is too small.
                                    Minimum image size is 750x422px.Please upload a larger image.</Typography>}

                                {photo1_error_reason3 && <Typography variant='subtitle2' color={"red"}>The uploaded image is too big.
                                    crop the image size is to 750x422px.Please upload a larger image.</Typography>}

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <Typography variant="h5"> Course Image 480x270 </Typography>

                                {matchesMD && !photo1_error_reason3 && <React.Fragment>
                                    {Image1s.length > 0 &&
                                        <Carousel
                                            autoPlay={false}
                                            height="auto"
                                            sx={{
                                                // border: "1px solid",
                                                // borderRadius: "0.5em",
                                                // width: "100%",
                                                // maxWidth: "400px",
                                                // height: "auto",
                                                // width: "358px",
                                                // height: "422px",
                                                width: "100%",
                                                height: "390px",
                                                minWidth: "502px",
                                                maxWidth: "652px",
                                                minHeight: "320px",
                                                maxHeight: "555px",
                                                // maxHeight: "366px",

                                            }}
                                            indicatorIconButtonProps={{
                                                style: {
                                                    paddingTop: "0.1em",
                                                    paddingBottom: "0.1em"
                                                }
                                            }}
                                            next={(next, active) => handleurl1nextclick(next, active)}
                                            prev={(prev, active) => handleurl1pervclick(prev, active)}
                                        >
                                            {
                                                Image1s.map((item, i) => <Course_Images key={i} item={item} />)
                                            }
                                        </Carousel>

                                    }
                                    {Image1s.length <= 0 &&
                                        <Course_Images item={placeholder} />
                                    }
                                </React.Fragment>
                                }

                                {!matchesMD && !photo1_error_reason3 && <React.Fragment>
                                    {Image1s.length > 0 &&
                                        <Carousel
                                            autoPlay={false}
                                            width="380px"
                                            height="230px"
                                            sx={{
                                                //  border: "1px solid",
                                                // borderRadius: "0.5em",
                                                // maxWidth: "750px",
                                                // maxHeight: "450px",
                                                width: "100%",
                                                maxWidth: "380px",
                                                minWidth: "278px",
                                                minHeight: "166px",
                                                height: "auto",
                                            }}

                                            indicatorIconButtonProps={{
                                                style: {
                                                    paddingTop: "0.1em",
                                                    paddingBottom: "0.1em"
                                                }
                                            }}

                                            next={(next, active) => handleurl1nextclick(next, active)}
                                            prev={(prev, active) => handleurl1pervclick(prev, active)}

                                        >

                                            {
                                                Image1s.map((item, i) => <Course_Images_large key={i} item={item} />)
                                            }

                                        </Carousel>
                                    }
                                    {Image1s.length <= 0 &&
                                        <Course_Images_large item={placeholder} />
                                    }
                                </React.Fragment>
                                }

                                {/* {<BootstrapDialog fullScreen={matchesMD} onClose={handleCropClose} open={photo1_error_reason3 && tobe_crop_url1 !== null}>

                                    <BootstrapDialogTitle onClose={handleCropClose}>Crop The Image</BootstrapDialogTitle>

                                    <DialogContent id='diaaaaaaaaaaa'
                                        sx={{
                                            paddingLeft: "0", border: "1px solid",
                                            ".MuiDialogContent-root": {
                                                padding: "0px",
                                            }
                                        }}>
                                        <div style={{ width: '500px', height: '300px', border: "1px solid red" }}>
                                            <ImageCropComponent width={100} height={100}
                                                imgURL={tobe_crop_url1}
                                            // onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                                            />
                                        </div>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button autoFocus variant="outlined" color='firr'>Save</Button>
                                    </DialogActions>

                                </BootstrapDialog>} */}

                            </Grid>

                            {photo1_error_reason3 && tobe_crop_url1 !== null && <Grid item xs={12} md={12}>

                                {photo1_error_reason3 && tobe_crop_url1 !== null &&
                                    <div
                                        width="500px"
                                        height="450px"
                                        style={{
                                            position: 'relative',
                                            minWidth: '300px', maxWidth: "500px",
                                            maxHeight: "450px", minHeight: "250px",
                                            border: "1px solid red"
                                        }}
                                    >

                                        <ImageCropComponent
                                            imageSrc={tobe_crop_url1}
                                        // onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                                        />

                                    </div>
                                }

                            </Grid>}

                        </Grid>

                    </Grid>

                    {/* <Grid item xs={12} sx={{ borderBottom: "1px solid", padding: "2em" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Typography variant="h5">Enter Course Photo 240x135</Typography>
                                <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-photp-Form-control`}>
                                    <OutlinedInput
                                        id={`photo2`}
                                        name={`photo2`}
                                        type={'file'}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Typography variant="h5"> Photo 240x135</Typography>
                                <Box sx={{ width: 240, height: 135, border: "1px solid" }}
                                    component="img"
                                    alt="Course Photo 240x135"
                                    alignItems={"center"}
                                    src={url2}
                                >
                                </Box>

                            </Grid>
                        </Grid>
                    </Grid> */}

                    {/* <Grid item xs={12} sx={{ borderBottom: "1px solid" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Typography variant="h5">Enter Course Photo 125x100</Typography>
                                <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-photo-Form-control`}>
                                    <OutlinedInput
                                        id={`photo3`}
                                        name={`photo3`}
                                        type={'file'}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Typography variant="h5"> Photo 125x100</Typography>
                                <Box sx={{ width: 125, height: 100, border: "1px solid" }}
                                    component="img"
                                    alt="Course Photo 125x100"
                                    alignItems={"center"}
                                    src={url3}
                                >
                                </Box>

                            </Grid>
                        </Grid>
                    </Grid> */}

                    {/* <Grid item xs={12} sx={{ borderBottom: "1px solid" }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Typography variant="h5">Enter Course Photo 100x100</Typography>
                                <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-photo-Form-control`}>
                                    <OutlinedInput
                                        id={`photo4`}
                                        name={`photo4`}
                                        type={'file'}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Typography variant="h5"> Photo 100x100</Typography>
                                <Box sx={{ width: 100, height: 100, border: "1px solid" }}
                                    component="img"
                                    alt="Course Photo 100x100"
                                    alignItems={"center"}
                                    src={url4}
                                >
                                </Box>

                            </Grid>
                        </Grid>
                    </Grid> */}

                </Grid>

            </Grid>

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Added New Course Image
                </Alert>
            </Snackbar>

        </Grid >

    );

};


