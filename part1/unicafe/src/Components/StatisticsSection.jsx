import PropType from "prop-types";

const StatisticsSection = ({
  goodCounter,
  neutralCounter,
  badCounter,
  totalCounter,
  average,
  positiveFeedbackRatio,
}) => {
  if (totalCounter == 0) {
    return (
      <>
        <div className="section-wrapper">
          <h1>Statistics</h1>
          <p>No feedback givern</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="section-wrapper">
        <h1>statistics</h1>
        <p>good: {goodCounter}</p>
        <p>neutral: {neutralCounter}</p>
        <p>bad: {badCounter}</p>
        <p>ALL: {totalCounter}</p>
        <p>AVERAGE: {average}</p>
        <p>POSITIVE FEEDBACK RATIO: {positiveFeedbackRatio}%</p>
      </div>
    </>
  );
};

StatisticsSection.propTypes = {
  goodCounter: PropType.number.isRequired,
  neutralCounter: PropType.number.isRequired,
  badCounter: PropType.number.isRequired,
  totalCounter: PropType.number.isRequired,
  average: PropType.number.isRequired,
  positiveFeedbackRatio: PropType.number.isRequired,
};

export default StatisticsSection;
