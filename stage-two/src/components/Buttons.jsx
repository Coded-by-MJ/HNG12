import { Link } from "react-router";
import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types";

export function NavButton(props) {
  const { link, linkText, className } = props;
  return (
    <Link to={link} className={className}>
      <span>{linkText}</span>
      <BsArrowRight size={16} />
    </Link>
  );
}

export function ActionButton(props) {
  const { onClick, className, text } = props;
  return (
    <button onClick={onClick} className={`action-button ${className}`}>
      {text}
    </button>
  );
}

NavButton.propTypes = {
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
