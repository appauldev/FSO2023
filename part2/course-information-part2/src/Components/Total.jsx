import PropTypes from "prop-types";

Total.propTypes = {
  totalNumOfExercises: PropTypes.number.isRequired,
};

function Total({ totalNumOfExercises }) {
  return <p>Number of exercises: {totalNumOfExercises}</p>;
}

export default Total;
