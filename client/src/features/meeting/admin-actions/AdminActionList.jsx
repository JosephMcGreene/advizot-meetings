import { useRef } from "react";
//Assets
import { ReactComponent as GroupViewIcon } from "../../../assets/img/users-viewfinder-solid.svg";
import { ReactComponent as MemberEditIcon } from "../../../assets/img/users-gear-solid.svg";
import { ReactComponent as AddResponseIcon } from "../../../assets/img/file-circle-plus-solid.svg";
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
  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => actionToggle());

  return (
    <motion.ul
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      ref={actionsRef}
      className="admin-actions-list"
    >
      <li className="admin-actions-item">
        <button
          className="admin-actions-btn"
          onClick={() => handleFilterClick()}
          id="filter"
        >
          <label htmlFor="filter" className="admin-actions-label">
            Change Group
          </label>
          <GroupViewIcon className="icon" />
        </button>
      </li>

      <li className="admin-actions-item">
        <button
          className="admin-actions-btn"
          onClick={() => handleMemberEditClick()}
          id="members"
        >
          <label htmlFor="members" className="admin-actions-label">
            Edit Members
          </label>
          <MemberEditIcon className="icon" />
        </button>
      </li>

      <li className="admin-actions-item">
        <button
          className="admin-actions-btn"
          onClick={() => handleNewSignInClick()}
          id="newSignIn"
        >
          <label htmlFor="newSignIn" className="admin-actions-label">
            Add a Sign-In
          </label>
          <AddResponseIcon className="icon" />
        </button>
      </li>
    </motion.ul>
  );
}
