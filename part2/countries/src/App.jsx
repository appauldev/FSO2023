import "./App.css";
import CountryService from "./Services/CountryService";
import CountrySearchForm from "./Components/CountrySearchForm";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await CountryService.getAllCountries();
      console.log(response);
      setCountries(response.data);
    }

    fetchCountries();
  }, []);

  return (
    <>
      <CountrySearchForm
        searchQuery={searchQuery}
        searchResults={searchResults}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        countries={countries}
      />
    </>
  );
}

export default App;
