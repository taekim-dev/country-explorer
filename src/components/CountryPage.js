import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './CountryPage.css';

function CountryPage({ countries }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://restcountries.com/v2/alpha/${code}`);
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [code]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const {
    name,
    capital,
    region,
    subregion,
    currencies,
    languages,
    flag,
  } = country;

  const currencyNames = currencies.map((currency) => currency.name).join(', ');
  const languageNames = languages.map((language) => language.name).join(', ');

  return (
    <div className="country-page-container">
      <div className="country-page">
        <div className="country-info">
          <div className="country-flag">
            <img src={flag} alt={name} />
          </div>
          <div className="country-name">
            <h2>{name}</h2>
            <p className="country-code">{code}</p>
          </div>
          <Table striped bordered hover size="sm" className="country-table">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{name}</td>
                <th>Capital</th>
                <td>{capital}</td>
              </tr>
              <tr>
                <th>Region</th>
                <td>{region}</td>
                <th>Subregion</th>
                <td>{subregion}</td>
              </tr>
              <tr>
                <th>Currency</th>
                <td>{currencyNames}</td>
                <th>Language</th>
                <td>{languageNames}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="explore-more">
        <a href="/" className="explore-more-link">
          <button>Explore More</button>
        </a>
      </div>
    </div>
  );
}

export default CountryPage;
