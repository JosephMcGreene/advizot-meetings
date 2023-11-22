import { useState, useContext } from "react";
import { ThemeContext, UserContext } from "../App";
//Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
//External
import { Link } from "react-router-dom";
//Components
import ModalTemplate from "./modals/ModalTemplate";
import Login from "./modals/Login";

export default function Header({ toggleDarkMode }) {
  const isDark = useContext(ThemeContext);

  const user = useContext(UserContext);
  const [loginShown, setLoginShown] = useState(false);

  return (
    <header className={isDark ? "header dark" : "header"}>
      <nav className="nav-bar">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />
        <ul className="nav-ul">
          <li className="nav-item">
            <button type="button" onClick={() => toggleDarkMode()}>
              Dark Mode Toggle
            </button>
          </li>
          <li className="nav-item">
            {user.photo && (
              <Link to="/profile" className="profile-link">
                <img
                  src={user.photo}
                  alt="profile"
                  className="profile-img"
                  tabIndex="-1"
                />
              </Link>
            )}
          </li>
          <li className="nav-item">
            {user ? (
              <a href="/auth/logout">
                <button className="btn">Log out</button>
              </a>
            ) : (
              <button
                className="btn"
                onClick={() => setLoginShown(!loginShown)}
              >
                Log in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {loginShown && (
        <ModalTemplate title="Log In" handleClose={() => setLoginShown(false)}>
          <Login />
        </ModalTemplate>
      )}
    </header>
  );
}
