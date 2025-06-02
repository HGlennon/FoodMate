import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Card, CardMedia, Box, CssBaseline, Container, Grid, Button } from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection, CustomCard } from '../components/styled';
import RecipeList from '../components/apiData';
import { ThemeContext } from "../components/themeProvider";

export default function Recipe() {
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
          
    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";
    
    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont())


    const location = useLocation();
    const recipe = location.state?.recipe;

    const [showIngredient, setShowIngredient] = useState(true);
    const [showNutrient, setShowNutrient] = useState(false);
    
    const emptyFilters = React.useMemo(() => ({}), []);
    const { themeMode } = useContext(ThemeContext);

    useEffect(() => {
        if (recipe) {
          window.scrollTo({ top: 0 });
        }
      }, [recipe]);

    const handleShowIngredients = () => {
        setShowIngredient(true);
        setShowNutrient(false);
    }

    const handleShowNutrient = () => {
        setShowIngredient(false);
        setShowNutrient(true);
    }

    return (
        <main>
            <CssBaseline />
            <TopBar />
            <GradientSection>
                <Container maxWidth="md">
                    <Grid container spacing={2} marginTop="20px" alignItems="stretch">
                        <Grid item xs={12} md={4}>
                            <Card sx={{ display: 'flex', padding: 0.13, height: '380px', backgroundColor: 'transparent' }}>
                                <CardMedia component="img" image={recipe.image} alt={recipe.label} sx={{ width: "100%", objectFit: "cover", borderRadius: 2, height: "auto", maxHeight: `${600 + (appliedFontSize * 4)}px` }} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomCard sx={{ borderRadius: 2, boxShadow: 3, color:'white', marginBottom: '25px'}}>
                                <Box sx={{ backgroundColor: themeMode === "highContrast" ? "#292727": themeMode === "dark" ? "#2b2929" : "#007047", padding: 1, width: "100%", borderRadius: "4px 4px 0 0", textAlign: "center"}}>
                                    <Typography variant='h6' sx={{fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", fontWeight: 'bold'}}>{recipe.label}</Typography>
                                </Box>
                                <Box sx={{ padding: 1.5 }}>
                                    <Typography variant="subtitle1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Total calories: {Math.round(recipe.calories)}kcal</Typography>
                                    <Typography variant="subtitle1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Serving size: {recipe.yield}</Typography>
                                    <Typography variant="subtitle1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Calories per serving: {Math.round(recipe.calories / recipe.yield)}kcal</Typography>
                                </Box>
                            </CustomCard>
                            <CustomCard sx={{ borderRadius: 2, boxShadow: 3, color:'white'  }}>
                                <Box sx={{ backgroundColor: themeMode === "highContrast" ? "#292727": themeMode === "dark" ? "#2b2929" : "#007047", padding: 1, width: "100%", borderRadius: "4px 4px 0 0", textAlign: "center"}}>
                                    <Typography variant="h6" sx={{fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", fontWeight: 'bold'}}>Preparation</Typography>
                                </Box>
                                <Box sx={{ padding: 1.5 }}>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{
                                            fontSize: `${16 + appliedFontSize}px`, 
                                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                                        }}>
                                            Preparation instructions can be found in the source below:
                                    </Typography>
                                    <Button
                                        component="a"
                                        href={recipe.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 0.5,
                                            textTransform: 'none',
                                            borderRadius: 2,
                                            backgroundColor:
                                            themeMode === 'highContrast'
                                                ? '#292727'
                                                : themeMode === 'dark'
                                                ? '#2f2b2b'
                                                : '#007047',
                                            '&:hover': {
                                            backgroundColor:
                                                themeMode === 'highContrast'
                                                ? '#3c3c3c'
                                                : themeMode === 'dark'
                                                ? '#3D3A3A'
                                                : '#006B44',
                                            },
                                            fontSize: `${16 + appliedFontSize}px`,
                                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : 'inherit',
                                            fontWeight: 'bold',
                                            color: themeMode === "highContrast" ? "yellow" : "white"
                                        }}
                                        >
                                        Full Recipe Instruction
                                        </Button>
                                </Box>
                            </CustomCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomCard sx={{ display: 'flex', borderRadius: 2, boxShadow: 3, color:'white', display: 'flex', flexDirection: 'column'}}>
                                <Box 
                                    sx={{ 
                                        backgroundColor: themeMode === "highContrast" ? "#292727": themeMode === "dark" ? "#2b2929" : "#007047", 
                                        padding: 1, 
                                        width: "100%", 
                                        display: "flex", 
                                        gap: 2 
                                    }}>
                                    <Button
                                    role="tab"
                                    aria-selected={showIngredient}
                                    onClick={handleShowIngredients}
                                    disableRipple
                                    sx={{
                                        flex: 1,
                                        textTransform: 'none',
                                        cursor: "pointer",
                                        padding: 1, 
                                        borderBottom: `4px solid 
                                        ${showIngredient
                                        ? themeMode === 'highContrast'
                                        ? 'yellow'   // High contrast active
                                        : themeMode === 'dark'
                                        ? '#ffffff' // Dark mode active
                                        : '#ffffff' // Light mode active */
                                        : themeMode === 'highContrast'
                                        ? '#545454' // High contrast inactive 
                                        : themeMode === 'dark'
                                        ? '#4f4d4d' // Dark mode inactive 
                                        : '#008654' // Light mode inactive  
                                        }`,
                                        borderRadius: 0,
                                        "&:hover": { backgroundColor: themeMode === "highContrast" ? "#3c3c3c": themeMode === "dark" ? "#3D3A3A" : "#006B44", 
                                        borderTopLeftRadius: 6, 
                                        borderTopRightRadius: 6 
                                    }}}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: `${20 + appliedFontSize / 3.8}px`,
                                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : 'inherit',
                                            fontWeight: 'bold',
                                            color: themeMode === "highContrast" ? "yellow" : "white"
                                        }}
                                    >
                                        Ingredients
                                    </Typography>
                                    </Button>
                                    <Button
                                    role="tab"
                                    aria-selected={showNutrient}
                                    onClick={handleShowNutrient}
                                    disableRipple
                                    sx={{
                                        flex: 1,
                                        textTransform: 'none',
                                        padding: 1, 
                                        borderBottom: `4px solid 
                                        ${showNutrient
                                        ? themeMode === 'highContrast'
                                        ? 'yellow'
                                        : themeMode === 'dark'
                                        ? '#ffffff'
                                        : '#ffffff'
                                        : themeMode === 'highContrast'
                                        ? '#545454'
                                        : themeMode === 'dark'
                                        ? '#4f4d4d'
                                        : '#008654'    
                                        }`, 
                                        borderRadius: 0,
                                        "&:hover": { backgroundColor: themeMode === "highContrast" ? "#3c3c3c": themeMode === "dark" ? "#3D3A3A" : "#006B44", 
                                        borderTopLeftRadius: 6, 
                                        borderTopRightRadius: 6 
                                    }}}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        fontSize: `${20 + appliedFontSize / 3.8}px`,
                                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : 'inherit',
                                        fontWeight: 'bold',
                                        color: themeMode === "highContrast" ? "yellow" : "white"
                                        }}
                                    >
                                        Nutrients
                                    </Typography>
                                    </Button>
                                </Box>
                                <Box sx={{
                                    maxHeight: '320px', 
                                    overflowY: 'auto', 
                                    padding: 0.5, 
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        outline: '1px solid #d1d1d1'
                                    }
                                }}>
                                    {showIngredient && 
                                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: "column", height: '290px'}}>
                                        {recipe.ingredientLines.map((line, index) => (
                                        <Typography key={index} variant="subtitle1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}>
                                            {line}
                                        </Typography>
                                        ))}
                                    </Box>}
                                </Box>
                                <Box sx={{
                                    maxHeight: '320px', 
                                    overflowY: 'auto', 
                                    padding: 0.5, 
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        outline: '1px solid #d1d1d1'
                                    }
                                }}>
                                    {/* Very inefficient method of displaying the nutrients */}
                                    {showNutrient && 
                                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: "column", height: '290px'}}>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white" }}>Calcium</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.CA?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Cholesterol</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.CHOLE?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Fat</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.FAT?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Fibre</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.FIBTG?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Iron</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.FE?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Magnesium</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.MG?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Potassium</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.K?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Protein</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.PROCNT?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Sodium</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.NA?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Sugar</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.SUGAR?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin A, RAE</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITA_RAE?.quantity)}µg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin B-12</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITB12?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin B-6</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITB6A?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin C</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITC?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin D</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITD?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Vitamin K</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.VITK1?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",color: themeMode === "highContrast" ? "yellow" : "white" }}>Zinc</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",marginBottom: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}>Amount: {Math.round(recipe.totalNutrients.ZN?.quantity * 10) / 10}mg</Typography>
                                        </Box>}
                                </Box>
                            </CustomCard>
                        </Grid>
                    </Grid>
                </Container>
            </GradientSection>
            <CustomBackground>
                <RecipeList mealType={recipe.dishType?.[0] || 'main course'} filters={emptyFilters} />
            </CustomBackground>
        </main>
    );
}
