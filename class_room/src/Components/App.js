import { Box, CircularProgress, Grid, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import Class_Room from "./UI/Class_Room";
import DarkTheme from "./UI/DarkTheme";
// import Footer from "./UI/Footer";
import Header from "./UI/Header";
import theme from './UI/Theme';
import { modeStorageGet, modeStorageSet } from "../Libraries/localstorage";
import Curriculum_Selected from "./UI/Routes/Curriculum_selected";
import Module_Selected from "./UI/Routes/Module_selected";
import Lecture_Selected from "./UI/Routes/Lecture_selected";

const getDesignTokens = (mode) => ({

  ...(mode === 'light' && {
    ...theme,
  }),
  ...(mode === 'dark' && {
    ...DarkTheme,
  }),

});


function App(props) {

  const [navvalue, setnavValue] = React.useState({ currentValue: 0, oldValue: 0 });
  const [tabclicked, settabclicked] = React.useState(false);

  const [selectedlanguage, setselectedlanguage] = React.useState("");
  const [Course, setCourse] = React.useState(null);
  const [Languages, setLanguages] = React.useState([]);
  const [Curriculum, setCurriculum] = React.useState(null);

  const [reloadtwo, setreloadtwo] = React.useState(false);
  const [refreshtwo, setrefreshtwo] = React.useState(false);
  const [loadingtwo, setloadingtwo] = React.useState(true);

  const [mode, setMode] = React.useState('');
  const [loc_theme, setloc_theme] = React.useState(theme);

  const [waitloading, setwaitloading] = React.useState(true);

  React.useEffect(() => {

    const mode = modeStorageGet();
    if (mode) {
      setMode(mode.Type);

    }
    else {
      setMode('light');
    }

  }, []);


  React.useEffect(() => {

    if (mode !== '') {

      const newobj = {
        Title: mode,
        Type: mode,
      };

      modeStorageSet(newobj);

      setloc_theme(createTheme(getDesignTokens(mode)));
      setwaitloading(false);

    }
    else {
      setwaitloading(true);

    }

  }, [mode]);

  const handlescroll = (event) => {
  };


  return (
    <ThemeProvider theme={loc_theme}>

      <CssBaseline>

        {!waitloading && <Box className="grandparent" onScroll={(event) => { handlescroll(event) }}
          sx={{
            minWidth: "375px",
          }}>

          <BrowserRouter>

            <Box component="main"
              sx={{
                flexGrow: 1,
              }}
            >

              <Routes>

                <Route
                  exact
                  path="/Class_Room/:CourseID/"
                  element={
                    <Class_Room
                      {...props}
                      setMode={setMode} navvalue={navvalue} setnavValue={setnavValue}
                      tabclicked={tabclicked} settabclicked={settabclicked}

                      Course={Course} setCourse={setCourse}
                      selectedlanguage={selectedlanguage} setselectedlanguage={setselectedlanguage}
                      Languages={Languages} setLanguages={setLanguages}
                      Curriculum={Curriculum} setCurriculum={setCurriculum}

                      reloadtwo={reloadtwo} setreloadtwo={setreloadtwo}
                      refreshtwo={refreshtwo} setrefreshtwo={setrefreshtwo}
                      loadingtwo={loadingtwo} setloadingtwo={setloadingtwo}
                    />
                  }
                >
                  <Route
                    exact
                    path="Curriculum/:CurriculumID/"
                    element={
                      <Curriculum_Selected
                        Course={Course} setCourse={setCourse}
                        Languages={Languages} setLanguages={setLanguages}
                        Curriculum={Curriculum} setCurriculum={setCurriculum}
                        selectedlanguage={selectedlanguage} setselectedlanguage={setselectedlanguage}

                        reloadtwo={reloadtwo} setreloadtwo={setreloadtwo}
                        refreshtwo={refreshtwo} setrefreshtwo={setrefreshtwo}
                        loadingtwo={loadingtwo} setloadingtwo={setloadingtwo}></Curriculum_Selected>
                    }
                  >
                  </Route>

                  <Route exact path="Curriculum/:CurriculumID/Module/:ModuleID/"
                    element={
                      <Module_Selected
                        Course={Course} setCourse={setCourse}
                        Languages={Languages} setLanguages={setLanguages}
                        Curriculum={Curriculum} setCurriculum={setCurriculum}
                        selectedlanguage={selectedlanguage} setselectedlanguage={setselectedlanguage}

                        reloadtwo={reloadtwo} setreloadtwo={setreloadtwo}
                        refreshtwo={refreshtwo} setrefreshtwo={setrefreshtwo}
                        loadingtwo={loadingtwo} setloadingtwo={setloadingtwo}></Module_Selected>
                    }
                  >
                  </Route>

                  <Route exact path="Curriculum/:CurriculumID/Module/:ModuleID/Lecture/:LectureID/"
                    element={
                      <Lecture_Selected
                        Course={Course} setCourse={setCourse}
                        Languages={Languages} setLanguages={setLanguages}
                        Curriculum={Curriculum} setCurriculum={setCurriculum}
                        selectedlanguage={selectedlanguage} setselectedlanguage={setselectedlanguage}

                        reloadtwo={reloadtwo} setreloadtwo={setreloadtwo}
                        refreshtwo={refreshtwo} setrefreshtwo={setrefreshtwo}
                        loadingtwo={loadingtwo} setloadingtwo={setloadingtwo}></Lecture_Selected>
                    }
                  >
                  </Route>

                </Route>

              </Routes>

            </Box>

            {/* <Footer navvalue={navvalue} setnavValue={setnavValue} /> */}

          </BrowserRouter>

        </Box>}

        {waitloading && <Box className="grandparent" sx={{ minWidth: "375px", marginTop: "4em" }}>
          <Grid container justifyContent={"center"} alignItems={"center"} >
            <CircularProgress color="inherit" sx={{ height: "20em" }} />
          </Grid>
        </Box>
        }

      </CssBaseline >

    </ThemeProvider >
  );
}

export default App;
