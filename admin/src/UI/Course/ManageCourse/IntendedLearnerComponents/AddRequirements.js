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

const DEFAULT_LOCAL_REQUIRMENT_NUMBER = 100;

export default function AddRequirements(props) {

    const { Languages, Requirements, setRequirements, sethavebeenchange,
        donereload, setdonereload } = props;
    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [localreload, setlocalreload] = React.useState(false);
    const [SelectedLanguageID, setSelectedLanguageID] = React.useState(-1);

    const [Requirementsreload, setRequirementsreload] = React.useState(false);

    const [localRequirements, setlocalRequirements] = React.useState([]);

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

            if (Requirements.length <= 0) {

                var locnewobj = [];
                var defadd = 0;
                Languages.map((row, index) => {

                    for (var i = 0; i <= 2; i++) {

                        var localobj = Object.assign({}, {
                            Requirement: "",
                            RequirementID: DEFAULT_LOCAL_REQUIRMENT_NUMBER + defadd,
                            LanguageID: row.LanguageID
                        });

                        locnewobj.push(localobj);
                        defadd++;
                    }

                });

                setRequirements(locnewobj);
                setRequirementsreload(!Requirementsreload);

            }

            setdonereload(false);
        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (SelectedLanguageID > -1 && Requirements.length > 0) {

            var inlanlenght = 0;

            Requirements.map((inrow, inindex) => {
                if (inrow.LanguageID === SelectedLanguageID) {
                    inlanlenght++;
                }
            });

            if (inlanlenght < 3) {

                const foundRequirement = Requirements.reduce((rowx, rowy) => {

                    if (rowx.RequirementID > rowy.RequirementID) {
                        return rowx;
                    }
                    else {
                        return rowy;
                    }

                });

                const RequirementID = foundRequirement.RequirementID + 1;

                for (var i = 0; i < 3 - inlanlenght; i++) {

                    var localobj = Object.assign({}, {
                        Requirement: "",
                        RequirementID: RequirementID + i,
                        LanguageID: SelectedLanguageID
                    });

                    Requirements.push(localobj);
                }

            }
            setRequirementsreload(!Requirementsreload);
        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (Requirements.length > 0) {

            var temp = Requirements.length;

            var locnewobj = [];

            for (var i = 0; i < temp; i++) {

                var localobj = Object.assign({}, {
                    show: false,
                });

                locnewobj.push(localobj);
            }

            setlocalRequirements(locnewobj);

        }

    }, [Requirementsreload]);

    React.useEffect(() => {

        if (localRequirements.length !== Requirements.length) {
            setRequirementsreload(!Requirementsreload);
        }

    }, [localRequirements]);


    const HandleAddResponse = (event) => {

        var inlanlenght = 0;

        Requirements.map((inrow, inindex) => {
            if (inrow.LanguageID === SelectedLanguageID) {
                inlanlenght++;
            }
        });

        if (inlanlenght < 5) {

            const foundRequirement = Requirements.reduce((rowx, rowy) => {
                if (rowx.RequirementID > rowy.RequirementID) {
                    return rowx;
                }
                else {
                    return rowy;
                }
            });

            const RequirementID = foundRequirement.RequirementID + 1;

            Requirements.push({
                Requirement: "",
                RequirementID: RequirementID,
                LanguageID: SelectedLanguageID,
            });

            localRequirements.push({ show: false });
            setlocalreload(!localreload);

        }
        else {
            setAddErrorsnackbaropen(true);
        }

    };

    const HandleRequirementChange = (event, RequirementID = -1) => {
        event.preventDefault();
        const value = event.target.value;
        if (RequirementID !== -1) {

            const foundRequirement = Requirements.find((row, index) => {
                if (row.RequirementID === RequirementID) {
                    return row;
                }
                else {
                    return null;
                }
            });

            if (foundRequirement) {

                foundRequirement.Requirement = value;
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

    const HandleRequirementLeave = async (event, RequirementID = -1, index = -1) => {
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
        localRequirements[index].show = true;
        setlocalreload(!localreload);
    };

    const handlemouseleave = (event, index) => {
        localRequirements[index].show = false;
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
                                {option.LanguageID}.{option.title}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

            </Grid>}

            <Grid item xs={12} md={12}>

                <React.Fragment>

                    <Grid container sx={{}}>

                        {localRequirements.length === Requirements.length && Requirements.map((row, index) => {

                            if (row.LanguageID === SelectedLanguageID) {

                                return (< Grid item xs={12} md={12} sx={{ height: "4em" }} key={`Course-add-Requirment-index-${index}`}>

                                    <Grid container sx={{ padding: "1em" }}
                                        onMouseEnter={(event) => { handlemouseover(event, index) }}
                                        onMouseLeave={(event) => { handlemouseleave(event, index) }}>

                                        <Grid item xs={10} md={8} sx={{}} >

                                            <FormControl
                                                color='firr'
                                                fullWidth

                                            >
                                                <OutlinedInput

                                                    id='Add-Requirement'
                                                    name='Add-Requirement'
                                                    color='firr' fullWidth
                                                    value={row.Requirement}
                                                    onBlur={(event) => { HandleRequirementLeave(event, row.RequirementID, index) }}
                                                    onChange={(event) => { HandleRequirementChange(event, row.RequirementID, index) }}
                                                    placeholder='Example: A Mac or Windows Computer'
                                                    sx={{ background: "#f1eeee", fontWeight: "400", fontSize: "16", height: "3em" }}>

                                                </OutlinedInput>


                                            </FormControl>

                                        </Grid>

                                        {localRequirements[index].show && row.Requirement !== "" && <Grid item xs={1} md={2}>

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