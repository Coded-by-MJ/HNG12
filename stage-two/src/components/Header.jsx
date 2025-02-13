import Logo from "./Logo";
import Navbar from "./Navbar";
import { NavButton } from "./Buttons";

function Header() {
  return (
    <header>
      <Logo />
      <Navbar />
      <NavButton
        link={"/my-tickets"}
        linkText={"my tickets"}
        className={"nav-button"}
      />
    </header>
  );
}
export default Header;
