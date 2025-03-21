import React, { useContext, useState, useEffect } from "react";
import TopBar from '../components/topbar';
import { Typography, Grid, Button, Switch, Slider, Container, Box, CssBaseline } from '@mui/material';
import { GradientSection, CustomBackground } from '../components/styled';
import { ThemeContext } from '../components/themeProvider';

export default function Settings() {
    const { themeMode, setThemeMode } = useContext(ThemeContext);

    // Retrieve stored font size or default to 0
    const getSavedFontSize = () => {
        const savedFontSize = localStorage.getItem("fontSize");
        return savedFontSize ? parseInt(savedFontSize, 10) : 0;
    };

    // Retrieve stored dyslexic font preference or default to false
    const getSavedDyslexicFont = () => {
        return localStorage.getItem("useDyslexicFont") === "true";
    };
    

    const [tempFontSize, setTempFontSize] = useState(getSavedFontSize());
    const [appliedFontSize, setAppliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont, setUseDyslexicFont] = useState(getSavedDyslexicFont());
    
    // Save font size to localStorage when applied
    const handleApplySettings = () => {
        setAppliedFontSize(tempFontSize);
        localStorage.setItem("fontSize", tempFontSize);
    };

    // Toggle dark mode
    const handleDarkModeChange = () => {
            setThemeMode(themeMode === "dark" ? "light" : "dark");
    };
    
    // Toggle high contrast mode
    const handleHighContrastChange = () => {
        setThemeMode(themeMode === "highContrast" ? "light" : "highContrast");
    };

    const handleDyslexicFontChange = () => {
        const newValue = !useDyslexicFont;
        setUseDyslexicFont(newValue);
        localStorage.setItem("useDyslexicFont", newValue);
    };

    // Apply font to body dynamically
    useEffect(() => {
        if (useDyslexicFont) {
            document.body.style.fontFamily = "'OpenDyslexic', sans-serif";
        } else {
            document.body.style.fontFamily = ""; // Let MUI handle the default font
        }
    }, [useDyslexicFont]);
    
   
    // Load settings from localStorage on mount
    useEffect(() => {
        setTempFontSize(getSavedFontSize());
        setAppliedFontSize(getSavedFontSize());
        setUseDyslexicFont(getSavedDyslexicFont());
    }, []);

    return (
        <main>
            <CssBaseline/>
            <TopBar/>
                <GradientSection>
                    <Container maxWidth='md' style={{ marginTop: '45px'}}>
                        <Grid sx={{ alignItems: "center"}}>
                            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: `${26 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  }} mb={2}>
                                Settings
                            </Typography>
                            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: `${19 + appliedFontSize}px` }} mb={1}>
                                General
                            </Typography>
                            <Box onClick={handleDarkModeChange} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={2}>
                            <Typography sx={{ color: 'white', fontSize: `${17 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  }}>
                                Dark mode
                            </Typography>
                            <Switch checked={themeMode === "dark"} onChange={handleDarkModeChange} disabled={themeMode === "highContrast"} color="default"/>
                            </Box>
                            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: `${19 + appliedFontSize}px` }} mb={1}>
                                Accessibility
                            </Typography>
                            <Box onClick={handleHighContrastChange} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={2}>
                            <Typography sx={{ color: 'white', fontSize: `${17 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  }}>
                                High-contrast mode
                            </Typography>
                            <Switch checked={themeMode === "highContrast"} onChange={handleHighContrastChange} color="default"/>
                            </Box>
                            <Box onClick={handleDyslexicFontChange} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} mb={2}>
                            <Typography sx={{ color: 'white', fontSize: `${17 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"  }}>
                                Dyslexia font
                            </Typography>
                            <Switch checked={useDyslexicFont} onChange={handleDyslexicFontChange} color="default"/>
                            </Box>
                            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                                <Typography sx={{ color: 'white', fontSize: `${17 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}>
                                    Make text bigger
                                </Typography>
                                <Box sx={{  display: "flex", alignItems: "center", gap: 2  }}>
                                    <Typography sx={{ color: 'white', fontSize: `17px` }}>
                                        A        
                                    </Typography>
                                    <Slider
                                        size="small"
                                        value={tempFontSize}
                                        min={0}
                                        max={16}
                                        step={1}
                                        onChange={(_, newValue) => setTempFontSize(newValue)}
                                        sx={{ width: "200px", color: "#FFF" }} // Adjust width as needed
                                    />
                                    <Typography sx={{ color: 'white', fontSize: `33px` }}>
                                        A        
                                    </Typography>
                                    <Box sx={{ display: "inline-block",  border: "2px solid white", borderRadius: "6px", padding: "4px 8px"}}>
                                        <Typography sx={{ color: 'white', fontSize: `${17 + tempFontSize}px` }}>
                                            Sample text
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </GradientSection>
            <CustomBackground>
                <Container maxWidth='md' style={{ marginTop: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button 
                                sx={{ 
                                    backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#b2b3cc' : '#00E265', 
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", 
                                    padding: '8px 16px', 
                                    boxShadow: 2, 
                                    borderRadius: 1,
                                    fontSize: `${14 + appliedFontSize}px` 
                                }} 
                                onClick={handleApplySettings}
                            >
                                Apply Settings
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                sx={{ 
                                    backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#ff1919', 
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", 
                                    padding: '8px 16px', 
                                    boxShadow: 2, 
                                    borderRadius: 1,
                                    fontSize: `${14 + appliedFontSize}px` 
                                }} 
                                onClick={() => {
                                    setAppliedFontSize(0); // Reset to 0
                                    setTempFontSize(0);
                                    localStorage.setItem("fontSize", 0); // Store reset value
                                
                                    setUseDyslexicFont(false); // Reset dyslexic font switch
                                    localStorage.setItem("useDyslexicFont", false); // Store reset value
                                    setThemeMode("light"); // Reset theme mode
                                }}
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