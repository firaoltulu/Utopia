import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Alert,
    FormControl, Grid,
    MenuItem, OutlinedInput, Select,
    Snackbar,
    useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const DEFAULT_LOCAL_INTENDED_NUMBER = 100;

export default function AddIntendedLearners(props) {

    const { IntendedLearners, setIntendedLearners, Languages,
        sethavebeenchange, donereload, setdonereload } = props;

    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [Intendedreload, setIntendedreload] = React.useState(false);
    const [localreload, setlocalreload] = React.useState(false);
    const [SelectedLanguageID, setSelectedLanguageID] = React.useState(-1);

    const [localIntendedLearners, setlocalIntendedLearners] = React.useState([]);

    const [AddErrorsnackbaropen, setAddErrorsnackbaropen] = React.useState(false);

    React.useEffect(() => {

        if (Languages.length > 0) {
            if (SelectedLanguageID === -1) {
                var id = Languages[0].LanguageID;
                setSelectedLanguageID(id);
            }
        }

    }, [Languages]);

    React.useEffect(() => {

        if (SelectedLanguageID > -1 && donereload === true) {

            if (IntendedLearners.length <= 0) {

                var locnewobj = [];
                var defadd = 0;
                Languages.map((row, index) => {

                    for (var i = 0; i <= 2; i++) {

                        var localobj = Object.assign({}, {

                            IntendedLearnerID: DEFAULT_LOCAL_INTENDED_NUMBER + defadd,
                            IntendedLearner: "",
                            LanguageID: row.LanguageID

                        });

                        locnewobj.push(localobj);
                        defadd++;
                    }

                });

                setIntendedLearners(locnewobj);
                setIntendedreload(!Intendedreload);

            }

            setdonereload(false);
        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (SelectedLanguageID > -1 && IntendedLearners.length > 0) {

            var inlanlenght = 0;

            IntendedLearners.map((inrow, inindex) => {
                if (inrow.LanguageID === SelectedLanguageID) {
                    inlanlenght++;
                }
            });

            if (inlanlenght < 3) {

                const foundIntendedLearner = IntendedLearners.reduce((rowx, rowy) => {

                    if (rowx.IntendedLearnerID > rowy.IntendedLearnerID) {
                        return rowx;
                    }
                    else {
                        return rowy;
                    }

                });

                const IntendedLearnerID = foundIntendedLearner.IntendedLearnerID + 1;

                for (var i = 0; i < 3 - inlanlenght; i++) {

                    var localobj = Object.assign({}, {
                        IntendedLearner: "",
                        IntendedLearnerID: IntendedLearnerID + i,
                        LanguageID: SelectedLanguageID
                    });

                    IntendedLearners.push(localobj);
                }

            }
            setIntendedreload(!Intendedreload);

        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (IntendedLearners.length > 0) {

            var temp = IntendedLearners.length;

            var locnewobj = [];

            for (var i = 0; i < temp; i++) {

                var localobj = Object.assign({}, {
                    show: false,
                });

                locnewobj.push(localobj);
            }

            setlocalIntendedLearners(locnewobj);

        }

    }, [Intendedreload, donereload]);

    React.useEffect(() => {

        if (localIntendedLearners.length !== IntendedLearners.length) {
            setIntendedreload(!Intendedreload);
        }

    }, [localIntendedLearners]);


    const HandleAddResponse = (event) => {

        var inlanlenght = 0;

        IntendedLearners.map((inrow, inindex) => {
            if (inrow.LanguageID === SelectedLanguageID) {
                inlanlenght++;
            }
        });

        if (inlanlenght < 5) {

            const foundIntendedLearner = IntendedLearners.reduce((rowx, rowy) => {
                if (rowx.IntendedLearnerID > rowy.IntendedLearnerID) {
                    return rowx;
                }
                else {
                    return rowy;
                }
            });

            const IntendedLearnerID = foundIntendedLearner.IntendedLearnerID + 1;

            IntendedLearners.push({
                IntendedLearner: "",
                IntendedLearnerID: IntendedLearnerID,
                LanguageID: SelectedLanguageID,
            });

            localIntendedLearners.push({ show: false });
            setlocalreload(!localreload);

        }
        else {
            setAddErrorsnackbaropen(true);
        }
    };

    const HandleIntendedLearnerChange = (event, IntendedLearnerID = -1, index = -1) => {
        event.preventDefault();
        const value = event.target.value;
        if (IntendedLearnerID !== -1) {

            const foundIntendedLearner = IntendedLearners.find((row, index) => {
                if (row.IntendedLearnerID === IntendedLearnerID) {
                    return row;
                }
                else {
                    return null;
                }
            });

            if (foundIntendedLearner) {

                foundIntendedLearner.IntendedLearner = value;
                setlocalreload(!localreload);
                sethavebeenchange(true);
            }
            else {
                return;
            }

        }
        else {
            return;
        }
    };

    const HandleIntendedLearnerLeave = async (event, IntendedLearnerID = -1, index = -1) => {
        event.preventDefault();
    };

    const handleLanguageSelectChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (event.target.name === "LanguageID") {
            setSelectedLanguageID(value);
        }
    };

    const handlemouseover = (event, index) => {
        localIntendedLearners[index].show = true;
        setlocalreload(!localreload);
    };

    const handlemouseleave = (event, index) => {
        localIntendedLearners[index].show = false;
        setlocalreload(!localreload);
    };

    const handlesnackClose = (event) => {
        setAddErrorsnackbaropen(false);

    };

    return (

        <Grid container sx={{}}>

            {SelectedLanguageID === -1 && <Grid item xs={10} md={10} sx={{ marginBottom: "2em" }}>

                <Stack spacing={1}>
                    <Skeleton variant="rounded" width="100%" height={60} sx={{ marginBottom: "2em" }} />
                    <Skeleton variant="rounded" width="100%" height={60} />
                    <Skeleton variant="rounded" width="100%" height={60} />
                </Stack>

            </Grid>}

            {SelectedLanguageID > -1 && <Grid item xs={10} md={10} sx={{ marginBottom: "2em", margin: "1em" }}>

                <FormControl fullWidth color='firr'>

                    <Select
                        onChange={handleLanguageSelectChange}
                        labelId="LanguageID"
                        id="LanguageID"
                        name='LanguageID'
                        value={SelectedLanguageID}
                        sx={{ background: "#f1eeee", fontWeight: "400", fontSize: "16", height: "3em" }}
                    >
                        {Languages.map((option, index) => (
                            <MenuItem key={option.LanguageID} value={option.LanguageID}>
                                {option.LanguageID}.        {option.title}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

            </Grid>}

            <Grid item xs={12} md={12}>

                <React.Fragment>

                    <Grid container sx={{}}>

                        {localIntendedLearners.length === IntendedLearners.length && IntendedLearners.map((row, index) => {

                            if (row.LanguageID === SelectedLanguageID) {

                                return (< Grid item xs={12} md={12} sx={{ height: "4em" }} key={`Course-add-Intended_learners-index-${index}`}>

                                    <Grid container sx={{ padding: "1em" }}
                                        onMouseEnter={(event) => { handlemouseover(event, index) }}
                                        onMouseLeave={(event) => { handlemouseleave(event, index) }}>

                                        <Grid item xs={10} md={8} sx={{}} >

                                            <FormControl
                                                color='firr'
                                                fullWidth

                                            >
                                                <OutlinedInput

                                                    id='Add-IntendedLearner'
                                                    name='Add-IntendedLearner'
                                                    color='firr' fullWidth
                                                    value={row.IntendedLearner}
                                                    onBlur={(event) => { HandleIntendedLearnerLeave(event, row.IntendedLearnerID, index) }}
                                                    onChange={(event) => { HandleIntendedLearnerChange(event, row.IntendedLearnerID, index) }}
                                                    placeholder='Example: Beginner'
                                                    sx={{ background: "#f1eeee", fontWeight: "400", fontSize: "16", height: "3em" }}>

                                                </OutlinedInput>


                                            </FormControl>

                                        </Grid>

                                        {localIntendedLearners[index].show && row.IntendedLearner !== "" && <Grid item xs={1} md={2}>

                                            <Button variant="outlined" color='firr' sx={{ height: "3em" }} onClick={(event) => { }}>
                                                <DeleteIcon color='firr'></DeleteIcon>
                                            </Button>

                                        </Grid>}

                                    </Grid>

                                </Grid>)
                            }

                        })}

                        {<Grid item xs={12} md={12} sx={{ marginTop: "2em" }}>
                            <Button color="firr" onClick={(event) => { HandleAddResponse(event) }} startIcon={<AddIcon></AddIcon>}>Add More to Your Response</Button>
                        </Grid>}

                    </Grid>

                </React.Fragment >

            </Grid>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={AddErrorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error: Maximum Lenght Reached...
                </Alert>
            </Snackbar>


        </Grid >

    );

}
