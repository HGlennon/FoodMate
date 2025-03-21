import React, { useState } from 'react'; 
import { Typography, AppBar, CssBaseline, Toolbar, Button, InputBase, IconButton, Menu, MenuItem, Box } from '@mui/material';
import FoodmateLogo from './icons';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function TopBar() {
    const [open, SetOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const navigate = useNavigate(); // React Router navigation    

    const close = () => {
        SetOpen(null);
    };

    const handleClick = (e) => {
        SetOpen(e.currentTarget);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?mealType=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
    <>
        <CssBaseline />
        <AppBar position='relative' sx={{ zIndex: 10, backgroundColor: theme => theme.palette.background.paper }}>            
            <Toolbar>
                <Button href="/home" sx={{ backgroundColor: 'transparent' }} disableRipple>
                    <FoodmateLogo/>
                    <Typography variant='h5' sx={{ color: theme => theme.palette.text.primary, textTransform: 'none' }}>
                        FoodMate
                    </Typography>
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center', marginLeft: '45px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: "1px solid #ccc", padding: '5px 10px', borderRadius: 1, width: '600px', backgroundColor: '#e8e8e8', backgroundColor: theme => theme.palette.background.default,  '&:focus-within': {
                        outline: 'none', // Removes focus outline
                        borderColor: theme => theme.palette.primary.main, // Optional: Change color when focused
                    }}}>
                        <SearchIcon sx={{ color: 'gray', marginRight: '5px' }} />
                        <InputBase
                            placeholder="Search for meals, ingredients and more"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleSearchSubmit}
                            sx={{ flexGrow: 1, color: theme => theme.palette.text.primary }}                            
                        />
                    </Box>
                    <Button href="/advancedsettings" variant="contained" sx={{ backgroundColor: 'transparent', color: 'black', textTransform: 'none', marginLeft: '10px', color: theme => theme.palette.text.primary }} disableRipple>
                        Advanced Search
                    </Button>
                </Box>
                <IconButton onClick={handleClick} justifyContent='flex-end'>
                    <MenuIcon/>
                </IconButton>
                <Menu 
                    anchorEl={open} 
                    open={Boolean(open)} 
                    onClose={close} 
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem 
                        href="/settings"
                        component="a"
                        onClick={close}
                    > 
                        <SettingsIcon/> Settings
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    </>
    );
}
