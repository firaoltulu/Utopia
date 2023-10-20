import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';
import { Alert, Button, Card, Grid, IconButton, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { HttpEditCurriculumModuleIndex, GetCurriculumModuleItem } from '../../../../../../Hooks/request';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: "100%",
    paddingTop: "2em"
});

export default function DraggableList(props) {

    const { Curriculum, reload, setreload, courseID, setCurriculum, selectlanguage } = props;

    const [module, setmodule] = React.useState([]);

    const [snackbaropen, setsnackbaropen] = React.useState(false);
    const [errorsnackbaropen, seterrorsnackbaropen] = React.useState(false);


    React.useEffect(() => {
        if (Curriculum !== null) {
            setmodule([...Curriculum.Modules]);
        }
        else {
            setmodule([]);
        }
    }, [Curriculum]);

    const onDragStart = () => {
        console.log("ondrawstart");

    };

    const onDragEnd = async (result) => {

        if (!result.destination) {
            return;
        }
        const oldarr = Array.from(module, (row, index) => { return row.ModuleID });

        const item = reorder(
            Curriculum.Modules,
            result.source.index,
            result.destination.index,
        );

        const compareArrays = (a, b) => {
            return (a.length === b.length && a.every((element, index) => element === b[index]));
        }

        const newarr = Array.from(item, (row, index) => { return row.ModuleID });


        if (!compareArrays(newarr, oldarr)) {

            const newobj = Object.assign({}, {
                Module: newarr,
                CourseID: courseID,
                CurriculumID: Curriculum.CurriculumID
            });

            console.log({ newobj });

            setmodule(item);

            const response = await HttpEditCurriculumModuleIndex(newobj);

            if (response.done) {

                // setreload(!reload);
                setCurriculum(response.Curriculum);
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

            {Curriculum && <Grid item xs={12} sx={{}}>

                {<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

                    <Droppable droppableId="droppable-list-Module">

                        {(provided, snapshot) => (
                            <Card elevation={12} ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                                {module.map((item, index) => (
                                    <DraggableListItem CurriculumID={Curriculum.CurriculumID} selectlanguage={selectlanguage}
                                        item={item} index={index} reload={reload} setreload={setreload}
                                        courseID={courseID} setCurriculum={setCurriculum} key={`droppable-list-Module-${index}`} />
                                ))}
                                {provided.placeholder}
                            </Card>
                        )}

                    </Droppable>

                </DragDropContext>}

            </Grid>}

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


