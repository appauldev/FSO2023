import PropTypes from "prop-types";
import PersonService from "../services/PersonService";
Person.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  setShowToast: PropTypes.func.isRequired,
  setToastConfig: PropTypes.func.isRequired,
};

function Person({
  name,
  number,
  id,
  persons,
  setPersons,
  setShowToast,
  setToastConfig,
}) {
  async function handleDelete() {
    const response = await PersonService.deleteOne(id);
    // handle error when data is already deleted in the db
    if (response === undefined) {
      // show the toast
      const person404 = persons.find((person) => person.id === id);
      const newToastConfig = {
        type: "ERROR",
        toastMessage: `ERROR: ${
          person404.name
        } has already been deleted from the contact list (${new Date().toUTCString()}).`,
      };
      setToastConfig(newToastConfig);
      setShowToast(true);
      return;
    }
    // delete operation successful
    if (response.status === 200) {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
      // show the toast
      const deletedPerson = persons.find((person) => person.id === id).name;
      const newToastConfig = {
        type: "SUCCESS",
        toastMessage: `SUCCESS: ${deletedPerson} has been been deleted from the contact list (${new Date().toUTCString()}).`,
      };
      setToastConfig(newToastConfig);
      setShowToast(true);
    }
  }
  return (
    <>
      <div className="person-container flex-row">
        <button onClick={handleDelete}>Delete</button>
        <p>
          <b>{name}</b> {number}
        </p>
      </div>
    </>
  );
}

export default Person;
