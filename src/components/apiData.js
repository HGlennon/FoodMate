import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Typography, CardActionArea, Button, Box, IconButton, CardMedia, Card, Tooltip } from '@mui/material';
import { CustomCardContent } from "../components/styled";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ThemeContext } from './themeProvider';
import { useNavigate } from 'react-router-dom';


const APP_ID = "837155ce"; 
const APP_KEY = "76b054a6c99b380eda97058ec73f6069";
const RECIPES_PER_PAGE = 9; 

const RecipeList = ({ mealType, filters, minCalories, maxCalories, minProtein, maxProtein, minCholesterol, maxCholesterol, minSugar, maxSugar, minFat, maxFat, healthType, cuisineType, mealTypes}) => {
  const [recipes, setRecipes] = useState([]);
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState({}); // Track likes for each recipe
  const [copiedTooltip, setCopiedTooltip] = useState({}); // Tracks tooltip state per recipe
  const [shareTooltip, setShareTooltip] = useState({});
  const [infoTooltip, setInfoTooltip] = useState({});
  const [informationTooltip, setInformationTooltip] = useState({});
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleLike = (index) => {
    setLikedRecipes((prev) => ({
        ...prev,
        [index]: !prev[index],
    }));
};

const handleCopyClick = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedTooltip((prev) => ({ ...prev, [index]: true }));
    setShareTooltip((prev) => ({ ...prev, [index]: false }));
    setTimeout(() => {
        setCopiedTooltip((prev) => ({ ...prev, [index]: false }));
    }, 1500);
};

const handleInfoClick = (index) => {
    setInfoTooltip((prev) => ({ ...prev, [index]: !prev[index] }));
    setInformationTooltip((prev) => ({ ...prev, [index]: false }));
};

const getNutrientValue = (nutrient) => {
    return Math.round(nutrient?.quantity * 10) / 10 || 'N/A';
};

const getHealthLabels = () => {
    const healthLabels = [];
    if (filters.vegan) healthLabels.push("vegan");
    if (filters.vegetarian) healthLabels.push("vegetarian");
    if (filters.alcoholFree) healthLabels.push("alcohol-free");
    if (filters.nutFree) healthLabels.push("tree-nut-free");
    if (filters.lactoseFree) healthLabels.push("dairy-free");
    return healthLabels;
};

const getDietLabels = () => {
    const dietLabels = [];
    if (filters.balanced) dietLabels.push("balanced");
    if (filters.highProtein) dietLabels.push("high-protein");
    if (filters.lowCarb) dietLabels.push("low-carb");
    if (filters.lowFat) dietLabels.push("low-fat");
    if (filters.lowSodium) dietLabels.push("low-sodium");
    return dietLabels;
};

const fetchRecipes = (newFrom) => {
    setLoading(true); // Will make the 'Load More' button indicate that it is currently loading [https://mui.com/material-ui/react-button/]

    // Construct the base API URL
    let API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${mealType || ""}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${newFrom}&to=${newFrom + RECIPES_PER_PAGE}`;
    console.log("Final API URL:", API_URL);

    // Add calorie range if both min and max are provided and valid
    if (minCalories && maxCalories && !isNaN(minCalories) && !isNaN(maxCalories)) {
        API_URL += `&calories=${minCalories}-${maxCalories}`;
    }

    // Add protein range if both min and max are provided and valid
    if (minProtein && maxProtein && !isNaN(minProtein) && !isNaN(maxProtein)) {
        API_URL += `&nutrients%5BPROCNT%5D=${minProtein}-${maxProtein}`;
    }

      // Add protein range if both min and max are provided and valid
    if (minCholesterol && maxCholesterol && !isNaN(minCholesterol) && !isNaN(maxCholesterol)) {
        API_URL += `&nutrients%5BCHOLE%5D=${minCholesterol}-${maxCholesterol}`;
    }

          // Add protein range if both min and max are provided and valid
    if (minSugar && maxSugar && !isNaN(minSugar) && !isNaN(maxSugar)) {
        API_URL += `&nutrients%5BSUGAR%5D=${minSugar}-${maxSugar}`;
    }

    if (minFat && maxFat && !isNaN(minFat) && !isNaN(maxFat)) {
      API_URL += `&nutrients%5BFAT%5D=${minFat}-${maxFat}`;
    } 

    if (healthType && healthType.length > 0) {
      API_URL += `&health=${healthType.join("&health=")}`;
    }

    if (cuisineType && cuisineType.length > 0) {
      API_URL += `&cuisineType=${cuisineType.join("&cuisineType=")}`;
    }

    if (mealTypes && mealTypes.length > 0) {
      API_URL += `&mealType=${mealTypes.join("&mealType=")}`;
    }
    // Add health filters
    const healthQuery = getHealthLabels().map(label => `&health=${label}`).join("");
    API_URL += healthQuery;

    // Add diet filters
    const dietQuery = getDietLabels().map(label => `&diet=${label}`).join("");
    API_URL += dietQuery;

    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data); // Log the API response
            if (data.hits) {
                setRecipes((prevRecipes) => [...prevRecipes, ...data.hits]);
                setError("");
            } else {
                setError("No more recipes found.");
            }
            setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError("Failed to fetch recipes.");
          setLoading(false);
      });
    };

    useEffect(() => {
        if (mealType) {
            setRecipes([]); // Reset recipes when mealType changes
            setFrom(0);
            fetchRecipes(0);
        }
    }, [mealType, filters, minCalories, maxCalories, minProtein, maxProtein, minCholesterol, maxCholesterol, minSugar, maxSugar, minFat, maxFat, healthType, cuisineType, mealTypes]);

    const loadMoreRecipes = () => {
        const newFrom = from + RECIPES_PER_PAGE;
        setFrom(newFrom);
        fetchRecipes(newFrom);
    };

    const handleRecipeClick = (recipe) => {
        navigate('/recipe', { state: { recipe } });
    };

  return (
    <Container maxWidth='md' sx={{ marginTop: '20px' }}>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {recipes.map((item, index) => {
          const { label, image, source, totalTime, calories, url, yield:servings, ingredientLines, totalNutrients} = item.recipe;
          const { VITB12, VITB6A, VITC, VITD, TOCPHA, VITK1, VITA_RAE, FAT, SUGAR, PROCNT, K, CA, CHOLE, FIBTG, FE, NA, FOLDFE, MG, ZN} = totalNutrients;
          const liked = likedRecipes[index] || false; // Get liked state for this recipe

          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 3, minHeight: '400px', backgroundColor: theme => theme.palette.background.default   }}>
                <CardActionArea onClick={() => handleRecipeClick(item.recipe) } disableRipple sx={{ display: "flex", flexDirection: "column", height: "100%" }}>  
                  <CardMedia component="img" height="180" image={image} alt={label}/>
                  <CustomCardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", maxHeight: '100px', textOverflow: 'ellipsis' }}>
                    <Typography variant="h6" fontWeight="bold">{label}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ flexGrow: 1 }}>By {source}</Typography>
                  </CustomCardContent>
                  <Box sx={{ backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#08aa4d', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", padding: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 'auto', width: '100%', minHeight: '40px'}}>
                    <AccessTimeIcon sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2" sx={{ color: themeMode === "highContrast" ? "#000000" : "#FFFFFF"}}>
                      {totalTime ? `${totalTime} mins` : "Time N/A"}
                    </Typography>
                  </Box>
                </CardActionArea>                
                <Box sx={{ display: 'flex'}}>
                  <Tooltip title={"I like this"} enterDelay={575} enterNextDelay={1000}> {/* Will show the user information about what the icon does when hovering over it [https://mui.com/material-ui/react-tooltip/] */}
                    <IconButton onClick={() => toggleLike(index)} color={liked ? "error" : "default"}>
                      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copied to clipboard"  open={copiedTooltip[index] || false} disableFocusListener disableHoverListener disableTouchListener arrow>
                  <Tooltip title='Share'enterDelay={1000} disableTouchListener open={shareTooltip[index] ?? false}>
                    <IconButton sx={{ marginLeft: '8px'}} onClick={() =>  handleCopyClick(url, index)} onMouseEnter={() => setShareTooltip((prev) => ({ ...prev, [index]: true }), 1000)} onMouseLeave={() => setShareTooltip((prev) => ({ ...prev, [index]: false }))}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  </Tooltip>
                  <Tooltip title='Information' enterDelay={800} open={informationTooltip[index] ?? false}>
                    <Tooltip  title={<>Total calories: {Math.round(calories)}kcal<br/>Serving size: {servings}<br/>Calories per serving: {Math.round(calories/servings)}kcal</>} open={infoTooltip[index] ?? false} disableHoverListener onClose={() => setInfoTooltip((prev) => ({ ...prev, [index]: false }))} onMouseEnter={() => setInformationTooltip((prev) => ({ ...prev, [index]: true }), 1000)} onMouseLeave={() => setInformationTooltip((prev) => ({ ...prev, [index]: false }))} placement="right" arrow>
                      <IconButton sx={{marginLeft: '137px' }} onClick={() => handleInfoClick(index)}>
                        <InfoIcon/>
                      </IconButton>
                    </Tooltip>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container justifyContent="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Button onClick={loadMoreRecipes} variant="contained" sx={{backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#b2b3cc' : '#00a146', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",}} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      </Grid>
    </Container>
  );
};

export default RecipeList;