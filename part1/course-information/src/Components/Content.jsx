import PropType from 'prop-types'
import Part from "./Part";

Content.propTypes = {
    part1Title: PropType.string.isRequired,
    part2Title: PropType.string.isRequired,
    part3Title: PropType.string.isRequired,
    exercise1Count: PropType.number.isRequired,
    exercise2Count: PropType.number.isRequired,
    exercise3Count: PropType.number.isRequired,
}

function Content({ part1Title, part2Title, part3Title, exercise1Count, exercise2Count, exercise3Count }) {
  return (
    <>
      <Part partTitle={part1Title} countOfExercises={exercise1Count}/>
      <Part partTitle={part2Title} countOfExercises={exercise2Count}/>
      <Part partTitle={part3Title} countOfExercises={exercise3Count}/>
    </>
  );
}

export default Content;
