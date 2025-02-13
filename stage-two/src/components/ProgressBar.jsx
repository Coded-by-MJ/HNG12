import PropTypes from "prop-types";

function ProgressBar({ percent }) {
  return (
    <div className="progress-bar">
      <div
        className="bar"
        style={{
          width: `${percent > 100 ? 100 : percent}%`,
        }}
      ></div>
    </div>
  );
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};
export default ProgressBar;
