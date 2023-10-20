import {
    Card, CardContent,
    Grid,
    Skeleton,
    useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useParams } from "react-router-dom";

// import {
//     GetAllLanguages, GetCourse, GetCurriculumItem,
// } from '../../Hooks/request';


function Curriculum_Selected(props) {

    const { CourseID, CurriculumID } = useParams();

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


    const handleChange = (event, newValue) => {

    };

    const handleRefresh = (event) => {
        // event.preventDefault();
        setreloadtwo(!reloadtwo);
    };

    // console.log({ Curriculum });

    return (

        <Box sx={{}}>


            {!refreshtwo && !loadingtwo && <React.Fragment>

                <Box sx={{ padding: "1em", border: "1px solid", borderRadius: "5px" }}>
                    <Typography>Curriculm Selected</Typography>
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

export default Curriculum_Selected;
