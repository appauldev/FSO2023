import PropTypes from "prop-types";

Header.propTypes = {
  courseName: PropTypes.string.isRequired,
};

function Header({ courseName }) {
  return <h1>{courseName}</h1>;
}

export default Header;
