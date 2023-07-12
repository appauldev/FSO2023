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
        <h1>Statistics</h1>
        <table>
          <colgroup>
            <col className="col-attribute"/>
            <col className="col-values"/>
          </colgroup>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>good</td>
            <td>{goodCounter}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutralCounter}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{badCounter}</td>
          </tr>
          <tr>
            <td>ALL</td>
            <td>{totalCounter}</td>
          </tr>
          <tr>
            <td>AVERAGE</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Positive feedback (%)</td>
            <td>{positiveFeedbackRatio.toFixed(2)}</td>
          </tr>
        </table>
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
