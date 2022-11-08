import { useState, useContext } from "react";
import { UserContext } from "../App";
//Components
import MeetingCode from "./modals/MeetingCode";
//Assets
import advizotLogo from "../assets/img/original-on-transparent.png";

export default function Header({ showLoginModal, onSubmit }) {
  const [showMeetingCode, setShowMeetingCode] = useState(false);
  const currentUser = useContext(UserContext);

  return (
    <header className="header">
      <nav className="nav-bar">
        <div className="logo-wrapper">
          <img src={advizotLogo} alt="Advizot logo" className="logo" />
        </div>
        <ul className="actions-ul">
          {/* Show sign out link if logged in, or sign in if logged out */}
          {currentUser ? (
            <li className="nav-item">
              <a href="/auth/logout">
                <button className="btn">Sign out</button>
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn" onClick={() => showLoginModal(true)}>
                Sign in
              </button>
            </li>
          )}

          <li className="nav-item">
            [1:1 <br /> Check-in]
          </li>
          <li className="nav-item">[Settings]</li>
        </ul>
      </nav>

      {/* don't always need to see the modals */}
      {showMeetingCode && (
        <MeetingCode
          onClose={() => setShowMeetingCode(!showMeetingCode)}
          onSubmit={onSubmit}
        />
      )}
    </header>
  );
}
