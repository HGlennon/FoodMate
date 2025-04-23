import React, { useState, useContext, useEffect } from 'react'; 
import { Typography, AppBar, CssBaseline, Toolbar, Button, InputBase, IconButton, Menu, MenuItem, Box, useMediaQuery } from '@mui/material';
import Images from './image';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from './themes';
import { ThemeContext } from "../components/themeProvider";


export default function TopBar() {

    {/* User settings */}
    const { themeMode } = useContext(ThemeContext);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
                
    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";
        
    const [appliedFontSize, setAppliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont, setUseDyslexicFont] = useState(getSavedDyslexicFont());

    // Topbar is constantly active so has to update in-sync with when it is changed in the settings page too
    useEffect(() => {
    const handleStorage = () => {
        setAppliedFontSize(getSavedFontSize());
        setUseDyslexicFont(getSavedDyslexicFont());
    };
    window.addEventListener("storage", handleStorage);
    return () => {
        window.removeEventListener("storage", handleStorage);
    };
    }, []);

    {/* Helper functions */}
    const [open, SetOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const close = () => SetOpen(null);
    const handleClick = (e) => SetOpen(e.currentTarget);
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    
    const handleSearchSubmit = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?mealType=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <CssBaseline />
            <AppBar role="banner" position='relative' sx={{ zIndex: 10, backgroundColor: theme => theme.palette.background.paper }}>
                <Toolbar 
                component="nav"
                aria-label="Primary"
                sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    px: 2
                }}>
                    {/* Logo */}
                    <Box onClick={() => navigate('/home')} 
                        sx={{ 
                            display: "flex", 
                            cursor: "pointer", 
                            alignItems: "flex-end",
                            flexShrink: 0,
                            mr: 2,
                            mb: 0.5
                        }}
                        role="link"
                        aria-label="Go to FoodMate home"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === "Enter" && navigate("/home")}
                    >
                        <Images/>
                        {/* Foodmate title */}
                        {!isSmallScreen && ( 
                            <Typography variant='h1' sx={{ 
                                    color: theme => theme.palette.text.primary, 
                                    textTransform: 'none', 
                                    fontSize: { xs: `${24 + (appliedFontSize/2)}px`, md: `${32 + (appliedFontSize/2)}px`},
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    mb: '3px',
                                }}>
                                FoodMate
                            </Typography>
                        )}
                    </Box>                   
                    {/* Search and advanced search button */}
                    <Box 
                    component="form"
                    role="search"
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'center',
                        maxWidth: { md: '800px' }
                    }}>
                        {/* Search Bar */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid #ccc",
                            padding: '4px 8px', 
                            borderRadius: 2,
                            flexGrow: 1,
                            maxWidth: { xs: '100%', md: '600px' },
                            backgroundColor: theme => theme.palette.background.default,
                            '&:focus-within': {
                                outline: 'none',
                                borderColor: theme => theme.palette.primary.main,
                            },
                        }}>
                            <SearchIcon aria-hidden="true" sx={{ color: themeMode === "highContrast" ? "#808000" : "gray", marginRight: '5px' }} />
                            <InputBase
                                placeholder="Search for meals, ingredients and more"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyPress={handleSearchSubmit}
                                inputProps={{ // Gives purpose of searchbar to screen reader
                                    "aria-label": "Search recipes",
                                }}
                                sx={{ 
                                    flexGrow: 1, 
                                    color: theme => theme.palette.text.primary,
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    fontSize: `${17 + (appliedFontSize/3)}px`,
                                    '& .MuiInputBase-input': {
                                        overflow: 'hidden',
                                        textOverflow: 'clip',
                                        whiteSpace: 'nowrap',
                                    },
                                }}
                            />
                        </Box>
                        {/* Advanced search button */}
                        {!isSmallScreen && (
                            <Button 
                                href="/advancedsettings" 
                                variant="contained"
                                aria-label="Go to advanced recipe search"
                                sx={{ 
                                    ml: 1,
                                    backgroundColor: 'transparent', 
                                    color: theme => theme.palette.text.primary, 
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.04)'
                                    },
                                    '& .MuiTouchRipple-root .MuiTouchRipple-child': { 
                                        backgroundColor: 'black',
                                        opacity: 0.01                         
                                      },
                                    fontSize: { xs: `${15 + (appliedFontSize/3)}px`, md: `${15 + (appliedFontSize/3)}px`}, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                                }} 
                            >
                                Advanced Search
                            </Button>
                        )}
                    </Box>
                    {/* Hamburger menu */}
                    <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        ml: 2,
                    }}>
                        <IconButton onClick={handleClick}>
                            <MenuIcon 
                                aria-label="Open navigation menu"
                                aria-haspopup="true"
                                aria-controls={Boolean(open) ? "topbar-menu" : undefined}
                                sx={{ 
                                    fontSize: `${26 + (appliedFontSize/1.5)}px`, 
                                    color: themeMode === "highContrast" ? "yellow" : themeMode === "dark" ? "white" : "gray"
                                }}/>
                        </IconButton>
                    </Box>

                    {/* Menu dropdown list */}
                    <Menu 
                        id="topbar-menu"
                        anchorEl={open} 
                        open={Boolean(open)} 
                        onClose={close} 
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem 
                            href="/settings"
                            component="a"
                            onClick={close}
                            sx={{fontSize: `${16 + (appliedFontSize/1.5)}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}
                        > 
                            <SettingsIcon sx={{ mr: 1, fontSize: `${20 + (appliedFontSize/1.5)}px`}}/> 
                                Settings
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}