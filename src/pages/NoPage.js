import React, {useState} from 'react';
import {Typography, Container, Grid} from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { CssBaseline } from "@mui/material";

  export default function NoPage() {
    {/* User settings */}
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
      
      const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";

    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont())

    return (
        <>
        <CssBaseline />
        <main>
            <div>
                <TopBar/>
                <GradientSection>
                    <Container maxWidth='md' sx={{ marginTop: "20px" }}>
                        <Grid container justifyContent="center" alignItems="center"  direction="column"> 
                            <SentimentVeryDissatisfiedIcon 
                            sx={{ 
                                fontSize: `${150 + (appliedFontSize * 2)}px`, 
                                color: 'white', 
                                marginTop: "30px" 
                                }}/>
                                <Typography variant="h1" 
                                sx={{fontSize: `${34 + appliedFontSize}px`, 
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                marginTop: "10px", 
                                fontWeight: 'bold', 
                                color: 'white'
                            }}>
                                Error: 404
                            </Typography>
                            <Typography variant="h2" 
                            sx={{ 
                                fontSize: `${20 + appliedFontSize}px`, 
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                marginTop: "3px", 
                                color: 'white'
                            }}>
                                Page not found.
                            </Typography>
                            <Typography variant="h3" 
                            sx={{ 
                                fontSize: `${16 + appliedFontSize}px`, 
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                marginTop: "5px", 
                                color: '#e0dcda', 
                                maxWidth: '600px'
                            }}>
                                The link you have followed could be broken, or the page may have been removed or moved somewhere else.
                            </Typography>
                        </Grid>
                    </Container>
                </GradientSection>
                <CustomBackground/>
            </div>
        </main>
        </>
    )
}