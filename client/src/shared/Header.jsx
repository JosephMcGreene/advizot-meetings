import { useState, useContext } from "react";
import { UserContext } from "../App";
//Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
//External
import { Link } from "react-router-dom";
//Components
import ModalTemplate from "./modals/ModalTemplate";
import Login from "./modals/Login";

export default function Header() {
  const [loginShown, setLoginShown] = useState(false);
  const user = useContext(UserContext);

  return (
    <header className="header">
      <nav className="nav-bar">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />
        <ul className="nav-ul">
          <li className="nav-item">
            {user.photo && (
              <Link to="/profile">
                <img src={user.photo} alt="profile" className="profile-img" />
              </Link>
            )}
          </li>
          <li className="nav-item">
            {user ? (
              <a href="/auth/logout">
                <button className="btn" tabIndex="-1">
                  Sign out
                </button>
              </a>
            ) : (
              <button
                className="btn"
                onClick={() => setLoginShown(!loginShown)}
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {loginShown && (
        <ModalTemplate title="Sign In" onClose={() => setLoginShown(false)}>
          <Login />
        </ModalTemplate>
      )}
    </header>
  );
}
