import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import AdvancedSettings from "./pages/AdvancedSettings"
import Search from "./pages/Search.js"
import Recipe from "./pages/Recipe"
import NoPage from "./pages/NoPage"
import Maintenance from "./pages/Maintenance"
import { ThemeSetting } from "./components/themeProvider.js"

// Gives all the links that lead to the pages in this site [https://www.youtube.com/watch?v=TWz4TjSssbg&ab_channel=KarstenKoerner]
export default function App() {
    return (
        <div>
            <ThemeSetting>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path ="/home" element={<Home/>}/>
                        <Route path ="/search" element={<Search/>}/>
                        <Route path ="/recipe" element={<Recipe/>}/>
                        <Route path ="/settings" element={<Settings/>} />
                        <Route path ="/advancedsettings" element={<AdvancedSettings/>}/>
                        <Route path ="*" element={<NoPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeSetting>
        </div>
    )
}
