import PropTypes from "prop-types";

Part.propTypes = {
  partTitle: PropTypes.string.isRequired,
  countOfExercises: PropTypes.number.isRequired,
};

function Part({ partTitle, countOfExercises }) {
  return (
    <>
      <p>
        {partTitle} {countOfExercises}
      </p>
    </>
  );
}

export default Part;
