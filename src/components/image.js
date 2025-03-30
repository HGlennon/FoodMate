import React, { useContext } from "react";
import { ThemeContext } from "./themeProvider";

function Images() {
  const { themeMode } = useContext(ThemeContext);

  // Corrected conditional logic
  const imageSrc = 
    themeMode === "highContrast" ? "/images/YellowFoodmate.png" :
    themeMode === "dark" ? "/images/DarkFoodmate.png" :
    "/images/Foodmate.png";

  return (
    <div style={{ display: 'inline-block' }}>
      <img 
        src={imageSrc} 
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