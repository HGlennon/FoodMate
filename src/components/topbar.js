import React, { useState, useContext } from 'react'; 
import { Typography, AppBar, CssBaseline, Toolbar, Button, InputBase, IconButton, Menu, MenuItem, Box, useMediaQuery } from '@mui/material';
import Images from './image';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from './themes';
import { ThemeContext } from "../components/themeProvider";


export default function TopBar() {
    const [open, SetOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const close = () => SetOpen(null);
    const handleClick = (e) => SetOpen(e.currentTarget);
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleSearchSubmit = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?mealType=${encodeURIComponent(searchQuery)}`);
        }
    };

    const { themeMode, setThemeMode } = useContext(ThemeContext);

    return (
        <>
            <CssBaseline />
            <AppBar position='relative' sx={{ zIndex: 10, backgroundColor: theme => theme.palette.background.paper }}>
                <Toolbar sx={{ 
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
                    >
                        <Images/>
                        {/* Foodmate title */}
                        {!isSmallScreen && ( 
                            <Typography variant='h4' sx={{ 
                                    color: theme => theme.palette.text.primary, 
                                    textTransform: 'none', 
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    mb: '3px'
                                }}
                            >
                                FoodMate
                            </Typography>
                        )}
                    </Box>
                    
                    {/* Search and advanced search button */}
                    <Box sx={{ 
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
                            border: "1px solid #ccc", 
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
                            <SearchIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <InputBase
                                placeholder="Search for meals, ingredients and more"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyPress={handleSearchSubmit}
                                sx={{ 
                                    flexGrow: 1, 
                                    color: theme => theme.palette.text.primary,
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
                                      }
                                    
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
                        ml: 2
                    }}>
                        <IconButton onClick={handleClick}>
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    {/* Menu dropdown list */}
                    <Menu 
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
                        > 
                            <SettingsIcon sx={{ mr: 1 }}/> Settings
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}