import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={"nav-link"}>
        Events
      </NavLink>{" "}
      <NavLink to="/my-tickets" className={"nav-link"}>
        My Tickets
      </NavLink>{" "}
      <NavLink to="/about" className={"nav-link"}>
        About Project
      </NavLink>
    </nav>
  );
}
export default Navbar;
