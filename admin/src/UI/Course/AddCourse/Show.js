import { Card, CardContent, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const Level = [
    { levelID: "1", title: ["Beginner", "ጀማሪ", "", ""] },
    { levelID: "2", title: ["Intermediate", "መካከለኛ", "", ""] },
    { levelID: "3", title: ["senior", "ከፍተኛ", "", ""] },

];

export default function Show(props) {
    const { newcourse, setnewcourse, Languages } = props;
    // const newfile = knewuser.file;
    // console.log({ newfile });
    // var image = newfile === null ? "./person.png" : URL.createObjectURL(newfile);

    const handleCardEdit = (typeedite) => {

    }

    return (
        <Grid container sx={{ margin: "1em" }}>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                Course Titles
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <TableContainer fontSize="small">
                                    <Table size="small" sx={{ minWidth: "100%" }}>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Language</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {newcourse.Titles.map((row, index) => (
                                                <TableRow
                                                    key={`course-title-Information-${index}`}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell >{row.title}</TableCell>
                                                    <TableCell >{row.languageID}</TableCell>

                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>

            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                Course Discriptions
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                <TableContainer fontSize="small">
                                    <Table size="small" sx={{ minWidth: "100%" }}>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Discription</TableCell>
                                                <TableCell>Language</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {newcourse.Discriptions.map((row, index) => (
                                                <TableRow
                                                    key={`course-Discriptions-Information-${index}`}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell >{row.discription}</TableCell>
                                                    <TableCell >{row.languageID}</TableCell>

                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>

            </Grid>

            {/* <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                Course Goals
                            </Grid>
                            {Languages.map((languages, outindex) => {

                                return (
                                    <Grid item xs={12} sx={{ marginBottom: "2em", border: "1px solid" }}
                                        id={`Add-Course-goals-information-${outindex}`}
                                        key={`Add-Course-goals-information-${outindex}`}>
                                        <Typography variant="h6">{Languages[outindex].title}</Typography>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="Course goals table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>goals</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {newcourse.Goals.map((row, index) => {

                                                        if (row.languageID === languages.languageID) {
                                                            return (
                                                                <TableRow
                                                                    id={`Add-Course-goals-inner-information-${index}`}
                                                                    key={`Add-Course-goals-inner-information-${index}`}
                                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                >
                                                                    <TableCell>{row.goals}</TableCell>
                                                                    <TableCell></TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        else {
                                                            return (<React.Fragment key={`Add-Course-goals-inner-information-dont-display-${index}`}></React.Fragment>);
                                                        }


                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>

                                );

                            })}


                        </Grid>

                    </CardContent>
                </Card>

            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                Course Lecturers
                            </Grid>
                            {Languages.map((languages, outindex) => {

                                return (
                                    <Grid item xs={12} sx={{ marginBottom: "2em", border: "1px solid" }}
                                        id={`Course-lecturer-information-${outindex}`}
                                        key={`Course-lecturer-information-${outindex}`}>
                                        <Typography variant="h6">{Languages[outindex].title}</Typography>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="Course goals table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Lecturer</TableCell>
                                                        <TableCell>Title</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {newcourse.Lecturers.map((row, index) => {

                                                        if (row.languageID === languages.languageID) {
                                                            return (
                                                                <TableRow
                                                                    id={`Course-lecturer-inner-information-${index}`}
                                                                    key={`Course-lecturer-inner-information-${index}`}
                                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                >
                                                                    <TableCell>{row.lecturerName}</TableCell>
                                                                    <TableCell>{row.lecturerTitle}</TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        else {
                                                            return (<React.Fragment key={`Course-lecturer-inner-information-dont-display-${index}`}></React.Fragment>);
                                                        }


                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>

                                );

                            })}
                        </Grid>

                    </CardContent>
                </Card>

            </Grid> */}

            <Grid item xs={12} md={6} sx={{ marginBottom: "1em" }}>

                <Card elevation={10} sx={{
                    marginRight: "1em",
                    flexGrow: 1,
                }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
                                Course General Information
                            </Grid>
                            {Languages.map((row, index) => {
                                if (row.languageID === newcourse.courselanguage) {
                                    return (
                                        <Grid item xs={12} sx={{ marginBottom: "1em" }} key={`Course-courselanguage-information-${index}`}>
                                            <Typography variant="h6">Course language : {row.title}</Typography>
                                        </Grid>
                                    )
                                }
                                else {
                                    return (<React.Fragment key={`Course-courselanguage-information-${index}`}></React.Fragment>)
                                }

                            })}
                            {Level.map((row, index) => {
                                if (row.levelID === newcourse.courselevel) {
                                    return (
                                        <Grid item xs={12} sx={{ marginBottom: "1em" }} key={`Course-courselevel-information-${index}`}>
                                            <Typography variant="h6">Course level : {row.title[0]}</Typography>
                                        </Grid>
                                    )
                                }
                                else {
                                    return ( <React.Fragment key={`Course-courselevel-information-${index}`}></React.Fragment>)
                                }

                            })}

                        </Grid>

                    </CardContent>
                </Card>

            </Grid>

        </Grid>
    );
}
