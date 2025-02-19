import React, { useState } from 'react'; 
import { Typography, AppBar, CssBaseline, Toolbar, Button, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import FoodmateLogo from './icons';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

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
        <AppBar position='relative' color='white'>
            <Toolbar>
                <Button href="/home" sx={{ backgroundColor: 'transparent' }} disableRipple>
                    <FoodmateLogo/>
                    <Typography variant='h5' sx={{ color: 'black', textTransform: 'none' }}>
                        FoodMate
                    </Typography>
                </Button>
                <InputBase placeholder="Search for products, brands and more" value={searchQuery} onChange={handleSearchChange} onKeyPress={handleSearchSubmit} 
                        sx={{
                        flexGrow: 1, 
                        mx: 'auto', // Center it horizontally
                        border: "1px solid gray",
                        px: 2, // Padding left & right
                        py: 0.5, // Padding top & bottom
                        borderRadius: 1,
                        width: "150px",
                        minWidth: "100px"
                    }}
                />
                <Button href="/advancedsettings" sx={{ mr: '400px', backgroundColor: 'transparent', color: 'black', textTransform: 'none' }} disableRipple>
                    Advanced Search
                </Button>
                <IconButton onClick={handleClick}>
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
