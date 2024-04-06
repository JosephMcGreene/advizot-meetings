import { useState, useRef } from "react";
//Assets
import { ReactComponent as MemberEditIcon } from "../../../assets/img/users-gear-solid.svg";
import { ReactComponent as ViewAsMemberIcon } from "../../../assets/img/address-card-solid.svg";
import { ReactComponent as ViewAsAdminIcon } from "../../../assets/img/key-solid.svg";
import { ReactComponent as AddResponseIcon } from "../../../assets/img/file-circle-plus-solid.svg";
import { ReactComponent as SlidersIcon } from "../../../assets/img/sliders-solid.svg";
//External
import { motion } from "framer-motion";
//Internal
import ActionsBtn from "../meeting-responses/ActionsBtn";
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MemberEditModal from "../admin-actions/MemberEditModal";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function AdminActions({
  currentGroup,
  handleViewAsMemberClick,
  viewAsMember,
  handleNewSignInClick,
}) {
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

            <li
              className="admin-actions-item"
              onClick={() => handleNewSignInClick()}
            >
              <AddResponseIcon className="icon" />
              Add a Sign-In
            </li>
          </motion.ul>
        )}

        <ActionsBtn handleClick={() => setActionsShown(!actionsShown)}>
          <SlidersIcon className="sliders-icon" />
        </ActionsBtn>
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
