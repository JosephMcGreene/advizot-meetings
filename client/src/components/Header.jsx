import { useState, useContext } from "react";
//Internal
import { UserContext } from "../App";
//Assets
import advizotLogo from "../assets/img/original-on-transparent.png";
//Components
import ModalTemplate from "./modals/ModalTemplate";
import Login from "./modals/Login";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const currentUser = useContext(UserContext);

  return (
    <header className="header">
      <nav className="nav-bar">
        <img src={advizotLogo} alt="Advizot logo" className="logo" />
        <ul className="nav-ul">
          <li className="nav-item">
            {currentUser ? (
              <a href="/auth/logout">
                <button className="btn">Sign out</button>
              </a>
            ) : (
              <button className="btn" onClick={() => setShowLogin(!showLogin)}>
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {showLogin && (
        <ModalTemplate
          body={<Login />}
          title="Sign In"
          onClose={() => setShowLogin(!showLogin)}
        />
      )}
    </header>
  );
}
