import { Link } from "react-router";
import logo from "../assets/ticket-logo.svg";
import logoText from "../assets/ticket-logo-text.svg";
function Logo() {
  return (
    <Link to="/" className="logo-wrapper">
      <div className="logo-svg">
        <img src={logo} width={24} height={24} />
      </div>{" "}
      <div className="logo-text">
        <img src={logoText} width={44} height={24} />
      </div>
    </Link>
  );
}
export default Logo;
