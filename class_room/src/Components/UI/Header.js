import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import ContactsIcon from '@mui/icons-material/Contacts';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkIcon from '@mui/icons-material/Work';
import {
    Collapse, Dialog, DialogContent, DialogTitle, Divider,
    Grid, List, ListItem, ListItemButton, ListItemText, Menu, Skeleton,
    Tab, Tabs, useMediaQuery
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme, alpha } from '@mui/material/styles';
import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import { Link, Outlet, useParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10em",
    border: "1px solid",
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
    },
    marginLeft: "2em",
    marginRight: "28em",
    width: '50em',
    minWidth: "100px"
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

const navItems = ['  Home  ', 'Services ', '  User '];

function Header(props) {

    const { CurriculumID, ModuleID } = useParams();


    const { Course, window, setMode, navvalue, setnavValue, settabclicked, drawerWidth,
        selectedlanguage, setselectedlanguage, Languages, Curriculum, setCurriculum } = props;
    const [mobileOpen, setMobileOpen] = React.useState(true);

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ExploreanchorEl, setExploreAnchorEl] = React.useState(null);
    const [ExploreMoreanchorEl, setExploreMoreAnchorEl] = React.useState(null);
    const OnlineExploreopen = Boolean(ExploreanchorEl);
    const OnlineExploreMoreopen = Boolean(ExploreMoreanchorEl);

    const [openLanguageDialog, setopenLanguageDialog] = React.useState(false);

    const [Coursetitle, setCoursetitle] = React.useState("");
    const [Coursematerialopen, setCoursematerialopen] = React.useState(false);
    const [selectedModuleIndex, setselectedModuleIndex] = React.useState(-1);

    React.useEffect(() => {

        if (Curriculum) {

            try {

                const ffmID = parseInt(ModuleID);

                Curriculum.Modules.map((row, index) => {
                    if (row.ModuleID === ffmID) {
                        setselectedModuleIndex(index);
                        // return row;
                    }

                });

            } catch (error) {

            }

        }

    }, [ModuleID, Curriculum]);

    React.useEffect(() => {
        if (Course) {

            Course.Titles?.map((row, index) => {
                if (row.LanguageID === Number(selectedlanguage)) {
                    setCoursetitle(row.Title);
                    return row;
                }
                else {
                    return null;
                }

            });
        }
    }, [Course, selectedlanguage]);


    const handleLanguageDialogClose = (event) => {
        setopenLanguageDialog(false);
    };

    const handleLanguageSelectButton = (event, index) => {
        setselectedlanguage(index);
        setCurriculum(null);
        handleLanguageDialogClose();
    };

    const handleLanguageclick = () => {
        setopenLanguageDialog(true);
    };

    const toggleColorMode = () => {
        if (theme.palette.mode === 'light') {
            console.log("dark mode");
            setMode("dark");
        }
        else {
            setMode("light");
            console.log("light mode");

        }

    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleChange = (event, newValue) => {
        setnavValue({ currentValue: newValue, oldValue: navvalue.currentValue });
    };
    const CloseAllMenus = () => {
        setAnchorEl(null);
        setExploreMoreAnchorEl(null);
        setExploreAnchorEl(null);
    };

    const handleExploreClick = (event) => {
        CloseAllMenus();
        setExploreAnchorEl(event.currentTarget);
    };

    const handleExploreClose = () => {
        handleExploremoreClose();
        setExploreAnchorEl(null);

    };

    const handleExploremoreClose = () => {
        setExploreMoreAnchorEl(null);
    };

    const handleExploremoreClick = (event) => {

        setExploreMoreAnchorEl(event.currentTarget);
    };

    const handleOpenCourseMaterial = (event) => {
        setCoursematerialopen(!Coursematerialopen);
    };

    const HandleModuleClick = (event, index) => {
        setselectedModuleIndex(index);
    };

    const drawer = (
        <Box sx={{}}>

            <Grid container direction="row"
                sx={{
                    marginTop: "8em",
                    // padding: "1em",
                }}>

                <Grid item xs={12}>
                    <Typography variant='h4' sx={{ textAlign: "center" }}>{Coursetitle}</Typography>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "3em", }}>

                    {Curriculum && <Grid container direction="row"
                        sx={{
                            marginTop: "1em",
                            // padding: "1em",
                        }}>

                        <Grid item xs={12}>

                            <List>

                                <ListItem disablePadding>

                                    <ListItemButton id="Explore-more-button-1"
                                        aria-controls={'Exploremenu'}
                                        aria-haspopup="true"
                                        aria-expanded={'true'}
                                        onClick={(event) => { handleOpenCourseMaterial() }}
                                    >

                                        {Coursematerialopen ? <ExpandLess fontSize='large' /> : <ExpandMore fontSize='large' />}
                                        <Typography sx={{ marginLeft: "1em" }} variant="h6">
                                            Course Material
                                        </Typography>

                                        {/* <ListItemText primary="Course Material" /> */}

                                    </ListItemButton>

                                </ListItem>

                                <Collapse in={Coursematerialopen} timeout="auto" unmountOnExit>

                                    {/* <Divider></Divider> */}
                                    <List component="div" disablePadding sx={{
                                        // marginTop: "1em",
                                        paddingLeft: "1em",
                                        paddingRight: "1em"
                                    }}>

                                        {Curriculum?.Modules?.map((row, index) => {

                                            return (

                                                <Box sx={{ borderLeft: selectedModuleIndex === index ? "0.6em solid" : "0px", borderRadius: "0px" }} key={`curriculum-list-modules-index-${index}`}>

                                                    <ListItemButton component={Link} to={`Curriculum/${CurriculumID}/Module/${row.ModuleID}`} selected={selectedModuleIndex === index}
                                                        onClick={(event) => { HandleModuleClick(event, index) }}
                                                        sx={{
                                                            ".Mui-selected": {
                                                                backgroundColor: "#ffffff",
                                                            }
                                                        }} >
                                                        <Box sx={{ pl: selectedModuleIndex === index ? "5em" : "5.4em", textAlign: 'center' }}>
                                                            <Typography variant='subtitle2'>{row.Title}</Typography>
                                                            {/* <ListItemText primary={ } /> */}
                                                        </Box>
                                                    </ListItemButton>

                                                </Box>

                                            );

                                        })}

                                    </List>

                                </Collapse>

                                <ListItem disablePadding>

                                    <ListItemButton id="Explore-more-button-1"
                                        aria-controls={'Exploremenu'}
                                        aria-haspopup="true"
                                        aria-expanded={'true'}
                                    // onClick={(event) => { handleOpenCourseMaterial() }}
                                    >

                                        <Typography sx={{ marginLeft: "2.2em" }} variant="h6">
                                            Notes
                                        </Typography>

                                        {/* <ListItemText primary="Course Material" /> */}

                                    </ListItemButton>

                                </ListItem>

                                <ListItem disablePadding>

                                    <ListItemButton id="Explore-more-button-1"
                                        aria-controls={'Exploremenu'}
                                        aria-haspopup="true"
                                        aria-expanded={'true'}
                                    // onClick={(event) => { handleOpenCourseMaterial() }}
                                    >

                                        <Typography sx={{ marginLeft: "2.2em" }} variant="h6">
                                            Messages
                                        </Typography>

                                        {/* <ListItemText primary="Course Material" /> */}

                                    </ListItemButton>

                                </ListItem>

                            </List>

                        </Grid>

                    </Grid>}

                    {!Curriculum && <Grid container direction="row"
                        sx={{
                            marginTop: "1em",
                            padding: "1em",
                        }}>


                        <Grid container columnSpacing={1} rowSpacing={1} sx={{ padding: "4px" }}>

                            <Grid item xs={12} md={12}>
                                <Skeleton variant="rounded" animation="wave" height={300} />
                            </Grid>

                        </Grid>

                    </Grid>}

                </Grid>

            </Grid >

        </Box >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <Box sx={{ minWidth: "375px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>

            <AppBar component="nav" color="primary"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >

                <Toolbar color={"primary"}>

                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        Lehike.
                    </Typography>

                    {!matchesMD && <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            fullWidth
                            placeholder="Search in course"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>}

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>

                        <IconButton sx={{ ml: 1, mr: "1em", display: { xs: 'block', md: 'block' } }} onClick={toggleColorMode} color="inherit">
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>

                        <IconButton sx={{ ml: 1, mr: "1em", display: { xs: 'block', md: 'block' } }} onClick={toggleColorMode} color="inherit">
                            <MailIcon />
                        </IconButton>

                    </Box>

                    <Box sx={{ display: { xs: 'block', md: 'block' } }}>

                        <IconButton sx={{ ml: 1, mr: "1em", display: { xs: 'block', md: 'block' } }} onClick={handleExploreClick} color="inherit">
                            {<PersonOutlineOutlinedIcon />}
                        </IconButton>

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
                            sx={{ marginTop: "1em" }}
                        >
                            <Grid container>

                                <Grid item xs={OnlineExploreMoreopen ? 12 : 12} sx={{ borderRight: "0.1em solid" }}>

                                    <List>

                                        <ListItem disablePadding>
                                            <ListItemButton id="Explore-more-button-0"
                                                onMouseOver={(event) => { handleExploremoreClick(event, 0) }}
                                            >
                                                <ListItemText primary="My Courses" />
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton id="Explore-more-button-1"
                                                onMouseOver={handleExploremoreClick}
                                            >
                                                <ListItemText primary="Profile" />
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton id="Explore-more-button-2"
                                                onClick={handleExploremoreClick}
                                            >
                                                <ListItemText primary="Settings" />
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton id="Explore-more-button-3"
                                                onClick={handleExploremoreClick}
                                            >
                                                <ListItemText primary="Log Out" />
                                            </ListItemButton>
                                        </ListItem>

                                    </List>

                                </Grid>


                            </Grid>

                        </Menu>

                    </Box>

                    <Box sx={{ display: { xs: 'block', md: 'block' } }}>

                        <IconButton sx={{ ml: 1, mr: "1em", display: { xs: 'block', md: 'block' } }} onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'block', md: 'block' } }}>
                        <IconButton alt="Language" sx={{ ml: 1, mr: "1em", display: { xs: 'block', md: 'block' } }}
                            color="inherit"
                            onClick={handleLanguageclick}
                        >
                            <LanguageIcon></LanguageIcon>
                        </IconButton>
                    </Box>

                    {<IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, ml: "1em", marginLeft: "auto", display: { md: 'none' } }}
                    >
                        {!mobileOpen ? <MenuIcon /> : <CloseIcon />}
                    </IconButton>}

                </Toolbar>

            </AppBar>

            <nav sx={{ borderRight: "0px solid", }}>
                <Drawer
                    anchor="left"
                    container={container}
                    variant={matchesMD ? "temporary" : "permanent"}
                    open={mobileOpen || !matchesMD}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        ".MuiDrawer-paper": {
                            borderRight: "1px solid",
                            borderRightColor: theme.palette.Drawerbackcolor.main
                        },
                        display: { xs: 'block', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

            <Box component="main" sx={{
                ...theme.mixins.toolbar,
                borderRight: "0px solid",
            }}>
            </Box>

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

                    <List sx={{
                        '& .MuiListItemButton-root': {
                            paddingLeft: 24,
                            paddingRight: 24,
                        },

                    }} color='primary'>
                        {Languages.map((row, index) => {
                            return (
                                <ListItem disablePadding key={`Language-dialog-list-listItem-${index}`}>
                                    <ListItemButton component={Link} to={`Curriculum/${row.LanguageID}`} id={`Language-dialog-list-listItem-button-${index}`} onClick={(event) => { handleLanguageSelectButton(event, row.LanguageID) }}>
                                        <ListItemText primary={row.Title} sx={{
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                </DialogContent>

            </Dialog>

        </Box >

    );

};

export default Header;
