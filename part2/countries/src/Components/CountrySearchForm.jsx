import PropTypes from "prop-types";
import CountryCard from "./CountryCard";

import { useState } from "react";

CountrySearchForm.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
};

function CountrySearchForm({
  searchQuery,
  searchResults,
  setSearchQuery,
  setSearchResults,
  countries,
}) {
  const [showCountryCard, setShowCountryCard] = useState(false);
  const [countryCardToShow, setCountryCardToShow] = useState(null);

  function handleOnChangeSearchQuery(event) {
    const newSearchQuery = event.target.value;
    setShowCountryCard(false);
    setCountryCardToShow(null);
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === "") {
      setSearchResults([]);
      return;
    }
    const newsearchResults = countries.filter((country) => {
      const matchCommonName = country.name.common
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());
      const matchOfficialName = country.name.official
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());

      return matchCommonName || matchOfficialName;
    });

    setSearchResults(newsearchResults);
  }
  function displayResults() {
    if (searchQuery && searchResults.length === 0) {
      return <p>The country you are looking for does not exist.</p>;
    } else if (searchResults.length === 0) {
      return <p>Please enter a search query</p>;
    } else if (searchResults.length === 1) {
      return (
        <>
          <CountryCard countryData={searchResults[0]} />
        </>
      );
    } else if (searchResults.length > 10) {
      return <p>Results data is too long. Please refine your search query</p>;
    } else {
      return searchResults.map((country) => (
        <div key={country.name.official} className="searchResult-item flex-row">
          <button
            onClick={() => {
              setCountryCardToShow(country);
              setShowCountryCard(true);
            }}
          >
            Show details
          </button>
          <span>{country.name.common}</span>
        </div>
      ));
    }
  }

  return (
    <>
      {/* search form */}
      <div className="searchForm-container flex-col">
        <h2>Countries</h2>
        <input
          type="text"
          name="country"
          id="country"
          placeholder="🔎 Enter a country name"
          value={searchQuery}
          onChange={handleOnChangeSearchQuery}
        />
        {/* search results list */}
        <div className="searchResult-container flex-col">
          {displayResults()}
        </div>
        {/* country card if shown */}
        {showCountryCard && <CountryCard countryData={countryCardToShow} />}
      </div>
    </>
  );
}

export default CountrySearchForm;
