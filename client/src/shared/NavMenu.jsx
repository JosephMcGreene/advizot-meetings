import { useRef } from "react";
//Assets
import { ReactComponent as ProfileIcon } from "../assets/img/user-tie-solid.svg";
import { ReactComponent as CheckInIcon } from "../assets/img/handshake-solid.svg";
import { ReactComponent as LogOutIcon } from "../assets/img/right-from-bracket-solid.svg";
//External
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../hooks/useOutsideClick";
//Components
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavMenu({ darkMode, toggleDarkMode, showNav }) {
  const navRef = useRef();
  useOutsideClick(navRef, () => showNav(false));

  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      ref={navRef}
      className="nav"
    >
      <ul className="nav-list">
        <li className="nav-item">
          <ProfileIcon className="icon" />
          <Link to="/profile" onClick={() => showNav(false)}>
            [Profile]
          </Link>
        </li>

        <li className="nav-item">
          <CheckInIcon className="icon" />
          <Link to="/profile" onClick={() => showNav(false)}>
            [1:1 Check-In]
          </Link>
        </li>

        <hr />

        <li className="nav-item">
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </li>

        <li className="nav-item">
          <LogOutIcon className="icon" />
          <a href="/auth/logout">Log Out</a>
        </li>
      </ul>
    </motion.nav>
  );
}
