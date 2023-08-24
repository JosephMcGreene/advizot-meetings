//External
import { motion } from "framer-motion";
//Components
import AdminResponse from "./AdminResponse";
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";

export default function AdminResponses({
  roomCodeDisplayed,
  responses,
  submitEdits,
}) {
  return (
    <>
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
              userResponseBody={response}
              submitEdits={submitEdits}
            />
          );
        })}
      </motion.section>
    </>
  );
}
