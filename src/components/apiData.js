import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Container, Grid, Typography, CardActionArea, Button, Box, IconButton, CardMedia, Card, Tooltip } from '@mui/material';
import { CustomCardContent } from "../components/styled";
//import FavoriteIcon from '@mui/icons-material/Favorite';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ThemeContext } from './themeProvider';
import { useNavigate } from 'react-router-dom';

// API apps and keys that are used to access Edamam API [https://www.edamam.com/]
const APP_ID = "837155ce"; 
const APP_KEY = "76b054a6c99b380eda97058ec73f6069";

const RecipeList = function RecipeList({ mealType, filters, minCalories, maxCalories, minProtein, maxProtein, minCholesterol, maxCholesterol, minSugar, maxSugar, minFat, maxFat, healthType, cuisineType, mealTypes, recipeTerm}) {
  const [recipes, setRecipes] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const loader = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [likedRecipes, setLikedRecipes] = useState({});
  const [copiedTooltip, setCopiedTooltip] = useState({});
  const [shareTooltip, setShareTooltip] = useState({});
  const [infoTooltip, setInfoTooltip] = useState({});
  const [informationTooltip, setInformationTooltip] = useState({});
  
  const getSavedFontSize = () =>
      parseInt(localStorage.getItem("fontSize") || "0", 10);
              
  const getSavedDyslexicFont = () =>
      localStorage.getItem("useDyslexicFont") === "true";
        
  const [appliedFontSize] = useState(getSavedFontSize());
  const [useDyslexicFont] = useState(getSavedDyslexicFont())

  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();


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

const buildFirstUrl = () => {
  const q = encodeURIComponent(recipeTerm || mealType || "recipe");
  let url =
    `https://api.edamam.com/api/recipes/v2?type=public&q=${q}` +
    `&app_id=${APP_ID}&app_key=${APP_KEY}`;

  // ──────────────────────────────────────────────── calories / nutrients
  if (minCalories && maxCalories && !isNaN(minCalories) && !isNaN(maxCalories)) {
    url += `&calories=${minCalories}-${maxCalories}`;
  }

  if (minProtein && maxProtein && !isNaN(minProtein) && !isNaN(maxProtein)) {
    url += `&nutrients%5BPROCNT%5D=${minProtein}-${maxProtein}`;
  }
  if (minCholesterol && maxCholesterol && !isNaN(minCholesterol) && !isNaN(maxCholesterol)) {
    url += `&nutrients%5BCHOLE%5D=${minCholesterol}-${maxCholesterol}`;
  }
  if (minSugar && maxSugar && !isNaN(minSugar) && !isNaN(maxSugar)) {
    url += `&nutrients%5BSUGAR%5D=${minSugar}-${maxSugar}`;
  }
  if (minFat && maxFat && !isNaN(minFat) && !isNaN(maxFat)) {
    url += `&nutrients%5BFAT%5D=${minFat}-${maxFat}`;
  }

  // ──────────────────────────────────────────────── lists
  if (healthType?.length) {
    url += `&health=${healthType.join("&health=")}`;
  }
  if (cuisineType?.length) {
    url += `&cuisineType=${cuisineType.join("&cuisineType=")}`;
  }
  if (mealTypes?.length) {
    url += `&mealType=${mealTypes.join("&mealType=")}`;
  }

  // ──────────────────────────────────────────────── dynamic check‑box filters
  const healthQuery = getHealthLabels().map((h) => `&health=${h}`).join("");
  const dietQuery = getDietLabels().map((d) => `&diet=${d}`).join("");
  url += healthQuery + dietQuery;

  return url;
};

//--------------------------------------------------
// data fetching – one function for both first & next pages
//--------------------------------------------------
const fetchPage = (url, replace = false) => {
  setLoading(true);

  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (!data.hits?.length) {
        setError("No more recipes found.");
        setNextUrl(null);
        return;
      }

      // dedupe using recipe.uri (unique key)
      setRecipes((prev) => {
        const list = replace ? [] : prev;
        const seen = new Set(list.map((h) => h.recipe.uri));
        const fresh = data.hits.filter((h) => !seen.has(h.recipe.uri));
        return [...list, ...fresh];
      });

      setNextUrl(data._links?.next?.href ?? null);
      setError("");
    })
    .catch(() => setError("Failed to fetch recipes."))
    .finally(() => setLoading(false));
};

//--------------------------------------------------
// initial page whenever the search / filters change
//--------------------------------------------------
useEffect(() => {
  const firstUrl = buildFirstUrl();
  setRecipes([]);
  setNextUrl(null);
  fetchPage(firstUrl, true); // replace = true clears old hits
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  mealType,
  filters,
  minCalories,
  maxCalories,
  minProtein,
  maxProtein,
  minCholesterol,
  maxCholesterol,
  minSugar,
  maxSugar,
  minFat,
  maxFat,
  healthType,
  cuisineType,
  mealTypes,
  recipeTerm,
]);

const loadMoreRecipes = useCallback(() => {
  if (nextUrl) fetchPage(nextUrl);
});

useEffect(() => {
  if (!loader.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !loading && !error) {
        loadMoreRecipes();
      }
    },
    { root: null, rootMargin: "200px", threshold: 0 }  // rootMargin gives a small pre‑fetch buffer
  );

  observer.observe(loader.current);

  return () => observer.disconnect();
}, [loader, loading, error, loadMoreRecipes]);

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
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 3, minHeight: `${400 + (appliedFontSize * 12)}px`, backgroundColor: theme => theme.palette.background.default   }}>
                <CardActionArea onClick={() => navigate("/recipe", { state: { recipe: item.recipe } })}
                  disableRipple
                  sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardMedia component="img" height="180" image={image} alt={label}/>
                  <CustomCardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{fontSize: `${20 + appliedFontSize}px` ,fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", fontWeight: "bold" }}>{label}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", flexGrow: 1 }}>By {source}</Typography>
                  </CustomCardContent>
                  <Box sx={{ backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#08aa4d', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", padding: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 'auto', width: '100%', minHeight: '40px'}}>
                    <AccessTimeIcon sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2" sx={{fontSize: `${15 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "#000000" : "#FFFFFF"}}>
                      {totalTime ? `${totalTime} mins` : "Time N/A"}
                    </Typography>
                  </Box>
                </CardActionArea>                
                <Box sx={{ display: 'flex'}}>
                  <Tooltip title="Copied to clipboard"  open={copiedTooltip[index] || false} disableFocusListener disableHoverListener disableTouchListener arrow>
                  <Tooltip title='Share'enterDelay={1000} disableTouchListener open={shareTooltip[index] ?? false}>
                    <IconButton sx={{ marginLeft: '8px'}} onClick={() =>  handleCopyClick(url, index)} onMouseEnter={() => setShareTooltip((prev) => ({ ...prev, [index]: true }), 1000)} onMouseLeave={() => setShareTooltip((prev) => ({ ...prev, [index]: false }))}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  </Tooltip>
                  <Tooltip title='Information' enterDelay={800} open={informationTooltip[index] ?? false}>
                    <Tooltip  title={<>Total calories: {Math.round(calories)}kcal<br/>Serving size: {servings}<br/>Calories per serving: {Math.round(calories/servings)}kcal</>} open={infoTooltip[index] ?? false} disableHoverListener onClose={() => setInfoTooltip((prev) => ({ ...prev, [index]: false }))} onMouseEnter={() => setInformationTooltip((prev) => ({ ...prev, [index]: true }), 1000)} onMouseLeave={() => setInformationTooltip((prev) => ({ ...prev, [index]: false }))} placement="right" arrow>
                      <IconButton sx={{marginLeft: '172px' }} onClick={() => handleInfoClick(index)}>
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

      <div ref={loader} />

      <Grid container justifyContent="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Button onClick={loadMoreRecipes} variant="contained" sx={{backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#b2b3cc' : '#00a146', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",}} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      </Grid>
    </Container>
  );
};

export default RecipeList;