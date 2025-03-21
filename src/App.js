import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import AdvancedSettings from './pages/AdvancedSettings'
import Meals from './pages/Meals'
import Recipe from './pages/Recipe'
import NoPage from './pages/NoPage'
import { ThemeProviderWrapper } from "./components/themeProvider.js";

// Gives all the links that lead to the pages in this site
export default function App() {
    return (
        <div>
            <ThemeProviderWrapper>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path ="/home" element={<Home />} />
                    <Route path ="/search" element={<Meals />}/>
                    <Route path ="/recipe" element={<Recipe />} />
                    <Route path ="/settings" element={<Settings />} />
                    <Route path ="/advancedsettings" element={<AdvancedSettings />} />
                    <Route path ="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
            </ThemeProviderWrapper>
        </div>
    )
}
