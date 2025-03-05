import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionnaire from './pages/Questionnaire';
import Summary from './components/Summary';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default App;