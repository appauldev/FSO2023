import PropTypes from "prop-types";

import Person from "./Person";

ContactList.propTypes = {
  persons: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleChangeSearchQuery: PropTypes.func.isRequired,
  searchQueryResults: PropTypes.array.isRequired,
};

function ContactList({
  persons,
  searchQuery,
  handleChangeSearchQuery,
  searchQueryResults,
}) {
  return (
    <>
      <h2>Numbers</h2>
      <div className="input-group searchbar">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
        />
      </div>

      <div className="flex-column contactlist-container">
        {searchQuery === ""
          ? persons.map((person) => (
              <Person
                key={person.id}
                name={person.name}
                number={person.number}
              />
            ))
          : searchQueryResults.map((person) => (
              <Person
                key={person.id}
                name={person.name}
                number={person.number}
              />
            ))}
      </div>
    </>
  );
}

export default ContactList;
