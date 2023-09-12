import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Badge, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Slide, Typography } from "@mui/material";
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
import { CartStorageGet } from "./library/localstorage";
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';

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

const SerachDialogTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const MenuDialogTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const drawerWidth = 340;

export default function Header(props) {
    const { selectlanguage, setselectlanguage, languages } = props;
    const [value, setvalue] = React.useState(0);

    const [searchdialogopen, setsearchdialogopen] = React.useState(false);
    const [Draweropen, setDraweropen] = React.useState(false);

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSD = useMediaQuery(theme.breakpoints.down('sd'));
    const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ExploreanchorEl, setExploreAnchorEl] = React.useState(null);
    const [ExploreMoreanchorEl, setExploreMoreAnchorEl] = React.useState(null);
    const [openLanguageDialog, setopenLanguageDialog] = React.useState(false);


    const [isloggedIn, setisloggedIn] = React.useState(true);

    const OnlineExploreopen = Boolean(ExploreanchorEl);
    const OnlineDegreeopen = Boolean(anchorEl);
    const OnlineExploreMoreopen = Boolean(ExploreMoreanchorEl);


    React.useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
            setvalue(0);
        }
        else if (window.location.pathname === "/Service" && value !== 1) {
            setvalue(1);
        }
        else if (window.location.pathname === "/Revolution" && value !== 2) {
            setvalue(2);
        }
        else if (window.location.pathname === "/About" && value !== 3) {
            setvalue(3);
        }
        else if (window.location.pathname === "/Contact" && value !== 4) {
            setvalue(4);
        }
    }, [value]);

    const handleDrawerOpen = () => {
        setDraweropen(true);
    };

    const handleDrawerClose = () => {
        setDraweropen(false);
    };

    const toggleDrawer = (event) => {

        setDraweropen(false);
    };

    const handleExploreClick = (event) => {
        CloseAllMenus();
        setExploreAnchorEl(event.currentTarget);
    }

    const handleExploreClose = () => {
        handleExploremoreClose();
        setExploreAnchorEl(null);

    };

    const handleExploremoreClick = (event) => {

        setExploreMoreAnchorEl(event.currentTarget);
    };

    const handleExploremoreClose = () => {
        setExploreMoreAnchorEl(null);
    };

    const handleClick = (event) => {
        CloseAllMenus();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const CloseAllMenus = () => {
        setAnchorEl(null);
        setExploreMoreAnchorEl(null);
        setExploreAnchorEl(null);
    };

    const handleLanguageclick = () => {
        setopenLanguageDialog(true);
    };

    const handleLanguageDialogClose = (event) => {
        setopenLanguageDialog(false);
    };

    const handleLanguageSelectButton = (event, index) => {
        setselectlanguage(index);
        handleLanguageDialogClose();
    };

    const handlesearchdialogOpen = () => {
        setsearchdialogopen(true);
    };

    const handlesearchdialogClose = () => {
        setsearchdialogopen(false);
    };


    return (

        <ElevationScroll>

            <AppBar sx={{ borderBottom: '1px solid', zIndex: theme.zIndex.modal + 1, padding: "1em" }} position="fixed">

                <Toolbar disableGutters sx={{}}>
                    {matchesMD === false &&
                        <Grid container columnSpacing={2} sx={{}}>

                            <Grid item xs={2} sm={2} >
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Box
                                            component="img"
                                            alt="company logo"
                                            sx={{
                                                height: '4em',
                                            }}
                                        >
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} >
                                        <Box sx={{ paddingTop: "0.23em", paddingRight: "0.23em" }}>
                                            <Button variant="outlined" alt="Explore"
                                                id="Explorebutton"
                                                itemID="Explorebutton"
                                                aria-controls={OnlineExploreopen ? 'Exploremenu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={OnlineExploreopen ? 'true' : undefined}
                                                onClick={handleExploreClick}
                                                color="secondary"
                                                sx={{
                                                    borderRadius: "15px",
                                                }}
                                                endIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                                            >
                                                <Typography variant="body2">Explore</Typography>
                                            </Button>

                                            <Menu
                                                id="Exploremenu"
                                                aria-labelledby='Explorebutton'
                                                anchorEl={ExploreanchorEl}
                                                open={OnlineExploreopen}
                                                onClose={handleExploreClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                sx={{ marginTop: "1.5em" }}
                                            >
                                                <Grid container>

                                                    <Grid item xs={OnlineExploreMoreopen ? 6 : 12} sx={{ borderRight: "0.1em solid" }}>
                                                        <List>

                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button-0"
                                                                    aria-controls={OnlineExploreMoreopen ? 'Explore-More-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                                                    onMouseOver={(event) => { handleExploremoreClick(event, 0) }}
                                                                >
                                                                    <ListItemText primary="Design" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button-1"
                                                                    aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                                                    onMouseOver={handleExploremoreClick}
                                                                >
                                                                    <ListItemText primary="Development" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button-2"
                                                                    aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                                                    onClick={handleExploremoreClick}
                                                                >
                                                                    <ListItemText primary="Marketing" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button-3"
                                                                    aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                                                    onClick={handleExploremoreClick}
                                                                >
                                                                    <ListItemText primary="IT and Software" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button-4"
                                                                    aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                                                    onClick={handleExploremoreClick}
                                                                >
                                                                    <ListItemText primary="Personal Development" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>

                                                        </List>
                                                    </Grid>

                                                    <Grid item xs={6} sx={{ display: OnlineExploreMoreopen ? "block" : "none" }}>
                                                        <List>
                                                            <ListItem disablePadding>
                                                                <ListItemButton id="Explore-more-button" onClick={handleExploremoreClick}>
                                                                    <ListItemText primary="web Development" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton component="a" href="#simple-list">
                                                                    <ListItemText primary="Data Science" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton component="a" href="#simple-list">
                                                                    <ListItemText primary="Mobile Development" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton component="a" href="#simple-list">
                                                                    <ListItemText primary="Programming Languages" />
                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton component="a" href="#simple-list">

                                                                    <ListItemText primary="Game Development" />

                                                                    <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>

                                                                </ListItemButton>
                                                            </ListItem>

                                                        </List>
                                                    </Grid>


                                                </Grid>

                                            </Menu>

                                        </Box>

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={5} sm={5}  >
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

                            <Grid item xs={2} sm={2}>
                                <Grid container columnSpacing={1} >
                                    <Grid item xs={6}>
                                        <Box sx={{ marginLeft: "2em", textAlign: "center", marginRight: "2em" }}>
                                            <Button variant="text" alt="Degrees"
                                                id="Degrees-button"
                                                onMouseOver={handleClick}
                                                color="secondary"
                                                sx={{
                                                    borderRadius: "15px",


                                                }}>
                                                <Typography variant="body2">For Company </Typography>

                                            </Button>

                                            <Menu
                                                id="Degrees-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'Degrees-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={OnlineDegreeopen}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                sx={{ marginTop: "1.5em" }}

                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Box sx={{ marginLeft: "2em", textAlign: "center" }}>
                                            <IconButton fullWidth variant="text" alt="Enterprise" component={Link} to="/cart" color="secondary" sx={{
                                                borderRadius: "15px",
                                            }}>

                                                {CartStorageGet() !== null && <Badge badgeContent={CartStorageGet().listofcourseId.length} color="firr" sx={{ color: "white" }}>
                                                    <ShoppingCartOutlinedIcon sx={{ color: "black" }}></ShoppingCartOutlinedIcon>
                                                </Badge>}

                                                {CartStorageGet() === null && <ShoppingCartOutlinedIcon sx={{ color: "black" }} ></ShoppingCartOutlinedIcon>}
                                            </IconButton>
                                        </Box>
                                    </Grid>

                                </Grid>

                            </Grid>

                            <Grid item xs={3} sm={3}>
                                <Grid container columnSpacing={1} sx={{}} >


                                    <Grid item xs={4} sx={{}}>
                                        <Button fullWidth variant="outlined" alt="Sign in"
                                            color="secondary"
                                            component={Link} to="/join/LogIn"
                                            sx={{
                                                borderRadius: "15px",
                                                padding: "8px",
                                            }}
                                        >
                                            <Typography variant="">Login</Typography>
                                        </Button>
                                    </Grid>

                                    <Grid item xs={4} sx={{}}>
                                        <Button fullWidth variant="contained"
                                            alt="Sign in"
                                            color="secondary"
                                            component={Link} to="/join/signup"
                                            sx={{
                                                borderRadius: "15px",
                                                padding: "8px",

                                            }}>
                                            <Typography variant="">Signin</Typography>
                                        </Button>
                                    </Grid>


                                    <Grid item xs={2} sx={{}}>
                                        <Button fullWidth variant="outlined" alt="Sign in"
                                            onClick={handleLanguageclick}
                                            color="secondary" sx={{
                                                borderRadius: "15px",
                                                padding: "8px",

                                            }}
                                        >
                                            <LanguageIcon sx={{ padding: 0, height: "1em", width: "1em" }} color="secondary"></LanguageIcon>
                                        </Button>
                                    </Grid>

                                </Grid>

                            </Grid>

                        </Grid>
                    }

                    {matchesMD === true &&
                        <Grid container sx={{ margin: "1em" }}>

                            <Grid item xs={2}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
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
                                            onClick={handlesearchdialogOpen}
                                            edge="end"
                                            sx={{ ml: "auto", }}>
                                            <SearchIcon />
                                        </IconButton>

                                    </Box>

                                    <Box sx={{ ml: "auto", textAlign: "end" }}>
                                        <IconButton fullWidth variant="text" alt="Enterprise" component={Link} to="/cart" color="secondary" sx={{
                                            borderRadius: "15px",
                                        }}>

                                            {CartStorageGet() !== null && <Badge badgeContent={CartStorageGet().listofcourseId.length} color="firr" sx={{ color: "white" }}>
                                                <ShoppingCartOutlinedIcon sx={{ color: "black" }}></ShoppingCartOutlinedIcon>
                                            </Badge>}

                                            {CartStorageGet() === null && <ShoppingCartOutlinedIcon sx={{ color: "black" }} ></ShoppingCartOutlinedIcon>}
                                        </IconButton>
                                    </Box>

                                </Box>

                            </Grid>

                        </Grid>
                    }

                    <Dialog
                        fullScreen
                        open={Draweropen && matchesMD}
                        onClose={toggleDrawer}
                        TransitionComponent={MenuDialogTransition}
                        sx={{ zIndex: theme.zIndex.modal + 3 }}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar sx={{ padding: "1em" }}>
                                <Grid container sx={{ margin: "1em" }}>

                                    <Grid item xs={4}>
                                        <Button variant="outlined" alt="Sign in"
                                            onClick={handleLanguageclick}
                                            color="secondary" sx={{
                                                borderRadius: "15px",
                                                padding: "8px",

                                            }}
                                        >
                                            <LanguageIcon sx={{ padding: 0, height: "1em", width: "1em" }} color="secondary"></LanguageIcon>
                                        </Button>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Utopia Course</Typography>
                                    </Grid>

                                    <Grid item xs={4}>

                                        <Box sx={{ display: 'flex' }}>
                                            <Box sx={{ ml: "auto" }}>
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    onClick={toggleDrawer}
                                                    aria-label="close"

                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>

                                        </Box>

                                    </Grid>

                                </Grid>

                            </Toolbar>
                        </AppBar>
                        <Grid container>

                            <Grid item xs={12}>

                                {!isloggedIn && <List>
                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-0"
                                            aria-controls={OnlineExploreMoreopen ? 'Explore-More-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onMouseOver={(event) => { handleExploremoreClick(event, 0) }}
                                        >
                                            <Button fullWidth variant="outlined" alt="Sign in"
                                                color="secondary"
                                                component={Link} to="/join/LogIn"
                                                sx={{
                                                    borderRadius: "15px",
                                                    padding: "8px",
                                                }}
                                            >
                                                <Typography variant="">Login</Typography>
                                            </Button>
                                        </ListItemButton>
                                    </ListItem>
                                </List>}

                                {isloggedIn && <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Firaol Tulu" src="/static/images/avatar/2.jpg">
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Firaol Tulu"

                                        />
                                    </ListItem>
                                    <Divider></Divider>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Profile" />

                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Setting" />

                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="My Purchases" />

                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Sign Out" />

                                        </ListItemButton>
                                    </ListItem>

                                </List>}

                                <Divider></Divider>

                                <List>
                                    <ListItem>

                                        <ListItemText
                                            primary="Most Popular"

                                        />
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Design" />
                                            <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Development" />
                                            <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Marketing" />
                                            <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="IT And Software" />
                                            <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton id="Explore-more-button-2"
                                            aria-controls={OnlineExploreMoreopen ? 'Exploremenu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={OnlineExploreMoreopen ? 'true' : undefined}
                                            onClick={handleExploremoreClick}
                                        >
                                            <ListItemText primary="Personal Development" />
                                            <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                        </ListItemButton>
                                    </ListItem>

                                </List>

                            </Grid>
                        </Grid>

                    </Dialog>

                    <Dialog
                        open={openLanguageDialog}
                        onClose={handleLanguageDialogClose}
                        aria-labelledby="Language-dialog"
                        sx={{
                            '& .MuiDialogContent-root': {
                                padding: theme.spacing(2),
                            },
                            '& .MuiDialogActions-root': {
                                padding: theme.spacing(1),
                            },
                        }}
                    >

                        <DialogTitle
                            id="Language-dialog-title"
                            onClose={handleLanguageDialogClose}
                            sx={{ borderBottom: '1px solid' }}
                        >
                            Choose a Language
                        </DialogTitle>
                        <DialogContent>
                            <List>
                                {languages.map((row, index) => {

                                    return (
                                        <ListItem disablePadding key={`Language-dialog-list-listItem-${index}`}>
                                            <ListItemButton id={`Language-dialog-list-listItem-button-${index}`} onClick={(event) => { handleLanguageSelectButton(event, index) }}>
                                                <ListItemText primary={row} />

                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}

                            </List>
                        </DialogContent>

                    </Dialog>

                    <Dialog
                        fullScreen
                        open={searchdialogopen && matchesMD}
                        onClose={handlesearchdialogClose}
                        TransitionComponent={SerachDialogTransition}
                        sx={{ zIndex: theme.zIndex.modal + 5 }}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar sx={{ padding: "1em" }}>

                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handlesearchdialogClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>

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

                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handlesearchdialogClose}
                                    aria-label="close"
                                >
                                    <SearchIcon />
                                </IconButton>

                            </Toolbar>
                        </AppBar>

                        <List>
                            <ListItem button>
                                <ListItemText primary="Phone ringtone" secondary="Titania" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText
                                    primary="Default notification ringtone"
                                    secondary="Tethys"
                                />
                            </ListItem>
                        </List>


                    </Dialog>

                </Toolbar>

            </AppBar>

        </ElevationScroll >
    );
}