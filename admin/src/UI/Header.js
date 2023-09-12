import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
    Badge, Box, Collapse, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Divider, Drawer, Grid, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Menu, MenuItem, Slide, Typography
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10em",
    border: "1px solid",
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
    },

    marginLeft: "2em",
    marginRight: "4em",
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',

    },
}));

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: false,
        threshold: 100,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const drawerWidth = 300;

export default function Header(props) {
    const { opendrawer, setopendrawer } = props;
    const [value, setvalue] = React.useState(0);

    const [openlanguagelist, setopenlanguagelist] = React.useState(false);
    const [opencourselist, setopencourselist] = React.useState(false);
    const [openprice_tierlist, setopenprice_tierlist] = React.useState(false);

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {

    }, [value]);

    const handleDrawerOpen = () => {
        setopendrawer(true);
    };

    const handleDrawerClose = () => {
        setopendrawer(false);
    };

    const handleopenlanguageOpen = () => {
        setopenlanguagelist(!openlanguagelist);
    };

    const handleopenlanguageClose = () => {
        setopenlanguagelist(false);
    };

    const handleopencourseOpen = () => {
        setopencourselist(!opencourselist);
    };

    const handleopencourseClose = () => {
        setopencourselist(false);
    };

    const handleopenprice_tierOpen = () => {
        setopenprice_tierlist(!openprice_tierlist);
    };

    const handleopenprice_tierClose = () => {
        setopenprice_tierlist(false);
    };


    return (

        <ElevationScroll>

            <AppBar sx={{ borderBottom: '1px solid', padding: "1em", }} >

                <Toolbar sx={{}}>

                    {matchesMD === false &&
                        <Grid container columnSpacing={2} sx={{}}>

                            <Grid item xs={4} sm={4} >
                                <Box
                                    component="img"
                                    alt="company logo"
                                    sx={{
                                        // height: '4em',
                                    }}
                                >
                                </Box>
                            </Grid>

                            <Grid item xs={4} sm={4}  >
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        fullWidth
                                        placeholder="Search For anything…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Grid>

                            <Grid item xs={4} sm={4}>

                                <Box sx={{ marginLeft: "2em", textAlign: "end" }}>
                                    <Button variant="contained"
                                        alt="Sign in"
                                        color="secondary"
                                        component={Link} to="/join/signup"
                                        sx={{
                                            borderRadius: "15px",
                                            padding: "8px",

                                        }}>
                                        <Typography variant="">Signin</Typography>
                                    </Button>
                                </Box>

                            </Grid>

                        </Grid>
                    }

                    {matchesMD === true &&
                        <Grid container sx={{ margin: "1em" }}>

                            <Grid item xs={2}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={(event) => { }}
                                    edge="start"
                                    sx={{}}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Utopia Course</Typography>
                            </Grid>

                            <Grid item xs={4}>

                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ ml: "auto" }}>
                                        <IconButton

                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={(event) => { }}
                                            edge="end"
                                            sx={{ ml: "auto", }}>
                                            <SearchIcon />
                                        </IconButton>

                                    </Box>


                                </Box>

                            </Grid>

                        </Grid>
                    }

                </Toolbar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant={matchesMD ? "temporary" : "permanent"}
                    anchor="left"
                    open={(!matchesMD)}
                >
                    <Toolbar sx={{ padding: "1em" }}>

                        <Typography variant="h6">Utopia</Typography>

                    </Toolbar>

                    <Divider></Divider>
                    <List>

                        <ListItem disablePadding>

                            <ListItemButton id="Explore-more-button-1"
                                aria-controls={'Exploremenu'}
                                aria-haspopup="true"
                                aria-expanded={'true'}
                                onClick={(event) => { handleopenlanguageOpen() }}
                            >
                                <ListItemText primary="Language" />
                                {openlanguagelist ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                        </ListItem>

                        <Divider></Divider>
                        <Collapse in={openlanguagelist} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="language/add">
                                    <ListItemText primary="Add" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="language/list">
                                    <ListItemText primary="List" />
                                </ListItemButton>

                            </List>
                        </Collapse>

                        <Divider></Divider>
                        <ListItem disablePadding>
                            <ListItemButton id="Explore-more-button-2"
                                aria-controls={'Exploremenu'}
                                aria-haspopup="true"
                                aria-expanded={'true'}
                                onClick={(event) => { handleopencourseOpen() }}
                            >
                                <ListItemText primary="Courses" />
                                {opencourselist ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                        </ListItem>

                        <Divider></Divider>
                        <Collapse in={opencourselist} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="course/add">
                                    <ListItemText primary="Add" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="course/list">
                                    <ListItemText primary="List" />
                                </ListItemButton>

                            </List>
                        </Collapse>

                        <Divider></Divider>
                        <ListItem disablePadding>
                            <ListItemButton id="Explore-more-button-3"
                                aria-controls={'Exploremenu'}
                                aria-haspopup="true"
                                aria-expanded={'true'}
                                onClick={(event) => { handleopenprice_tierOpen() }}
                            >
                                <ListItemText primary="Price_Tiers" />
                                {openprice_tierlist ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                        </ListItem>

                        <Divider></Divider>
                        <Collapse in={openprice_tierlist} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="Price_tier/add">
                                    <ListItemText primary="Add Price_tier" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: "2em" }} component={Link} to="Price_tier/list">
                                    <ListItemText primary="List Price_tier" />
                                </ListItemButton>

                            </List>
                        </Collapse>

                    </List>

                </Drawer>

            </AppBar>

        </ElevationScroll >
    );
}