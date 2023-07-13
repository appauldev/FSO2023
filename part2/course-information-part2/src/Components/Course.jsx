import PropTypes from "prop-types";

import Header from "./Header";
import Part from "./Part";

const Course = ({ course }) => {
  // count the total number of courses
  const total = course.parts.reduce(
    (accumulator, partItem) => accumulator + partItem.exercises,
    0
  );
  return (
    <>
      <Header courseName={course.name} />
      {course.parts.map((part) => (
        <Part
          key={part.id}
          partName={part.name}
          countOfExercises={part.exercises}
        />
      ))}
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </>
  );
};

Course.propTypes = {
  course: PropTypes.object.isRequired,
};

export default Course;
