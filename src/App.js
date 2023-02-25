import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CountryPage from './components/CountryPage';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage countries={countries} />}>     
        </Route>
        <Route path="/countries/:code" element={<CountryPage countries={countries} />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
