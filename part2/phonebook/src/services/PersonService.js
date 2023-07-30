import axios from "axios";
const baseURL = "http://localhost:33001/api/persons";

async function getAll() {
  try {
    const response = await axios.get(baseURL);
    return response;
  } catch (error) {
    alert(error);
    console.error(error);
  }
}

async function create(newContact) {
  try {
    const response = await axios.post(baseURL, newContact);
    return response;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

async function updateOne(personId, newPersonData) {
  try {
    const response = await axios.put(`${baseURL}/${personId}`, newPersonData);
    return response;
  } catch (error) {
    console.error(error);
    // alert(error);
  }
}

async function deleteOne(personId) {
  try {
    const response = await axios.delete(`${baseURL}/${personId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAll,
  create,
  updateOne,
  deleteOne,
};
