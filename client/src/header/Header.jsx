import { useContext, useState } from "react";
import { UserContext } from "../App";
// Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
import { ReactComponent as MenuBars } from "../assets/img/bars-solid.svg";
// Components
import DarkModeSwitch from "./DarkModeSwitch";
import NavMenu from "./NavMenu";
// External
import { Outlet } from "react-router-dom";

export default function Header({ darkMode, toggleDarkMode }) {
  const user = useContext(UserContext);
  const [navShown, setNavShown] = useState(false);

  return (
    <>
      <header className="header">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />

        <div className="header-menu">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {user.advizotID && (
            <MenuBars className="icon" onClick={() => setNavShown(true)} />
          )}
        </div>

        {navShown && <NavMenu navShown={navShown} setNavShown={setNavShown} />}
      </header>

      <Outlet />
    </>
  );
}
