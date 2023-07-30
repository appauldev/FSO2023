import { useState, useEffect } from "react";
import PersonService from "./services/PersonService";

import PhonebookForm from "./Components/PhonebookForm";
import ContactList from "./Components/ContactList";
import Toast from "./Components/Toast";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setNewSearchQery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    type: "SUCCESS",
    toastMessage: "",
  });
  // to update the list of contacts, we can track the last action taken by the user and make that a dependency of useEffect().
  // Whenever appropriate, we will change the value of lastAction to re-run useEffect() to re-render the updated list of contacts from the db
  // const [lastAction, setLastAction] = useState("");

  // useEffect() for fetching/updating contact list
  useEffect(() => {
    async function fetchContactList() {
      const response = await PersonService.getAll();
      if (response.status === 200) {
        setPersons(response.data.phonebook_data);
      }
    }
    fetchContactList();
  }, []);

  // useEffect() for removing the toast
  // We're using toastMessage as deps since it will always
  // change when we use the toast
  useEffect(() => {
    function closeToast() {
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
    closeToast();
  }, [toastConfig]);

  function handleOnChangeName(event) {
    const newName = event.target.value;
    setNewName(newName);
  }

  function handleOnChangeNumber(event) {
    const newNumber = event.target.value;
    setNewNumber(newNumber);
  }

  function handleChangeSearchQuery(event) {
    const newSearchQuery = event.target.value;
    setNewSearchQery(newSearchQuery);

    const newSearchQueryResults = persons.filter((person) => {
      return person.name.toLowerCase().includes(newSearchQuery.toLowerCase());
    });

    console.log(newSearchQueryResults);

    setSearchQueryResults(newSearchQueryResults);
  }

  async function handleAddNewName(event) {
    event.preventDefault();
    // check if the person is already added as a contact
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    // contact already exists, ask user if info wil be updated
    if (existingPerson) {
      const result = confirm(
        `${existingPerson.name} is already added as a contact. Do you want to update their contact number?`
      );
      // update person
      if (result) {
        // functional programming thingz
        const updatedPersonData = structuredClone(existingPerson);
        updatedPersonData.number = newNumber;
        // update the server
        const response = await PersonService.updateOne(
          updatedPersonData.id,
          updatedPersonData
        );
        // person to be updated is already deleted in the db
        if (response === undefined) {
          // show the error toast
          const newToastConfig = {
            type: "ERROR",
            toastMessage: `ERROR: ${
              existingPerson.name
            } has already been deleted from the contact list (${new Date().toUTCString()}).`,
          };
          setToastConfig(newToastConfig);
          setShowToast(true);
        }
        // re-render the contact list upon successful update
        else if (response && response.status === 200) {
          // functional programming thingz
          const updatedContactList = persons.map((person) => {
            return person.id !== updatedPersonData.id
              ? person
              : updatedPersonData;
          });
          setPersons(updatedContactList);
          // show success toast
          const newToastConfig = {
            type: "SUCCESS",
            toastMessage: `SUCCESS: ${
              response.data.name
            } has been been updated (${new Date().toUTCString()}).`,
          };
          setToastConfig(newToastConfig);
          setShowToast(true);
          // reset form inputs and return
          setNewName("");
          setNewNumber("");
        }
        return;
      }
    }
    // add the new contact to the db
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const response = await PersonService.create(newPerson);
    // update the contact list with the newly added data
    // we can also use the deps parameter of useEffect() with lastAction to update the list
    if (response.status === 200) {
      setPersons(response.data.phonebook_data);
      // show the toast
      const newToastConfig = {
        type: "SUCCESS",
        toastMessage: `SUCCESS: ${
          newPerson.name
        } has been added to the phonebook (${new Date().toUTCString()}).`,
      };
      setToastConfig(newToastConfig);
      setShowToast(true);
      // reset form inputs
      setNewName("");
      setNewNumber("");
    } else {
      console.log(response);
    }
  }
  return (
    <div>
      <PhonebookForm
        newName={newName}
        newNumber={newNumber}
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNumber={handleOnChangeNumber}
        handleAddNewName={handleAddNewName}
      />
      <ContactList
        persons={persons}
        setPersons={setPersons}
        searchQuery={searchQuery}
        searchQueryResults={searchQueryResults}
        handleChangeSearchQuery={handleChangeSearchQuery}
        setShowToast={setShowToast}
        setToastConfig={setToastConfig}
      />
      {showToast && (
        <Toast message={toastConfig.toastMessage} type={toastConfig.type} />
      )}
    </div>
  );
};

export default App;
