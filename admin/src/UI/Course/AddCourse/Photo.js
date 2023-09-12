import { Alert, Divider, FormControl, OutlinedInput, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import * as React from "react";

const defaultId = 100;

export default function AddPhotos(props) {

    const { photo1, setphoto1, photo2, setphoto2, photo3, setphoto3, photo4, setphoto4 } = props;

    const [url1, seturl1] = React.useState("");
    const [url2, seturl2] = React.useState("");
    const [url3, seturl3] = React.useState("");
    const [url4, seturl4] = React.useState("");

    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    const theme = useTheme();

    React.useEffect(() => {
        if (photo1 !== null) {
            var fReader = new FileReader();
            fReader.readAsDataURL(photo1);
            fReader.onloadend = function (event) {
                seturl1(event.target.result);
            }
        }
        if (photo2 !== null) {
            var fReader = new FileReader();
            fReader.readAsDataURL(photo2);
            fReader.onloadend = function (event) {
                seturl2(event.target.result);
            }
        }
        if (photo3 !== null) {
            var fReader = new FileReader();
            fReader.readAsDataURL(photo3);
            fReader.onloadend = function (event) {
                seturl3(event.target.result);
            }
        }
        if (photo4 !== null) {
            var fReader = new FileReader();
            fReader.readAsDataURL(photo4);
            fReader.onloadend = function (event) {
                seturl4(event.target.result);
            }
        }

    }, []);


    const handleChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "photo1") {
            let files = event.target.files[0];
            var pattern = /image-*/;
            if (files !== null && files.type.match(pattern)) {
                var fReader = new FileReader();
                fReader.readAsDataURL(files);
                fReader.onloadend = function (event) {
                    seturl1(event.target.result);
                }
                setphoto1(files);

                return;
            }
            else {
                setphoto1(null);
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

    };

    const handlesnackClose = (event) => {
        seterrorsnackbaropen(false);
    };

    return (

        <Card variant="outlined">

            <Grid container component="div">

                <Grid item xs={12}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sx={{ borderBottom: "1px solid", padding:"2em" }} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h5">Enter Course Photo 480x270</Typography>
                                    <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-course-Form-control`}>
                                        {/* <InputLabel htmlFor={`title`}>Enter Course Photo 480x270</InputLabel> */}
                                        <OutlinedInput
                                            id={`photo1`}
                                            name={`photo1`}
                                            type={'file'}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                </Grid>

                                <Grid item xs={12} md={5}>
                                    <Typography variant="h5"> Photo 480x270</Typography>
                                    <Box sx={{ width: 480, height: 270, border: "1px solid" }}
                                        component="img"
                                        alt="Course Photo 480x270"
                                        alignItems={"center"}
                                        src={url1}
                                    >
                                    </Box>

                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} sx={{ borderBottom: "1px solid",padding:"2em" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h5">Enter Course Photo 240x135</Typography>
                                    <FormControl sx={{ marginTop: "1em" }} fullWidth required color="firr" variant="outlined" key={`Add-photp-Form-control`}>
                                        {/* <InputLabel htmlFor={`title`}>Enter Course Photo 480x270</InputLabel> */}
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
                        </Grid>

                        <Divider color="firr"></Divider>
                        <Grid item xs={12} sx={{ borderBottom: "1px solid" }}>
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
                        </Grid>

                        <Divider color="firr"></Divider>
                        <Grid item xs={12} sx={{ borderBottom: "1px solid" }} >
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
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        

            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Wrong File type.
                </Alert>
            </Snackbar>

        </Card >

    );


}