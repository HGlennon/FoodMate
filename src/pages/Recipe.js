import React, { useEffect, useState } from 'react';
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Typography, Card, CardMedia, Box, CssBaseline, Container, Grid } from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import RecipeList from '../components/apiData';

export default function Recipe() {
    const location = useLocation();
    const recipe = location.state?.recipe;
    const [showIngredient, setShowIngredient] = useState(true);
    const [showNutrient, setShowNutrient] = useState(false);
    const navigate = useNavigate();
    const emptyFilters = React.useMemo(() => ({}), []);

    useEffect(() => {
        if (recipe) {
          window.scrollTo({ top: 0 });
        }
      }, [recipe]);

    const handleLinkChange = () => {
        window.open(recipe.url, "_blank", "noopener, noreferrer");
    }

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
                                <CardMedia component="img" image={recipe.image} alt={recipe.label} sx={{ width: "100%", objectFit: "cover", borderRadius: 2, height: "auto", maxHeight: "600px" }} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: "#08e464", borderRadius: 2, boxShadow: 3, color:'white', marginBottom: '25px'}}>
                                <Box sx={{ backgroundColor: "#08af4e", padding: 1, width: "100%", borderRadius: "4px 4px 0 0", textAlign: "center" }}>
                                    <Typography variant='h6' fontWeight='bold'>{recipe.label}</Typography>
                                </Box>
                                <Box sx={{ padding: 1.5 }}>
                                    <Typography variant="subtitle1">Total calories: {Math.round(recipe.calories)}kcal</Typography>
                                    <Typography variant="subtitle1">Serving size: {recipe.yield}</Typography>
                                    <Typography variant="subtitle1">Calories per serving: {Math.round(recipe.calories / recipe.yield)}kcal</Typography>
                                </Box>
                            </Card>
                            <Card sx={{ backgroundColor: "#08e464", borderRadius: 2, boxShadow: 3, color:'white'  }}>
                                <Box sx={{ backgroundColor: "#08af4e", padding: 1, width: "100%", borderRadius: "4px 4px 0 0", textAlign: "center"}}>
                                    <Typography variant="h6" fontWeight="bold">Preparation</Typography>
                                </Box>
                                <Box sx={{ padding: 1.5 }}>
                                    <Typography variant="subtitle1">Preparation instructions can be found in the source below:</Typography>
                                    <Box onClick={handleLinkChange} sx={{ backgroundColor: '#07cf5b', cursor: "pointer", padding: '8px 12px', borderRadius: 2, textAlign: 'center', marginTop: '5px', '&:hover': { backgroundColor: '#08c155'}  }}>
                                        <Typography variant="subtitle1" fontWeight={'bold'}>
                                            Full Recipe Instruction
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ display: 'flex', backgroundColor: "#08e464", borderRadius: 2, boxShadow: 3, color:'white', display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{ backgroundColor: "#08af4e", padding: 1, width: "100%", display: "flex", gap: 2 }}>
                                    <Box onClick={handleShowIngredients} sx={{ flex: 1, textAlign: "center", cursor: "pointer", padding: 1, borderBottom: `4px solid ${showIngredient ? '#ffffff' : '#6fffa6'}`,"&:hover": { backgroundColor: "#089f48", borderTopLeftRadius: 6, borderTopRightRadius: 6 } }}>
                                        <Typography variant="h6" fontWeight="bold">Ingredients</Typography>
                                    </Box>
                                    <Box onClick={handleShowNutrient} sx={{ flex: 1, textAlign: "center", cursor: "pointer", padding: 1, borderBottom: `4px solid ${showNutrient ? '#ffffff' : '#6fffa6'}`, "&:hover": { backgroundColor: "#089f48", borderTopLeftRadius: 6, borderTopRightRadius: 6 } }}>
                                        <Typography variant="h6" fontWeight="bold">Nutrition</Typography>
                                    </Box>
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
                                        <Typography key={index} variant="subtitle1" color="white" sx={{ marginBottom: 1 }}>
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
                                    {showNutrient && 
                                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: "column", height: '290px'}}>
                                            <Typography variant="subtitle1">Calcium</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.CA?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Cholesterol</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.CHOLE?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Fat</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.FAT?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1">Fibre</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.FIBTG?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1">Iron</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.FE?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Magnesium</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.MG?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Potassium</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.K?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Protein</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.PROCNT?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1">Sodium</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.NA?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Sugar</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.SUGAR?.quantity * 10) / 10}g</Typography>

                                            <Typography variant="subtitle1">Vitamin A, RAE</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITA_RAE?.quantity)}µg</Typography>

                                            <Typography variant="subtitle1">Vitamin B-12</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITB12?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1">Vitamin B-6</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITB6A?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Vitamin C</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITC?.quantity * 10) / 10}mg</Typography>

                                            <Typography variant="subtitle1">Vitamin D</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITD?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1">Vitamin K</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.VITK1?.quantity * 10) / 10}µg</Typography>

                                            <Typography variant="subtitle1">Zinc</Typography>
                                            <Typography variant="subtitle1" color='#e0dcda' sx={{ marginBottom: 1 }}>Amount: {Math.round(recipe.totalNutrients.ZN?.quantity * 10) / 10}mg</Typography>
                                        </Box>}
                                </Box>
                            </Card>
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
