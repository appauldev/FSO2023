import { useState } from "react";

import PhonebookForm from "./Components/PhonebookForm";
import ContactList from "./Components/ContactList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setNewSearchQery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([])

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

    console.log(newSearchQueryResults)

    setSearchQueryResults(newSearchQueryResults)
  }

  function handleAddNewName(event) {
    event.preventDefault();
    // check if the name already exists
    let isPersonAlreadyAContact = false;
    persons.forEach((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        isPersonAlreadyAContact = true;
        return;
      }
    });
    // contact already exists, dont add it to the list
    if (isPersonAlreadyAContact) {
      alert(`${newName} is already added as a contact. Aborting operation`);
      return;
    }
    // the contact is new, add it to the list
    const newPerson = {
      id: crypto.randomUUID().split("-")[0],
      name: newName,
      number: newNumber,
    };
    // save the new contact and reset form inputs
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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
        searchQuery={searchQuery}
        searchQueryResults={searchQueryResults}
        handleChangeSearchQuery={handleChangeSearchQuery}
      />
    </div>
  );
};

export default App;
