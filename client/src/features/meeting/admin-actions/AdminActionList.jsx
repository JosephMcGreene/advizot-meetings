import { useRef, useContext } from "react";
import { ThemeContext } from "../../../App";
//Assets
import filterIcon from "../../../assets/img/filter-solid.svg";
import memberEditIcon from "../../../assets/img/users-gear-solid.svg";
import addResponseIcon from "../../../assets/img/file-circle-plus-solid.svg";
//External
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function AdminActionList({
  actionToggle,
  handleFilterClick,
  handleMemberEditClick,
  handleNewSignInClick,
}) {
  const isDark = useContext(ThemeContext);
  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => actionToggle());

  return (
    <motion.ul
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      ref={actionsRef}
      className={isDark ? "admin-actions-list dark" : "admin-actions-list"}
    >
      <li className="admin-actions-item">
        <button
          className={isDark ? "admin-actions-btn dark" : "admin-actions-btn"}
          onClick={() => handleFilterClick()}
          id="filter"
        >
          <label htmlFor="filter" className="admin-actions-label">
            Change Group
          </label>
          <img src={filterIcon} alt="Filter" className="admin-actions-icon" />
        </button>
      </li>

      <li className="admin-actions-item">
        <button
          className={isDark ? "admin-actions-btn dark" : "admin-actions-btn"}
          onClick={() => handleMemberEditClick()}
          id="members"
        >
          <label htmlFor="members" className="admin-actions-label">
            Edit Members
          </label>
          <img
            src={memberEditIcon}
            alt="Edit Members"
            className="admin-actions-icon"
          />
        </button>
      </li>

      <li className="admin-actions-item">
        <button
          className={isDark ? "admin-actions-btn dark" : "admin-actions-btn"}
          onClick={() => handleNewSignInClick()}
          id="newSignIn"
        >
          <label htmlFor="newSignIn" className="admin-actions-label">
            New Sign-In
          </label>
          <img
            src={addResponseIcon}
            alt="Form"
            className="admin-actions-icon"
          />
        </button>
      </li>
    </motion.ul>
  );
}
