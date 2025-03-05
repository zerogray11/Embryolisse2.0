import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Product from './components/Product';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home is the default landing page */}
        <Route path="/questionnaire" element={<Questionnaire />} /> {/* Route for Questionnaire */}
        <Route path="/product" element={<Product />} /> {/* Route for Product */}
      </Routes>
    </Router>
  );
};

export default App;