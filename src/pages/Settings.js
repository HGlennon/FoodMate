import React, { useContext, useState, useEffect } from "react";
import TopBar from '../components/topbar';
import { Typography, Grid, Button, Switch, Slider, Container, Box, CssBaseline, useMediaQuery } from '@mui/material';
import { GradientSection, CustomBackground } from '../components/styled';
import { ThemeContext } from '../components/themeProvider';
import { theme } from '../components/themes';

export default function Settings() {
    // Will set the theme for the other pages
    const { themeMode, setThemeMode } = useContext(ThemeContext);

    {/* Retrieves the saved font size when they are used in the settings below [https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/] */}
    const getSavedFontSize = () => {
        const savedFontSize = localStorage.getItem("fontSize");
        return savedFontSize ? parseInt(savedFontSize, 10) : 0;
    };
    const getSavedDyslexicFont = () => {
        return localStorage.getItem("useDyslexicFont") === "true";
    };

    // Detects if user is on mobile or not
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [tempFontSize, setTempFontSize] = useState(getSavedFontSize());
    const [appliedFontSize, setAppliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont, setUseDyslexicFont] = useState(getSavedDyslexicFont());
    
    {/* Handler functions which will apply the settings when submitted */}
    const handleApplySettings = () => {
        setAppliedFontSize(tempFontSize);
        localStorage.setItem("fontSize", tempFontSize);
        window.dispatchEvent(new Event("storage"));
    };

    // Toggles dark mode
    const handleDarkMode = () => {
            setThemeMode(themeMode === "dark" ? "light" : "dark");
    };
    
    // Toggles high contrast mode
    const handleHighContrast = () => {
        setThemeMode(themeMode === "highContrast" ? "light" : "highContrast");
    };

    // Toggles OpenDyslexic font
    const handleDyslexicFont = () => {
        const toggled = !useDyslexicFont;
        setUseDyslexicFont(toggled);
        localStorage.setItem("useDyslexicFont", toggled);
        window.dispatchEvent(new Event("storage"));
    };
    
   
    // Syncs applied settings so topbar instantly receives the setting configuration
    useEffect(() => {
        setTempFontSize(getSavedFontSize());
        setAppliedFontSize(getSavedFontSize());
        setUseDyslexicFont(getSavedDyslexicFont());
    }, []);

    // Alert which resets the settings entirely, if cancelled, returns nothing
    const handleReset = () => {
        const reset = window.confirm("Are you sure you want to reset all settings to their default values?");
        if (!reset) return;
    
        setAppliedFontSize(0); 
        setTempFontSize(0);
        localStorage.setItem("fontSize", 0);  
        localStorage.setItem("useDyslexicFont", false);                                                                 
        setUseDyslexicFont(false); 
        window.dispatchEvent(new Event("storage"));                       
        setThemeMode("light");
    };

    return (
        <main>
            <CssBaseline/>
            <TopBar/>
                <GradientSection>
                    {/* Ensures that content on the screen isn't cramped for smaller devices */}
                    <Container maxWidth='md' sx={{ marginTop: { xs: '30px', sm: '45px' }, px: { xs: 2, sm: 3 } }}>                        
                        <Grid sx={{ alignItems: "center"}}>
                            <Typography
                                variant="h1"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", 
                                    fontWeight: 'bold', fontSize: `${26 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  
                                }} mb={2}>
                                Settings
                            </Typography>
                            <Typography 
                                variant="h2"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", fontWeight: 'bold', 
                                    fontSize: `${19 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" 
                                }} mb={1}>
                                General
                            </Typography>
                            <Box onClick={handleDarkMode} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={2}>
                            <Typography 
                                id="dark-mode-label"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", 
                                    fontSize: `${17 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  
                                }}>
                                Dark mode
                            </Typography>
                                    <Switch 
                                        checked={themeMode === "dark"} 
                                        onChange={handleDarkMode} 
                                        disabled={themeMode === "highContrast"} 
                                        color="default"
                                        inputProps={{
                                            "aria-labelledby": "dark-mode-label"
                                        }}
                                    />
                            </Box>
                            <Typography 
                                variant="h2"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", 
                                    fontWeight: 'bold', fontSize: `${19 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" 
                                }} mb={1}>
                                Accessibility
                            </Typography>
                            <Box onClick={handleHighContrast} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={0.5}>
                            <Typography
                            id="high-contrast-label" 
                            sx={{ 
                                color: themeMode === "highContrast" ? "yellow" : "white", 
                                fontSize: `${17 + appliedFontSize}px`, 
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  
                            }}>
                                High-contrast mode
                            </Typography>
                                    <Switch 
                                        checked={themeMode === "highContrast"} 
                                        onChange={handleHighContrast} 
                                        disabled={themeMode === "dark"} 
                                        color="default"
                                        inputProps={{
                                            "aria-labelledby": "high-contrast-label"
                                        }}
                                    />
                            </Box>
                            <Grid container alignItems="center" justifyContent="space-between">
                                {!isMobile && (
                                <Typography 
                                id="make-text-bigger-label"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", 
                                    fontSize: `${17 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" 
                                }}>
                                    Make text bigger
                                </Typography>
                                )}
                                <Box sx={{  display: "flex", alignItems: "center", gap: 2  }}>
                                {!isMobile && (
                                    <Typography 
                                    sx={{ 
                                        color: themeMode === "highContrast" ? "yellow" : "white", 
                                        fontSize: `17px`, 
                                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" 
                                    }}>
                                        A        
                                    </Typography>
                                )}
                                {!isMobile && (
                                    <Slider
                                        size="small"
                                        value={tempFontSize}
                                        min={0}
                                        max={16}
                                        step={1}
                                        onChange={(_, newValue) => setTempFontSize(newValue)}
                                        sx={{ width: "200px", color: themeMode === "highContrast" ? "yellow" : "white" }}
                                        aria-labelledby="make-text-bigger-label"
                                        getAriaValueText={(value) => `${value} pixels`}  
                                        valueLabelDisplay="off"
                                    />
                                )}
                                {!isMobile && (
                                    <Typography 
                                    sx={{ 
                                        color: themeMode === "highContrast" ? "yellow" : "white", 
                                        fontSize: `33px`, 
                                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                                     }}>
                                        A        
                                    </Typography>
                                )}
                                {!isMobile && (
                                    <Box 
                                    sx={{ 
                                        display: "inline-block",  
                                        border: themeMode === "highContrast" ? "2px solid yellow" : "2px solid white", 
                                        borderRadius: "6px", 
                                        padding: "4px 8px",
                                    }}>                                        
                                        <Typography 
                                        sx={{ color: themeMode === "highContrast" ? "yellow" : "white", 
                                            fontSize: `${17 + tempFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" 
                                        }}>
                                            Sample text
                                        </Typography>
                                    </Box>
                                )}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography 
                                variant="h2"
                                sx={{ 
                                    color: themeMode === "highContrast" ? "yellow" : "white", 
                                    fontWeight: 'bold', fontSize: `${19 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                    mb: 1
                                }}>
                                    Experimental
                                </Typography>
                                <Box onClick={handleDyslexicFont} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={2}>
                                <Typography 
                                    id="dyslexia-font-label" 
                                    sx={{ 
                                        color: themeMode === "highContrast" ? "yellow" : "white", 
                                        fontSize: `${17 + appliedFontSize}px`, 
                                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                                    }}>
                                    Dyslexia font
                                </Typography>
                                        <Switch 
                                            checked={useDyslexicFont} 
                                            onChange={handleDyslexicFont} 
                                            color="default"
                                            inputProps={{
                                                "aria-labelledby": "dyslexia-font-label"
                                            }}
                                        />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </GradientSection>
            <CustomBackground>
                <Container maxWidth='md' style={{ marginTop: '10px'}}>
                    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                        <Grid item xs="auto">
                            <Button
                                type ="submit"
                                sx={{ 
                                    backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#66668A' : '#00853C',
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", 
                                    padding: '8px 16px', 
                                    boxShadow: 2, 
                                    borderRadius: 1,
                                    fontSize: `${14 + appliedFontSize}px`,
                                    whiteSpace: 'nowrap',
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#dada00" : themeMode === "dark" ? "#727297" : "#028D3E"
                                    }
                                }} 
                                onClick={handleApplySettings}
                            >
                                Apply Settings
                            </Button>
                        </Grid>
                        <Grid item xs="auto">
                            <Button
                                type="reset"
                                sx={{ 
                                    backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#E00000', 
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", 
                                    padding: '8px 16px', 
                                    boxShadow: 2, 
                                    borderRadius: 1,
                                    fontSize: `${14 + appliedFontSize}px`,
                                    whiteSpace: 'nowrap',
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#f0b801" : themeMode === "dark" ? "#555555" : "#D01616"
                                    }
                                }} 
                                onClick={handleReset}
                                >
                                Reset to Default
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </CustomBackground>
        </main>
    );
}