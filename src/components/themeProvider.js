import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme, darkTheme, highContrastTheme } from "./themes";
import { setAppliedFontSize, setTempFontSize } from "../pages/Settings";

export const ThemeContext = createContext();

export const ThemeSetting = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light"; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const getTheme = () => {
    if (themeMode === "highContrast") return highContrastTheme;
    if (themeMode === "dark") return darkTheme;
    return theme;
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};