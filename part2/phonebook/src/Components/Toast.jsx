import PropTypes from "prop-types";

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function Toast({ message, type }) {
  if (type === "SUCCESS") {
    return (
      <>
        <div className="toast-container toast-success flex-col">
          <span>{message}</span>
        </div>
      </>
    );
  } else if (type === "ERROR") {
    return (
      <>
        <div className="toast-container toast-error flex-col">
          <span>{message}</span>
        </div>
      </>
    );
  }
}

export default Toast;
