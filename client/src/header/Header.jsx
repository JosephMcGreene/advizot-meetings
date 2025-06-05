import { useState, useContext } from "react";
import { UserContext } from "../App";
// Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
import { ReactComponent as EditPen } from "../assets/img/pen-solid.svg";
// Components
import DarkModeSwitch from "./DarkModeSwitch";
import NavMenu from "./NavMenu";
// External
import { Outlet, useLocation } from "react-router-dom";

export default function Header({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const user = useContext(UserContext);
  const [userNavShown, setUserNavShown] = useState(false);

  return (
    <>
      <header className="header">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />

        <div className="header-menu">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {location.pathname.includes("profile") ? (
            <EditPen width="28" />
          ) : (
            <img
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-photo"
              onClick={() => setUserNavShown(true)}
              src={user.photo}
            />
          )}
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
