import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './UI/Theme';
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";

import Header from "./UI/Header";
import DashBoard from "./UI/DashBoard";
import Footer from "./UI/Footer";
import SignIn from "./UI/SignIn";
import Course from "./UI/Course";
import LogIn from "./UI/Login";
import Cart from "./UI/Cart";

function App() {

  const [selectlanguage, setselectlanguage] = React.useState(0);
  const [courseselectindex, setcourseselectindex] = React.useState(-1);
  const languages = ["English", "አማርኛ", "Oromifa", "ትግረኛ"];

  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Header languages={languages} selectlanguage={selectlanguage} setselectlanguage={setselectlanguage}></Header>
        <Box component="div" sx={{ marginTop: "5em", }}>
          <Routes>
            <Route exact path="/" element={<DashBoard languages={languages}
              selectlanguage={selectlanguage} courseselectindex={courseselectindex}
              setcourseselectindex={setcourseselectindex}></DashBoard>}></Route>
            <Route exact path="/join/signup" element={<SignIn></SignIn>}></Route>
            <Route path="/course/:courseID"
              // loader={({ params }) => {
              //   params.courseID;

              // }}
              // action={({ params }) => {
              //   params.courseID;
              // }}
              element={
                <Course courseselectindex={courseselectindex} languages={languages}
                  selectlanguage={selectlanguage}
                ></Course>
              }>
            </Route>
            <Route exact path="/join/LogIn" element={<LogIn></LogIn>}></Route>
            <Route exact path="/cart" element={<Cart></Cart>}></Route>
            <Route exact path="/Revolution" element={<div>The Revolution</div>}></Route>

          </Routes>
        </Box>
        <Footer></Footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
