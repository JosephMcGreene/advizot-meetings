import { useState, useRef, useContext } from "react";
import { UserContext } from "../../../App";
// Assets
import { ReactComponent as MemberEditIcon } from "../../../assets/img/users-gear-solid.svg";
import { ReactComponent as BarsIcon } from "../../../assets/img/bars-solid.svg";
import { ReactComponent as AddSignInIcon } from "../../../assets/img/file-circle-plus-solid.svg";
// External
import { motion } from "framer-motion";
// Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
// Internal
import ActionsBtn from "./ActionsBtn";
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MemberEditModal from "./MemberEditModal";

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
          <ActionsBtn handleClick={() => setActionsShown(!actionsShown)}>
            <BarsIcon className="bars-icon" />
          </ActionsBtn>
        )}
      </nav>

      {memberEditModalShown && (
        <ModalTemplate
          title="Edit Members"
          handleClose={() => setMemberEditModalShown(false)}
        >
          <MemberEditModal
            handleClose={() => setMemberEditModalShown(false)}
            currentGroup={currentGroup}
          />
        </ModalTemplate>
      )}
    </>
  );
}
