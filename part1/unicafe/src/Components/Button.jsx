import PropTypes from "prop-types";


const Button = ({ buttonLabel, handleClick }) => {
    return <button onClick={handleClick}>{buttonLabel}</button>;
};

Button.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Button;
