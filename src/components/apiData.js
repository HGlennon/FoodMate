import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, CardActionArea } from '@mui/material';
import { CustomCard, CustomCardContent, CustomCardMedia } from "../components/styled";

const APP_ID = "837155ce"; 
const APP_KEY = "76b054a6c99b380eda97058ec73f6069";

const RecipeList = ({ mealType }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealType) return;
    
    const API_URL = `https://api.edamam.com/search?q=${mealType}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.hits) {
          setRecipes(data.hits);
        } else {
          setError("No recipes found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch recipes.");
        setLoading(false);
      });
  }, [mealType]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth='md' sx={{marginTop: '20px'}}>
    <Grid container spacing={3}>
      {recipes.map((item, index) => {
        const { label, image, url, calories, source } = item.recipe;
        return (
            <Grid item key={index} xs={12} sm={6} md={4}>
            <CustomCard>
            <CardActionArea href={ "http://localhost:3000/recipe"} style={{backgroundColor: 'transparent'}} disableRipple>             
            <CustomCardMedia image={image} alt={label} />
            <CustomCardContent>
                <Typography variant="h6" align='center'>{label}</Typography>
                <Typography variant="h6" align='center'>By {source}</Typography>
                <Typography style={{color:'#FFFFFF'}}>
                  Calories: {Math.round(calories)}kcal
                </Typography>
                <Typography style={{color:'#FFFFFF'}}>
                  Number of Servings: WIP
                </Typography>                
                <Typography style={{color:'#FFFFFF'}}>
                  Calories per Serving: WIP
                </Typography>
              </CustomCardContent>
              </CardActionArea>
            </CustomCard>
          </Grid>
        );
      })}
    </Grid>
    </Container>
  );
};

export default RecipeList;




