import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
// Assets
import { ReactComponent as CheckInIcon } from "../assets/img/handshake-solid.svg";
import { ReactComponent as LogOutIcon } from "../assets/img/right-from-bracket-solid.svg";
import { ReactComponent as MeetingIcon } from "../assets/img/people-group-solid.svg";
import { ReactComponent as ProfileIcon } from "../assets/img/user-tie-solid.svg";
// External
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// Hooks
import useOutsideClick from "../hooks/useOutsideClick";

export default function NavMenu({ navShown, setNavShown }) {
  const { pathname } = useLocation();
  const user = useContext(UserContext);
  const navRef = useRef(null);
  // useOutsideClick(navRef, () => setNavShown(false));

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!navRef.current.contains(event.target)) {
        console.log("I heard it!");
        // callbackRef.current(event);
        setNavShown(!navShown);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [navRef]);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="nav"
      ref={navRef}
    >
      {pathname.includes("meeting") || pathname.includes("handleRoomCode") ? (
        <Link
          className="nav-item"
          to={`/profile/${user.advizotID}`}
          onClick={() => setNavShown(false)}
        >
          <ProfileIcon className="icon" />
          Profile
        </Link>
      ) : (
        ""
      )}

      {pathname.includes("profile") && (
        <Link
          className="nav-item"
          to={`/meeting/${user.group}`}
          onClick={() => setNavShown(false)}
        >
          <MeetingIcon className="icon" />
          Meeting
        </Link>
      )}

      <Link
        className="nav-item"
        to={`/check-in/${user.advizotID}`}
        onClick={() => setNavShown(false)}
      >
        <CheckInIcon className="icon" />
        1:1 Check-In
      </Link>

      <hr />

      <a className="nav-item" href="/auth/logout">
        <LogOutIcon className="icon" />
        Log Out
      </a>
    </motion.nav>
  );
}
