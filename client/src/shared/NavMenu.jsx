import { useState, useRef } from "react";
//Assets
import { ReactComponent as ProfileIcon } from "../assets/img/user-tie-solid.svg";
import { ReactComponent as CheckInIcon } from "../assets/img/handshake-solid.svg";
import { ReactComponent as LogOutIcon } from "../assets/img/right-from-bracket-solid.svg";
//External
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//Internal
import { currentDate } from "../helpers";
//Hooks
import useCheckIns from "../hooks/useCheckIns";
import useOutsideClick from "../hooks/useOutsideClick";
//Components
import DarkModeSwitch from "./DarkModeSwitch";
import ModalTemplate from "./modals/ModalTemplate";
import MeetingForm from "../features/meeting/form/MeetingForm";
import LoadingSpinner from "./LoadingSpinner";

export default function NavMenu({ darkMode, toggleDarkMode, showNav }) {
  const [checkinFormShown, setCheckinFormShown] = useState(false);
  const navRef = useRef();
  const [loading, submitCheckIn] = useCheckIns();
  useOutsideClick(navRef, () => showNav(false));

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        ref={navRef}
        className="nav"
      >
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/profile" onClick={() => showNav(false)}>
              <ProfileIcon className="icon" />
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <button onClick={() => setCheckinFormShown(!checkinFormShown)}>
              <CheckInIcon className="icon" />
              1:1 Check-In
            </button>
          </li>

          <hr />

          <li className="nav-item">
            <DarkModeSwitch
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </li>

          <li className="nav-item">
            <a href="/auth/logout">
              <LogOutIcon className="icon" />
              Log Out
            </a>
          </li>
        </ul>
      </motion.nav>

      {checkinFormShown && (
        <ModalTemplate
          title={`${currentDate("month")} Check-In`}
          handleClose={() => setCheckinFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(checkInToSubmit) => submitCheckIn(checkInToSubmit)}
            handleClose={() => setCheckinFormShown(false)}
          ></MeetingForm>
        </ModalTemplate>
      )}
    </>
  );
}
