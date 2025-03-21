import { useHref, useLocation, useNavigate, Link } from 'react-router-dom';
import { Typography, Card, CardMedia, Box, CssBaseline, Container, Grid } from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';

export default function Recipe() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe;

    const handleLinkChange = () => {
        window.open(recipe.url, "_blank", "noopener, noreferrer");
    }

    return (
        <main>
            <CssBaseline/>
            <TopBar/>
            <GradientSection>
                <Container maxWidth="md">
                    <Grid container marginTop="20px">
                        <Card sx={{ display: 'flex', padding: 0.13}}>
                            <CardMedia component="img" image={recipe.image} alt={recipe.label} sx={{ width: "100%", objectFit: "cover", borderRadius: 2, height: "auto", maxHeight: "400px"}}/>
                        </Card>
                        <Card>
                            <Typography variant="h5">{recipe.label}</Typography>
                            <Typography variant="h6">Total calories: {recipe.calories}kcal</Typography>
                            <Typography variant="h6">Serving size: {recipe.yield}</Typography>
                            <Typography variant="h6">Calories per serving: {Math.round(recipe.calories/recipe.yield)}kcal</Typography>

                        </Card>
                        <Card>
                            <Box onClick={handleLinkChange} sx={{ cursor: "pointer" }}>
                                <Typography variant="h5">Preparation</Typography>
                                <Typography variant="h6">Preparation instructions can be found in the source below:</Typography>
                                <Box>
                                    <Typography variant="h6">
                                        Full Recipe Instruction
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card>
                            <Box>
                                <Typography>
                                    Ingredients
                                </Typography>
                                <Typography>
                                    Nutrition
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>Food Info</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Container>
            </GradientSection>
            <CustomBackground>
                
            </CustomBackground>
        </main>
    );
}
