import { useContext, useRef } from "react";
import { UserContext } from "../../App";
//Assets
import { ReactComponent as ProfileIcon } from "../../assets/img/user-tie-solid.svg";
import { ReactComponent as MeetingIcon } from "../../assets/img/users-solid.svg";
// import { ReactComponent as CheckInIcon } from "../assets/img/handshake-solid.svg";
import { ReactComponent as LogOutIcon } from "../../assets/img/right-from-bracket-solid.svg";
//External
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
//Components
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavMenu({ darkMode, toggleDarkMode, showNav }) {
  const user = useContext(UserContext);
  const navRef = useRef();
  const { pathname } = useLocation();
  useOutsideClick(navRef, () => showNav(false));

  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      ref={navRef}
      className="nav"
    >
      <ul className="nav-list">
        {!pathname.includes("/profile") && (
          <li className="nav-item">
            <Link
              to={`/profile/${user.advizotID}/info`}
              onClick={() => showNav(false)}
            >
              <ProfileIcon className="icon" />
              Profile
            </Link>
          </li>
        )}

        {!pathname.includes("/meeting") && (
          <li className="nav-item">
            <Link to={`/meeting/${user.group}`} onClick={() => showNav(false)}>
              <MeetingIcon className="icon" />
              Meeting
            </Link>
          </li>
        )}

        {/* <li className="nav-item">
          <Link
            to={`/profile/${user.advizotID}`}
            onClick={() => showNav(false)}
          >
            <CheckInIcon className="icon" />
            1:1 Check-In
          </Link>
        </li> */}

        <hr />

        <li className="nav-item">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </li>

        <li className="nav-item">
          <a href="/auth/logout">
            <LogOutIcon className="icon" />
            Log Out
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
