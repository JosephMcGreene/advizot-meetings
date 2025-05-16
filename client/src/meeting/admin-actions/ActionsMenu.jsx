import { useState, useRef, useContext } from "react";
import { UserContext } from "../../App";
// Assets
import { ReactComponent as AddSignInIcon } from "../../assets/img/file-circle-plus-solid.svg";
import { ReactComponent as BarsIcon } from "../../assets/img/bars-solid.svg";
import { ReactComponent as MemberEditIcon } from "../../assets/img/users-gear-solid.svg";
// External
import { motion } from "framer-motion";
// Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
// Internal
import MemberEditModal from "./MemberEditModal";
import ModalTemplate from "../../shared/modals/ModalTemplate";

export default function ActionsMenu({ currentGroup, handleNewSignInClick }) {
  const user = useContext(UserContext);
  const [actionsShown, setActionsShown] = useState(false);
  const [memberEditModalShown, setMemberEditModalShown] = useState(false);
  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => setActionsShown(false));

  return (
    <>
      <nav ref={actionsRef}>
        {actionsShown && (
          <motion.ul
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-actions-list"
          >
            <li
              className="admin-actions-item"
              onClick={() => setMemberEditModalShown(!memberEditModalShown)}
            >
              <MemberEditIcon className="icon" />
              Edit Members
            </li>

            <hr />

            <li
              className="admin-actions-item"
              onClick={() => handleNewSignInClick()}
            >
              <AddSignInIcon className="icon" />
              Add a Sign-In
            </li>
          </motion.ul>
        )}

        {user.role === "admin" && (
          <button
            className="actions-btn"
            onClick={() => setActionsShown(!actionsShown)}
            type="button"
          >
            <BarsIcon className="bars-icon" />
          </button>
        )}
      </nav>

      {memberEditModalShown && (
        <ModalTemplate
          handleClose={() => setMemberEditModalShown(false)}
          title="Edit Members"
        >
          <MemberEditModal
            currentGroup={currentGroup}
            handleClose={() => setMemberEditModalShown(false)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
