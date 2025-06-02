import React, { useState, useContext  } from "react";
import TopBar from "../components/topbar";
import { Typography, CardContent, Grid, Container, Button, Checkbox, FormGroup, FormControlLabel, CssBaseline } from "@mui/material";
import RecipeList from "../components/apiData"
import {GradientSection, CustomCard, CustomBackground } from "../components/styled";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../components/themeProvider";

export default function Search() {
    // location and queryParams will be used to detect the link and grab specified values from it [https://stackoverflow.com/a/60044858]
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mealType = queryParams.get("mealType") || ""; 
    const minCalories = queryParams.get("minCalories") || ""; 
    const maxCalories = queryParams.get("maxCalories") || ""; 
    const minProtein = queryParams.get("minProtein") || ""; 
    const maxProtein = queryParams.get("maxProtein") || ""; 
    const minCholesterol = queryParams.get("minCholesterol") || ""; 
    const maxCholesterol = queryParams.get("maxCholesterol") || ""; 
    const minSugar = queryParams.get("minSugar") || ""; 
    const maxSugar = queryParams.get("maxSugar") || ""; 
    const minFat = queryParams.get("minFat") || ""; 
    const maxFat = queryParams.get("maxFat") || ""; 
        
    {/* Filters that can be turned off an on */}
    const [filters, setFilters] = useState({
        balanced: false,
        highProtein: false,
        lowCarb: false,
        lowFat: false,
        lowSodium: false,
        vegan: false,
        vegetarian: false,
        alcoholFree: false,
        nutFree: false,
        lactoseFree: false
    });

    const [appliedFilters, setAppliedFilters] = useState({}); // Stores filters applied after clicking "Submit"

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    const submitFilters = () => {
        setAppliedFilters(filters);
    };
            
    const clearFilters = () => {
            setFilters(empty);
            setAppliedFilters(empty);
    };

    const empty = {
        balanced:false, highProtein:false, lowCarb:false, lowFat:false,
        lowSodium:false, vegan:false, vegetarian:false,
        alcoholFree:false, nutFree:false, lactoseFree:false,
    };

    const { themeMode } = useContext(ThemeContext);

    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
                
    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";
          
    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont())
    const { recipeTerm } = location.state || {};

    return (
        <>
            <CssBaseline/>
            <TopBar />
            <main>
                <div>
                <GradientSection sx={{ py: { xs: 2, sm: 3 } }}>
                    <Container maxWidth='md' sx={{ mt: { xs: 2, sm: 3 } }}>
                    <Grid container justifyContent="center">
                        <Typography 
                            variant="h4" 
                            align="center" 
                            sx={{
                                fontWeight: "bold", 
                                fontSize: { xs: `${24 + appliedFontSize}px`, 
                                sm: `${28 + appliedFontSize}px`, 
                                md: `${34 + appliedFontSize}px` }, 
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                color: themeMode === "highContrast" ? "yellow" : "white", 
                                textAlign: "center", 
                                mb:2
                            }}>
                            {recipeTerm || mealType || "Recipes"}
                        </Typography>
                    </Grid>
                    </Container>
                    <div>            
                        <Container maxWidth='md' sx={{ mt: 3, mb: 2 }}>
                        <Grid container justifyContent="center">
                                <CustomCard 
                                    component="section"
                                    role="region"                        
                                    aria-labelledby="diet-options-heading"                                
                                    sx={{ 
                                        width: "100%", 
                                        maxWidth: { xs: "95%", sm: "740px" }, 
                                        height: "100%", 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        borderRadius: 3, 
                                        boxShadow: 3
                                    }}>
                                <CardContent>
                                    <Typography 
                                        variant="h6" 
                                        align="center" 
                                        id="diet-options-heading"
                                        sx={{ 
                                            fontSize: `${20 + appliedFontSize}px`, 
                                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                            color: themeMode === "highContrast" ? "yellow" : "white", 
                                            fontWeight: "bold",
                                            mb:1
                                        }}>
                                        Diet Options:
                                    </Typography>
                                <FormGroup row sx={{ justifyContent: 'center',  flexWrap: 'wrap', gap: `${6 + appliedFontSize / 2}px`}}>
                                    <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="balanced" checked={filters.balanced} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Balanced</Typography>}/>
                                    <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="highProtein" checked={filters.highProtein} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>High-Protein</Typography>}/>
                                    <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="lowCarb" checked={filters.lowCarb} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Low-Carb</Typography>}/>
                                    <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="lowFat" checked={filters.lowFat} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Low-Fat</Typography>}/>
                                    <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="lowSodium" checked={filters.lowSodium} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Low-Salt</Typography>}/>
                                </FormGroup>
                                </CardContent>
                            </CustomCard>
                            </Grid>
                        </Container>
                        <Container maxWidth='md' sx={{ mt: 3, mb: 2 }}>
                        <Grid container justifyContent="center">
                            <CustomCard 
                                component="section"
                                role="region"                        
                                aria-labelledby="health-options-heading"
                                sx={{ 
                                    width: "100%", 
                                    maxWidth: { xs: "95%", sm: "740px" }, 
                                    height: "auto", 
                                    display: "flex", 
                                    flexDirection: "column",
                                    borderRadius: 3, 
                                    boxShadow: 3
                                }}>
                                <CardContent>
                                    <Typography 
                                        variant="h6" 
                                        align="center"
                                        id="health-options-heading" 
                                        sx={{ fontSize: `${20 + appliedFontSize}px`, 
                                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                                        color: themeMode === "highContrast" ? "yellow" : "white", 
                                        fontWeight: "bold", 
                                        mb:1
                                    }}>
                                        Health Options:
                                    </Typography>
                                    <FormGroup row sx={{ justifyContent: 'center',  flexWrap: 'wrap', gap: `${6 + appliedFontSize / 2}px`}}>
                                        <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }}  control={<Checkbox name="vegan" checked={filters.vegan} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Vegan</Typography>} />
                                        <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="vegetarian" checked={filters.vegetarian} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white"} }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Vegetarian</Typography>} />
                                        <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="alcoholFree" checked={filters.alcoholFree} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Alcohol-Free</Typography>} />
                                        <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="nutFree" checked={filters.nutFree} onChange={handleFilterChange} sx={{ color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Nut-Free</Typography>} />
                                        <FormControlLabel sx={{ flex: { xs: '0 0 50%', sm: 'none' }, mb: { xs: 1, sm: 0 }, ml: { xs: 1, sm: 0 } }} control={<Checkbox name="lactoseFree" checked={filters.lactoseFree} onChange={handleFilterChange} sx={{ fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", "&.Mui-checked": { color: themeMode === "highContrast" ? "yellow" : "white" } }} />} label={ <Typography sx={{fontSize: `${17 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", whiteSpace: "normal"}}>Lactose-Free</Typography>} />
                                    </FormGroup>
                                </CardContent>
                            </CustomCard>
                        </Grid>
                        </Container>
                        <Container maxWidth="md" sx={{ mb: 3, mt: 2 }}>
                            <Grid 
                                container 
                                justifyContent="space-between"
                                sx={{
                                width: "100%",
                                maxWidth: { xs: "95%", sm: "740px" }, 
                                mx: "auto", 
                                px: 0
                                }}
                            >
                                <Button 
                                    type ="submit"
                                sx={{ 
                                    width: { xs: "48%", sm: "auto" }, 
                                    backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? "#66668A" : "#00853C",
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    py: 1,
                                    px: { xs: 1, sm: 3 },
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    fontSize: `${15 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    minWidth: "123px",
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#dada00" : themeMode === "dark" ? "#727297" : "#028D3E",
                                    }
                                }} 
                                onClick={submitFilters}
                                >
                                Submit
                                </Button>
                                <Button 
                                sx={{ 
                                    width: { xs: "48%", sm: "auto" },
                                    backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? "#6B6B6B" : "#E00000",
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    py: 1,
                                    px: { xs: 1, sm: 3 },
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    fontSize: `${15 + appliedFontSize}px`, 
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    minWidth: "120px",
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#f0b801" : themeMode === "dark" ? "#555555" : "#D01616",
                                    }
                                }} 
                                onClick={clearFilters}
                                >
                                Clear Filter
                                </Button>
                            </Grid>
                        </Container>
                    </div>    
                    </GradientSection>
                </div>
            </main>
            <CustomBackground>
                <RecipeList mealType={mealType} filters={appliedFilters} minCalories={minCalories} maxCalories={maxCalories} minProtein={minProtein} maxProtein={maxProtein} minCholesterol={minCholesterol} maxCholesterol={maxCholesterol} minSugar={minSugar} maxSugar={maxSugar} minFat={minFat} maxFat={maxFat} recipeTerm={recipeTerm}/>   
            </CustomBackground>
        </>
    );
};