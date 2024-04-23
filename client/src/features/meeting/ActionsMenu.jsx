import { useState, useRef, useContext } from "react";
import { UserContext } from "../../App";
//Assets
import { ReactComponent as MemberEditIcon } from "../../assets/img/users-gear-solid.svg";
import { ReactComponent as AddResponseIcon } from "../../assets/img/file-circle-plus-solid.svg";
import { ReactComponent as SlidersIcon } from "../../assets/img/sliders-solid.svg";
//External
import { motion } from "framer-motion";
//Internal
import ViewSwitch from "../meeting/ViewSwitch";
import ActionsBtn from "./meeting-responses/ActionsBtn";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MemberEditModal from "./admin-actions/MemberEditModal";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ActionsMenu({
  currentGroup,
  signIns,
  handleViewAsMemberClick,
  cardView,
  handleNewSignInClick,
}) {
  const user = useContext(UserContext);
  const [actionsShown, setActionsShown] = useState(false);
  const [memberEditModalShown, setMemberEditModalShown] = useState(false);
  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => setActionsShown(false));

  /**
   * Searches the sign-ins array for a sign-in that the user has submitted and uses that information to return true if the user has signed in, or false if they have not.
   *
   * @returns {boolean} whether or not the user has signed into this meeting
   */
  function userHasSignedIn() {
    const signInOfUser = signIns.find(
      (signIn) => signIn.userID === user.advizotID
    );
    return signInOfUser ? true : false;
  }

  /**
   * Assesses whether or not the button to add a new sign-in should be visible to the user
   *
   * @returns {boolean} whether or not the button to add a new sign-in should be visible
   */
  function addBtnIsVisible() {
    if (user.role === "admin") return true;
    if (user.role === "member" && !userHasSignedIn()) return true;
    return false;
  }

  return (
    <>
      <nav ref={actionsRef}>
        {actionsShown && (
          <motion.ul
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="admin-actions-list"
          >
            {user.role === "admin" && (
              <li
                className="admin-actions-item"
                onClick={() => setMemberEditModalShown(!memberEditModalShown)}
              >
                <MemberEditIcon className="icon" />
                Edit Members
              </li>
            )}

            <li className="admin-actions-item">
              <ViewSwitch
                cardView={cardView}
                toggleCardView={handleViewAsMemberClick}
                id="viewSwitch"
              />
              <label htmlFor="viewSwitch">
                View {cardView ? "Table" : "Cards"}
              </label>
            </li>

            {addBtnIsVisible() && (
              <>
                <hr />

                <li
                  className="admin-actions-item"
                  onClick={() => handleNewSignInClick()}
                >
                  <AddResponseIcon className="icon" />
                  Add a Sign-In
                </li>
              </>
            )}
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
