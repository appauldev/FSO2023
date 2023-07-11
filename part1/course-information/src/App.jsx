import { useState } from "react";

import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const [counter, setCounter] = useState(0);

  const totalExercises =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <div>
      <Header courseName={course.name} />
      <Content
        part1Title={course.parts[0].name}
        part2Title={course.parts[1].name}
        part3Title={course.parts[2].name}
        exercise1Count={course.parts[0].exercises}
        exercise2Count={course.parts[1].exercises}
        exercise3Count={course.parts[2].exercises}
      />
      <Total totalNumOfExercises={totalExercises} />

      <button onClick={() => setCounter(counter + 1)}>
        I click {counter} times
      </button>
    </div>
  );
};

export default App;
