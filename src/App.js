import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CountryPage from './components/CountryPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}>     
        </Route>
        <Route path="/countries/:code" element={<CountryPage />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
