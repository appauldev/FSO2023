import PropTypes from 'prop-types'

import Button from "./Button";

const FeedbackSection = ({incrementGood, incrementNeutral, incrementBad}) => {
  return (
    <div className="section-wrapper">
      <h1>Give feedback</h1>
      <div className="btn-group">
        <Button buttonLabel={"good"} handleClick={incrementGood} />
        <Button buttonLabel={"neutral"} handleClick={incrementNeutral} />
        <Button buttonLabel={"bad"} handleClick={incrementBad} />
      </div>
    </div>
  );
};

FeedbackSection.propTypes = {
    incrementGood: PropTypes.func.isRequired,
    incrementNeutral: PropTypes.func.isRequired,
    incrementBad: PropTypes.func.isRequired,
}

export default FeedbackSection;
