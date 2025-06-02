import React, { useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline } from "@mui/material";

export default function TermsAndConditions() {
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);

    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";

    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont());

    const textStyle = {
        fontSize: `${16 + appliedFontSize}px`,
        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
        color: '#e0dcda',
        marginBottom: '16px',
        maxWidth: '800px',
        textAlign: 'left'
    };

    const sectionTitleStyle = {
        fontSize: `${20 + appliedFontSize}px`,
        fontWeight: 'bold',
        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
        color: 'white',
        marginTop: '18px',
        marginBottom: '6px'
    };

    return (
        <>
            <CssBaseline />
            <main>
                <div>
                    <TopBar />
                    <GradientSection>
                        <Container maxWidth='md' sx={{ marginTop: "20px" }}>
                            <Grid container justifyContent="center" alignItems="flex-start" direction="column">
                                <Typography variant="h1" sx={{
                                    fontSize: `${34 + appliedFontSize}px`,
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    marginTop: "10px",
                                    fontWeight: 'bold',
                                    color: 'white',
                                    marginBottom: '20px'
                                }}>
                                  Terms and Conditions
                                </Typography>

                                <Typography sx={textStyle}>
                                    Last Updated: 31/05/2025
                                </Typography>

                                <Typography sx={sectionTitleStyle}>1. Purpose of the Service</Typography>
                                <Typography sx={textStyle}>
                                    FoodMate provides users with access to a curated database of recipes by integrating with third-party APIs such as the Edamam API. Users can search, filter, and view recipe content for informational and non-commercial purposes.
                                </Typography>

                                <Typography sx={sectionTitleStyle}>2. Third-Party Content</Typography>
                                <Typography sx={textStyle}>
                                    FoodMate uses the Edamam API to source recipes and nutritional data. This content is provided “as-is” and may be subject to inaccuracies due to the nature of automated data processing and third-party control.
                                    We do not guarantee the accuracy, completeness, or suitability of any third-party content, including ingredient listings or dietary information. Users should exercise personal discretion and consult with a medical professional if they have dietary restrictions or health conditions.
                                </Typography>

                                <Typography sx={sectionTitleStyle}>3. User Conduct</Typography>
                                <Typography sx={textStyle}>
                                    You agree not to:
                                    <ul>
                                        <li>Use FoodMate for any unlawful purpose.</li>
                                        <li>Attempt to gain unauthorized access to the site or its servers.</li>
                                        <li>Copy, resell, or redistribute any content or code from FoodMate without permission.</li>
                                        <li>Scrape or mass-download recipe data or API responses.</li>
                                        <li>Use the service in a way that violates Edamam’s terms of use.</li>
                                    </ul>
                                </Typography>

                                <Typography sx={sectionTitleStyle}>4. No User Account System</Typography>
                                <Typography sx={textStyle}>
                                    FoodMate currently does not require user registration. Therefore, no personal information or account data is stored. This may change in future versions.
                                </Typography>

                                <Typography sx={sectionTitleStyle}>5. Sharing & Linking</Typography>
                                <Typography sx={textStyle}>
                                    Users may copy and share recipe links for personal use. These links may redirect to third-party websites. We are not responsible for content on those external sites.
                                </Typography>

                                <Typography sx={sectionTitleStyle}>6. Limitation of Liability</Typography>
                                <Typography sx={textStyle}>
                                    FoodMate is provided “as-is” without any warranties. We are not liable for:
                                    <ul>
                                        <li>Health issues arising from recipes.</li>
                                        <li>API downtime or inaccuracies.</li>
                                        <li>Incorrect dietary or allergen data.</li>
                                    </ul>
                                </Typography>

                                <Typography sx={sectionTitleStyle}>7. Contact</Typography>
                                <Typography sx={textStyle}>
                                    For questions, please contact: harrisongle@gmail.com
                                </Typography>
                            </Grid>
                        </Container>
                    </GradientSection>
                    <CustomBackground/>
                </div>
            </main>
        </>
    );
}
