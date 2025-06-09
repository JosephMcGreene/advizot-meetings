import { useState } from "react";
// Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
import { ReactComponent as MenuBars } from "../assets/img/bars-solid.svg";
// Components
import DarkModeSwitch from "./DarkModeSwitch";
import NavMenu from "./NavMenu";
// External
import { Outlet } from "react-router-dom";

export default function Header({ darkMode, toggleDarkMode }) {
  const [userNavShown, setUserNavShown] = useState(false);

  return (
    <>
      <header className="header">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />

        <div className="header-menu">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <MenuBars
            className="icon"
            onClick={() => setUserNavShown(!userNavShown)}
          />
        </div>

        {userNavShown && (
          <NavMenu
            darkMode={darkMode}
            showNav={setUserNavShown}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </header>

      <Outlet />
    </>
  );
}
