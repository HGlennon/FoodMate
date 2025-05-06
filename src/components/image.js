import React, { useContext } from "react";
import { ThemeContext } from "./themeProvider";

function Images() { // Provides the FoodMate logo image displayed in toolbar
  const { themeMode } = useContext(ThemeContext);

  // Gives the different colour varients of logo based on theme
  const image = 
  themeMode === "highContrast" ? "/images/YellowFoodmate.png" : 
  themeMode === "dark" ? "/images/DarkFoodmate.png" : "/images/Foodmate.png";

  return (
    <div style={{ display: 'inline-block' }}> 
      <img 
        src={image} 
        alt="FoodMate Logo" 
        style={{
          width: '55px',
          height: 'auto',
          maxWidth: '100%'
        }}
      />
    </div>
  );
}

export default Images;