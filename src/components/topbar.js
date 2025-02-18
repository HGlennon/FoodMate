import React, { useState } from 'react'; 
import { Typography, AppBar, CssBaseline, Toolbar, Button, InputBase, IconButton, Menu, MenuItem  } from '@mui/material';
import FoodmateLogo from './icons';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

export default function TopBar() {
    const [open, SetOpen] = useState(null)
    
    const close = () => {
        SetOpen(null)
    }

    const handleClick = (e) => {
        SetOpen(e.currentTarget)
    }

    return (
    <>
    <CssBaseline />
    <AppBar position='relative' color='white'>
        <Toolbar>
            <Button href="http://localhost:3000/home" style={{ backgroundColor: 'transparent'}} disableRipple>
            <FoodmateLogo/>
            <Typography variant='h5' style={{flexGrow: 1}}>
                FoodMate
            </Typography>
            </Button>
            <InputBase placeholder="Search for products, brands and more" style={{flexGrow: 1, marginLeft: '500px'}}/>
            <Button href="http://localhost:3000/advancedsettings" style={{marginRight: '400px', backgroundColor: 'transparent'}} disableRipple>
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
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem 
                href="http://localhost:3000/settings"
                component="a"
                onClick={close}
                > 
                <SettingsIcon/>Settings</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
    </>
    )
}