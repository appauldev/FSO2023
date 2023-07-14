import PropTypes from "prop-types";

import Person from "./Person";

ContactList.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleChangeSearchQuery: PropTypes.func.isRequired,
  searchQueryResults: PropTypes.array.isRequired,
  setShowToast: PropTypes.func.isRequired,
  setToastConfig: PropTypes.func.isRequired,
};

function ContactList({
  persons,
  setPersons,
  searchQuery,
  handleChangeSearchQuery,
  searchQueryResults,
  setShowToast,
  setToastConfig,
}) {
  return (
    <>
      <h2>Numbers</h2>
      <div className="input-group searchbar">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="🔎  Search a contact"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
        />
      </div>

      <div className="flex-column contactlist-container">
        {searchQuery === ""
          ? persons.map((person) => (
              <Person
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
                persons={persons}
                setPersons={setPersons}
                setShowToast={setShowToast}
                setToastConfig={setToastConfig}
              />
            ))
          : searchQueryResults.map((person) => (
              <Person
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
                persons={persons}
                setPersons={setPersons}
                setShowToast={setShowToast}
                setToastConfig={setToastConfig}
              />
            ))}
      </div>
    </>
  );
}

export default ContactList;
