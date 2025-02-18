import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import AdvancedSettings from './pages/AdvancedSettings'
import Breakfast from './pages/Breakfast'
import Lunch from './pages/Lunch'
import Dinner from './pages/Dinner'
import Dessert from './pages/Dessert'
import Recipe from './pages/Recipe'
import NoPage from './pages/NoPage'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path ="/home" element={<Home />} />
                    <Route path ="/breakfast" element={<Breakfast/>}/>
                    <Route path ="/lunch" element={<Lunch />} />
                    <Route path ="/dinner" element={<Dinner />} />
                    <Route path ="/dessert" element={<Dessert />} />
                    <Route path ="/recipe" element={<Recipe />} />
                    <Route path ="/settings" element={<Settings />} />
                    <Route path ="/advancedsettings" element={<AdvancedSettings />} />
                    <Route path ="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
