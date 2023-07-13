import PropTypes from "prop-types";

Part.propTypes = {
  partName: PropTypes.string.isRequired,
  countOfExercises: PropTypes.number.isRequired,
};

function Part({ partName, countOfExercises }) {
  return (
    <>
      <p>
        {partName} {countOfExercises}
      </p>
    </>
  );
}

export default Part;
