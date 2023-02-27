import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./LandingPage.css";

function LandingPage() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries"));
    if (storedCountries){
      setCountries(storedCountries);
    }else{
      const fetchCountries = async () => {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountries(response.data);
        localStorage.setItem("countries", JSON.stringify(response.data));
      };
      fetchCountries();
    }
  }, []);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="landing-container">
      <div className="landing-title">
        <h1>Country Explorer</h1>
      </div>
      <div className="landing-search">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div key={country.alpha3Code} className="country-card">
          <Link to={`/countries/${country.alpha3Code}`}>
            <img className="country-flag" src={country.flag} alt={country.name} />
            <h2 className="country-name">{country.name}</h2>
          </Link>
          <p className="country-region">{country.region}</p>
        </div>
        
        ))}
      </div>
    </div>
  );
}



export default LandingPage;
