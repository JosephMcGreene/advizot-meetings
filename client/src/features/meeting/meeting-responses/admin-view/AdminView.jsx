import { useState } from "react";
//Assets
import slidersIcon from "../../../../assets/img/sliders-solid.svg";
//External
import { motion } from "framer-motion";
//Components
import AdminSignIn from "./AdminSignIn";
import ActionsBtn from "../ActionsBtn";
import AdminActionList from "../../admin-actions/AdminActionList";
import ModalTemplate from "../../../../shared/modals/ModalTemplate";
import GroupModal from "../../admin-actions/GroupModal";
import MemberEditModal from "../../admin-actions/MemberEditModal";

export default function AdminView({
  signIns,
  currentGroup,
  handleSubmitEdits,
  handleDelete,
  handleNewSignInClick,
  handleGroupChangeSubmit,
}) {
  const [actionsShown, setActionsShown] = useState(false);
  const [groupModalShown, setGroupModalShown] = useState(false);
  const [viewAsMember, setViewAsMember] = useState(false);
  const [memberEditModalShown, setMemberEditModalShown] = useState(false);

  return (
    <>
      {viewAsMember ? (
        <>
          I'm a member!
          <ActionsBtn handleClick={() => setActionsShown(!actionsShown)}>
            <img
              src={slidersIcon}
              alt="user actions"
              className="sliders-icon"
            />
          </ActionsBtn>
        </>
      ) : (
        /* <MemberView
                  signIns={signIns}
                  handleDelete={handleDelete}
                  handleSubmitEdits={handleSubmitEdits}
                  handleSignInClick={handleNewSignInClick}
                />
                <AdminActionList
                  onFormSubmit={handleSubmitEdits}
                  actionToggle={() => setActionsShown(!actionsShown)}
                  handleNewSignInClick={handleNewSignInClick}
                  handleFilterClick={() => setFilterModalShown(!filterModalShown)}
                  handleViewAsMemberClick={() => setViewAsMember(!viewAsMember)}
                  viewAsMember={viewAsMember}
                  handleMemberEditClick={() =>
                    setMemberEditModalShown(!memberEditModalShown)
                  }
                /> */
        <>
          <motion.article
            layout
            transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
            className="admin-sign-ins"
          >
            {signIns.length > 0 && (
              <ul className="admin-head">
                <li className="admin-heading">Name</li>
                <li className="admin-heading">Priority</li>
                <li className="admin-heading">Business</li>
                <li className="admin-heading">Personal</li>
                <li className="admin-heading">Relationships</li>
                <li className="admin-heading">Issue</li>
                <li className="admin-heading">Goal</li>
              </ul>
            )}

            {signIns.map((signIn, index) => {
              return (
                <AdminSignIn
                  key={`${signIn.date}${index}`}
                  signInBody={signIn}
                  handleSubmitEdits={handleSubmitEdits}
                  handleDelete={handleDelete}
                />
              );
            })}
            <ActionsBtn handleClick={() => setActionsShown(!actionsShown)}>
              <img
                src={slidersIcon}
                alt="actions slider"
                className="sliders-icon"
              />
            </ActionsBtn>
          </motion.article>
        </>
      )}

      {actionsShown && (
        <AdminActionList
          onFormSubmit={handleSubmitEdits}
          actionToggle={() => setActionsShown(!actionsShown)}
          handleNewSignInClick={handleNewSignInClick}
          handleFilterClick={() => setGroupModalShown(!groupModalShown)}
          handleViewAsMemberClick={() => setViewAsMember(!viewAsMember)}
          viewAsMember={viewAsMember}
          handleMemberEditClick={() =>
            setMemberEditModalShown(!memberEditModalShown)
          }
        />
      )}

      {groupModalShown && (
        <ModalTemplate
          title="Filter Sign-Ins"
          handleClose={() => setGroupModalShown(false)}
        >
          <GroupModal
            handleGroupChangeSubmit={handleGroupChangeSubmit}
            handleClose={() => setGroupModalShown(false)}
          />
        </ModalTemplate>
      )}

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
