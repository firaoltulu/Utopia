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

const DEFAULT_LOCAL_GOAL_NUMBER = 100;

export default function AddGoals(props) {

    const { Languages, Goals, setGoals, sethavebeenchange,
        donereload, setdonereload } = props;
    const params = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [localreload, setlocalreload] = React.useState(false);
    const [SelectedLanguageID, setSelectedLanguageID] = React.useState(-1);

    const [Goalsreload, setGoalsreload] = React.useState(false);

    const [localGoals, setlocalGoals] = React.useState([]);

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

            if (Goals.length <= 0) {

                var locnewobj = [];
                var defadd = 0;
                Languages.map((row, index) => {

                    for (var i = 0; i <= 4; i++) {

                        var localobj = Object.assign({}, {
                            Goal: "",
                            GoalID: DEFAULT_LOCAL_GOAL_NUMBER + defadd,
                            LanguageID: row.LanguageID
                        });

                        locnewobj.push(localobj);
                        defadd++;
                    }

                });

                setGoals(locnewobj);
                setGoalsreload(!Goalsreload);

            }

            setdonereload(false);
        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (SelectedLanguageID > -1 && Goals.length > 0) {

            var inlanlenght = 0;

            Goals.map((inrow, inindex) => {
                if (inrow.LanguageID === SelectedLanguageID) {
                    inlanlenght++;
                }
            });

            if (inlanlenght < 5) {

                const foundGoal = Goals.reduce((rowx, rowy) => {

                    if (rowx.GoalID > rowy.GoalID) {
                        return rowx;
                    }
                    else {
                        return rowy;
                    }

                });

                const GoalID = foundGoal.GoalID + 1;

                for (var i = 0; i < 5 - inlanlenght; i++) {

                    var localobj = Object.assign({}, {
                        Goal: "",
                        GoalID: GoalID + i,
                        LanguageID: SelectedLanguageID
                    });

                    Goals.push(localobj);
                }

            }
            setGoalsreload(!Goalsreload);
        }

    }, [SelectedLanguageID, donereload]);

    React.useEffect(() => {

        if (Goals.length > 0) {

            var temp = Goals.length;

            var locnewobj = [];

            for (var i = 0; i < temp; i++) {

                var localobj = Object.assign({}, {
                    show: false,
                });

                locnewobj.push(localobj);
            }

            setlocalGoals(locnewobj);

        }

    }, [Goalsreload]);

    React.useEffect(() => {

        if (localGoals.length !== Goals.length) {
            setGoalsreload(!Goalsreload);
        }

    }, [localGoals]);

    const HandleAddResponse = (event) => {

        var inlanlenght = 0;

        Goals.map((inrow, inindex) => {
            if (inrow.LanguageID === SelectedLanguageID) {
                inlanlenght++;
            }
        });

        if (inlanlenght < 15) {

            const foundGoal = Goals.reduce((rowx, rowy) => {
                if (rowx.GoalID > rowy.GoalID) {
                    return rowx;
                }
                else {
                    return rowy;
                }
            });

            const GoalID = foundGoal.GoalID + 1;

            Goals.push({
                Goal: "",
                GoalID: GoalID,
                LanguageID: SelectedLanguageID,
            });

            localGoals.push({ show: false });
            setlocalreload(!localreload);

        }
        else {
            setAddErrorsnackbaropen(true);
        }

    };

    const HandleGoalChange = (event, GoalID = -1) => {
        event.preventDefault();
        const value = event.target.value;
        if (GoalID !== -1) {

            const foundGoal = Goals.find((row, index) => {
                if (row.GoalID === GoalID) {
                    return row;
                }
                else {
                    return null;
                }
            });

            if (foundGoal) {

                foundGoal.Goal = value;
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

    const HandleGoalLeave = async (event, GoalID = -1, index = -1) => {
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
        localGoals[index].show = true;
        setlocalreload(!localreload);
    };

    const handlemouseleave = (event, index) => {
        localGoals[index].show = false;
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

                        {localGoals.length === Goals.length && Goals.map((row, index) => {

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

                                                    id='Add-Goal'
                                                    name='Add-Goal'
                                                    color='firr' fullWidth
                                                    value={row.Goal}
                                                    onBlur={(event) => { HandleGoalLeave(event, row.GoalID, index) }}
                                                    onChange={(event) => { HandleGoalChange(event, row.GoalID, index) }}
                                                    placeholder='Example: Identify and manage project risks'
                                                    sx={{ background: "#f1eeee", fontWeight: "400", fontSize: "16", height: "3em" }}>

                                                </OutlinedInput>


                                            </FormControl>

                                        </Grid>

                                        {localGoals[index].show && row.Goal !== "" && <Grid item xs={1} md={2}>

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

