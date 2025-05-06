import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme, darkTheme, highContrastTheme } from "./themes";

export const ThemeContext = createContext();

export const ThemeSetting = ({ children }) => {
  // Stores the current theme
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light"; // Default mode is light mode
  });

  // Saves the theme every time it changes so it is consistent
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Will return the appropriate theme based on the current setting
  const getTheme = () => {
    if (themeMode === "highContrast") return highContrastTheme;
    if (themeMode === "dark") return darkTheme;
    return theme;
  };

  return (
    // Applies the theme throughout the whole app [https://stackoverflow.com/a/64416159]
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline/> 
          {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};