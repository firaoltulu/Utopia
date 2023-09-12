import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Box, Button,
    Grid, IconButton,
    Typography
} from '@mui/material';
import * as React from 'react';
import {
    Draggable
} from 'react-beautiful-dnd';
import AddContent from './content/AddContent';
import AddQuiz from './Quiz/AddQuiz';
import EditLecture from './EditLecture';
import PreviewContent from './content/PreviewContent';
import PreviewQuiz from './Quiz/PreviewQuiz';

import { GetCurriculumModuleLectureItem } from '../../../../../../Hooks/request';

const getItemStyle = (isDragging, draggableStyle, Managedrop) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
    '&:hover': { cursor: Managedrop ? "default" : "grab" },
    // styles we need to apply on draggables
    ...draggableStyle,
    border: "1px solid",
    padding: "1em"

});

const getItemHiddenStyle = (isDragging, draggableStyle) => ({

    background: isDragging ? "lightgreen" : "grey",
    border: "1px solid",
    padding: "1em"

});

export default function DraggableListItemLecture(props) {

    const { item, index, ModuleID, reload, CourseID, CurriculumID, setreload } = props;

    const [addcontentdraw, setaddcontentdraw] = React.useState(false);
    const [editdraw, seteditdraw] = React.useState(false);
    const [dropdraw, setdropdraw] = React.useState(false);
    const [dropdrawcontent, setdropdrawcontent] = React.useState(false);

    const [addquizdraw, setaddquizdraw] = React.useState(false);
    const [editquizdraw, seteditquizdraw] = React.useState(false);
    const [quizdropdraw, setquizdropdraw] = React.useState(false);
    const [quizdropdowndraw, setquizdropdowndraw] = React.useState(false);

    const [Managedrop, setManagedrop] = React.useState(false);

    // React.useEffect(() => {
    //     const get = async () => {
    //         var newobj = await GetCurriculumModuleLectureItem(CourseID, ModuleID);
    //         if (newobj.done) {
    //             try {
    //                 if (newobj.fetcheddata.data.Module) {

    //                     setitem(newobj.fetcheddata.data.Module);
    //                 }
    //                 else {
    //                     setitem(null);
    //                 }
    //             }
    //             catch (e) {
    //                 setitem(null);
    //             }

    //         }
    //         else {
    //             // setalerterroopensnackbaropen(true);
    //         }
    //     }
    //     get();
    // }, []);

    const HandleLectureDropDowm = (event, which) => {

        if (which == 0) {
            if (addcontentdraw === true) {
                setaddcontentdraw(false);
                setManagedrop(false);
            } else {

                setdropdraw(false);
                seteditdraw(false);
                setaddcontentdraw(true);
                setdropdrawcontent(false);
                setManagedrop(true);
            }
        }
        if (which == 1) {
            if (editdraw === true) {
                seteditdraw(false);
                setManagedrop(false);
            } else {

                setdropdraw(false);
                seteditdraw(true);
                setaddcontentdraw(false);
                setdropdrawcontent(false);
                setManagedrop(true);
            }
        }
        if (which == 2) {
            if (dropdraw === true) {
                setdropdraw(false);
                setManagedrop(false);
            } else {

                setdropdraw(true);
                seteditdraw(false);
                setaddcontentdraw(false);
                setdropdrawcontent(false);
                setManagedrop(true);
            }

        }
        if (which == 3) {
            if (dropdrawcontent === true) {
                setdropdrawcontent(false);
                setManagedrop(false);
            } else {
                setdropdrawcontent(true);
                setdropdraw(false);
                seteditdraw(false);
                setaddcontentdraw(false);
                setManagedrop(true);
            }

        }

    };

    const HandleQuizDropDowm = (event, which) => {

        if (which == 0) {
            if (addquizdraw === true) {
                setaddquizdraw(false);
                setManagedrop(false);
            } else {
                setquizdropdraw(false);
                seteditquizdraw(false);
                setaddquizdraw(true);
                setquizdropdowndraw(false);
                setManagedrop(true);
            }
        }
        if (which == 1) {
            if (editquizdraw === true) {
                seteditquizdraw(false);
                setManagedrop(false);
            } else {
                seteditquizdraw(true);
                setaddquizdraw(false);
                setquizdropdraw(false);
                setquizdropdowndraw(false);
                setManagedrop(true);

            }
        }
        if (which == 2) {
            if (quizdropdowndraw === true) {
                setquizdropdowndraw(false);
                setManagedrop(false);
            } else {

                setquizdropdowndraw(true);
                setaddquizdraw(false);
                seteditquizdraw(false);
                setquizdropdraw(false);
                setManagedrop(true);
            }

        }

    };

    const HandleClose = () => {
        setdropdraw(false);
        seteditdraw(false);
        setaddcontentdraw(false);
        setdropdrawcontent(false);
        setManagedrop(false);
        seteditquizdraw(false);
    };

    return (

        <React.Fragment>

            <Grid container sx={{}}>

                <Grid item xs={12} sx={{ margin: "1em", }}>

                    <Draggable key={`Draggable-list-Lecture-ID-${item.LectureID}`} draggableId={item.LectureID.toString()}
                        index={index} style={{ cursor: "cell" }}>

                        {(provided, snapshot) => {

                            return (

                                <Grid container sx={{
                                    '&:hover': {
                                        cursor: "default"
                                    },
                                }}>

                                    {<Grid item xs={12}
                                        ref={provided.innerRef}
                                        // {...provided.draggableProps}
                                        {...(Managedrop) ?
                                            "" :
                                            { ...provided.draggableProps }}
                                        {...provided.dragHandleProps}
                                        sx={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            Managedrop
                                        )}>

                                        {item.Type === "lecture" && <Grid container>

                                            <Grid item xs={3}>
                                                <Typography variant='h6'>Lecture {index + 1}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant='h6'>{item.Title}</Typography>
                                            </Grid>

                                            {item.Content === "" && <Grid item xs={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Box sx={{ ml: "auto" }}>
                                                        <Button size="small" color='firr' sx={{ marginRight: "1em" }} onClick={(event) => { HandleLectureDropDowm(event, 0) }} startIcon={<AddIcon />} variant="outlined">ADD Content</Button>
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined" onClick={(event) => { HandleLectureDropDowm(event, 1) }}><EditIcon></EditIcon></IconButton>
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined"><DeleteIcon></DeleteIcon></IconButton>
                                                        <IconButton color='firr' variant="outlined" onClick={(event) => { HandleLectureDropDowm(event, 2) }}><KeyboardArrowDownIcon></KeyboardArrowDownIcon></IconButton>
                                                    </Box>
                                                </Box>

                                            </Grid>}

                                            {item.Content !== "" && <Grid item xs={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Box sx={{ ml: "auto" }}>
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined" onClick={(event) => { HandleLectureDropDowm(event, 1) }}><EditIcon></EditIcon></IconButton>
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined"><DeleteIcon></DeleteIcon></IconButton>
                                                        <IconButton color='firr' variant="outlined" onClick={(event) => { HandleLectureDropDowm(event, 3) }}>{dropdrawcontent ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                                                    </Box>
                                                </Box>
                                            </Grid>}

                                        </Grid>}

                                        {item.Type === "quiz" && <Grid container>

                                            <Grid item xs={3}>
                                                <Typography variant='h6'>Quiz</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant='h6'>{item.Title}</Typography>
                                            </Grid>

                                            {<Grid item xs={6}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Box sx={{ ml: "auto" }}>
                                                        {item.Quiz_content.length <= 0 && <Button size="small" color='firr' sx={{ marginRight: "1em" }} onClick={(event) => { HandleQuizDropDowm(event, 0) }} startIcon={<AddIcon />} variant="outlined">ADD Quiz</Button>}
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined" onClick={(event) => { HandleQuizDropDowm(event, 1) }}><EditIcon></EditIcon></IconButton>
                                                        <IconButton sx={{ marginRight: "1em" }} color='firr' variant="outlined"><DeleteIcon></DeleteIcon></IconButton>
                                                        <IconButton color='firr' variant="outlined" onClick={(event) => { HandleQuizDropDowm(event, 2) }}>{dropdrawcontent ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                                                    </Box>
                                                </Box>
                                            </Grid>}

                                        </Grid>}

                                    </Grid>}

                                    {/* For Lecture content */}
                                    <Grid item xs={12} sx={{
                                        '&:hover': {
                                            cursor: "default"
                                        },
                                    }}>
                                        <Grid container>

                                            {(addcontentdraw) &&
                                                <Grid
                                                    sx={getItemHiddenStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )} item xs={12}>

                                                    <AddContent
                                                        CourseID={CourseID}
                                                        CurriculumID={CurriculumID}
                                                        ModuleID={ModuleID}
                                                        item={item}
                                                        reload={reload}
                                                        setreload={setreload}
                                                        addcontentdraw={addcontentdraw}
                                                        setaddcontentdraw={setaddcontentdraw}
                                                    >
                                                    </AddContent>

                                                </Grid>
                                            }

                                            {(editdraw) &&
                                                <Grid
                                                    sx={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )} item xs={12}>
                                                    <EditLecture
                                                        item={item}
                                                        CourseID={CourseID}
                                                        CurriculumID={CurriculumID}
                                                        ModuleID={ModuleID}
                                                        reload={reload}
                                                        setreload={setreload}
                                                        HandleClose={HandleClose}
                                                    ></EditLecture>

                                                </Grid>
                                            }

                                            {(dropdraw) &&
                                                <Grid
                                                    sx={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )} item xs={12}>
                                                    <Typography variant='h6'>{item.Discription}</Typography>
                                                </Grid>
                                            }

                                            {(dropdrawcontent) &&
                                                <Grid
                                                    sx={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )} item xs={12}>
                                                    <PreviewContent
                                                        item={item}
                                                        CourseID={CourseID}
                                                        CurriculumID={CurriculumID}
                                                        ModuleID={ModuleID}
                                                        reload={reload}
                                                        setreload={setreload}
                                                    >
                                                    </PreviewContent>

                                                </Grid>
                                            }

                                        </Grid>

                                    </Grid>

                                    {/* For Quiz content */}
                                    <Grid item xs={12}>

                                        {(addquizdraw) &&
                                            <Grid
                                                sx={getItemHiddenStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )} item xs={12}>

                                                <AddQuiz
                                                    LectureID={item.LectureID}
                                                    CourseID={CourseID}
                                                    CurriculumID={CurriculumID}
                                                    ModuleID={ModuleID}
                                                    reload={reload}
                                                    setreload={setreload}>
                                                </AddQuiz>

                                            </Grid>
                                        }

                                        {(quizdropdowndraw) &&
                                            <Grid
                                                sx={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )} item xs={12}>
                                                <PreviewQuiz
                                                    LectureID={item.LectureID}
                                                    CourseID={CourseID}
                                                    CurriculumID={CurriculumID}
                                                    ModuleID={ModuleID}
                                                ></PreviewQuiz>

                                            </Grid>
                                        }

                                        {(editquizdraw) &&
                                            <Grid
                                                sx={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )} item xs={12}>
                                                <EditLecture
                                                    item={item}
                                                    CourseID={CourseID}
                                                    CurriculumID={CurriculumID}
                                                    ModuleID={ModuleID}
                                                    reload={reload}
                                                    setreload={setreload}
                                                    HandleClose={HandleClose}
                                                ></EditLecture>

                                            </Grid>
                                        }

                                    </Grid>

                                </Grid>

                            );

                        }}

                    </Draggable>

                </Grid>

            </Grid >

        </React.Fragment>

    );

};