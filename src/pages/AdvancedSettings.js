import React, { useState, useContext } from "react";
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline, Typography, InputBase, Box, Button, MenuItem, Select, FormControl, Grid, Container, Divider, Checkbox } from '@mui/material';
import { ThemeContext } from '../components/themeProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

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
    const [selectedCuisine, setSelectedCuisine] = useState([]);
    const [selectedHealth, setSelectedHealth] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState([]);
    const [recipeTerm, setRecipeTerm] = useState(""); // State for the search term
    const [ingredientTerm, setIngredientTerm] = useState(""); // State for the search term
    const [minCalories, setMinCalories] = useState(""); // State for min calories
    const [maxCalories, setMaxCalories] = useState(""); // State for max calories
    const [minProtein, setMinProtein] = useState(""); // State for min calories
    const [maxProtein, setMaxProtein] = useState(""); // State for max calories
    const [minCholesterol, setMinCholesterol] = useState(""); // State for min calories
    const [maxCholesterol, setMaxCholesterol] = useState(""); // State for max calories
    const [minSugar, setMinSugar] = useState(""); // State for min calories
    const [maxSugar, setMaxSugar] = useState(""); // State for max calories
    const [minFat, setMinFat] = useState(""); // State for min calories
    const [maxFat, setMaxFat] = useState(""); // State for max calories
    const [searchError, setSearchError] = useState(false);
    

    const navigate = useNavigate(); // Hook for navigation

    // Handle search term change
    const handleSearchChange = (e) => {
        setRecipeTerm(e.target.value);
    };

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

    // Handles submit button click
    const handleSubmit = () => {
        if (recipeTerm.trim() !== "") {
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
                state: { recipeTerm }, // Pass recipeTerm as state
            });
        } else {
            setSearchError(true);
        }
    };


    return (
        <>
            <CssBaseline />
            <TopBar />
            <GradientSection>
            <Container maxWidth="false" sx={{ marginLeft: '20px'}}>
                <Typography variant="h5" fontWeight={'bold'} sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${24 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}} my={1}>Advanced Search</Typography>

                <Typography variant="h6" sx={{color: themeMode === "highContrast" ? "yellow" : "white", fontSize: `${20 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}} my={1.5}>Find recipes by...</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" color="white" gap={2}>
                    <Typography sx={{minWidth: '150px', fontSize: `${16 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"}}>Recipe Search: </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        border: searchError ? "2px solid red" : themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                        padding: '4px 8px', 
                        borderRadius: 1, 
                        width: '400px',
                    }}>
                        <InputBase
                        sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}
                        value={recipeTerm}
                        onChange={(e) => {
                            setRecipeTerm(e.target.value);
                            setSearchError(false); // Clear error when typing
                        }}
                        onKeyPress={handleRecipeKeyPress}
                        />
                        {searchError && (
                        <Typography 
                            variant="caption" 
                            sx={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: 0,
                            color: 'red',
                            fontSize: `${14 + appliedFontSize}px`, fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit"
                            }}
                        >
                            Please enter a recipe search term first
                        </Typography>
                        )}
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
                                sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white"}}
                                value={ingredientTerm}
                                onChange={handleIngredientChange}
                                onKeyPress={handleRecipeKeyPress}
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
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
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
                                <Checkbox
                                    checked={selectedHealth.includes(item.apiValue)}
                                    sx={{ transform: 'scale(0.8)', padding: '4px' }}
                                />
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
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
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
                                    <Checkbox
                                        checked={selectedCuisine.includes(item.apiValue)}
                                        sx={{ transform: 'scale(0.8)', padding: '4px' }}
                                    />
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
                            sx={{ 
                                height: '36px', 
                                border: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white",
                                '& .MuiSelect-select': {
                                    padding: '4px 8px',
                                    minHeight: 'unset', 
                                    color: themeMode === "highContrast" ? "1px solid yellow" : "1px solid white"
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
                                    <Checkbox
                                        checked={selectedMeal.includes(item.apiValue)}
                                        sx={{ transform: 'scale(0.8)', padding: '4px' }}
                                    />
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
                            borderRadius: 1,
                            padding: "4px 8px",
                            width: "200px",
                            outline: "none",
                        }}
                    >
                        <InputBase
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={minCalories}
                            onChange={(e) => setMinCalories(e.target.value)} // Update minCalories state
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={maxCalories}
                            onChange={(e) => setMaxCalories(e.target.value)} // Update maxCalories state
                            onKeyPress={handleNumericKeyPress}
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={minProtein}
                            onChange={(e) => setMinProtein(e.target.value)} 
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={maxProtein}
                            onChange={(e) => setMaxProtein(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={minCholesterol}
                            onChange={(e) => setMinCholesterol(e.target.value)} 
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={maxCholesterol}
                            onChange={(e) => setMaxCholesterol(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={minSugar}
                            onChange={(e) => setMinSugar(e.target.value)} 
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={maxSugar}
                            onChange={(e) => setMaxSugar(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={minFat}
                            onChange={(e) => setMinFat(e.target.value)} 
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
                            sx={{ flexGrow: 1, color: themeMode === "highContrast" ? "yellow" : "white" }}
                            value={maxFat}
                            onChange={(e) => setMaxFat(e.target.value)}
                            onKeyPress={handleNumericKeyPress}
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
                                    backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#b2b3cc' : '#00E265', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    padding: '8px 16px',
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#dada00" : 
                                                         themeMode === "dark" ? "#9999b3" : "#02d55d",
                                      },
                                      fontSize: `${15 + appliedFontSize}px`
                                }}
                                onClick={handleSubmit} // Add the submit handler here
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#ff1919', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF",
                                    padding: '8px 16px',
                                    boxShadow: 2,
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: themeMode === "highContrast" ? "#f0b801" : 
                                                         themeMode === "dark" ? "#555555" : "#e71818",
                                      },
                                      fontSize: `${15 + appliedFontSize}px`
                                }}
                                onClick={() => {
                                    setRecipeTerm(""); // Clear the search term
                                    setIngredientTerm(""); // Clear ingredient term
                                    setSelectedHealth([]); // Clear health restrictions
                                    setSelectedCuisine([]); // Clear cuisine filters
                                    setSelectedMeal([]); // Clear meal type filters
                                    setMinCalories(""); // Clear min calories
                                    setMaxCalories(""); // Clear max calories
                                    setMinProtein("");
                                    setMaxProtein("");
                                    setMinCholesterol("");
                                    setMaxCholesterol("");
                                    setMinSugar("");
                                    setMaxSugar("");
                                    setMinFat("");
                                    setMaxFat("");
                                    setSearchError(false);
                                }}
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