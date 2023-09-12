import React from "react";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const StyledFooter = styled((props) => (<Box {...props}></Box>))(({ theme }) => ({
    backgroundColor: theme.palette.firr,
    width: "100%",
    marginTop: "auto",
    zIndex: theme.zIndex.modal + 5
}));

const StyledLink = styled((props) => (<Grid {...props}></Grid>))(({ theme }) => ({
    textDecoration: "none",
    color: "white",
    ":hover": {
        fontSize: "1.1rem"
    }
}));

export default function Footer(props) {
    const { value, setvalue, selectedindex, setselectedindex } = props;
    const theme = useTheme();
    return (
        <StyledFooter>
            <Grid container justifyContent="center" sx={{ backgroundColor: "#0F0F0F", zIndex: theme.zIndex.modal + 1, }} >

                <Grid item xs={1} sx={{ color: "white", fontFamily: "Arial", fontSize: "1rem", fontWeight: "bold", margin: "3em" }}>
                    <Grid container direction="column" spacing={2}>
                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Home
                        </StyledLink>
                        <StyledLink item component={Link} to="/mobile" onClick={(e) => { setvalue(4); setselectedindex(3); }} >
                            About Us
                        </StyledLink>
                        <StyledLink item component={Link} to="/Websites" onClick={(e) => { setvalue(4); setselectedindex(2); }}  >
                            Contact Us
                        </StyledLink>
                    </Grid>
                </Grid>

                <Grid item xs={1} sx={{ color: "white", fontFamily: "Arial", fontSize: "1rem", fontWeight: "bold", margin: "3em" }}>
                    <Grid container direction="column" spacing={2}>

                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Careers
                        </StyledLink>


                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Blog
                        </StyledLink>


                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Help and Support
                        </StyledLink>

                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Affilate
                        </StyledLink>


                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Investors
                        </StyledLink>

                    </Grid>
                </Grid>

                <Grid item xs={1} sx={{ color: "white", fontFamily: "Arial", fontSize: "1rem", fontWeight: "bold", margin: "3em" }}>
                    <Grid container direction="column" spacing={2}>
                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Terms
                        </StyledLink>

                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Privacy Policy
                        </StyledLink>

                        <StyledLink item component={Link} to="/" onClick={(e) => { setvalue(0); }} >
                            Accessibility statement
                        </StyledLink>

                    </Grid>
                </Grid>

            </Grid>
        </StyledFooter >
    );


}