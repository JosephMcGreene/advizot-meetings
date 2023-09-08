import { useState } from "react";
//Assets
import verticalEllipse from "../../../assets/img/sliders-solid.svg";
//External
import { motion } from "framer-motion";
//Internal
import { currentDate } from "../../../helpers";
//Components
import RoomCodeToggle from "../admin-actions/RoomCodeToggle";
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";
import AdminResponse from "./AdminResponse";
import ActionsBtn from "./ActionsBtn";
import AdminActionList from "../admin-actions/AdminActionList";
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import FilterModal from "../admin-actions/FilterModal";
import MemberEditModal from "../admin-actions/MemberEditModal";

export default function AdminView({
  responses,
  submitEdits,
  onDelete,
  handleNewResponseClick,
  handleFilterSubmit,
}) {
  const [actionsShown, setActionsShown] = useState(false);
  const [roomCodeShown, setRoomCodeShown] = useState(false);
  const [filterModalShown, setFilterModalShown] = useState(false);
  const [memberEditModalShown, setMemberEditModalShown] = useState(false);

  return (
    <article>
      <h1 className="meeting-heading">Answers for {currentDate("month")}</h1>

      <RoomCodeToggle
        handleClick={() => setRoomCodeShown(!roomCodeShown)}
        roomCodeShown={roomCodeShown}
      />

      {roomCodeShown && <RoomCodeDisplay />}

      <motion.section
        layout
        transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
        className="admin-responses"
      >
        <ul className="admin-head">
          <li className="admin-heading">Name</li>
          <li className="admin-heading">Priority</li>
          <li className="admin-heading">Business</li>
          <li className="admin-heading">Personal</li>
          <li className="admin-heading">Relationships</li>
          <li className="admin-heading">Issue</li>
          <li className="admin-heading">Goal</li>
        </ul>

        {responses.map((response, index) => {
          return (
            <AdminResponse
              key={`${response.date}${index}`}
              responseBody={response}
              submitEdits={submitEdits}
              onDelete={onDelete}
            />
          );
        })}

        <ActionsBtn handleClick={() => setActionsShown(!actionsShown)}>
          <img src={verticalEllipse} alt="user actions" className="dots-icon" />
        </ActionsBtn>
      </motion.section>

      {actionsShown && (
        <AdminActionList
          onFormSubmit={submitEdits}
          actionToggle={() => setActionsShown(!actionsShown)}
          handleNewResponseClick={handleNewResponseClick}
          handleFilterClick={() => setFilterModalShown(!filterModalShown)}
          handleMemberEditClick={() =>
            setMemberEditModalShown(!memberEditModalShown)
          }
        />
      )}

      {filterModalShown && (
        <ModalTemplate
          title="Filter Responses"
          handleClose={() => setFilterModalShown(false)}
        >
          <FilterModal
            handleFilterSubmit={handleFilterSubmit}
            handleClose={() => setFilterModalShown(false)}
          />
        </ModalTemplate>
      )}

      {memberEditModalShown && (
        <ModalTemplate
          title="Edit Members"
          handleClose={() => setMemberEditModalShown(false)}
        >
          <MemberEditModal />
        </ModalTemplate>
      )}
    </article>
  );
}
