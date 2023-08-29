import { useState } from "react";
//Assets
import verticalEllipse from "../../../assets/img/ellipsis-vertical-solid.svg";
//External
import { motion } from "framer-motion";
//Components
import RoomCodeToggle from "../RoomCodeToggle";
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";
import AdminResponse from "./AdminResponse";
import ActionsBtn from "./ActionsBtn";
import AdminActionList from "../admin-actions/AdminActionList";

export default function AdminView({
  responses,
  submitEdits,
  onDelete,
  handleNewResponseClick,
}) {
  const [adminActionsShown, setAdminActionsShown] = useState(false);
  const [roomCodeDisplayed, setRoomCodeDisplayed] = useState(false);

  return (
    <>
      <RoomCodeToggle
        handleClick={() => setRoomCodeDisplayed(!roomCodeDisplayed)}
        roomCodeDisplayed={roomCodeDisplayed}
      />

      {roomCodeDisplayed && <RoomCodeDisplay />}

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

        <ActionsBtn
          handleClick={() => setAdminActionsShown(!adminActionsShown)}
        >
          <img src={verticalEllipse} alt="user actions" className="dots-icon" />
        </ActionsBtn>

        {adminActionsShown && (
          <AdminActionList
            onFormSubmit={submitEdits}
            actionToggle={() => setAdminActionsShown(!adminActionsShown)}
            handleNewResponseClick={handleNewResponseClick}
          />
        )}
      </motion.section>
    </>
  );
}
