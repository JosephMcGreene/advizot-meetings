import { useState, useContext } from "react";
import { UserContext } from "../App";
import advizotLogo from "../assets/img/original-on-transparent.png";
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
            {/* Show sign out link if logged in, or sign in if logged out */}
            {currentUser ? (
              <>
                <a href="/auth/logout">
                  <button className="btn">Sign out</button>
                </a>
              </>
            ) : (
              <button className="btn" onClick={() => setShowLogin(!showLogin)}>
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* don't always need to see the modals */}
      {showLogin && <Login onClose={() => setShowLogin(!showLogin)} />}
    </header>
  );
}
