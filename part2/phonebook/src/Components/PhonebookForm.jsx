import PropTypes from "prop-types";

PhonebookForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleOnChangeName: PropTypes.func.isRequired,
  handleOnChangeNumber: PropTypes.func.isRequired,
  handleAddNewName: PropTypes.func.isRequired,
};

function PhonebookForm({
  newName,
  newNumber,
  handleOnChangeName,
  handleOnChangeNumber,
  handleAddNewName,
}) {
  return (
    <div className="section-container">
      <h2>Phonebook</h2>
      <form>
          <div className="input-group">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              value={newName}
              onChange={handleOnChangeName}
            />
          </div>
          <div className="input-group">
            <label htmlFor="number">Number: </label>
            <input
              id="number"
              type="text"
              value={newNumber}
              onChange={handleOnChangeNumber}
            />
          </div>
        <div>
          <div className="form-footer">
            <button type="submit" onClick={handleAddNewName}>
              Add contact
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PhonebookForm;
