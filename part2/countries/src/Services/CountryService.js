import ENDPOINTS from "../Constants/URLs";
import countries from "./countries.json";
import axios from "axios";

async function getAllCountries() {
  const response = await axios.get(ENDPOINTS.getAllCountries);
  return response;
  //   console.log(response);
}

function getAllCountriesLocal() {
  return countries;
}

async function getCountryBySearch(searchQuery) {
  const searchEndpoint = new URL(searchQuery, ENDPOINTS.getCountryBySearch);
  const response = await axios.get(searchEndpoint);
  console.log(response);
}
export default {
  getAllCountries,
  getAllCountriesLocal,
  getCountryBySearch,
};
