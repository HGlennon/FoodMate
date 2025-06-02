import React, { useState, useContext } from "react";
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline, Typography, InputBase, Box, Button, MenuItem, Select, FormControl, Grid, Container, Divider, Checkbox } from '@mui/material';
import { ThemeContext } from '../components/themeProvider';
import { useNavigate } from 'react-router-dom';

  // Contains the health labels listed in Edamam API for the dropdown lists
  const health = [
    { label: "Alcohol-free", apiValue: "alcohol-free" },
    { label: "Dairy-free", apiValue: "dairy-free" },
    { label: "Egg-free", apiValue: "egg-free" },
    { label: "Fish-free", apiValue: "fish-free" },
    { label: "Gluten-free", apiValue: "gluten-free" },
    { label: "Kidney-free", apiValue: "kidney-friendly" },
    { label: "Low-sugar", apiValue: "low-sugar" },
    { label: "Lupine-free", apiValue: "lupine-free" },
    { label: "Mediterranean", apiValue: "mediterranean" },
    { label: "Pork-free", apiValue: "pork-free" },
    { label: "Pescatarian", apiValue: "pescatarian" },
    { label: "Red Meat Free", apiValue: "red-meat-free" },
    { label: "Soy-free", apiValue: "soy-free" },
    { label: "Vegan", apiValue: "vegan" },
    { label: "Vegetarian", apiValue: "vegetarian" },
    { label: "Shellfish-free", apiValue: "shellfish-free" }
  ];

  const cuisine = [
    { label: "American", apiValue: "american" },
    { label: "Asian", apiValue: "asian" },
    { label: "British", apiValue: "british" },
    { label: "Caribbean", apiValue: "caribbean" },
    { label: "Central Europe", apiValue: "central europe" },
    { label: "Chinese", apiValue: "chinese" },
    { label: "Eastern Europe", apiValue: "eastern europe" },
    { label: "French", apiValue: "french" },
    { label: "Greek", apiValue: "greek" },
    { label: "Indian", apiValue: "indian" },
    { label: "Italian", apiValue: "italian" },
    { label: "Japanese", apiValue: "japanese" },
    { label: "Korean", apiValue: "korean" },
    { label: "Kosher", apiValue: "kosher" },
    { label: "Mediterranean", apiValue: "mediterranean" },
    { label: "Mexican", apiValue: "mexican" },
    { label: "Middle Eastern", apiValue: "middle eastern" },
    { label: "Nordic", apiValue: "nordic" },
    { label: "South American", apiValue: "south american" },
    { label: "South East Asian", apiValue: "south east asian" },
    { label: "World", apiValue: "world" },
  ];

  const meals = [
    { label: "Breakfast", apiValue: "breakfast" },
    { label: "Brunch", apiValue: "brunch" },
    { label: "Lunch/Dinner", apiValue: "lunch/dinner" },
    { label: "Snack", apiValue: "snack" },
    { label: "Teatime", apiValue: "teatime" }
  ];

export default function AdvancedSettings() {
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
            
    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";
      
    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont())

    const { themeMode, setThemeMode } = useContext(ThemeContext);
    
    // Advanced Search filters
    const [selectedCuisine, setSelectedCuisine] = useState([]);
    const [selectedHealth, setSelectedHealth] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState([]);
    const [recipeTerm, setRecipeTerm] = useState(""); 
    const [ingredientTerm, setIngredientTerm] = useState(""); 
    const [minCalories, setMinCalories] = useState(""); 
    const [maxCalories, setMaxCalories] = useState(""); 
    const [minProtein, setMinProtein] = useState("");
    const [maxProtein, setMaxProtein] = useState(""); 
    const [minCholesterol, setMinCholesterol] = useState(""); 
    const [maxCholesterol, setMaxCholesterol] = useState(""); 
    const [minSugar, setMinSugar] = useState(""); 
    const [maxSugar, setMaxSugar] = useState(""); 
    const [minFat, setMinFat] = useState(""); 
    const [maxFat, setMaxFat] = useState("");
    
    const [searchError, setSearchError] = useState(false);
    const navigate = useNavigate(); 

    const handleIngredientChange = (e) => {
        setIngredientTerm(e.target.value);
    };

    const handleRecipeKeyPress = (e) => {
        if (e.key === "Enter") {
          if (recipeTerm.trim() !== "") {
            setSearchError(false);
            handleSubmit();
          } else {
            setSearchError(true);
          }
        }
      };
      
      const handleNumericKeyPress = (e) => {
        if (e.key === "Enter") {
          if (recipeTerm.trim() !== "") {
            setSearchError(false);
            handleSubmit();
          } else {
            setSearchError(true);
          }
        }
      };

    const handleSubmit = () => {
        if (recipeTerm.trim() !== "") { // Will submit the entire advanced search as recipeTerm
            const queryParams = new URLSearchParams();
            queryParams.append("mealType", encodeURIComponent(recipeTerm + " " + ingredientTerm)); 
            // Adds calorie range to query if both min and max are provided
            if (minCalories && maxCalories) {
                queryParams.append("minCalories", encodeURIComponent(minCalories));
                queryParams.append("maxCalories", encodeURIComponent(maxCalories));
            }
            if (minProtein && maxProtein) {
                queryParams.append("minProtein", encodeURIComponent(minProtein));
                queryParams.append("maxProtein", encodeURIComponent(maxProtein));
            }
            if (minCholesterol && maxCholesterol) {
                queryParams.append("minCholesterol", encodeURIComponent(minCholesterol));
                queryParams.append("maxCholesterol", encodeURIComponent(maxCholesterol));
            }
            if (minSugar && maxSugar) {
                queryParams.append("minSugar", encodeURIComponent(minSugar));
                queryParams.append("maxSugar", encodeURIComponent(maxSugar));
            }
            if (minFat && maxFat) {
                queryParams.append("minFat", encodeURIComponent(minFat));
                queryParams.append("maxFat", encodeURIComponent(maxFat));
            }
        
            if (selectedHealth.length > 0) {
                queryParams.append("healthType", encodeURIComponent(selectedHealth.join(",")));
            }
            if (selectedCuisine.length > 0) {
                queryParams.append("cuisineType", encodeURIComponent(selectedCuisine.join(",")));
            }

            if (selectedMeal.length > 0) {
                queryParams.append("mealTypes", encodeURIComponent(selectedMeal.join(",")));
            }
            navigate(`/search?${queryParams.toString()}`, {
                state: { recipeTerm },
            });
        } else {
            setSearchError(true);
        }
    };

    const handleReset = () => {
        const reset = window.confirm("Are you sure you want to reset the search?");
        if (!reset) return;
        setRecipeTerm(""); 
        setIngredientTerm("");
        setSelectedHealth([]);
        setSelectedCuisine([]);
        setSelectedMeal([]);
        setMinCalories("");
        setMaxCalories("");
        setMinProtein("");
        setMaxProtein("");
        setMinCholesterol("");
        setMaxCholesterol("");
        setMinSugar("");
        setMaxSugar("");
        setMinFat("");
        setMaxFat("");
        setSearchError(false);
    }
    return (
        <>
            <CssBaseline />
            <TopBar />
            <GradientSection>
            <Container maxWidth="false" sx={{ marginLeft: '20px'}}>
                <Typography variant="h5" fontWeight={'bold'} sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${24 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}} my={1}>Advanced Search</Typography>
                {searchError && (
                        <Typography 
                            role="alert"
                            variant="caption" 
                            sx={{
                            position: 'absolute',
                            left: '211px',
                            top: '170px',
                            color: 'red',
                            fontSize: `${14 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                            }}
                        >
                            Please enter a recipe search term first
                        </Typography>
                )}
                <Typography variant="h6" sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}} my={1.5}>Find recipes by...</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" color="white" gap={2}>
                    <Typography
                        component="span"
                        sx={{
                            minWidth: '150px',
                            fontSize: `${16 + appliedFontSize}px`,
                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : 'inherit',
                            color: themeMode === "highContrast" ? "yellow" : "white"
                        }}
                        >
                        Recipe Search:
                        <Typography
                            component="span"
                            sx={{
                            color: themeMode === "highContrast" ? "white" : themeMode === "dark" ? 'white' : 'red',
                            ml: 0.5
                            }}
                        >
                            *
                        </Typography>
                    </Typography>           
                    <Box 
                    sx={{ 
                        display: 'flex', 
                        border: searchError ? "2px solid red" : themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                        padding: '4px 8px', 
                        borderRadius: 1, 
                        width: '400px',
                    }}>
                        <InputBase
                        sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}
                        value={recipeTerm}                    
                        onChange={(e) => {
                            setRecipeTerm(e.target.value);
                            setSearchError(false); 
                        }}
                        onKeyPress={handleRecipeKeyPress}
                        inputProps={{
                            role: "searchbox",
                            "aria-label":
                              "Recipe search. Type important words related to recipe, for example fish and chips."
                        }}    
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Type important words related to recipe (i.e fish and chips).</Typography>
                    </Box>

                    <Box display="flex" flexDirection="row" alignItems="center" color="white" mt={2}>
                        <Typography sx={{minWidth: '165px', fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Ingredients: </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",  
                            padding: '4px 8px', 
                            borderRadius: 1, 
                            width: '400px' }}>
                            <InputBase
                                sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}
                                value={ingredientTerm}
                                onChange={handleIngredientChange}
                                onKeyPress={handleRecipeKeyPress}
                                inputProps={{
                                    role: "searchbox",
                                    "aria-label":
                                      "Ingredients search. Type specific ingredients here, separating them with a comma."
                                }}    
                            />
                        </Box>
                        <Typography sx={{marginLeft: '18px', fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Enter specific ingredients here, separating them with a comma (i.e fish, potato).</Typography>
                    </Box>

                <Divider sx={{ backgroundColor: themeMode === "highContrast" ? "yellow" : "white", border: "1px solid", borderRadius: 2, width: "77%", borderColor: 'divider', my: 2 }} variant='fullwidth' />

                <Typography variant="h6" my={1} sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Narrow recipe search here...</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" color="white" gap={2}>
                        <Typography minWidth="150px" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Health Restrictions: </Typography>
                        <FormControl sx={{ width: '300px', mr:2}}>
                        <Select
                            label="health"
                            multiple
                            value={selectedHealth}
                            onChange={(e) => setSelectedHealth(e.target.value)}
                            renderValue={(selected) => selected.map(val => {
                                const option = health.find(opt => opt.apiValue === val);
                                return option ? option.label : val;
                            }).join(', ')}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Health Restrictions. Select any health restrictions/dietary needs in the list that may apply."
                            }}  
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                '& .MuiSelect-select': {
                                padding: '4px 8px',
                                minHeight: 'unset', 
                                color: themeMode === "highContrast" ? "yellow" : "white"
                                }
                            }}
                            MenuProps={{
                                PaperProps: { 
                                sx: { 
                                    maxHeight: '200px'
                                    }
                                }}}
                            >
                            {health.map((item) => (
                                <MenuItem key={item.apiValue} value={item.apiValue} sx={{ fontSize: '12px', padding: '4px 8px', minHeight: 'unset'}}>
                                <Checkbox checked={selectedHealth.includes(item.apiValue)}/>
                                <Typography sx={{ fontSize: '12px', color: '#000'}}>{item.label}</Typography>
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Select any health restrictions/dietary needs that may apply.</Typography>
                    </Box>

                <Box display="flex" flexDirection="row" alignItems="center" color="white" gap={2}>
                    <Typography minWidth="150px" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Cuisine type: </Typography>
                    <FormControl sx={{ width: '300px', mr: 2, mt: 1.5 }}>
                        <Select
                            label="cuisine"
                            multiple
                            value={selectedCuisine}
                            onChange={(e) => setSelectedCuisine(e.target.value)}
                            renderValue={(selected) => selected.map(val => {
                                const option = cuisine.find(opt => opt.apiValue === val);
                                return option ? option.label : val;
                            }).join(', ')}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Cuisine type. Select any cuisine types that you may want."
                            }}  
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                '& .MuiSelect-select': {
                                    padding: '4px 8px',
                                    minHeight: 'unset', 
                                    color: themeMode === "highContrast" ? "yellow" : "white"
                                }
                            }}
                            MenuProps={{
                                PaperProps: { 
                                    sx: { 
                                        maxHeight: '200px'
                                    }
                                }
                            }}
                        >
                            {cuisine.map((item) => (
                                <MenuItem key={item.apiValue} value={item.apiValue} sx={{ fontSize: '12px', padding: '4px 8px', minHeight: 'unset'}}>
                                    <Checkbox checked={selectedCuisine.includes(item.apiValue)}/>
                                    <Typography sx={{ fontSize: '12px', color: '#000'}}>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography sx={{mt: 1.5, fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Select any cuisine types that you may want.</Typography>
                </Box>

                <Box display="flex" flexDirection="row" alignItems="center" color="white" gap={2}>
                    <Typography minWidth="150px" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Meal type: </Typography>
                    <FormControl sx={{ width: '300px', mr: 2, mt: 1.5 }}>
                        <Select
                            label="meals"
                            multiple
                            value={selectedMeal}
                            onChange={(e) => setSelectedMeal(e.target.value)}
                            renderValue={(selected) => selected.map(val => {
                                const option = meals.find(opt => opt.apiValue === val);
                                return option ? option.label : val;
                            }).join(', ')}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Meal type. Select any meal types that may apply."
                            }}  
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                                fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                '& .MuiSelect-select': {
                                    padding: '4px 8px',
                                    minHeight: 'unset', 
                                    color: themeMode === "highContrast" ? "yellow" : "white"
                                    
                                }
                            }}
                            MenuProps={{
                                PaperProps: { 
                                    sx: { 
                                        maxHeight: '200px'
                                    }
                                }
                            }}
                        >
                            {meals.map((item) => (
                                <MenuItem key={item.apiValue} value={item.apiValue} sx={{ fontSize: '12px', padding: '4px 8px', minHeight: 'unset'}}>
                                    <Checkbox checked={selectedMeal.includes(item.apiValue)}/>
                                    <Typography sx={{ fontSize: '12px', color: '#000'}}>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography sx={{mt: 1.5, fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Select any meal types that may apply.</Typography>
                </Box>

                <Divider sx={{ backgroundColor: themeMode === "highContrast" ? "yellow" : "white", border: "1px solid", borderRadius: 2, width: "77%", borderColor: 'divider', my: 2 }} variant='fullwidth' />

                <Typography variant="h6" my={1} sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Make your meal healthier with...</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: themeMode === "highContrast" ? "yellow" : "white" }}>
                    <Typography minWidth={"285px"} sx={{ fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Calorie amount (kcal) ranging from: </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Lower calorie amount. Give the range of calories for the recipe from lowest possible amount to highest."
                            }}  
                            value={minCalories}
                            onChange={(e) => setMinCalories(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>to</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderColor: 'grey',
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}>
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={maxCalories}
                            onChange={(e) => setMaxCalories(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Higher calorie amount. Give the range of calories for the recipe from lowest possible amount to highest."
                            }}  
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Give the range of calories for the recipes you want from lowest possible amount to highest.</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: themeMode === "highContrast" ? "yellow" : "white", mt: 1.5 }}>
                    <Typography minWidth={"285px"} sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Protein amount (g) ranging from: </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={minProtein}
                            onChange={(e) => setMinProtein(e.target.value)} 
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Lower protein amount. Give the range of protein for the recipe from lowest possible amount to highest in grams."
                            }}  
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>to</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderColor: 'grey',
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}>
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={maxProtein}
                            onChange={(e) => setMaxProtein(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Higher protein amount. Give the range of protein for the recipe from lowest possible amount to highest in grams."
                            }}
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Enter the range of protein amount for a recipe, from lowest possible amount to highest.</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: themeMode === "highContrast" ? "yellow" : "white", mt: 1.5 }}>
                    <Typography minWidth={"285px"} sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Cholesterol amount (mg) ranging from: </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={minCholesterol}
                            onChange={(e) => setMinCholesterol(e.target.value)} 
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Lower cholesterol amount. Give the range of cholesterol amount for the recipe from lowest possible amount to highest in milligrams."
                            }}  
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>to</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderColor: 'grey',
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}>
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={maxCholesterol}
                            onChange={(e) => setMaxCholesterol(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Higher cholesterol amount. Give the range of cholesterol amount for the recipe from lowest possible amount to highest in milligrams."
                            }}  
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Input the range of cholesterol amount for a recipe, from lowest possible amount to highest.</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: themeMode === "highContrast" ? "yellow" : "white", mt: 1.5 }}>
                    <Typography minWidth={"285px"} sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Sugar amount (g) ranging from: </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={minSugar}
                            onChange={(e) => setMinSugar(e.target.value)} 
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Lower sugar amount. Give the range of sugar amount for the recipe from lowest possible amount to highest in grams."
                            }}  
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>to</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderColor: 'grey',
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}>
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={maxSugar}
                            onChange={(e) => setMaxSugar(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Higher sugar amount. Give the range of sugar amount for the recipe from lowest possible amount to highest in grams."
                            }}  
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Select the range of sugar amount for a recipe, from lowest possible amount to highest.</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: themeMode === "highContrast" ? "yellow" : "white", mt: 1.5, mb: 1.5 }}>
                    <Typography minWidth={"285px"} sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Fat amount (g) ranging from: </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={minFat}
                            onChange={(e) => setMinFat(e.target.value)} 
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Lower fat amount. Give the fat amount for the recipe from lowest possible amount to highest in grams."
                            }}  
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>to</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                            borderColor: 'grey',
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}>
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white", fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit" }}
                            value={maxFat}
                            onChange={(e) => setMaxFat(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
                            inputProps={{
                                role: "searchbox",
                                    "aria-label":
                                        "Higher fat amount. Give the fat amount for the recipe from lowest possible amount to highest in grams."
                            }}  
                        />
                    </Box>
                    <Typography sx={{fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Enter the range of fat amount for a recipe, from lowest possible amount to highest.</Typography>
                </Box>
            </Container>
            </GradientSection>

            <CustomBackground>
                <Container maxWidth='sm' style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#66668A' : '#00853C', 
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    padding: '8px 16px',
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#dada00" : themeMode === "dark" ? "#727297" : "#028D3E",
                                      },
                                      fontSize: `${15 + appliedFontSize}px`
                                }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#E00000', 
                                    color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    padding: '8px 16px',
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#f0b801" : themeMode === "dark" ? "#555555" : "#D01616",
                                      },
                                      fontSize: `${15 + appliedFontSize}px`
                                }}
                                onClick={handleReset}
                            >
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </CustomBackground>
        </>
    );
}