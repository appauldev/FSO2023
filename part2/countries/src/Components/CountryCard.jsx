import PropTypes from "prop-types";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

CountryCard.propTypes = {
  countryData: PropTypes.object.isRequired,
};

function CountryCard({ countryData }) {
  const [weatherData, setWeatherData] = useState(null);
  // use useEffect() so that the weather data will only be fetch once when the card component is rendered
  const [lat, lng] = countryData.latlng;
  useEffect(() => {
    async function fetchWeatherData() {
      const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`
      );
      console.log(response);
      setWeatherData(response.data);
    }
    fetchWeatherData();
  }, [lat, lng]);
  return (
    <>
      <div className="flex-col country-card">
        <h1>{countryData.name.common}</h1>
        <h3>Capital: {countryData.capital}</h3>
        <h3>Area: {countryData.area}</h3>
        <h3>Languages</h3>
        {Object.keys(countryData.languages).map((lang_key) => {
          return <li key={lang_key}>{countryData.languages[lang_key]}</li>;
        })}
        <img src={countryData.flags.svg} alt={countryData.flags.alt} />
        {weatherData && (
          <>
            <h2>Weather</h2>
            <div className="weatherData-container flex-col">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <span>Weather: {weatherData.weather[0].description}</span>
              <span>Temperature: {weatherData.main.temp}</span>
              <span>Wind speed: {weatherData.wind.speed}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CountryCard;
