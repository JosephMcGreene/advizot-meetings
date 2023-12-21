import { useState, useContext } from "react";
import { UserContext } from "../App";
//Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
//Components
import DarkModeSwitch from "./DarkModeSwitch";
import NavMenu from "./NavMenu";

export default function Header({ darkMode, toggleDarkMode }) {
  const user = useContext(UserContext);
  const [userNavShown, setUserNavShown] = useState(false);

  return (
    <header className="header">
      <img src={advizotLogo} alt="Advizot logo" className="logo" />
      {user.photo ? (
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-photo"
          onClick={() => setUserNavShown(true)}
        />
      ) : (
        <div className="switch-container">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      )}

      {userNavShown && (
        <NavMenu
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          showNav={setUserNavShown}
        />
      )}
    </header>
  );
}
