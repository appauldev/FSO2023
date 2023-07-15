const baseURL = "https://studies.cs.helsinki.fi/restcountries/";
const endpointAllCountries = "api/all";
const endpointPerCountry = "api/name/";

const ENDPOINTS = {
  getAllCountries: new URL(endpointAllCountries, baseURL),
  getCountryBySearch: new URL(endpointPerCountry, baseURL),
};

export default ENDPOINTS;
