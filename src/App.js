import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Hero, Footer, RecipesList, CookingRecord } from './components';
import GlobalStyles from './Globalstyles';

function App() {
    return (
        <Router>
            <GlobalStyles />
            <Hero />
            <Routes>
                <Route path="/food-list" element={<RecipesList />} />
                <Route path="/food-list/:FoodId" element={<CookingRecord />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
