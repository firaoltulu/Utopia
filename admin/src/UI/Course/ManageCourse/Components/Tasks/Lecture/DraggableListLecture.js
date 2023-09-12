import * as React from 'react';
import DraggableListItemLecture from './DraggableListItemLecture';
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';
import { Alert, Button, Card, Grid, IconButton, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AddLecture from './content/AddLecture';
import { HttpEditCurriculumModuleLectureIndex, GetCurriculumModuleLectureItem } from '../../../../../../Hooks/request';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: "100%",
    paddingTop: "2em"
});

export default function DraggableListLecture(props) {

    const { items, CourseID, CurriculumID, ModuleID, setreload, reload, LectureID } = props;

    const [lecture, setlecture] = React.useState([]);
    // const [reload, setreload] = React.useState(true);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);

    // console.log({ items });

    React.useEffect(() => {
        if (items.length > 0) {
            setlecture([...items]);
        }
        else {
        }
    }, [items]);

    const onDragStart = () => {
        console.log("ondrawstart");

    };

    const onDragEnd = async (result) => {

        if (!result.destination) {
            return;
        }
        const oldarr = Array.from(lecture, (row, index) => { return row.LectureID });

        const item = reorder(
            lecture,
            result.source.index,
            result.destination.index,
        );

        const compareArrays = (a, b) => {
            return (a.length === b.length && a.every((element, index) => element === b[index]));
        }

        const newarr = Array.from(item, (row, index) => { return row.LectureID });


        if (!compareArrays(newarr, oldarr)) {

            const newobj = Object.assign({}, {
                Lecture: newarr,
                CourseID: CourseID,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID

            });

            console.log({ newobj });

            setlecture(item);

            const response = await HttpEditCurriculumModuleLectureIndex(newobj);

            if (response.done) {

                setreload(!reload);
                seterrorsnackbaropen(false);
                setsnackbaropen(true);

            } else {
                setsnackbaropen(false);
                seterrorsnackbaropen(true);
            }
        }
        else {

        }

    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list, (row, index) => { return row });
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const handlesnackClose = (event) => {
        setsnackbaropen(false);
        seterrorsnackbaropen(false);
    };

    return (

        <Grid container>

            <Grid item xs={12} sx={{}}>
                {items.length > 0 && <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

                    <Droppable droppableId="droppable-list-lecture">

                        {(provided, snapshot) => (
                            <Card elevation={12} ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                                {lecture.map((item, index) => (
                                    <DraggableListItemLecture item={item} index={index}
                                        reload={reload}
                                        CourseID={CourseID}
                                        CurriculumID={CurriculumID}
                                        ModuleID={ModuleID}
                                        setreload={setreload} key={`droppable-list-lecture-${index}`} />
                                ))}
                                {provided.placeholder}
                            </Card>
                        )}

                    </Droppable>

                </DragDropContext>}
            </Grid>

            <AddLecture items={items}
                CourseID={CourseID}
                CurriculumID={CurriculumID}
                ModuleID={ModuleID}
                reload={reload}
                setreload={setreload}>
            </AddLecture>


            <Snackbar open={errorsnackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="error" sx={{ width: '100%' }}>
                    Error Please Insert All The necessary Information
                </Alert>
            </Snackbar>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handlesnackClose}>
                <Alert onClose={handlesnackClose} severity="success" sx={{ width: '100%' }}>
                    You Have Successfullly Edited A Module
                </Alert>
            </Snackbar>
        </Grid>

    );

};

