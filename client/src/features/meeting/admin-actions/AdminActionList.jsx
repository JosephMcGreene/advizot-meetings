import { useRef } from "react";
//Assets
import { ReactComponent as GroupViewIcon } from "../../../assets/img/users-viewfinder-solid.svg";
import { ReactComponent as MemberEditIcon } from "../../../assets/img/users-gear-solid.svg";
import { ReactComponent as ViewAsMemberIcon } from "../../../assets/img/address-card-solid.svg";
import { ReactComponent as ViewAsAdminIcon } from "../../../assets/img/key-solid.svg";
import { ReactComponent as AddResponseIcon } from "../../../assets/img/file-circle-plus-solid.svg";
//External
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function AdminActionList({
  actionToggle,
  handleFilterClick,
  handleMemberEditClick,
  handleViewAsMemberClick,
  viewAsMember,
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
      <li className="admin-actions-item" onClick={() => handleFilterClick()}>
        <GroupViewIcon className="icon" />
        Change Group
      </li>

      <li
        className="admin-actions-item"
        onClick={() => handleMemberEditClick()}
      >
        <MemberEditIcon className="icon" />
        Edit Members
      </li>

      <li
        className="admin-actions-item"
        onClick={() => handleViewAsMemberClick()}
      >
        {viewAsMember ? (
          <>
            <ViewAsAdminIcon className="icon" />
            View as Admin
          </>
        ) : (
          <>
            <ViewAsMemberIcon className="icon" />
            View as Member
          </>
        )}
      </li>

      <hr />

      <li className="admin-actions-item" onClick={() => handleNewSignInClick()}>
        <AddResponseIcon className="icon" />
        Add a Sign-In
      </li>
    </motion.ul>
  );
}
