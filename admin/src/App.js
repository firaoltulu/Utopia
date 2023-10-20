import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import theme from './UI/Theme';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/material";

import Header from "./UI/Header";
import Add from "./UI/Language/Add";
import List from "./UI/Language/List";
import AddCourse from "./UI/Course/Add";
import ListCourse from "./UI/Course/List";
import EditCourse from "./UI/Course/Edit";

import Price_tier_Add from "./UI/Price_Tier/Add";



import ManageCourse from "./UI/Course/ManageCourse/Manage";
import Curriculum from "./UI/Course/ManageCourse/Routes/Curriculum";
import Intendedlearners from "./UI/Course/ManageCourse/Routes/IntendedLearner";
import Course_basics from "./UI/Course/ManageCourse/Routes/basics";
import Course_Price from "./UI/Course/ManageCourse/Routes/price";

function App() {

  const [selectlanguage, setselectlanguage] = React.useState(0);

  const [opendrawer, setopendrawer] = React.useState(true);

  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Header opendrawer={opendrawer} setopendrawer={setopendrawer}></Header>
        <Box component="div"
          sx={{
            marginTop: "4.5em",
            flexGrow: 1,
            bgcolor: 'background.default',
            paddingLeft: matchesMD ? "0em" : opendrawer ? "18.5em" : "0em",

          }}
        >

          <Routes>

            <Route path="/course/edit/:courseID"
              // loader={({ params }) => {
              //   params.courseID;

              // }}
              // action={({ params }) => {
              //   params.courseID;
              // }}
              element={
                <EditCourse
                ></EditCourse>
              }>
            </Route>

            <Route path="/course/managecourse/manage/:courseID/"
              element={
                <ManageCourse setopendrawer={setopendrawer}>
                </ManageCourse>
              }
            >
              <Route path=""
                element={
                  <Typography variant="h4">home</Typography>
                }
              >
              </Route>

              <Route path="goals"
                element={
                  <Intendedlearners></Intendedlearners>
                }
              >
              </Route>

              <Route path="course-structure"
                element={
                  <Typography variant="h4">course-structure</Typography>
                }
              >
              </Route>

              <Route path="setup"
                element={
                  <Typography variant="h4">setup</Typography>
                }
              >
              </Route>

              <Route path="curriculum"
                element={
                  <Curriculum></Curriculum>
                }
              >
              </Route>

              <Route path="captions"
                element={
                  <Typography variant="h4">captions</Typography>
                }
              >
              </Route>

              <Route path="accessibility"
                element={
                  <Typography variant="h4">accessibility</Typography>
                }
              >
              </Route>

              <Route path="basics"
                element={
                  <Course_basics></Course_basics>
                }
              >
              </Route>

              <Route path="pricing"
                element={
                  <Course_Price></Course_Price>
                  // <Typography variant="h4">pricing</Typography>
                }
              >
              </Route>

              <Route path="messages"
                element={
                  <Typography variant="h4">messages</Typography>
                }
              >
              </Route>

            </Route>

            <Route exact path="/" element={<div>DashBoard</div>}></Route>
            <Route exact path="/language/add" element={<Add></Add>}></Route>
            <Route exact path="/language/list" element={<List></List>}></Route>

            <Route exact path="/course/add" element={<AddCourse></AddCourse>}></Route>
            <Route exact path="/course/list" element={<ListCourse></ListCourse>}></Route>

            <Route exact path="/Revolution" element={<div>The Revolution</div>}></Route>

            <Route exact path="/Price_tier/add" element={<Price_tier_Add></Price_tier_Add>}></Route>

            <Route path="/Class_Room/:courseID/:CurriculumID/:ModuleID/:LectureID/"
              // loader={({ params }) => {
              //   setopendrawer(false);
              //   console.log({ params });
              //   // params.courseID;

              // }}
              // action={({ params }) => {
              //   console.log({ params });
              //   setopendrawer(false);
              //   // params.courseID;
              // }}
              element={<Typography>Class_Room</Typography>}></Route>

          </Routes>

        </Box>
        {/* <Footer></Footer> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;



